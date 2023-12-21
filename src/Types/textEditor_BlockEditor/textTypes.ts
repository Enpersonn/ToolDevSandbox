import { RTEfieldType, RTEfieldTypes } from "./rteTypes";

type basickData = {
    text: string
}

type TextField = {
    bold?: boolean;
    italic?: boolean;
    font_style?: string;
    font_size?: string;
    underline?: boolean;
    underline_color?: string;
    underline_style?: "plane";
    color?: string;
}

type TextField_Paragraph = TextField & {
    data?: basickData
}

type TextField_Header = TextField & {
    data?: basickData & {
        level: number
    }
}


type TextField_Url = TextField & {
    data: basickData & {
        URL: string

    }
}

type TextField_List = TextField & {
    data: {
        listType?: string;
        items: TextField_Paragraph[]
    }
}

type TextField_Code = TextField & {
    data: basickData & {
        language?: string;
    }
}

type ImageFieldBase = {
    src: string;
    alt?: string;
    width?: string;
    height?: string;
    caption?: string;
}

type TableField = {
    columb: [{ Rows: RTEfieldType<RTEfieldTypes>[] }]
}

export type TextFields = TextField_Paragraph | TextField_Header | TextField_Url | TextField_List | TextField_Code | TextField_Header;
export type SpecialFields = ImageFieldBase | TableField

