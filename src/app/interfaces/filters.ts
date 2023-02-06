import { Format, Status } from "./media";

export interface IFilter {
    search: string | null;
    statusIn: Status[] | null
    format: Format | null;
}

export const defaultFilter: IFilter = {
    search: null,
    statusIn: null,
    format: Format.TV,
}

export interface IVariables {
    page: number;
    perPage: number;
    statusIn: Status[] | null;
    search: string | null;
    format: Format | null;
}

export interface IPageInfo {
    currentPage: number;
    hasNextPage: boolean;
    lastPage: number;
    perPage: number;
    total: number;
}

export interface ISelectOption {
    value: string;
    viewValue: string;
}

