import { Type } from "../type/type.model";

export class Question{
    // constructor(pkquestion: number, question: string,  status: boolean, type: Type, answer:string){
    //     this.pkQuestion = pkquestion;
    //     this.question = question;
    //     this.status = status;
    //     this.fkType = type;
    //     this.correctAnswer  =answer;
    // }
    pkQuestion : number;
    question : string;
    status : boolean;
    fkType : Type;
    correctAnswer : string;
}

export class Answer{
    constructor(pk:number,ans:string){
        this.pkQuestion = pk;
        this.answer = ans;
    }
    pkQuestion:number;
    answer:string;
}

export class MaintenanceInsert{
    tooling:string;
    username:string;
    comments:string;
    answers: Answer[];
}