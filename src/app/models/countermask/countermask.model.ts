export interface Project {
    pk_project?: number,
    project_name: string,
    sfdcpc: string
}

export interface PartNumber {
    pk_partnumber?: number,
    partnumber: string,
    fk_project: number
}

export interface CounterMask
{
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

