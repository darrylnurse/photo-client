import {Outlet, useNavigate} from "react-router";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {createContext, useEffect, useState} from "react";
import CameraImage from "./components/CameraImage.tsx";
import getCameraImage from "./helpers/GetCameraImage.ts";
import {ICameraContext, IAuthContext} from "./types/Contexts.ts";

// eslint-disable-next-line react-refresh/only-export-components
export const CameraContext = createContext<ICameraContext>({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    currentCamera: "", setCurrentCamera(_value: ((prevState: string) => string) | string): void {
    }
});
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<IAuthContext>({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    authorized: false, setAuthorized(_value: ((prevState: boolean) => boolean) | boolean): void {
    }

});

function Root() {

    const [currentCamera, setCurrentCamera] = useState<string>("All");
    const [authorized, setAuthorized] = useState<boolean>(false);

    const navigate = useNavigate();
    const headerString = "OMENCLATE";

    const [cameras, setCameras] = useState([]);

    const rootUrl = import.meta.env.VITE_SERVER_URL;
    const params : RequestInit = {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    };

    const fetchCameras = async () => {
        try {
            const result = await fetch(rootUrl, params);
            if(!result.ok) {
                // return div "server down";
                console.log("Error getting photos.");
            } else {
                const data = await result.json();
                setCameras(data["cameras"]);
            }
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchCameras().catch((error) => console.error(error));
    }, []);

    return (
        <CameraContext.Provider value={{currentCamera, setCurrentCamera}}>
            <AuthContext.Provider value={{authorized, setAuthorized}}>
                <div className={"min-h-screen w-full"}>
                    <header className={"page-header h-[15vh] grid grid-cols-5 w-full p-3 text-center items-center"}>
                        <div className={"h-full flex justify-center items-center"}>
                            <button
                                onClick={() => {
                                    navigate('/');
                                    setCurrentCamera("All");
                                }}
                                tabIndex={0}
                                type={"button"}
                                className={"page-logo gap-2 flex flex-row items-center cursor-pointer"}
                            >
                                <LazyLoadImage
                                    src={"/photo-logo.svg"}
                                    alt={"photo-logo"}
                                    className={"photo-logo h-[1rem] lg:h-[2rem]"}
                                />
                                <div className={"tracking-[0.1rem] font-bold text-md lg:text-3xl text-nowrap"}>
                                    {Array.from(headerString).map((char, index) => (
                                        <div key={index} className={"hover:translate-y-[-5px] inline-block transition-transform"}>
                                            {char}
                                        </div>
                                    ))}
                                </div>
                            </button>
                        </div>
                        <nav className={"col-span-3 h-full text-sm flex gap-[3rem] justify-center items-center"}>
                            {cameras && cameras.map(({ camera }, index) => {
                               return (
                                   <CameraImage
                                        url={getCameraImage(camera) || "/default.svg"}
                                        name={camera}
                                        key={index}
                                   />
                               )
                            })}
                        </nav>
                        <div className={"h-full flex justify-center items-center"}>
                            <a href={authorized ? "/new-photo" : "/login"} className={"font-bold text-md lg:text-2xl px-1"}>ADMIN</a>
                        </div>
                    </header>
                    <div className={"min-h-[85vh] scroll-auto bg-black flex"}>
                        <Outlet/>
                    </div>
                </div>
            </AuthContext.Provider>
        </CameraContext.Provider>
      )
}

export default Root
