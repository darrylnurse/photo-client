import {CSSProperties, useContext} from "react";
import {CameraContext} from "../Root.tsx";
import {TCameraImageProps} from "../types/Props.ts";

export default function CameraImage({ url, name }: TCameraImageProps) {

    const {currentCamera, setCurrentCamera} = useContext(CameraContext);

    const handleCamera = () : void => {
        if(currentCamera === name) {
            setCurrentCamera("All");
        } else {
            setCurrentCamera(name);
        }
    }

    return (
        <img
            alt={name}
            src={url}
            tabIndex={0}
            onClick={handleCamera}
            onKeyDown={(event) => {
                if(event.key === "Enter") {
                    handleCamera()
                }
            }}
            style={{
                "--content": name
            } as CSSProperties}
            className={`camera-image w-[1.5rem] md:w-[3rem] lg:w-[4rem] ${currentCamera === name ? "camera-glow" : ""} w-[4rem] hover:translate-y-[-0.25rem] active:scale-[95%] cursor-pointer transition-transform`}
        />
)
}