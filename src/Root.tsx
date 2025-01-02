import {Outlet} from "react-router";

function Root() {
  return (
    <div className={"h-screen bg-teal-100"}>
        <header className={"h-[10%]"}>
            Hi
        </header>
        <div className={"h-[90%] bg-red-200 flex justify-center items-center"}>
            <Outlet/>
        </div>
    </div>
  )
}

export default Root
