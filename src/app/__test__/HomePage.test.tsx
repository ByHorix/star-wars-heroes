import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '@/app/page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('HomePage', () => {
    it('navigates to the heroes page on button click', async () => {
        const push = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push });

        render(<HomePage />);

        const navigationButton = screen.getByRole('button');

        fireEvent.click(navigationButton);

        // Wait for 0.5 second (500 ms), it made for an animation on main page
        await new Promise(resolve => setTimeout(resolve, 500));

        // Ensure router.push is called with the correct argument
        expect(push).toHaveBeenCalledWith('/heroes');
    });
});
