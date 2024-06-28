// Imports for styling
import "./styles.css";
import cn from "classnames";

// React import
import {forwardRef} from "react";

// Type import
import {SkeletonProps} from "@/types/props";

// HeroPreviewSkeleton component is used to represent a skeleton placeholder
// for the hero preview card. It is displayed when the user scrolls down
// the list triggering the infinite scroll feature, indicating that more data
// is being loaded.
const HeroPreviewSkeleton = forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
    return (
        <div
            data-testid="infinite-scroll-skeleton"
            ref={ref}
            className={cn(
                "hero-preview-card skeleton",
                {
                    hidden: props.hidden
                }
            )}
        />
    )
});

// Display name for the component (used for debugging and error messages)
HeroPreviewSkeleton.displayName = "HeroPreviewSkeleton";

export { HeroPreviewSkeleton };
