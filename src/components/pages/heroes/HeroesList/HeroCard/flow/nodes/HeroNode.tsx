// Styles import
import "./styles.css";

// Type import
import {Hero} from "@/types/swapiData";

// React Flow imports
import {Handle, NodeProps, Position} from "reactflow";

type HeroNodeProps = {
    heroData: Hero
}

export const HeroNode = (props: NodeProps<HeroNodeProps>) => {
    return (
        <>
            <div className="node">
                <span className="node__label">Hero</span>
                <p className="node__content">{props.data.heroData.name}</p>
            </div>
            <Handle type="source" position={Position.Right}/>
        </>
    );
};
