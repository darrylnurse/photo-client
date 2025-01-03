import {IHomePhoto} from "../types/Types.ts";

export default function PhotoCard({url, title, date_taken, location, camera, slug} : IHomePhoto) {
    return (
        <div className={"bg-teal-100 overflow-hidden h-1/2 rounded-xl"}>
            <div className={"h-[60%] w-full flex justify-center items-center"}>
                <img
                    alt={slug}
                    src={url}
                    className={"h-full"}
                />
            </div>
            <div className={"h-[40%] px-4 flex bg-emerald-300 flex-col justify-center"}>
                <h1>Title: {title}</h1>
                <p>Camera: {camera}</p>
                <p>Location: {location}</p>
                <p>Date Taken: {date_taken}</p>
            </div>
        </div>
    )
}