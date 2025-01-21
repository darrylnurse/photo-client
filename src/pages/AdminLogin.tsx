import {ReactNode, useContext, useState} from "react";
import {useNavigate} from "react-router";
import {AuthContext} from "../Root.tsx";
import {LazyLoadImage} from "react-lazy-load-image-component";

const adminUser = import.meta.env.VITE_ADMIN_USERNAME;
const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;

// maybe look into local storage for this.

export default function AdminLogin(): ReactNode {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {_, setAuthorized} = useContext(AuthContext);

    const navigate = useNavigate();

    const [adminCredentials, setAdminCredentials] = useState({
        username: "",
        password: ""
    });

    const handleCredentials = (event) => {
        const {value, name} = event.target;

        setAdminCredentials((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (event) => {

        event.preventDefault();

        if(!adminUser || !adminPass) {
            alert("Admin panel is not available.");
            return;
        }

        if(!adminCredentials.username || !adminCredentials.password) {
            alert("Please enter the username AND password.");
            return;
        }

        if(
            adminCredentials.username == adminUser &&
            adminCredentials.password == adminPass
        ) {
            navigate('/new-photo');
            setAuthorized(true);
        } else {
            alert("Incorrect credentials.");
            return;
        }
    }

    const inputStyle = "light-inner-shadow p-2 rounded-md";
    const divStyle = "flex flex-col gap-1 z-[1]";
    const labelStyle = "text-white font-bold pl-0 p-1 py-0 rounded-sm";

    const recentUrl = localStorage.getItem("lastVisitedPhoto");

    return (
        <form
            className={"w-full h-[85vh] relative flex gap-5 justify-center items-center flex-col bg-black"}
        >
            <LazyLoadImage
                src={recentUrl}
                alt={"main-background"}
                className={"w-full main-background h-full absolute z-[1]"}
            />
            <div className={divStyle}>
                <label
                    htmlFor={"username"}
                    className={labelStyle}
                >Username:</label>
                <input
                    type={"text"}
                    name={"username"}
                    onChange={handleCredentials}
                    value={adminCredentials["username"]}
                    autoComplete={"off"}
                    className={inputStyle}
                />
            </div>

            <div className={divStyle}>
                <label
                    htmlFor={"password"}
                    className={labelStyle}
                >Password:</label>
                <input
                    type={"password"}
                    name={"password"}
                    onChange={handleCredentials}
                    value={adminCredentials["password"]}
                    autoComplete={"off"}
                    className={inputStyle}
                />
            </div>

            <button
                type={"submit"}
                onClick={handleSubmit}
                className={"z-[1] font-bold light-inner-shadow bg-white rounded-md px-6 py-2 hover:scale-[105%] active:scale-[95%]"}
            >
                SUBMIT
            </button>

        </form>
    )
}