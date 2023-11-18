/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "./App.css";
import { Buscador } from "./components/Buscador";
import { MiApi } from "./components/MiApi";
import { PokemonData } from "./models/response.model";
import { DetailsPokemon } from "./components/DetailsPokemon";

function App() {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(false);

  const [pokemonsFilter, setPokemonsFilter] = useState<PokemonData[]>([]);

  const setInitialPokemons = (pokemons: PokemonData[]) => {
    setPokemons(pokemons);
    setPokemonsFilter(pokemons);
  };

  const filterPokemon = (pokemon: string) => {
    const filter = pokemons.filter((item) => item.name.includes(pokemon));
    setPokemonsFilter(filter);
  };
  const randomIdPokemon = Math.floor(Math.random() * (150 - 1) + 1);
  return (
    <>
      <aside className="[grid-area:aside] bg-zinc-900 h-full px-8 py-12">
        <Buscador filterFn={filterPokemon} />

        <p className="text-white text-xl font-bold">Pokemon del Dia</p>
        <DetailsPokemon id={randomIdPokemon} />
      </aside>

      <main className="[grid-area:main] bg-white overflow-y-scroll ">
        <MiApi setPokemons={setInitialPokemons} pokemonsFiltered={pokemonsFilter} />
      </main>

      <footer className="[grid-area:footer] h-12">
        <h1>Footer</h1>
      </footer>
    </>
  );
}

export default App;
