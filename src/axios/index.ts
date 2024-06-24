import {setupCache} from "axios-cache-adapter";
import axios from "axios";

// Creating cache instance
export const cache = setupCache({
    maxAge: 60 * 60 * 1000 // Caching for one hour
});

// Creating axios instance for SWAPI with caching and base URL
export const swApi = axios.create({
    baseURL: 'https://sw-api.starnavi.io',
    adapter: cache.adapter
});
