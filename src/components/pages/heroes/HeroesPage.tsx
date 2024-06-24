import "./styles.css";
import {TitlingBlock} from "@/components/pages/heroes/TitlingBlock/TitlingBlock";
import {fetchHeroes} from "@/services/swapi";
import {HeroesList} from "@/components/pages/heroes/HeroesList/HeroesList";

export const HeroesPage = async () => {
    const heroesList = await fetchHeroes(1);

    return (
        <div className="heroes-page">
            <TitlingBlock/>
            <HeroesList initialHeroesList={heroesList}/>
        </div>
    )
}