import {Outlet, useNavigate} from "react-router";
import {LazyLoadImage} from "react-lazy-load-image-component";

function Root() {

    const navigate = useNavigate();
    const headerString = "OMENCLATE";
    /* TODO:
        - use useContext to pass down currently selected Camera
        - make database route to get all unique camera types
        - maybe store pics for them in s3?
        - make s3 images load faster using cloudfront
    * */

    return (
        // gutter is annoying me... w-screen works but then creates a y-scrollbar
        <div className={"min-h-screen"}>
            <header className={"page-header h-[15vh] grid grid-cols-5 w-full text-center items-center"}>
                <div className={" h-full flex justify-center items-center"}>
                    <button
                        onClick={() => navigate('/')}
                        tabIndex={0}
                        type={"button"}
                        className={"page-logo gap-2 flex flex-row items-center cursor-pointer"}
                    >
                        <LazyLoadImage
                            src={"/photo-logo.svg"}
                            alt={"photo-logo"}
                            className={"photo-logo h-[2rem]"}
                        />
                        <div className={"tracking-[0.1rem]  font-bold text-3xl"}>
                            {Array.from(headerString).map((char, index) => (
                                <div key={index} className={"hover:translate-y-[-5px] inline-block transition-transform"}>
                                    {char}
                                </div>
                            ))}
                        </div>
                    </button>
                </div>
                <nav className={"col-span-3 h-full font-bold flex justify-center items-center"}>
                    CAMERAS
                </nav>
                <div className={"h-full flex justify-center items-center"}>
                    <a href={"/new-photo"} className={"font-bold text-2xl"}>ADMIN</a>
                </div>
            </header>
            <div className={"min-h-[85vh] scroll-auto bg-black flex"}>
                <Outlet/>
            </div>
        </div>
      )
}

export default Root
