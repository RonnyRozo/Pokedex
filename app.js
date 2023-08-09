let globalPokemon = [];
const mainContainer = document.querySelector('.main-container');
const searchInput = document.querySelector('#search-input');

const cleanView = () => {
    mainContainer.innerHTML = '';
}

searchInput.addEventListener('keyup', () => {
    const inputText = searchInput.value;
  
    let globalPokemon2 = searchByName(inputText);
    cleanView();
    renderPokemons(globalPokemon2);
    console.log(globalPokemon2); 
});

const searchByName = (searchingParameter) => {
    const filteredPokemon = globalPokemon.filter((pokemon)=> {
        if(pokemon.name.includes(searchingParameter)) {
            return pokemon;
        }
    });
    return filteredPokemon;
}

async function getPokemons() {
    try{
       
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
       
        const responseJson = await response.json();
        
        const pokemons = responseJson.results;

        for (let i = 0; i < pokemons.length; i++) {
         
            const pokemon = pokemons[i];


            const pokemonUrl = pokemon.url;
            
            const response = await fetch(pokemonUrl);
            
            const responseJson = await response.json();
            normalizePokemons(pokemon.name, responseJson);
        }
    }
    catch(error) {
        console.log(error);
    }
}

const normalizePokemons = (name, responseJson) => {
    
    const img = responseJson.sprites.other['official-artwork'].front_default;
    const pokemon = {
        name: name,
        img: img, 
    };
    
    globalPokemon.push(pokemon);
}

const renderPokemonCard = (element) => {
    const cardPokemonDiv = document.createElement('div');
    cardPokemonDiv.classList = 'card';
    cardPokemonDiv.innerHTML = `
                    <h2>${element.name}</h2>
                    <img src='${element.img}' />   
                    `;
                    
    mainContainer.appendChild(cardPokemonDiv);
}

const renderPokemons = (array) => {
    
    for (let i = 0; i < array.length; i++) {
        
        renderPokemonCard(array[i]);
    }
}


(async () => {
    await getPokemons();
    renderPokemons(globalPokemon);
})();