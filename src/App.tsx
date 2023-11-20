/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "./App.css";
import { Buscador } from "./components/Buscador";
import { MiApi } from "./components/MiApi";
import { PokemonData } from "./models/response.model";
import { DetailsPokemon } from "./components/DetailsPokemon";

function App() {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [pokemonsFilter, setPokemonsFilter] = useState<PokemonData[]>([]);

  const setInitialPokemons = (pk: PokemonData[]) => {
    const data = new Set([...pokemons, ...pk]);
    setPokemons([...data]);
    setPokemonsFilter([...data]);
  };

  const filterPokemon = (pokemon: string) => {
    const filter = pokemons.filter((item) => item.name.includes(pokemon));
    setPokemonsFilter(filter);
  };

  const randomIdPokemon = Math.floor(Math.random() * 151) + 1;

  return (
    <>
      <aside className="[grid-area:aside] bg-zinc-900 h-full px-8 py-12">
        <div className="sticky top-12">
          <Buscador filterFn={filterPokemon} />

          <p className="text-white text-xl font-bold mt-4">Pokemon del Dia</p>
          <DetailsPokemon id={randomIdPokemon} />
        </div>
      </aside>

      <main className="[grid-area:main] bg-white ">
        <MiApi setPokemons={setInitialPokemons} pokemonsFiltered={pokemonsFilter} />
      </main>

      <footer className="[grid-area:footer] bg-rose-100 h-12 shadow-md flex items-center justify-center">
        <h2 className="text-xl text-rose-600">Hecho por Ramon Martinez</h2>
      </footer>
    </>
  );
}

export default App;
