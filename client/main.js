
const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById('fortune')
const pokemonBtn = document.getElementById('getPokemon')
const submitBtn = document.getElementById('submitPokemon')
const textField = document.getElementById('newPokemon')
const form = document.querySelector('form'); 
const pokemonList = document.querySelector('#pokemonList')


const baseURL = 'http://localhost:4000/api/pokemon/'; 

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
    .then(res => {
        const data = res.data; 
        alert(data); 
    })
}

const getPokemon = () => {
    pokemonList.innerHTML = ''
    
    axios.get('http://localhost:4000/api/pokemon/')
    .then(res => {
        
        console.log(res.data)
        const {data} = res
        
       for(let i = 0; i < data.length; i++) {
         
        const newDiv = document.createElement('div'); 
        newDiv.innerHTML = `<p>${data[i].name}</p><button id="deletebtn" onclick="deletePokemon(${data[i].id})">delete</button><button id="evolvebtn" onclick="evolve(${data[i].id})">Evolve</button>`; 
        pokemonList.appendChild(newDiv); 
        
       }     
    })
}

const addPokemon = body => {
    axios.post(`${baseURL}`, body)
    .then(res => {
        pokemonList.innerHTML = ''; 
        getPokemon();  
    })
    .catch(err => {
        console.log(err)
    })
}

const deletePokemon = id => {
    axios.delete(`${baseURL}${id}`)
    .then(res => {
        getPokemon(); 
    })
}

function submitPokemon (e) {
    e.preventDefault(); 
 
let newPokemon = {name: textField.value}
addPokemon(newPokemon)
textField.value = ''
}

const evolve = (id) => {
    axios.put(`${baseURL}${id}`)
    .then(res => {
       console.log(res)
        getPokemon(); 
        alert('Your Pokemon has evolved!')
    })
    .catch(err => {
        alert(err.response.data)
    })
}


complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune); 
pokemonBtn.addEventListener('click', getPokemon)
form.addEventListener('submit', submitPokemon)
