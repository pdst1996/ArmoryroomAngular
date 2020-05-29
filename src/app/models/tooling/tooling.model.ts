export interface Project {
    pkProject?: number,
    project_name: string,
    sfdcpc: string
}
export interface PartNumber {
    pk_Partnumber?: number,
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
export interface Tooling {
    pk_tooling?: number,
    tooling: string,
    fk_status: number,
    fk_type: number,
    rack: string,
    position: string,
    last_mtce: string,
    next_mtce: string
}

export class objTooling {
    pk_tooling: number;
    tooling: string;
    fk_status: number;
    fk_type: number;
    rack: string;
    position: string;
    last_mtce: string;
    next_mtce: string;
}