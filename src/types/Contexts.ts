import {Dispatch, SetStateAction} from "react";

export interface ICameraContext {
    currentCamera: string,
    setCurrentCamera: Dispatch<SetStateAction<string>>
}

export interface IAuthContext {
    authorized: boolean,
    setAuthorized: Dispatch<SetStateAction<boolean>>
}