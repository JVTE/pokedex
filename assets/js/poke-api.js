
const pokeApi = {} // Objeto para encapsular as funções relacionadas à PokeAPI
// Função que converte os detalhes da resposta da PokeAPI em um objeto Pokemon
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id // Define o número do pokemon
    pokemon.name = pokeDetail.name // Define o nome do pokemon
    // Mapeia todos os tipos do pokemon e pega o nome cada tipo
    const types = pokeDetail.types.map((typesSlot) => typesSlot.type.name)
    const [type] = types // Pega o primeiro tipo da lista 
    
    pokemon.types = types // Armazena todos os tipos
    pokemon.type = type // Armazena o tipo principal
    // Define a URL da imagem do Pokemon 
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon // retorna o objeto pokemon criado
}
// Função para buscar os detalhes de um pokemon a partir de sua URL
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url) // Faz uma requisição à URL do Pokemon
            .then((response) => response.json()) // Converte a resposta para JSON
            .then(convertPokeApiDetailToPokemon) // Converte o formato do objeto Pokemon
}
// Função para buscar uma lista de pokemons com base no offset e no limit
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}` // monsta a url com paginação
    
    return fetch(url)
        .then( (response) => response.json())// converte a reposta para json
        .then( (jsonBody) => jsonBody.results) // pega  apenas a lista de resultados
        .then( (pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // mapeia para obter os detalhes de cada pokemon
        .then( (detailRequests) => Promise.all(detailRequests)) // aguarda todas as requisições serem concluídas
        .then( (pokemonsDetails) => pokemonsDetails) // retorna os detalhes dos pokemons
}
