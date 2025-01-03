export default function PhotoInput({ name, value, setValue }) {

    const handleChange = (event) => {
        setValue((prev) => ({
            ...prev,
            [name]: event.target.value
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
            <input
                name={name}
                value={value[name]}
                onChange={handleChange}
                className={"p-2 rounded-md"}
                autoComplete={"off"}
            />
        </div>
    )
}