import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData{
  kind:string
  idToken:string
  email:string
  refreshToken:string
  expiresIn:string
  localId:string
  registered?:boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null)
  tokenExpirationTimer:any
 signup_url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAW-J275V0m8aHa6yvC46D3-W8OJK9Jg5w'
 login_url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAW-J275V0m8aHa6yvC46D3-W8OJK9Jg5w'

  constructor(private http:HttpClient, private router:Router) { }
  signup(email:string, password:string){
    return this.http.post<AuthResponseData>(this.signup_url, {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.handleError), tap(resData=>{
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }))
  }
  autoLogin(){
    const userData:{
      email:string,
      id :string,
      _token:string,
      _tokenExpirationDate: string

    }=JSON.parse(localStorage.getItem('userData'))
    if(!userData){
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
    if(loadedUser.token){
      this.user.next(loadedUser)
    }
  }

  login(email:string, password:string){
   return this.http.post<AuthResponseData>(this.login_url, {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.handleError), tap(resData=>{
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }))
  }
  logout(){
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
      const expirationDuration= new Date(this.tokenExpirationTimer).getTime()-new Date().getTime()
      this.autoLogout(expirationDuration)
    }
  }

  autoLogout(expirationDuration:number){
   this.tokenExpirationTimer= setTimeout(()=>{
      this.logout()
    },expirationDuration)
  }

  private handleAuthentication(email:string, userid:string, token:string, expiresIn:number){
    const expirationDate = new Date(new Date().getTime() + expiresIn*1000)
    const user=new User(email, userid, token, expirationDate)
    this.user.next(user)
    this.autoLogout(expiresIn*1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }
  private handleError(errorResponse:HttpErrorResponse){
    let errorMessage='An unknown error occured'
    if(!errorResponse.error || !errorResponse.error.error){
      return throwError (errorMessage)
    }
    switch (errorResponse.error.error.message){
      case  "EMAIL_EXISTS":errorMessage="This email already exists";
            break;
      case "EMAIL_NOT_FOUND": errorMessage="This email does not exists";
            break;
      case "INVALID_PASSWORD" : errorMessage="Password is not correct" ;
            break;
    }
    return throwError (errorMessage)  
  }
}
