/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { PokemonData } from "../models/response.model";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { DetailsPokemon } from "./DetailsPokemon";
import { Button } from "./ui/button";
import { CardSkeleton } from "./CardSkeleton";

export interface MiApiProps {
  setPokemons: (pokemons: PokemonData[]) => void;
  pokemonsFiltered: PokemonData[];
}

export const MiApi = ({ setPokemons, pokemonsFiltered }: MiApiProps) => {
  const limitPage = 31;
  const scrollPosition = useRef(0);

  const [limit, setLimit] = useState(limitPage);
  const [offset, setOffset] = useState(0);

  const [loading, setLoading] = useState(false);

  const totalSkeleton: number = 30;
  const skeletons: number[] = [];
  for (let i = 0; i < totalSkeleton; i++) {
    skeletons.push(i);
  }

  const getPokemons = async (limit: number, offset: number) => {
    setLoading(true);
    scrollPosition.current = window.scrollY;
    try {
      // Solo se muestran los primeros 151 pokemons
      if (pokemonsFiltered?.length > 151) {
        setLoading(false);
        return;
      }
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const pokemons: PokemonData[] = response.data.results
        .map((pokemon: PokemonData) => {
          return {
            ...pokemon,
            id: pokemon.url.split("/")[6],
          };
        })
        .filter((pokemon: PokemonData) => {
          return pokemon.id <= 151;
        });
      setLoading(false);
      setPokemons(pokemons);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const loadPokemons = (e: React.MouseEvent) => {
    e.preventDefault();
    setOffset(offset + limitPage);
  };

  useEffect(() => {
    getPokemons(limit, offset);
  }, [limit, offset]);

  useEffect(() => {
    window.scrollTo(0, scrollPosition.current);
  }, [pokemonsFiltered]);

  return (
    <>
      <div className="bg-rose-600 font-bold text-white text-4xl px-5 py-4 sticky top-0">
        <h1>Pokemon</h1>
      </div>
      <section className="px-8 py-6">
        <div className="grid grid-cols-4 gap-6 ">
          {!loading && pokemonsFiltered?.length ? (
            pokemonsFiltered?.map((pokemon) => (
              <Card key={pokemon.id} className="bg-white rounded-md flex flex-col p-4">
                <CardContent className="flex gap-x-2 items-center p-0">
                  <h2>{pokemon.id}</h2>
                  <img
                    className="w-20 h-20"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    alt={pokemon.name}
                  />
                  <p className="text-gray-600 inline-flex text-2xl capitalize font-bold">{pokemon.name} </p>
                </CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"link"} className="capitalize">
                      ver mas
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DetailsPokemon id={pokemon.id} />
                  </DialogContent>
                </Dialog>
              </Card>
            ))
          ) : loading ? (
            skeletons.map((item) => <CardSkeleton type="card" key={item} />)
          ) : (
            <p className="text-center text-2xl font-bold">No hay resultados</p>
          )}
        </div>
        <div className="flex justify-center">
          <Button
            type="button"
            variant={"secondary"}
            className="mx-auto mt-4 text-center"
            disabled={pokemonsFiltered?.length >= 151}
            onClick={(e) => loadPokemons(e)}>
            {pokemonsFiltered?.length && pokemonsFiltered?.length >= 151
              ? "No hay mas pokemons de la primera temporada"
              : "Cargar mas pokemons"}
          </Button>
        </div>
      </section>
    </>
  );
};
