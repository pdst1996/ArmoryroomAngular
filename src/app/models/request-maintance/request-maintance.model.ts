import { Tooling } from "../tooling/tooling.model";

export class RequestMaintance {
    pkRequest?:number;
    fkTooling:Tooling;
    userRequest: string;
    date: string;
    comments: string;
    aproved: boolean;
    userAproved: string;
}