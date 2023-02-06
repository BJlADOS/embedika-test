import { ISelectOption } from "./filters";

export interface IMediaDetail {
    id: string;
    title: ITitle;
    format: Format;
    status: Status;
    coverImage: IImage;
    averageScore: number;
    genres: string[];
    description: string;
}

export interface IMediaDetailResponse {
    Media: IMediaDetail;
}

export interface ILocation {
    type: string;
    name: string;
    id: string;
    dimension: string;
}

export interface IMediaCard {
    title: ITitle,
    status: Status,
    coverImage: IImage,
    format: Format,
    id: string,
}

export enum Format {
    TV = 'TV',
    TV_SHORT = 'TV Short',
    MOVIE = 'Movie',
    SPECIAL = 'Special',
    OVA = 'OVA',
    ONA = 'ONA',
}


export interface IImage {
    extraLarge: string;
    large: string;
    medium: string;
}

export interface ITitle {
    english: string;
    romaji: string;
}

export enum Status {
    FINISHED = 'Finished',
    RELEASING = 'Releasing',
    NOT_YET_RELEASED = 'Not yet released',
    CANCELLED = 'Cancelled',
    HIATUS = 'Hiatus',
}

export function getStatusOptions(): ISelectOption[] {
    return Object.keys(Status).map((key, i) => {
        return {
            value: key,
            viewValue: Object.values(Status)[i],
        }
    });
}

export function getFormatOptions(): ISelectOption[] {
    return Object.keys(Format).map((key, i) => {
        return {
            value: key,
            viewValue: Object.values(Format)[i],
        }
    });
}