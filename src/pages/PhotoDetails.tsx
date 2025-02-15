import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {IPhoto} from "../types/Types.ts";
import resizeUrl from "../helpers/ResizeUrl.ts";

export default function PhotoDetails() {

    const { slug } = useParams();
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const newPhotoUrl = serverUrl + "/photos/" + slug;
    const params : RequestInit = {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    };

    const [photo, setPhoto] = useState<IPhoto>({
        aperture: "",
        camera: "",
        date_added: "",
        date_taken: "",
        focal_length: "",
        iso: 0,
        location: "",
        shutter_speed: "",
        slug: "",
        title: "",
        url: ""
    });
    const fetchPhotos = async () => {
        try {
            const result = await fetch(newPhotoUrl, params);
            if(!result.ok) {
                // return div "server down";
                console.log("Error getting photos.");
            } else {
                const data = await result.json();
                console.log(data)
                const fetchedPhoto : IPhoto = data["photo"][0];
                setPhoto(fetchedPhoto);
                console.log(fetchedPhoto)
                localStorage.setItem("lastVisitedPhoto", fetchedPhoto.url);
            }
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchPhotos().catch((error) => console.error(error));
    }, []);

    return (
        photo ? (
        <div className={"w-full flex flex-col md:flex-row relative"}>
            <div className={"image-box w-full md:w-[60%] h-full relative z-[1] flex p-6 md:p-12 items-center justify-center"}>
                <img
                    src={photo.url}
                    alt={photo.slug}
                    className={"rounded-md w-full"}
                    draggable={false}
                />
            </div>
            <div
                className={`details-box w-full md:w-[40%] bg-white p-4 flex bg-no-repeat bg-cover bg-in bg-center bg-blend-difference relative items-center justify-center`}
                style={{
                    backgroundImage: `url(${resizeUrl(photo.url, "normal")})`,
                }}
            >
                <div
                    style={{
                        backdropFilter: "invert(100%) brightness(20%)",
                    }}
                    className={"py-8 px-12 rounded-xl text-2xl text-white"}
                >
                    <h1 className={"font-bold py-2 text-4xl text"}>{photo.title}</h1>
                    <p>Taken In: {photo.location}</p>
                    <p>Taken On: {photo.date_taken}</p>
                    <p>Taken With: {photo.camera}</p>
                    <p>Shutter Speed: {photo.shutter_speed}</p>
                    <p>Focal Length: {photo.focal_length}</p>
                    <p>Aperture: {photo.aperture}</p>
                    <p>ISO: {photo.iso}</p>
                </div>
            </div>
        </div>
        ) : (
            <div className={"w-full flex justify-center items-center text-white text-3xl font-bold"}>
                {/*We couldn't find that picture!*/}
            </div>
        )
    )
}