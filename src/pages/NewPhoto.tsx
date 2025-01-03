import PhotoInput from "../components/PhotoInput.tsx";
import {useEffect, useState} from "react";
import SubmitButton from "../components/SubmitButton.tsx";
import getCurrentDate from "../helpers/GetCurrentDate.ts";
import s3Upload from "../helpers/UploadS3.ts";

export default function NewPhoto() {

    const currentDate = getCurrentDate();

    const [photo, setPhoto] = useState({
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
    const [imageFile, setFile] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState("");

    const handleFile = (event) => {
        URL.revokeObjectURL(filePath || "");
        const file = event.target.files[0];
        const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

        if(!file || !allowedTypes.includes(file.type)) {
            alert("Please upload only JPEG or PNG files.")
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

        const result = await s3Upload(imageFile, imageFile.name, imageFile.type);
        if(result.length > 0) {
            setUploadedUrl(result);
            setFileUploaded(true);
            setPhoto((prev) => ({
                ...prev,
                url: result
            }))
        }
    }

    // useEffect(() => {
    //     console.log(photo);
    // }, [photo]);

    return (
        <div className={"flex flex-row gap-2"}>
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
                    .filter((property) => property !== "date_added")
                    .map((property, index) => (
                        <PhotoInput name={property} value={photo} setValue={setPhoto} key={index}/>
                    ))}
                {fileUploaded &&
                    <SubmitButton
                        onClick={() => null}
                        value={"Submit Photo"}
                    />
                }

            </form>
        </div>

    )
}

