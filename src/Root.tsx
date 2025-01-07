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
                <h1 className={"h-full flex justify-center items-center font-bold text-3xl cursor-pointer tracking-[0.1rem]"} onClick={() => navigate('/')}>
                    <LazyLoadImage
                        src={"/photo-logo.svg"}
                        alt={"photo-logo"}
                        className={"photo-logo h-[4rem]"}
                    />
                    {Array.from(headerString).map((char, index) => (
                        <div key={index} className={"hover:translate-y-[-5px] inline-block transition-transform"}>
                            {char}
                        </div>
                    ))}
                </h1>
                <nav className={"col-span-3 h-full font-bold flex justify-center items-center"}>
                    CAMERAS
                </nav>
                <div className={"h-full flex justify-center items-center"}>
                    <a href={"/new-photo"} className={"font-bold"}>ADMIN</a>
                </div>
            </header>
            <div className={"min-h-[85vh] scroll-auto bg-black flex"}>
                <Outlet/>
            </div>
        </div>
      )
}

export default Root
