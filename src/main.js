import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import pokemonService from "./js/pokemon.js";


async function populatePokemon() {
  const response = await pokemonService.getPokemon();
  let pokemon = response.results.map(function(pokemon) {
    return pokemon.name;
  });
  pokemon.forEach(function(name) {
    $("#pokemon-names").append(`<li id="${name}">${name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()}</li>`);
  });

  $("li").bind("click", function() {
    $("#stats").empty();
    const pokemonSelected = ($(this).text()).toLowerCase();
    displayStats(pokemonSelected);
  });
}

async function displayStats(pokemon) {
  const response = await pokemonService.pokemonStats(pokemon);
  let pokemonTypes = response.types.map(index => {
    return index.type.name;
  });
  console.log(pokemonTypes);
  $("#stats").append(`
        <h3> ${pokemon.slice(0, 1).toUpperCase() + pokemon.slice(1).toLowerCase()}</h3>
        <img src=${response.sprites.front_default} alt="${response.name} class="pokemon-pic">
        <br>
        <div id="stat-display">
          <span class="weight">Weight: ${response.weight}g<span>
          <br>
          <span class="height">Height: ${response.height}cm</span>
          <br>
        </div>
    `);
  pokemonTypes.forEach((element, index) => {
    let word = "";
    if(pokemonTypes.length === 1) {
      word = "Type";
    } else {
      word = `Type ${index + 1}`;
    }

    $("#stats").append(`<span class="type"> ${word}: ${element}</span> <br>`);
  });
}

$(document).ready(function() {
  populatePokemon();
});

