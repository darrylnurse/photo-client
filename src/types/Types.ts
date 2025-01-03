export interface IPhoto {
    date_added: string
    url: string,
    title: string,
    date_taken: string,
    location: string,
    camera: string,
    focal_length: string,
    aperture: string,
    shutter_speed: string,
    iso: number
}

export type TAllowedFileTypes = "image/png" | "image/jpg" | "image/jpeg";