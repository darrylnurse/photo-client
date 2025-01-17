import {useContext, useState} from "react";
import {CameraContext} from "../Root.tsx";

export default function CameraImage({ url, name }) {

    const {currentCamera, setCurrentCamera} = useContext(CameraContext);

    const [glowing, setGlowing] = useState(false);

    const handleCamera = () : void => {
        setGlowing(!glowing);
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
                onClick={handleCamera}
                className={`w-[4rem] ${currentCamera === name ? "camera-glow" : ""} hover:translate-y-[-0.25rem] active:scale-[95%] cursor-pointer transition-transform`}
            />
    )
}