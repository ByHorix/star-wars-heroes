// Imports for styling
import "./styles.css";
import cn from "classnames";

// Types imports
import {Film, Starship} from "@/types/swapiData";
import {HeroDetailsCardProps} from "@/types/props";

// React imports
import {useEffect, useMemo, useState} from "react";

// Service & utils imports
import {getFilmsAndStarshipsForHero} from "@/services/swapi";
import {calculateFlowHeight} from "@/utills";
import {useFlowData} from "@/hooks";

// Composition components imports
import {HeroNode} from "@/components/pages/heroes/HeroesList/HeroCard/flow/nodes/HeroNode";
import {FilmNode} from "@/components/pages/heroes/HeroesList/HeroCard/flow/nodes/FilmNode";
import {StarshipNode} from "@/components/pages/heroes/HeroesList/HeroCard/flow/nodes/StarshipNode";
import Image from "next/image";

// React Flow imports
import {ReactFlow} from "reactflow";
import 'reactflow/dist/style.css';

export const HeroDetailsCard = ({heroData, open, close, setFlowContainerHeight, flowContainerHeight}: HeroDetailsCardProps) => {
    // State for current films list
    const [filmsData, setFilmsData] = useState<Film[]>([]);
    // State for current starships list
    const [starshipsData, setStarshipsData] = useState<Starship[]>([]);
    // State to track when loading is going
    const [isLoading, setIsLoading] = useState(false);
    // State to track is data was loaded
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Effect to load current data only if details card is open and data is not loaded yet
    useEffect(() => {
        // Data is loaded only when the card is open and not already loaded.
        // The card is always present, but there is no need to send the necessary requests immediately.
        // Fetching is going only when the card is opened and don't fetch again if the required data has already been loaded.
        if (open && !isLoaded) {
            setIsLoading(true);

            // Fetch films and starships data for the hero
            getFilmsAndStarshipsForHero(heroData)
                .then(({films, starships}) => {
                    setFilmsData(films);
                    setStarshipsData(starships);
                })
                .then(() => {
                    setIsLoaded(true);
                })
                .catch((err) => {
                    setError(err);
                })
                .finally(() => setIsLoading(false));
        }
    }, [heroData, open, isLoaded]);

    // Effect to calculate height for ReactFlow component and set same height for parent container when data was loaded
    useEffect(() => {
        if (isLoaded) {
            setFlowContainerHeight(
                calculateFlowHeight({
                    filmsCount: filmsData.length, starshipsCount: starshipsData.length
                })
            );
        }
    }, [isLoaded, filmsData, starshipsData]);

    // Memoized node types for ReactFlow component
    const nodeTypes = useMemo(() => ({
        heroNode: HeroNode,
        filmNode: FilmNode,
        starshipNode: StarshipNode
    }), []);

    // Hook generates lists of nodes and edges for ReactFlow component
    const {nodes, edges} = useFlowData({heroData, starships: starshipsData, films: filmsData});

    return (
        <div className={cn(
            "hero-details-card",
            {
                loading: isLoading,
                open,
            }
        )} style={{ height: `${flowContainerHeight}px` }}>
            {/* Close icon */}
            <Image
                src="/close-icon.png"
                alt="close-icon"
                className="close-icon"
                width={20}
                height={20}
                onClick={close}
            />
            <div className="hero-details-card__flow-wrapper">
                {isLoaded && open && <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    preventScrolling={false}
                    nodeTypes={nodeTypes}
                    className="hero-details-card__flow"
                />}
            </div>
        </div>
    );
};