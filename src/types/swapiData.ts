export type Hero = {
    id: number,
    name: string,
    films: Array<number>,
    starships: Array<number>,
    gender: string
}

export type Starship = {
    id: number,
    name: string,
    model: string,
    films: Array<number>,
}

export type Film = {
    id: number,
    title: string,
}
