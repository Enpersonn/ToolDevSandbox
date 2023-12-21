import { SpecialFields, TextFields } from "./textTypes";


//type of nodes
export type RTEfieldTypes = TextFields & SpecialFields;


//json page
export type RTEfieldType<TypeOfField extends RTEfieldTypes> = Extract<RTEfieldTypes, TypeOfField> & {
    id: string;
    type: string;
}

export type RTEnode = RTEfieldType<RTEfieldTypes>[];

export type RTEpage = RTEnode[];



//cords for user selection
export type RTEpath = [number, number]

export type RTEpoint = { path: RTEpath, offset: number }

export type RTErange = { anchor: RTEpoint, focus: RTEpoint }
