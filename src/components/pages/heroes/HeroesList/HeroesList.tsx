"use client";

// Styles import
import "./styles.css";

// React imports
import {useCallback, useEffect, useState} from "react";

// Import hook for implementing infinite scroll
import {useInView} from "react-intersection-observer";

// API service import
import {fetchHeroes} from "@/services/swapi";

// Composition components imports
import {HeroCard} from "@/components/pages/heroes/HeroesList/HeroCard/HeroCard";
import {HeroPreviewSkeleton} from "@/components/pages/heroes/HeroesList/HeroCard/HeroPreviewCard/HeroPreviewSkeleton";
import {Hero} from "@/types/swapiData";

export const HeroesList = ({initialHeroesList}: {initialHeroesList: any[]}) => {
    // array of heroes to render
    const [heroes, setHeroes] = useState<Hero[]>(initialHeroesList);
    // page for paginated fetching for new items of heroes list
    const [page, setPage] = useState(1);
    // pagesEnded === true, when all heroes in heroes list are already fetched
    const [pagesEnded, setPagesEnded] = useState(false);

    // Hook to detect when the element is in view
    const { ref, inView } = useInView();

    // Function to load more heroes when user scrolls to the bottom
    const loadMoreHeroes = useCallback(async () => {
        if (!pagesEnded) {
            const nextPage = page + 1;
            const heroes = await fetchHeroes(nextPage);

            if (heroes?.length > 0) {
                setPage(nextPage); // Update the page number
                setHeroes((prev) => [...prev, ...heroes]); // Add new heroes to the list
            } else {
                setPagesEnded(true); // Set pagesEnded to true if no more heroes are fetched
            }
        }
    }, [page, pagesEnded]);

    // Effect to load more heroes when the element is in view
    useEffect(() => {
        const timerId = setTimeout(() => {
            if (inView) {
                loadMoreHeroes().catch((err) => console.log(err)); // Load more heroes when inView is true
            }
        }, 500); // Delay to prevent too frequent calls

        return () => {clearTimeout(timerId)} // Clean up the timer

    }, [inView, loadMoreHeroes]);

    return (
        <div className="heroes-list">
            {heroes.map((hero, index) => (<HeroCard key={hero.id} heroData={hero}/>))}
            <HeroPreviewSkeleton ref={ref} hidden={pagesEnded}/>
        </div>
    );
};
