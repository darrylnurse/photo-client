import {IBasePhoto} from "../types/Types.ts";

export default function PhotoCard( {url, title, date_taken, location, slug } : IBasePhoto) {
    return (
        <div className={"photo-outer-shadow relative overflow-hidden w-[300px] h-[400px] rounded-xl"}>
            <div className={"absolute w-full h-full pointer-events-none z-[1] photo-inner-shadow"}/>
            <div className={"h-[60%] w-full flex relative z-0 justify-center items-center"}>
                <img
                    alt={slug}
                    src={url}
                    className={"w-full h-full"}
                />
            </div>
            <div className={"h-[40%] px-4 relative z-0 leading-5 flex bg-white flex-col justify-center"}>
                <h1 className={"font-bold text-xl"}>{title}</h1>
                <p>Taken In: {location}</p>
                <p>Taken On: {date_taken}</p>
                <a
                    href={`photo-details/${slug}`}
                >See More</a>
            </div>
        </div>
    )
}