const inputFiltro = document.getElementById('filtro')

//declarando função, retorna o array com 250 objetos (países)
async function fetchAPI (){
    try{
        const achaPais = await fetch('https://restcountries.com/v3.1/all')
        const achadoPaises = await achaPais.json()
        //console.log(achadoPaises)

        const arrayPaises = achadoPaises  //retornando array
        return arrayPaises
    }catch(error){
        console.log(error)
    }
}   

//filtra array de países ou não, de acordo com nome determinado
async function filtraPaisNome(nomePais){
    const arrayPaises3 = await fetchAPI()  //recebe array de países completos

    if(nomePais == ""){
        return arrayPaises3
    }else{
        const arrayPaisesFiltrado = arrayPaises3.filter(
            (pais) => pais.name.common.toUpperCase().includes(nomePais.toUpperCase())
        )
        return arrayPaisesFiltrado
    }
}
//filtraPaisNome()

//trabalha o array, exibe países filtrados
async function renderizaPaises (){
    const arrayPaises2 = await filtraPaisNome(inputFiltro.value)
    const cardPais = arrayPaises2.map(item => {
        return ` 
            <div class="card_container ${item.region}">
                <img src="${item.flags.png}" alt="Bandeira de ${item.name.common}">
                    <div class="card_texto">
                        <h2>${item.name.common}</h2>
                        <hr>
                        <div>
                            <h3> População: </h3>
                            <p> ${item.population} </p>
                        </div>   
                        <div>
                            <h3> Capital: </h3>
                            <p> ${item.capital === undefined ? 'Não consta':item.capital} </p>
                        </div>   
                        <div>
                            <h3> Continente: </h3>
                            <p> ${item.continents} </p>
                        </div>        
                    </div>
            </div>`
    })
    const container2 = document.getElementById('container')
    container2.innerHTML = cardPais.join('')
}
inputFiltro.addEventListener('keyup', renderizaPaises)
renderizaPaises()
