// Styles import
import "./styles.css";

// Type import
import {Film} from "@/types/swapiData";

// React Flow imports
import {Handle, NodeProps, Position} from "reactflow";

type FilmNodeProps = {
    filmData: Film
}

export const FilmNode = (props: NodeProps<FilmNodeProps>) => {
    return (
        <>
            <Handle type={'target'} position={Position.Left}/>
            <div className="node">
                <span className="node__label">Film</span>
                <p className="node__content">{props.data.filmData.title}</p>
            </div>
            <Handle type={'source'} position={Position.Right}/>
        </>
    );
};