// Styles import
import "./styles.css";

// Type import
import {TitleProps} from "@/types/props";

export const Title = ({children}: TitleProps) => {
    return (
        <h1 className="title">{children}</h1>
    );
};
