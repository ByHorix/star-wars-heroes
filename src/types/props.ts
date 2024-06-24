import React, {Dispatch, MouseEventHandler, SetStateAction} from "react";
import {Hero} from "@/types/swapiData";

export type ButtonProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>
    children?: React.ReactNode;
};

export type TitleProps = {
    children?: React.ReactNode;
};

export type SkeletonProps = {
    hidden: boolean
}

export type HeroDetailsCardProps = {
    heroData: Hero,
    open: boolean,
    close: () => void,
    flowContainerHeight: number,
    setFlowContainerHeight: Dispatch<SetStateAction<number>>,
}
