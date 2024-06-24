// TYpe import
import {ButtonProps} from "@/types/props";

// Styles import
import "./styles.css";

export const Button = ({onClick, children}: ButtonProps) => {
    return (
        <button onClick={onClick} className="btn">
            {children}
        </button>
    )
}