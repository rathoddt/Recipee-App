import { Ingrideint } from "./ingridient.model"

export class Recipe{
    
    public name:string
    public description:string
    public imagePath:string
    public ingridients:Ingrideint[]
    constructor(name:string, desc:string, imagePath:string, ingridients:Ingrideint[]){
        this.name=name
        this.description=desc
        this.imagePath=imagePath
        this.ingridients=ingridients
    }
}