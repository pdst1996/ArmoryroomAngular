import { Tooling } from '../../models/tooling/tooling.model'

export class Maintenance{
    constructor(pk:number){
        this.pkMaintenance = pk;
    }
    pkMaintenance:number;
    fkTypeMaintenance:{
        pkTypeMtce:number;
        typeMtce:string;
    }
    fkTooling:Tooling;
    dateMtce:string;
    userName:string;
    comments:string;
    signed:boolean;
    approved:boolean;
}

export class Question{
    pkMaintenanceDetail:number;
    fkMaintenance:number;
    answer:string;
    correctAnswer:string;
    question:string;
    type:string;
}

export class Signature{
    constructor(pk:number){
        this.pkSignature= pk;
    }
    pkSignature?:number;
    username:string;
    dateSign:string;
    comments:string;
    department:string;
    approved:boolean;
}
export class Maintenance2{
    fkMaintenance:Maintenance;
    username:string;
    dateSign:string;
    comments:string;
    department:string;
    approved:boolean;
}