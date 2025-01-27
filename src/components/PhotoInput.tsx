import {ReactNode} from "react";

export default function PhotoInput({ name, value, setValue }) : ReactNode {
    const handleChange = (event) => {
        const { value } = event.target;
        setValue((prev) => ({
            ...prev,
            [name]: name === "iso" ? parseInt(value) : value
        }))
    }
    
    const formalizeName = (name : string): string => {
        if(!name) return "";
        const newName = name.slice();
        //newName[0] = newName[0].toUpperCase();
        return newName.replace('_', ' ');
    }

    const getPlaceHolder = (property : string) : string => {
        switch (property) {
            case "date_taken":
                return "July 14, 1998";
            case "location":
                return "Jamaica, NYC"
            case "focal_length":
                return "Xmm";
            case "aperture":
                return "f/X.0";
            case "shutter_speed":
                return "1/X00 sec";
            default:
                return "";
        }
    }

    return (
        <div className={"flex gap-5 flex-row items-center w-full"}>
            <label htmlFor={name} className={"font-bold text-2xl justify-self-start"}>
                {formalizeName(String(name) || "")}
            </label>
            {name === "iso" ? (
                <input
                    type={"number"}
                    step={"100"}
                    name={name}
                    value={value[name]}
                    onChange={handleChange}
                    className={"light-inner-shadow p-2 rounded-md justify-self-stretch flex-1"}
                    autoComplete={"off"}
                />
            ) : (
                <input
                    type={"text"}
                    name={name}
                    value={value[name]}
                    onChange={handleChange}
                    className={"light-inner-shadow p-2 rounded-md justify-self-stretch flex-1"}
                    autoComplete={"off"}
                    placeholder={getPlaceHolder(name)}
                />
            )}
        </div>
    )
}