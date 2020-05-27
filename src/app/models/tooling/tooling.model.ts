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