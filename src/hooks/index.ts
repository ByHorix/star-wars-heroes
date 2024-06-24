// Types imports
import {Film, Hero, Starship} from "@/types/swapiData";

// React hook import
import {useMemo} from "react";

// Utils imports
import {
    generateEdgesFilmsToStarships,
    generateEdgesHeroToFilms,
    generateFilmNodes, generateHeroNode,
    generateStarshipsNodes
} from "@/utills";

// Hook takes object with heroData, list of films for hero, list of starships for hero to show in card details,
// generates necessary nodes and edges for using it in ReactFlow
// returns object with composed nodes and edges lists
export const useFlowData = (sourceData: {
    heroData: Hero,
    starships: Starship[],
    films: Film[]
}) => {
    const {heroData, films, starships} = sourceData;

    const heroNode = useMemo(() => generateHeroNode(heroData), [heroData]);
    const filmNodes = useMemo(() => generateFilmNodes(films), [films]);
    const starshipNodes = useMemo(() => generateStarshipsNodes(starships), [starships]);

    const nodes = [
        heroNode,
        ...filmNodes,
        ...starshipNodes
    ];

    const edges = [
        ...generateEdgesHeroToFilms(heroData.id, heroData.films),
        ...generateEdgesFilmsToStarships(starships)
    ]

    return {
        nodes,
        edges
    };
};