import PhotoInput from "../components/PhotoInput.tsx";
import {ReactNode, useState} from "react";
import SubmitButton from "../components/SubmitButton.tsx";
import getCurrentDate from "../helpers/GetCurrentDate.ts";
import s3Upload from "../helpers/UploadS3.ts";
import {INewPhoto, TAllowedFileTypes} from "../types/Types.ts";

export default function NewPhoto() : ReactNode {

    const currentDate: string = getCurrentDate();

    const [photo, setPhoto] = useState<INewPhoto>({
        date_added: currentDate,
        url: "",
        title: "",
        date_taken: "",
        location: "",
        camera: "",
        focal_length: "",
        aperture: "",
        shutter_speed: "",
        iso: 0
    });
    const [filePath, setFilePath] = useState<string | null>(null);
    const [imageFile, setFile] = useState<File>(null);
    const [fileUploaded, setFileUploaded] = useState<boolean>(false);

    const handleFile = (event): void => {
        URL.revokeObjectURL(filePath || "");
        const file : File= event.target.files[0];
        const allowedTypes: TAllowedFileTypes[] = ["image/png", "image/jpg", "image/jpeg"];

        if(!file || !allowedTypes.includes(file.type as TAllowedFileTypes)) {
            alert("Please upload only JPEG or PNG files.");
            setFilePath(null);
            event.target.value = "";
            return;
        }
        const uploadedFile = URL.createObjectURL(file);
        setFilePath(uploadedFile);
        setFile(file);
    }

    const handleImageUpload = async (event) => {
        event.preventDefault();

        const result : string = await s3Upload(imageFile, imageFile.name, imageFile.type);
        if(result.length > 0) {
            setFileUploaded(true);
            setPhoto((prev: INewPhoto) => ({
                ...prev,
                url: result
            }))
        }
    }

    const handlePhotoSubmit = async (event) => {

        event.preventDefault();

        Object.keys(photo).forEach((property : string) : void => {
            if(!photo[property]) {
                alert("Please fill out all fields.");
                return;
            }
        })

        const params : RequestInit = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(photo)
        };
        const serverUrl = import.meta.env.VITE_SERVER_URL;
        const newPhotoUrl = serverUrl + "/photos";

        try {
            const result = await fetch(newPhotoUrl, params);
            if(!result.ok) {
                return new Error("Error adding photo.");
            } else {
                // show success page here; route "/"
                console.log("Added successfully!");
            }
        } catch(error) {
            console.error(error);
        }
    }
    const hiddenProperties = ["date_added"];

    // useEffect(() => {
    //     console.log(photo)
    // }, [photo]);


    // could show preview of new photo!!!
    return (
        <div className={"flex flex-row gap-2 w-full bg-emerald-300 justify-center items-center"}>
            <form className={"flex justify-center flex-col items-center gap-2"}>
                <img
                    alt={"uploaded-image"}
                    src={filePath || "./default.svg"}
                    className={"h-40 rounded-md"}
                />
                <label
                    htmlFor={"image"}
                >Upload Image</label>
                <input
                    type={"file"}
                    name={"image"}
                    accept={".png, .jpg, .jpeg"}
                    onChange={handleFile}
                />
                <SubmitButton
                    onClick={handleImageUpload}
                    value={"Upload Image"}
                />
            </form>

            <form className={"flex justify-center items-center flex-col gap-2"}>
                {Object.keys(photo)
                    .filter((property: string): boolean => (!hiddenProperties.includes(property)))
                    .map((property: string, index: number) => (
                        <PhotoInput name={property} value={photo} setValue={setPhoto} key={index}/>
                    ))}
                <div style={{
                    opacity: fileUploaded ? 1 : 0.5,
                    pointerEvents: fileUploaded ? "auto" : "none",
                }}>
                    <SubmitButton
                        onClick={handlePhotoSubmit}
                        value={"Submit Photo"}
                    />
                </div>
            </form>
        </div>

    )
}

