// Styles import
import "./styles.css";

// Type import
import {Hero} from "@/types/swapiData";

export const HeroPreviewCard = ({heroData}: {heroData: Hero}) => {
    return (<div className="hero-preview-card" data-testid={`hero-preview-card-${heroData.name}`}>
        <h4>Name: {heroData.name}</h4>
        <h4>Gender: {heroData.gender}</h4>
    </div>);
};
