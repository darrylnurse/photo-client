import {IBasePhoto} from "../types/Types.ts";
import {useNavigate} from "react-router";

export default function PhotoCard( {url, title, date_taken, location, slug } : IBasePhoto) {
    const navigate = useNavigate();
    return (
        <div
            className={"photo-card relative hover:translate-y-[-0.5rem] cursor-pointer overflow-hidden w-[300px] h-[400px] rounded-xl"}
            onClick={() => navigate(`photo-details/${slug}`)}
        >
            <div className={"absolute w-full h-full pointer-events-none z-[1] photo-inner-shadow"}/>
            <div
                className={"h-[60%] w-full flex relative z-0 justify-center items-center"}
                style={{
                    backgroundImage: `url(${url})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            />
            <div className={"h-[40%] px-4 relative z-0 leading-5 flex bg-white flex-col justify-center"}>
                <h1 className={"font-bold text-xl"}>{title}</h1>
                <p>Taken In: {location}</p>
                <p>Taken On: {date_taken}</p>
            </div>
        </div>
    )
}