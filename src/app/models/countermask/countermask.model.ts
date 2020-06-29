export interface Project {
    pkProject?: number,
    projectName: string,
    sfdcpc: string
}

export interface PartNumber {
    pkPartnumber?: number,
    partnumber: string,
    fkProject: number
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

export interface CounterMaskData
{
    id:number,
    result: string
}
