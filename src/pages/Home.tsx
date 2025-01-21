import {ReactNode, useContext, useEffect, useRef, useState} from "react";
import {IBasePhoto} from "../types/Types.ts";
import PhotoCard from "../components/PhotoCard.tsx";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {CameraContext} from "../Root.tsx";

export default function Home() : ReactNode {

    const { currentCamera } = useContext(CameraContext);

    const [photos, setPhotos] = useState<IBasePhoto[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchVisible, setSearchVisible] = useState<boolean>(false);
    const [searchClickedOnce, setSearchClickedOnce] = useState<boolean>(false); // this needs to burn
    const [fetchSuccess, setFetchSuccess] = useState<boolean>(true);
    const [sortNewest, setSortNewest] = useState<boolean>(true);
    const [dateSortedOnce, setDateSortedOnce] = useState<boolean>(false); // combust

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
            <LazyLoadImage
                src={recentUrl}
                alt={"main-background"}
                className={"w-full main-background h-full absolute z-[1]"}
            />
            <div className={"p-8 relative grid grid-cols-3 z-[1] w-full"}>
                <div className={"flex items-center"}>
                    <button
                        className={"outline-white sort-button rounded-[50%] p-3"}
                        tabIndex={0}
                        onClick={() => {
                            setSearchVisible(!searchVisible)
                            if(searchRef) searchRef.current.focus()
                            setSearchClickedOnce(true)
                            setSearchValue("")
                        }}
                        type={"button"}
                    >
                        <LazyLoadImage
                            src={"/search.svg"}
                            className={`${searchClickedOnce ? (searchVisible ? "search-spin-left" : "search-spin-right") : ""} h-[2rem] cursor-pointer hover:scale-[105%] active:scale-[95%]`}
                            alt={"search-image"}
                        />
                    </button>
                </div>

                <div
                    className={`${searchVisible ? "" : "pointer-events-none"} ${searchVisible ? "search-box-left" : "search-box-right"} absolute top-[2.5rem] flex gap-3 items-center`}
                    style={{
                        opacity: searchVisible ? 1 : 0,
                        transition: "opacity ease 0.75s"
                    }}
                >
                    <input
                        value={searchValue}
                        onChange={handleSearch}
                        className={"p-2 rounded-lg sort-button outline-white"}
                        ref={searchRef}
                        tabIndex={searchVisible ? 0 : -1}
                    />
                    <button
                        onClick={() => setSearchValue("")}
                        className={"cursor-pointer sort-button rounded-[50%] outline-white p-2 hover:scale-[105%] active:scale-[95%]"}
                        tabIndex={searchVisible ? 0 : -1}
                    >
                        <img
                            src={"/x.svg"}
                            className={"h-[1rem]"}
                            alt={"clear-search"}
                        />
                    </button>
                </div>

                <div className={"col-start-3 flex p-2 justify-end"}>
                    <button
                        className={"outline-white sort-button p-2 flex justify-center relative items-center border-[0.3rem] rounded-[50%] aspect-square border-white"}
                        tabIndex={0}
                        onClick={() => {
                            setDateSortedOnce(true);
                            setSortNewest(!sortNewest);
                        }}
                        type={"button"}
                    >
                        <LazyLoadImage
                            src={"/pin.svg"}
                            className={`${dateSortedOnce ? (sortNewest ? "search-spin-left" : "search-spin-right") : ""} relative top-[0.5rem] pin h-[1rem] cursor-pointer hover:scale-[105%] active:scale-[95%]`}
                            alt={"change-date"}
                        />
                    </button>
                </div>

            </div>
            <div
                className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-[5rem] pt-[1rem] gap-6 gap-y-12 relative z-[1]"}>
                {photos && photos
                    .filter((photo) => currentCamera === "All" ? true : photo.camera === currentCamera)
                    .filter((photo) => photo.title.toLowerCase().includes(searchValue))
                    .sort((photo1, photo2) => {
                        if(sortNewest) return new Date(photo2.date_taken) - new Date(photo1.date_taken);
                        else return new Date(photo1.date_taken) - new Date(photo2.date_taken);
                    })
                    .map((photo, index) => (
                        <PhotoCard
                            url={photo.url}
                            title={photo.title}
                            date_taken={photo.date_taken}
                            location={photo.location}
                            slug={photo.slug}
                            order={index}
                            key={index}
                            camera={photo.camera}
                        />
                    ))
                }
            </div>
        </div>
    )
}