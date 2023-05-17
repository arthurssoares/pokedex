const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 9999;
const limit = 20;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.types.map((type) => type).join(' ')}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                    <div class="poke-img"><img src="${pokemon.photo}"
                        alt="${pokemon.name}">

                    </div>        
            </div>
            <div class="pokemon-btn" id="btn-pokedetails">Mostrar Detalhes</div>  
            
            <div class="photoModal"><img src="${pokemon.photoModal}"
                        alt="${pokemon.name}">

                    </div>    

            <ul class="stats-board">
                <li id="board-att-li">Stats</li>
                <li>Abilitys</li>
                <li>Description</li>
                <li>2D</li>
                <li>3D</li>  
            </ul>
            <ul class="main-stats">
                <li>Capture Rate: ${pokemon.capture} %</li>
                <li>Experiencia Base: ${pokemon.experience}</li>
                <li>Main move: ${pokemon.mainmove}</li>
                <li>Other Move: ${pokemon.mainmove2}</li>
                <li>Ability: ${pokemon.abi}</li>
            </ul>
            <ul class="poke-stats">
                <li class="stats-li">HP</li> <li>${pokemon.hp}</li> <li class="poke-bar"><div class="bar-hp bar" style="width: ${pokemon.hp}%">&nbsp;</div></li>
                <li class="stats-li">ATK</li> <li>${pokemon.atk}</li> <li class="poke-bar"><div class="bar-atk bar" style="width: ${pokemon.atk}%">&nbsp;</div></li>
                <li class="stats-li">DEF</li> <li>${pokemon.def}</li> <li class="poke-bar"><div class="bar-def bar" style="width: ${pokemon.def}%">&nbsp;</div></li>
                <li class="stats-li">SATK</li> <li>${pokemon.spcatk}</li> <li class="poke-bar"><div class="bar-satk bar" style="width: ${pokemon.spcatk}%">&nbsp;</div></li>
                <li class="stats-li">SDEF</li> <li>${pokemon.spcdef}</li> <li class="poke-bar"><div class="bar-sdef bar" style="width: ${pokemon.spcdef}%">&nbsp;</div></li>
                <li class="stats-li">SPD</li> <li>${pokemon.speed}</li> <li class="poke-bar" ><div class="bar-spd bar" style="width: ${pokemon.speed}%">&nbsp;</div></li>
            </ul>
            <div class="poke-story">
                <ul>
                </ul>
                <div class="storyDiv">
                    <p class="main-story">${pokemon.storyEn}</p>
                    <p class="story-hide story-en">${pokemon.storyEn}</p>
                </div>
            </div>


    


            <input type="button" value="X" class="closeButton" id="closeBtn">
        </li>
    `
}

loadPokemonItens(offset, limit)


window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
        offset += limit
        const qtdRecordsWithNexPage = offset + limit

        if (qtdRecordsWithNexPage >= maxRecords) {
            const newLimit = maxRecords - offset
            
            loadPokemonItens(offset, newLimit)
        } else {
            loadPokemonItens(offset, limit)
        }
    }
})


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

//  ---------- Modal and click events  ----------
let modal = document.querySelector('#modal-id')
let closeModalBtn = document.querySelector('#closeBtn')

document.addEventListener('click', function(e){
    if(e.target.innerText == "Mostrar Detalhes"){
        modal.style.display = "flex"
        let pokeActual = e.target.parentElement
        var pokeLi = document.querySelector('#modalpoke')
        pokeLi.innerHTML = pokeActual.innerHTML
        let pokeClass = pokeActual.classList[1]
        pokeLi.classList = pokeClass
        pokeLi.classList.add("mostrar")
        let photo3d = document.querySelector(".modal .photoModal")
        let photoimg = document.querySelector(".modal .poke-img")
        photo3d.style.display = "flex"
        photoimg.style.display = "none"

    }
    if(e.target.id == "closeBtn"){
        modal.style.display = "none"
    }
    if(e.target.innerHTML == "Abilitys"){
        let attUlMainStats = document.querySelector(".modal .main-stats")
        let pokeStatsUl = document.querySelector(".modal .poke-stats")
        let pokeStory = document.querySelector(".modal .poke-story")
        attUlMainStats.style.display = "flex"
        pokeStatsUl.style.display = "none"
        pokeStory.style.display = "none"
        
    }
    if(e.target.innerHTML == "Stats"){
        let attUlMainStats = document.querySelector(".modal .main-stats")
        let pokeStatsUl = document.querySelector(".modal .poke-stats")
        let pokeStory = document.querySelector(".modal .poke-story")
        attUlMainStats.style.display = "none"
        pokeStatsUl.style.display = "grid"
        pokeStory.style.display = "none"
    }

    if(e.target.innerHTML == "2D"){
        let photo3d = document.querySelector(".modal .photoModal")
        let photoimg = document.querySelector(".modal .poke-img")
        photo3d.style.display = "none"
        photoimg.style.display = "flex"
        
    }

    if(e.target.innerHTML == "3D"){
        let photo3d = document.querySelector(".modal .photoModal")
        let photoimg = document.querySelector(".modal .poke-img")
        photo3d.style.display = "flex"
        photoimg.style.display = "none"
        
    }



    if(e.target.innerHTML == "Description"){
        let attUlMainStats = document.querySelector(".modal .main-stats")
        let pokeStatsUl = document.querySelector(".modal .poke-stats")
        let pokeStory = document.querySelector(".modal .poke-story")
        attUlMainStats.style.display = "none"
        pokeStatsUl.style.display = "none"
        pokeStory.style.display = "flex"
    }

    // ----- Language Buttons Handlers -----
    if(e.target.innerText == "En"){
        let storyEnText = document.querySelector('.modal .story-en')
        let mainStory = document.querySelector('.modal .main-story')
        mainStory.innerText = storyEnText.innerHTML
    }

    // if(e.target.innerText == "Fr"){
    //     let storyFrText = document.querySelector('.modal .story-fr')
    //     let mainStory = document.querySelector('.modal .main-story')
    //     mainStory.innerText = storyFrText.innerText
    // }
    // if(e.target.innerText == "It"){
    //     let storyItText = document.querySelector('.modal .story-it')
    //     let mainStory = document.querySelector('.modal .main-story')
    //     mainStory.innerText = storyItText.innerText
    // }
   
})

