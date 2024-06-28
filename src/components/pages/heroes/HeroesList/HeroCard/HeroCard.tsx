"use client";

// Styles import
import "./styles.css";
import cn from "classnames";

// Type import
import {Hero} from "@/types/swapiData";

// React imports
import {useEffect, useRef, useState} from "react";

// Composition components imports
import {HeroDetailsCard} from "@/components/pages/heroes/HeroesList/HeroCard/HeroDetailsCard/HeroDetailsCard";
import {HeroPreviewCard} from "@/components/pages/heroes/HeroesList/HeroCard/HeroPreviewCard/HeroPreviewCard";

export const HeroCard = ({heroData}: {heroData: Hero}) => {
    // State to switch view between HeroDetails and HeroPreview card parts
    const [extended, setExtended] = useState(false);
    // State to track the height of HeroDetailsCard
    // Different details cards has different height
    const [heroDetailsCardHeight, setHeroDetailsCardHeight] = useState(100);

    // Create ref for change component's height with transition
    const heroCardContainerRef = useRef<HTMLDivElement>(null);

    // Switch extended state to "true" if it's currently false
    const expandCard = () => {
        if (!extended) {
            setExtended(true);
        }
    };

    // Switch extended state to "false" if it's currently true
    const collapseCard = () => {
        if (extended) {
            setExtended(false);
        }
    };

    // Set container height to HeroPreviewCard's height on the first render
    useEffect(() => {
        if (heroCardContainerRef.current) {
            setHeroDetailsCardHeight(heroCardContainerRef.current?.children[0].clientHeight);
        }
    }, []);

    // Update container height based on current view when "extended" state changes
    useEffect(() => {
        if (heroCardContainerRef.current) {
            // Determine the current height: HeroPreview or HeroDetails Card
            const actualHeight = extended
                ? heroDetailsCardHeight
                : heroCardContainerRef.current.children[0].clientHeight;

            heroCardContainerRef.current.style.height = `${actualHeight}px`; // Set the calculated height to the HeroCard component
        }
    }, [heroDetailsCardHeight, extended]);

    return (
        <div
            ref={heroCardContainerRef}
            className={cn(
                "hero-card",
                {extended}
            )}
            onClick={expandCard}
            data-testid={`hero-card-${heroData.name}`}
        >
            {!extended && <HeroPreviewCard heroData={heroData}/>}
            <HeroDetailsCard
                heroData={heroData}
                open={extended}
                close={collapseCard}
                flowContainerHeight={heroDetailsCardHeight}
                setFlowContainerHeight={setHeroDetailsCardHeight}
            />
        </div>
    )
};
