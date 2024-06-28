import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Film, Hero, Starship } from "@/types/swapiData";
import { getFilmsAndStarshipsForHero } from "@/services/swapi";
import { HeroCard } from "@/components/pages/heroes/HeroesList/HeroCard/HeroCard";

const mockedHeroData: Hero = {
    id: 1,
    gender: 'male',
    films: [1, 2, 3, 6],
    starships: [12, 22],
    name: "Luke Skywalker"
};

const mockedFilmsData: Film[] = [
    { id: 1, title: "A New Hope" },
    { id: 2, title: "The Empire Strikes Back" },
    { id: 3, title: "Return of the Jedi" },
    { id: 4, title: "The Phantom Menace" },
    { id: 5, title: "Attack of the Clones" },
    { id: 6, title: "Revenge of the Sith" }
];

const mockedStarshipsData: Starship[] = [
    {
        id: 12,
        name: "X-wing",
        model: "T-65 X-wing",
        films: [1, 2, 3]
    },
    {
        id: 22,
        name: "Imperial shuttle",
        model: "Lambda-class T-4a shuttle",
        films: [2, 3]
    }
];

jest.mock("../../../../../../services/swapi", () => ({
    getFilmsAndStarshipsForHero: jest.fn()
}));

describe('HeroCard', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', async () => {
        render(<HeroCard heroData={mockedHeroData}/>);

        const heroCardElement = screen.getByTestId(`hero-card-${mockedHeroData.name}`);
        let previewHeroElement: HTMLElement | null = screen.getByTestId(`hero-preview-card-${mockedHeroData.name}`);
        const closeIconElement = screen.getByTestId("close-icon");

        (getFilmsAndStarshipsForHero as jest.Mock).mockResolvedValue({
            films: mockedFilmsData,
            starships: mockedStarshipsData
        });

        expect(heroCardElement).toContainElement(previewHeroElement);

        // Click to expand the card
        fireEvent.click(heroCardElement);

        // Wait for the preview card to disappear
        await waitFor(() => {
            expect(previewHeroElement).not.toBeInTheDocument();
        });

        // Click to collapse the card
        fireEvent.click(closeIconElement);

        // Wait for the preview card to be visible again
        await waitFor(() => {
            previewHeroElement = screen.getByTestId(`hero-preview-card-${mockedHeroData.name}`);
            expect(heroCardElement).toContainElement(previewHeroElement);
        });

        // Ensure the function was called only once
        fireEvent.click(heroCardElement);

        expect(getFilmsAndStarshipsForHero).toHaveBeenCalledTimes(1);
    });
});
