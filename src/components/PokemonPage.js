import React, { useEffect, useState }  from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";

function PokemonPage() {
  const [ pokemonList, setPokemonList ] = useState([])
  const [ search, setSearch ] = useState("")


  useEffect(() => {
    fetch("http://localhost:3001/pokemon")
      .then((r) => r.json())
      .then((data) => setPokemonList(data))
  }, [pokemonList])
  


  function handleSearch(typed) {
    setSearch(typed)
  }

  const pokemonsToDisplay = pokemonList.filter((pokemon) => pokemon.name.startsWith(search))

  function newPokemonSubmit(newPokemon) {
    console.log("New Pokemon submitted!")
    const newPokemonList = [...pokemonList, newPokemon]
    setPokemonList(newPokemonList)

    fetch("http://localhost:3001/pokemon",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPokemon)
    })
  }


  return (
    <Container>
      <h1>Pokemon Searcher</h1>
      <br />
      <PokemonForm onSubmit={newPokemonSubmit} />
      <br />
      <Search handleSearch={handleSearch} />
      <br />
      <PokemonCollection pokemons={pokemonsToDisplay} />
    </Container>
  );
}

export default PokemonPage;
