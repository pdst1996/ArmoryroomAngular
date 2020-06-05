export interface Project {
    pkProject?: number,
    project_name: string,
    sfdcpc: string
}
export interface PartNumber {
    pkPartnumber?: number,
    partnumber: string,
    fk_project: {
        pkProject: number,
        sfdcpc: string,
        project_name: string
    }
}
export interface Type {
    pktype?: number,
    type: string
}
export interface Status {
    pkstatus?: number,
    status: string
}
export interface Tooling {
    pkTooling?: number,
    tooling: string,
    fkStatus: {
        pkstatus: number,
        status: string,
    },
    fkType: {
        pktype:number,
        type:string
    },
    rack: string,
    position: string,
    lastMtce: string,
    nextMtce: string,
    actualQty: number,
    mtceQty: number,
    totalQty: number,
    lifeQty:number,
    project: string
}

export class objTooling {
    tool: string;
    fkStatus: number;
    fkType: number;
    fkPartNumber:  number;
    rack: string;
    position: string;
    mtcePallet: number;
    mtceMagazine: number;
}

export interface RequesMaintance {
    pkRequest?:number,
    fkTooling:{
        pkTooling: number,
        tooling: string,
        fkStatus: {
            pkstatus: number,
            status: string,
        },
        fkType: {
            pktype:number,
            type:string
        },
        rack: string,
        position: string,
        lastMtce: string,
        nextMtce: string
    },
    userRequest: string,
    date: string,
    comments: string,
    aproved: boolean,
    userAproved: string
}