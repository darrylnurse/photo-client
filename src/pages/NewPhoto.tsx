import PhotoInput from "../components/PhotoInput.tsx";
import {ReactNode, useState} from "react";
import SubmitButton from "../components/SubmitButton.tsx";
import getCurrentDate from "../helpers/GetCurrentDate.ts";
import s3Upload from "../helpers/UploadS3.ts";
import {INewPhoto, TAllowedFileTypes} from "../types/Types.ts";
import {useNavigate} from "react-router";
import exifr from 'exifr'

export default function NewPhoto() : ReactNode {

    const navigate = useNavigate();

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

    const isImageLoaded = (file) => {
        return new Promise((resolve, reject) => {
            if (file) {
                const reader = new FileReader();
                reader.onload = () => resolve(true);
                reader.onerror = () => reject(false);
                reader.readAsDataURL(file);
            } else {
                reject(false);
            }
        });
    };

    const decimalToFraction = (decimal) => {
        if(!decimal) return "1/1";
        return `1/${100 / (Number(decimal) * 100)}`
    }

    const parseCamera = (rawName) => {
        const parsedString = rawName.replace(/[<>]/g, "");
        const commaIndex = parsedString.indexOf(',');
        if (commaIndex === -1) {
            return parsedString;
        }
        return parsedString.slice(0, commaIndex);
    }

    const handleFile = async (event) => {
        setPhoto((prev) => ({
            ...prev,
            url: "",
            date_taken: "",
            location: "",
            camera: "",
            focal_length: "",
            aperture: "",
            shutter_speed: "",
            iso: 0
        }));

        URL.revokeObjectURL(filePath || "");

        const file = event.target.files[0];

        try {
            const loaded = await isImageLoaded(file);
            if (loaded && (file.type === "image/jpeg" || file.type === "image.jpg")) {
                exifr.parse(file)
                    .then(metadata => {
                        console.log(metadata)
                        setPhoto((prev) => ({
                            ...prev,
                            camera: parseCamera(metadata.Model),
                            focal_length: `${metadata.FocalLength}mm`,
                            iso: metadata.ISO,
                            shutter_speed: `${decimalToFraction(metadata.ExposureTime)} sec`,
                            aperture: `f/${metadata.FNumber}`,
                        }))
                    })
            } else {
                console.log("File type not conducive to EXIF.")
            }
        } catch (err) {
            console.error("Failed to load image:", err);
        }

        const allowedTypes: TAllowedFileTypes[] = ["image/png", "image/jpg", "image/jpeg"];

        if(!file || !allowedTypes.includes(file.type as TAllowedFileTypes)) {
            alert("Please upload only JPEG or PNG files.");
            setFilePath(null);
            event.target.value = "";
            return;
        }
        const fileObjectUrl = URL.createObjectURL(file);
        setFilePath(fileObjectUrl);
        setFile(file);
    }

    const handleImageUpload = async (event) => {
        event.preventDefault();

        const { originalUrl } = await s3Upload(imageFile, imageFile.name, imageFile.type);
        if(originalUrl.length > 0) {
            setFileUploaded(true);
            setPhoto((prev: INewPhoto) => ({
                ...prev,
                url: originalUrl
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
                navigate("/");
                alert("Photo added successfully!");
            }
        } catch(error) {
            console.error(error);
        }
    }
    const hiddenProperties = ["date_added"];
    const recentUrl = localStorage.getItem("lastVisitedPhoto");

    return (
        <div
            className={"flex flex-col lg:flex-row gap-[3rem] lg:gap-[12rem] py-[5rem] lg:py-[3rem] bg-black bg-no-repeat w-full bg-cover bg-center justify-center items-center"}
            style={{
                backgroundImage: `url(${recentUrl})`,
            }}
        >
            <form className={"light-inner-shadow flex justify-center flex-col items-center bg-gray-100 rounded-md p-6 gap-4"}>
                <img
                    alt={"uploaded-image"}
                    src={filePath || "./default.svg"}
                    className={"h-40 rounded-md"}
                />
                <label
                    htmlFor={"image"}
                    className={"font-bold text-2xl"}
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

            <form className={"light-inner-shadow flex justify-center items-start flex-col gap-4 bg-gray-100 rounded-md p-6"}>
                {Object.keys(photo)
                    .filter((property: string): boolean => (!hiddenProperties.includes(property)))
                    .map((property: string, index: number) => (
                        <PhotoInput name={property} value={photo} setValue={setPhoto} key={index}/>
                ))}
                <div style={{
                        opacity: fileUploaded ? 1 : 0.5,
                        pointerEvents: fileUploaded ? "auto" : "none",
                    }}
                     className={"self-center mt-5"}
                >
                    <SubmitButton
                        onClick={handlePhotoSubmit}
                        value={"Submit Photo"}
                    />
                </div>
            </form>
        </div>
    )
}

