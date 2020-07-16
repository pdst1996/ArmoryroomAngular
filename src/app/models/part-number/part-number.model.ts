export interface PartNumber {
    pkPartnumber?: number,
    partnumber: string,
    fk_project: {
        pkProject: number,
        sfdcpc: string,
        project_name: string
    }
}

export interface PartNumber42q {
    part_key: number,
    part_number:string
}