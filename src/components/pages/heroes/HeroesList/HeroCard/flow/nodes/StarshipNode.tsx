// Styles import
import "./styles.css";

// Type import
import {Starship} from "@/types/swapiData";

// React Flow imports
import {Handle, NodeProps, Position} from "reactflow";

type StarshipNodeProps = {
    starshipData: Starship
}

export const StarshipNode = (props: NodeProps<StarshipNodeProps>) => {
    return (
        <>
            <Handle type={"target"} position={Position.Left}/>
            <div className="node">
                <span className="node__label">Starship</span>
                <p className="node__content">{props.data.starshipData.name}</p>
            </div>
        </>
    );
};
