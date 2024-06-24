import axios from 'axios';
import {Film, Hero, Starship} from "@/types/swapiData";
import {swApi} from "@/axios";

// Fetching heroes list
// Argument - page: number (default value is 1)
// returns 10 items of heroes for page or an empty array if no results for the selected page
export const fetchHeroes = async (page: number = 1) => {
    try {
        const response = await swApi.get(
            '/people',
            {params: {page}}
        );

        return response.data.results as Hero[];
    } catch (error) {
        // status code 404 means that there is no heroes for current page
        if (axios.isAxiosError(error) && error.response?.status === 404) {

            return [];
        }

        throw error;
    }
};

// Fetching films list by filmsIds
// Argument: array of films ids from heroData
// Returns: array of films with specified ids
const fetchFilmsByIds = async (filmIds: number[]): Promise<Film[]> => {
    const response = await swApi.get(
        '/films',
        {
            params: {
                id__in: filmIds.join(',')
            }
        }
    );

    return response.data.results;
};

// Fetching starships list by starshipsIds
// Argument: array of starships ids from heroData
// Returns: array of starships with specified ids
const fetchStarshipsByIds = async (filterIds: number[]): Promise<Starship[]> => {
    const response = await swApi.get(
        '/starships',
        {
            params: {
                id__in: filterIds.join(',')
            }
        }
    );

    return response.data.results;
};

// Function gets the heroData and returns an object with films list and starships list for the current hero
// Argument: heroData - object containing hero's data
// Returns: an object containing arrays of films and starships associated with the hero
export const getFilmsAndStarshipsForHero = async (heroData: Hero) => {
    const [films, starships] = await Promise.all([
        fetchFilmsByIds(heroData.films),
        fetchStarshipsByIds(heroData.starships)
    ]);

    return {films, starships};
};
