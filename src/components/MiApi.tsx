/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { PokemonData } from "../models/response.model";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { DetailsPokemon } from "./DetailsPokemon";

export interface MiApiProps {
  setPokemons: (pokemons: PokemonData[]) => void;
  pokemonsFiltered?: PokemonData[];
}

export const MiApi = ({ setPokemons, pokemonsFiltered }: MiApiProps) => {
  const [limit, setLimit] = useState(151);
  const [offset, setOffset] = useState(0);

  const getPokemons = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const pokemons: PokemonData[] = response.data.results.map((pokemon: PokemonData) => {
        return {
          ...pokemon,
          id: pokemon.url.split("/")[6],
        };
      });
      setPokemons(pokemons);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <>
      <div className="bg-rose-600 font-bold text-white text-4xl px-5 py-4 sticky top-0">
        <h1>Pokemon</h1>
      </div>
      <section className="px-8 py-6">
        <div className="grid grid-cols-4 gap-6 ">
          {pokemonsFiltered?.length ? (
            pokemonsFiltered?.map((pokemon) => (
              <Card key={pokemon.id} className="bg-white rounded-md flex flex-col p-4">
                <CardContent className="flex gap-x-4 items-center">
                  <img
                    className="w-20 h-20"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    alt={pokemon.name}
                  />
                  <p className="text-gray-600 inline-flex text-2xl capitalize font-bold">{pokemon.name} </p>
                </CardContent>
                <Dialog>
                  <DialogTrigger>Ver detalles</DialogTrigger>
                  <DialogContent>
                    <DetailsPokemon id={pokemon.id} />
                  </DialogContent>
                </Dialog>
              </Card>
            ))
          ) : (
            <p className="text-3xl text-gray-600 font-bold">No se Encontraron Resultados</p>
          )}
        </div>
      </section>
    </>
  );
};
