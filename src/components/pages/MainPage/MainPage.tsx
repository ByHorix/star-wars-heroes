"use client";

// React / Next.js imports
import {useState} from 'react';
import { useRouter } from 'next/navigation';

// Styling imports
import "./styles.css";
import cn from 'classnames';

// Component imports
import {Button} from "@/components/ui/Button/Button";
import {Title} from "@/components/ui/Title/Title";

export default function MainPage() {
    // slideUp === true is adding 'slide-up' className for returning component
    const [slideUp, setSlideUp] = useState(false);

    const router = useRouter();

    // Add a delayed redirect to the '/heroes' page with a slide-up animation for the current page
    const handleButtonClick = () => {
        setSlideUp(true); // Trigger the slideUp animation
        setTimeout(() => {
            router.push('/heroes'); // Navigate to the /heroes page after the animation completes
        }, 500); // The timeout should match the duration of the animation
    };

    return (
        <div className={cn(
            'main-page',
            {
                'slide-up': slideUp // Conditionally add the 'slide-up' className
            }
        )}>
            <div className="main-page__content">
                <Title>Explore the heroes of Star Wars and find your favorite</Title>
                <Button onClick={handleButtonClick}>Go explore!</Button>
            </div>
        </div>
    );
};
