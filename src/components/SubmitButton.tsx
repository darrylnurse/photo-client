import {ReactNode} from "react";

export default function SubmitButton({ onClick, value}) : ReactNode {
    return (
        <button
            type={"submit"}
            className={`bg-red-300 px-6 py-2 rounded-md`}
            onClick={onClick}
        >
            {value}
        </button>
    )
}