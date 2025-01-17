import {IBasePhoto} from "../types/Types.ts";
import {useNavigate} from "react-router";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import resizeUrl from "../helpers/ResizeUrl.ts";

export default function PhotoCard( {url, title, date_taken, location, slug, order } : IBasePhoto) {
    const navigate = useNavigate();

    const resizedUrl = resizeUrl(url);

    return (
        <button
            className={`bg-black justify-self-center photo-card relative hover:translate-y-[-0.5rem] cursor-pointer overflow-hidden w-[300px] h-[400px] rounded-xl`}
            onClick={() => navigate(`photo-details/${slug}`)}
            tabIndex={0}
            type={"button"}
        >
            <div className={`z-[1] absolute w-full h-full pointer-events-none photo-inner-shadow`}/>
            <LazyLoadImage
                className={"photo-card-image h-[60%] w-full flex relative z-0 justify-center items-center"}
                src={resizedUrl || "/default.svg"}
                alt={"photo-card-image"}
                placeholder={<img
                    src={"/default.svg"}
                    alt={"placeholder-image"}
                />}
            />
            <div className={"h-[40%] px-4 relative z-0 leading-5 flex bg-white flex-col justify-center"}>
                <h1 className={"font-bold text-xl"}>{title}</h1>
                <p>Taken In: {location}</p>
                <p>Taken On: {date_taken}</p>
            </div>
        </button>
    )
}