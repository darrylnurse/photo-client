import {Outlet, useNavigate} from "react-router";

function Root() {

    const navigate = useNavigate();

    const headerString = "OMENCLATE";

    return (
        <div className={"min-h-screen bg-teal-100"}>
            <header className={"h-[15vh] grid grid-cols-5 w-full text-center items-center"}>
                <h1 className={"bg-red-400 h-full flex justify-center items-center font-bold text-3xl cursor-pointer tracking-[0.25rem]"} onClick={() => navigate('/')}>
                    <img
                        src={"/photo-logo.svg"}
                        alt={"photo-logo"}
                        className={"photo-logo h-[4rem]"}
                    />
                    {Array.from(headerString).map((char) => (
                        <div className={"hover-letter inline-block transition-transform"}>
                            {char}
                        </div>
                    ))}
                </h1>
                <nav className={"bg-blue-500 col-span-3 h-full flex justify-center items-center"}>
                    cameras
                </nav>
                <div className={"bg-amber-100 h-full flex justify-center items-center"}>
                    admin
                </div>
            </header>
            <div className={"min-h-[85vh] scroll-auto bg-black flex"}>
                <Outlet/>
            </div>
        </div>
      )
}

export default Root
