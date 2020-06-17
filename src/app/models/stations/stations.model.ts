import { Project } from '../../models/project/project.model'

export class Station{
    pkstation: number;
    fkProject: Project;
    correctVariable: string;
    stationName: string;
    contramascaraQty: number;
    referenceContramascara: string;
    referencePallet: string;
    unit: string;
}