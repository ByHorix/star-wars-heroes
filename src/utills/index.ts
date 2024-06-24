import {Film, Hero, Starship} from "@/types/swapiData";
import {Node, Position} from 'reactflow';
import {xMinValue, xPositionFilms, xPositionStarships, yOffset, yMinValue} from "@/config/flow.config";
import {Edge} from "@reactflow/core";

// Function gets object with hero data and converts it to node data for using it in ReactFlow
export const generateHeroNode = (heroData: Hero): Node => ({
    id: `hero-${heroData.id}`,
    type: 'heroNode',
    position: {
        x: xMinValue,
        y: yMinValue
    },
    data: {heroData},
});

// Function gets array of objects with films data and converts it to array of nodes data for using it in ReactFlow
export const generateFilmNodes = (films: Film[]): Node[] => {
    return films.map((film: Film, index) => ({
        id: `film-${film.id}`,
        data: {filmData: film},
        type: 'filmNode',
        position: {
            x: xPositionFilms,
            y: yMinValue + index * yOffset
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        resizable: false,
        deletable: false,
        focusable: false,
    }));
};

// Function gets array of objects with starships data and converts it to array of nodes data for using it in ReactFlow
export const generateStarshipsNodes = (starships: Starship[]): Node[] => {
    return starships.map((starship, index) => ({
        id: `starship-${starship.id}`,
        data: {starshipData: starship},
        position: {
            x: xPositionStarships,
            y: yMinValue + index * yOffset
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        type: 'starshipNode'
    }));
};

// Function gets heroId and array of films ids and then converts it to array of edges data for using it in ReactFlow
// Builds connections between a current hero and the films in which that hero appears,
// to display the relationships between nodes in the ReactFlow component.
// Arguments: heroId - id of current hero in ReactFlow, filmIds - array of film ids for current hero
// Returns: array of edges with relations between current hero and films
export const generateEdgesHeroToFilms = (heroId: number, filmIds: number[]): Edge[] => {
    return filmIds.map((filmId) => ({
        id: `hero-${heroId}-film-${filmId}`,
        source: `hero-${heroId}`,
        target: `film-${filmId}`,
        type: 'default'
    }));
};

// Function gets array of starships data and then converts it to array of edges data for using it in ReactFlow
// Builds connections between starships and films in which these starships appear,
// to display relationships between nodes in the ReactFlow component
// Argument: starshipsData - array of starships
// Returns: array of edges with relations between films and starships
export const generateEdgesFilmsToStarships = (starshipsData: Starship[]): Edge[] => {
    return starshipsData.reduce((acc, starshipData) => {
        const filmsEdgesForStarship = starshipData.films.map((filmId) => ({
            id: `film-${filmId}-starship-${starshipData.id}`,
            source: `film-${filmId}`,
            target: `starship-${starshipData.id}`,
            type: 'default'
        }));

        return [...acc, ...filmsEdgesForStarship]
    }, [] as Edge[]);
};

// Function gets an object with counts of films and starships, finds max count value of that,
// calculates total height for ReactFlow component
export const calculateFlowHeight = (
    {filmsCount, starshipsCount}: {
        filmsCount: number,
        starshipsCount: number
    }) => {

    // max count of items in the column
    const maxCount = Math.max(filmsCount, starshipsCount);

    const nodeHeight = 16 * 2; // 2rem

    // flowHeight:
    // (maxCount * node height) +
    // (maxCount - 1) * (distance between nodes = yOffset - nodeHeight) +
    // (top and bottom margins = yMinValue * 2)
    return maxCount * nodeHeight + ((maxCount - 1) * (yOffset - nodeHeight)) + (yMinValue * 2);
};
