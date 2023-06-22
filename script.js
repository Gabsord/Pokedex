const pokemon_name = document.querySelector('.pokemon_nome')
const pokemon_id = document.querySelector('.pokemon_id')
const pokemon_img = document.querySelector('.pokemon_img')

const form = document.querySelector('.form')
const input = document.querySelector('#input_form')

const buttonPrev = document.querySelector('.btnprev')
const buttonNext = document.querySelector('.btnnext')

let placeholderpokemon = 1


const fetchPokemon = async (pokemon) => {
    const resposta_api = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(resposta_api.status == 200){
        const data = await resposta_api.json()
        return data
    }   
}

const render_pokemon = async (pokemon) => {
    pokemon_id.innerHTML = ''
    pokemon_name.innerHTML = 'buscando...'
    const data = await fetchPokemon(pokemon)
    if (data){
        pokemon_name.innerHTML = data.name
        pokemon_id.innerHTML = data.id
        pokemon_img.style.display='block'
        pokemon_img.src = data['sprites'] ['versions'] ['generation-v']['black-white']['animated']['front_default']
        placeholderpokemon = data.id
    } else{
        pokemon_name.innerHTML = 'not found :c'
        pokemon_id.innerHTML = ''
        pokemon_img.style.display = 'none'
    }
   
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    render_pokemon(input.value.toLowerCase())
    input.value = ''  

} )

buttonPrev.addEventListener('click',() => {
  if (placeholderpokemon > 1){
    placeholderpokemon -= 1
    render_pokemon(placeholderpokemon)
  }
})

buttonNext.addEventListener('click', () => {
    placeholderpokemon += 1
    render_pokemon(placeholderpokemon)
})

render_pokemon(placeholderpokemon)





