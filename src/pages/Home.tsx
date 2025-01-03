import {ReactNode, useEffect, useState} from "react";
import {IHomePhoto, INewPhoto} from "../types/Types.ts";
import PhotoCard from "../components/PhotoCard.tsx";

export default function Home() : ReactNode {

    const [photos, setPhotos] = useState<IHomePhoto[]>([]);

    const fetchPhotos = async () => {

        const params : RequestInit = {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        };
        const serverUrl = import.meta.env.VITE_SERVER_URL;
        const newPhotoUrl = serverUrl + "/photos";

        try {
            const result = await fetch(newPhotoUrl, params);
            if(!result.ok) {
                // return div "server down";
                console.log("Error getting photos.");
            } else {
                const data = await result.json();
                console.log(data);
                setPhotos(data["photos"]);
            }
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchPhotos().catch((error) => console.error(error));
    }, []);

    return (
        <div className={"grid grid-cols-5 gap-4 w-full p-4 bg-red-400"}>
            {photos &&
                photos.map((photo) => (
                    <PhotoCard
                        url={photo.url}
                        title={photo.title}
                        date_taken={photo.date_taken}
                        location={photo.location}
                        camera={photo.camera}/>
                ))
            }
        </div>
    )
}