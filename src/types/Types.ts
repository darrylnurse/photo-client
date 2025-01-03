export interface IHomePhoto {
    url: string,
    title: string,
    date_taken: string,
    location: string,
    camera: string,
}

export interface INewPhoto extends IHomePhoto{
    date_added: string,
    focal_length: string,
    aperture: string,
    shutter_speed: string,
    iso: number
}

export interface IRawPhoto extends INewPhoto {
    slug: string,
}

export type TAllowedFileTypes = "image/png" | "image/jpg" | "image/jpeg";