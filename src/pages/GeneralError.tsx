export default function GeneralError() {
    return (
        <div className={"w-full h-screen flex flex-col gap-[3rem] justify-center items-center"}>
            <p className={"text-2xl"}>Not sure what you were looking for!</p>
            <a className={"underline hover:scale-[105%] active:scale-[95%]"} href={"/"}>Let's get outta here...</a>
        </div>
    )
}