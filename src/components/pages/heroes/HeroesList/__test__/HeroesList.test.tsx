import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { HeroesList } from '../HeroesList';
import {fetchHeroes, getFilmsAndStarshipsForHero} from '@/services/swapi';
import { useInView } from 'react-intersection-observer';

// Mock the fetchHeroes function
jest.mock('../../../../../services/swapi', () => ({
    fetchHeroes: jest.fn(),
    getFilmsAndStarshipsForHero: jest.fn(),
}));

// Mock the useInView hook
jest.mock('react-intersection-observer', () => ({
    useInView: jest.fn(),
}));

describe('HeroesList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows skeleton and loads more heroes on scroll to the bottom', async () => {
        // Mock the return value of fetchHeroes
        const mockHeroes = [
            { id: 1, name: 'Hero 1', films: [1], starships: []},
            { id: 2, name: 'Hero 2', films: [1, 2], starships: [1, 2, 3, 4] },
        ];
        (fetchHeroes as jest.Mock).mockResolvedValue(mockHeroes);

        // Mock the useInView hook to control inView state
        const mockSetInView = jest.fn();
        (useInView as jest.Mock).mockReturnValue({ ref: jest.fn(), inView: false });

        // Render the component with the initial heroes list
        const initialHeroesList = [
            { id: 3, name: 'Initial Hero 1', films: [1, 2, 3], starships: [2, 3, 4, 5] },
            { id: 4, name: 'Initial Hero 2', films: [1, 2, 3, 4], starships: [2, 3, 4] },
        ];
        render(<HeroesList initialHeroesList={initialHeroesList} />);

        // Check that the initial heroes are displayed
        initialHeroesList.forEach(hero => {
            expect(screen.getByText(`Name: ${hero.name}`)).toBeInTheDocument();
        });

        // Check that the skeleton is displayed (it should be hidden initially)
        const skeleton = screen.getByTestId('infinite-scroll-skeleton');
        expect(skeleton).toBeInTheDocument();

        // Simulate the skeleton becoming in view
        (useInView as jest.Mock).mockReturnValue({ ref: jest.fn(), inView: true });

        // Manually trigger a re-render to apply new inView state
        render(<HeroesList initialHeroesList={initialHeroesList} />);

        // Wait for fetchHeroes to be called and new heroes to be loaded
        await waitFor(() => {
            expect(fetchHeroes).toHaveBeenCalledTimes(1);
        });

        // Check that new heroes are added to the list
        mockHeroes.forEach(hero => {
            expect(screen.getByText(`Name: ${hero.name}`)).toBeInTheDocument();
        });

        // Check that fetching hero details have not been called
        expect(getFilmsAndStarshipsForHero).not.toHaveBeenCalled();
    });
});
