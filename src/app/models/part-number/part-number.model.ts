export interface PartNumber {
    pkPartnumber?: number,
    partnumber: string,
    fk_project: {
        pkProject: number,
        sfdcpc: string,
        project_name: string
    }
}