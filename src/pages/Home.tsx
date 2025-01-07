import {ReactNode, useEffect, useRef, useState} from "react";
import {IBasePhoto} from "../types/Types.ts";
import PhotoCard from "../components/PhotoCard.tsx";

export default function Home() : ReactNode {

    const [photos, setPhotos] = useState<IBasePhoto[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchVisible, setSearchVisible] = useState<boolean>(false);
    const [searchClickedOnce, setSearchClickedOnce] = useState(false); // this needs to burn
    const [fetchSuccess, setFetchSuccess] = useState(true);

    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const homeUrl = serverUrl + "/photos";
    const params : RequestInit = {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    };

    const fetchPhotos = async () => {
        try {
            const result = await fetch(homeUrl, params);
            if(result.ok) {
                const data = await result.json();
                console.log(data);
                setPhotos(data["photos"]);
            }
        } catch(error) {
            console.error(error);
            setFetchSuccess(false);
        }
    }

    useEffect(() => {
        fetchPhotos().catch((error) => console.error(error));
    }, []);

    const handleSearch = (event) => {
        const {value} = event.target;
        setSearchValue(value);
    }

    const searchRef = useRef(null);

    const recentUrl = localStorage.getItem("lastVisitedPhoto");

    if(!fetchSuccess) {
        return (
            <div className={"text-white w-full gap-8 bg-blue-500 h-[85vh] flex flex-col justify-center items-center text-4xl"}>
                <div className={"text-9xl"}>:(</div>
                The server seems to be down.
            </div>
        )
    }

    return (
        <div
            className={"w-full relative"}
        >
            <div
                style={{
                    backgroundImage: `url(${recentUrl})`,
                    backgroundColor: "black",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(1rem) brightness(50%)"
                }}
                className={"w-full h-full absolute z-[1]"}
            >
            </div>
            <div className={"p-8 relative grid grid-cols-3 z-[1] w-full"}>
                <div className={"flex items-center"}>
                    <div
                        className={"outline-white p-1"}
                        tabIndex={0}
                        onClick={() => {
                            setSearchVisible(!searchVisible)
                            searchRef.current.focus()
                            setSearchClickedOnce(true)
                            setSearchValue("")
                        }}
                    >
                        <img
                            src={"/search.svg"}
                            className={`${searchClickedOnce ? (searchVisible ? "search-spin-left" : "search-spin-right") : ""} h-[2rem] cursor-pointer hover:scale-[105%] active:scale-[95%]`}
                            alt={"clear-search"}

                        />
                    </div>

                </div>
                <div
                    className={`${searchVisible ? "" : "pointer-events-none"} ${searchVisible ? "search-box-left" : "search-box-right"} absolute top-[2rem] flex gap-3 items-center`}
                    style={{
                        opacity: searchVisible ? 1 : 0,
                        transition: "opacity ease 0.75s"
                }}
                >
                    <input
                        value={searchValue}
                        onChange={handleSearch}
                        className={"p-2 rounded-lg"}
                        ref={searchRef}
                    />
                    <button
                        onClick={() => setSearchValue("")}
                        className={"cursor-pointer outline-white p-1 hover:scale-[105%] active:scale-[95%]"}
                        tabIndex={0}
                    >
                        <img
                            src={"/x.svg"}
                            className={"h-[1rem]"}
                            alt={"clear-search"}
                        />
                    </button>
                </div>

            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 p-[5rem] pt-[1rem] gap-6 gap-y-12 relative z-[1]"}>
                {photos && (photos.length >= 1 ?
                        photos
                            .filter((photo) => photo.title.toLowerCase().includes(searchValue))
                            .sort((photo1, photo2) => {
                                return new Date(photo2.date_taken) - new Date(photo1.date_taken)
                                // implement toggle sort, find good icons
                            })
                            .map((photo, index) => (
                                    <PhotoCard
                                        url={photo.url}
                                        title={photo.title}
                                        date_taken={photo.date_taken}
                                        location={photo.location}
                                        slug={photo.slug}
                                        key={index}
                                    />
                                )
                            ) :
                        (
                            <div className={"font-bold rounded-xl bg-gray-100 text-black text-3xl flex justify-center items-center col-span-full"}>
                                {/*Gimme a minute. &lt;/3*/}
                            </div>
                        )
                )}
            </div>
        </div>
    )
}