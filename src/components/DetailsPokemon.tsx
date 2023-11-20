import { PokemonDetailsResponse } from "@/models/response.model";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { CardSkeleton } from "./CardSkeleton";

interface DetailsPokemonProps {
  id: number;
}
export const DetailsPokemon = ({ id }: DetailsPokemonProps) => {
  const [pokemon, setPokemon] = useState<PokemonDetailsResponse>();
  const [loading, setLoading] = useState(false);

  const getPokemon = async () => {
    setLoading(true);
    try {
      if (!id) {
        return;
      }
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemon: PokemonDetailsResponse = response.data;
      setLoading(false);
      setPokemon(pokemon);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);
  return (
    <>
      {!loading ? (
        <Card className="border-0">
          <CardHeader>
            <h2 className="text-rose-700 text-xl capitalize text-center font-bold">{pokemon?.name}</h2>
            <img className="w-28 h-28 mx-auto" src={pokemon?.sprites.front_default} alt={pokemon?.name} />
          </CardHeader>
          <CardContent>
            <h3 className="font-medium text-red-700">Habilidades</h3>
            <ul className="pl-4 mb-4">
              {pokemon?.abilities.map((ability) => (
                <li className="text-zinc-900 capitalize" key={ability.ability.name}>
                  {ability.ability.name}
                </li>
              ))}
            </ul>
            <h3 className="font-medium text-red-700">Tipo</h3>
            <ul className="pl-4">
              {pokemon?.types.map((type) => (
                <li className="text-zinc-900 capitalize" key={type.type.name}>
                  {type.type.name}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : (
        <CardSkeleton type="details" />
      )}
    </>
  );
};
