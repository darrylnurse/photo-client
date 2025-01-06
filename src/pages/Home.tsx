import {ReactNode, useEffect, useState} from "react";
import {IBasePhoto} from "../types/Types.ts";
import PhotoCard from "../components/PhotoCard.tsx";

export default function Home() : ReactNode {

    const [photos, setPhotos] = useState<IBasePhoto[]>([]);

    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const newPhotoUrl = serverUrl + "/photos";
    const params : RequestInit = {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    };

    const fetchPhotos = async () => {
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

    const recentUrl = localStorage.getItem("lastVisitedPhoto");

    return (
        <div
            className={"w-full relative"}
        >
            <div
                style={{
                    backgroundImage: `url(${recentUrl})`,
                    backgroundColor: "white",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundBlendMode: "difference",
                    filter: "blur(1rem)"
                }}
                className={"w-full h-full absolute z-[1]"}
            >
            </div>
            <div className={"grid grid-cols-5 p-8 gap-8 relative z-[1]"}>
                {photos && (photos.length >= 1 ?
                        photos.map((photo) => (
                            <PhotoCard
                                url={photo.url}
                                title={photo.title}
                                date_taken={photo.date_taken}
                                location={photo.location}
                                slug={photo.slug}/>
                        )) :
                        (
                            <div className={"font-bold text-3xl flex justify-center items-center col-span-full"}>
                                No photos to show. &lt;/3
                            </div>
                        )
                )}
            </div>

        </div>
    )
}