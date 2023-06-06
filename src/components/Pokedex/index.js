import { useState } from "react";
import "./Pokedex.css";

export const Pokedex = () => {
  const [name, setName] = useState("GOTTA CATCH 'EM ALL!");
  const [id, setId] = useState("");
  const [image, setImage] = useState("./images/pokeball.gif");
  const [inputValue, setInputValue] = useState("");

  const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );

    if (apiResponse.status === 200) {
      const data = await apiResponse.json();
      return data;
    }
  };

  const renderPokemon = async (pokemon) => {
    setName("Loading...");
    setId("");
    const data = await fetchPokemon(pokemon);
    return data;
  };

  const pokemonBuild = (pokemon) => {
    setName(pokemon.name);
    setId(pokemon.id);
    setImage(
      pokemon.sprites.versions["generation-v"]["black-white"]["animated"][
        "front_default"
      ]
    );
  };

  const onSubmitting = async (event) => {
    event.preventDefault();
    let pokemon = await renderPokemon(inputValue.toLowerCase());

    if (pokemon) {
      pokemonBuild(pokemon);
    } else {
      setName("Not found :c");
      setId("");
      setImage("./images/bulbizarre-bulbasaur.gif");
    }

    setInputValue("");
  };

  const onTyping = (event) => {
    let value = event.target.value;
    setInputValue(value);
  };

  const onClick = async (event) => {
    let pokemonId = id;
    const buttonPrev = event.target.classList.contains(
      "pokedex_buttons--btn-prev"
    );
    const buttonNext = event.target.classList.contains(
      "pokedex_buttons--btn-next"
    );

    if (buttonPrev && id > 1) {
      pokemonId--;
      let pokemon = await renderPokemon(pokemonId);
      pokemonBuild(pokemon);
    }
    if (buttonNext) {
      pokemonId++;
      let pokemon = await renderPokemon(pokemonId);
      pokemonBuild(pokemon);
    }
  };

  return (
    <section className="pokedex">
      <div>
        <img src="./images/pokedex.png" alt="Pokedex" className="pokedex_img" />
        <img src={image} alt="Pokemon" className="pokedex_screen--image" />
        <h1 className="pokedex_pokemon--data">
          <span className="pokedex_pokemon--number">{id}</span> -
          <span className="pokedex_pokemon--name"> {name}</span>
        </h1>
        <form className="pokedex_search" onSubmit={onSubmitting}>
          <input
            type="search"
            placeholder="Name or Number"
            className="pokedex_search--bar"
            required
            onChange={onTyping}
            value={inputValue}
          />
        </form>

        <div className="pokedex_buttons">
          <button
            className="pokedex_button pokedex_buttons--btn-prev"
            onClick={onClick}
          >
            &lt; Prev
          </button>
          <button
            className="pokedex_button pokedex_buttons--btn-next"
            onClick={onClick}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </section>
  );
};
