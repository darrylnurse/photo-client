import {Outlet} from "react-router";

function Root() {
  return (
    <div className={"min-h-screen bg-teal-100"}>
        <header className={"h-[7.5vh]"}>
            Hi
        </header>
        <div className={"h-[92.5vh] scroll-auto bg-red-200 flex"}>
            <Outlet/>
        </div>
    </div>
  )
}

export default Root
