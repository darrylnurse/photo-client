import {useContext} from "react";
import {CameraContext} from "../Root.tsx";

export default function CameraSelect({ cameras }) {

    const {currentCamera, setCurrentCamera} = useContext(CameraContext);

    const handleSelect = (event) => {
        const { value } = event.target;
        if (value) setCurrentCamera(value);
    }

    return (
        <nav className={"justify-self-end flex flex-row justify-end items-center gap-[0.5rem]"}>
            <label className={"font-bold text-md"} htmlFor={"camera"}>CAMERA:</label>
            {cameras
                ?
            <select
                value={currentCamera}
                name={"camera"}
                className={"light-inner-shadow w-2/3 rounded-md text-center"}
                onChange={handleSelect}
            >
                <option>All</option>
                {cameras && cameras.map(({ camera }, index) => {
                    return <option
                                value={camera}
                                key={index}
                            >{camera}</option>
                })}
            </select>
                :
            <div>
                It seems the cameras weren't fetched!
            </div>}
        </nav>
    )
}