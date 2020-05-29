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

export interface Project {
    pkProject?: number,
    project_name: string,
    sfdcpc: string
}

export class cProject {
    pkProject: number;
    project_name: string;
    sfdcpc: string;
}

export class cPartNumber {
    pk_Partnumber: number;
    partnumber: string;
}