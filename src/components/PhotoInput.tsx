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

    return (
        <div className={"flex justify-center flex-col items-center"}>
            <label htmlFor={name}>
                {formalizeName(String(name) || "")}
            </label>
            {name === "iso" ? (
                <input
                    type={"number"}
                    step={"100"}
                    name={name}
                    value={value[name]}
                    onChange={handleChange}
                    className={"p-2 rounded-md"}
                    autoComplete={"off"}
                />
            ) : (
                <input
                    type={"text"}
                    name={name}
                    value={value[name]}
                    onChange={handleChange}
                    className={"p-2 rounded-md"}
                    autoComplete={"off"}
                />
            )}
        </div>
    )
}