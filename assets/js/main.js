const pokemonList = document.getElementById('pokemonList'); // lista de elementos HTML onde os pokemons serão exibidos
const loadMorebutton = document.getElementById('loadMoreButton'); // botão para carregar mais pokemons

const maxRecords = 151 // carrega a 1º geração de pokemons
let offset = 0; // posição incial para a proxima requisição
const limit = 10; // quantidade de pokemons por requisição
// Função para carregar itens de pokmeon e adicioná-los à lista HTML
function loadPokemonItens(offset, limit) { 
    pokeApi.getPokemons(offset, limit).then( (pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                    
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
    
                    <img src="${pokemon.photo}" 
                         alt="${pokemon.name}">
                </div>         
            </li>
        `).join('')
        pokemonList.innerHTML += newHtml // adiciona o novo HTML à lista exisitente
    })
}
// carrega os primeiros pokemons assim que a página é aberta
loadPokemonItens(offset, limit)
// evento para carregar ais pokemons quando o botão é clicado
loadMorebutton.addEventListener('click', () =>{
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset // calcula o limite restante para não ultrapassar o máximo
        loadPokemonItens(offset, newLimit)
        
        loadMorebutton.parentElement.removeChild(loadMorebutton) // remove o botão após carregar todos ospokemons
    } else {
        loadPokemonItens(offset, limit) // carrega mais pokemons
    }
})