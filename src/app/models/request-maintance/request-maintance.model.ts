export class RequestMaintance {
    pkRequest?:number;
    fkTooling:{
        pkTooling: number;
        tooling: string;
        fkStatus: {
            pkstatus: number;
            status: string;
        },
        fkType: {
            pktype:number;
            type:string;
        },
        rack: string;
        position: string;
        lastMtce: string;
        nextMtce: string;
    }
    userRequest: string;
    date: string;
    comments: string;
    aproved: boolean;
    userAproved: string;
}