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
        color: string
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
    project: string,
    qtyNotification : string
}

export class ToolingClass {
    constructor(pkTol:number){
        this.pkTooling = pkTol;
    }
    pkTooling?: number;
    tooling: string;
    fkStatus: {
        pkstatus: number;
        status: string;
        color: string;
    }
    fkType: {
        pktype:number;
        type:string;
    }
    rack: string;
    position: string;
    lastMtce: string;
    nextMtce: string;
    actualQty: number;
    mtceQty: number;
    totalQty: number;
    lifeQty:number;
    project: string;
    qtyNotification : string;
}

export class objTooling {
    tool: string;
    fkStatus: number;
    fkType: number;
    partNumbers: string[];
    rack: string;
    position: string;
    mtcePallet: number;
    mtceMagazine: number;
    fkStations: number[];
    qtyNotification : string;
    idProject : number
}

export class objTooling2 {
    tooling: string;
    fkStatus: number;
    fkType: number;
    fkPartNumbers: number[];
    rack: string;
    position: string;
    mtcePallet: number;
    mtceMagazine: number;
    fkStations: number[];
    qtyNotification : string;
}

export class ToolingValidation {
    tooling: string;
    existe: boolean;
    status: string;
}

export interface EspecificDataTool{
    id:number,
    result: string
}

export class ioTool{
    userDelivery:string;
    userReceive:string;
    newStatus:number;
    toolings:string;
}