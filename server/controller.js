const pokemon = require('./db.json'); 
let globalID = 4; 
module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes =  ["A short pencil is usually better than a long memory any day.","A truly rich life contains love and art in abundance.", 'All your hard work will soon pay off.', 'Do not underestimate yourself. Human beings have unlimited potentials.', 'Happy life is just in front of you.']

        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
      
        res.status(200).send(randomFortune);
    },

    getPokemon: (req, res) => {
        res.status(200).send(pokemon); 
    }, 

    addPokemon: (req, res) => {
        const {name} = req.body; 
        let newPokemon = {
            id: globalID, 
            name: name
        }
        pokemon.push(newPokemon); 
        globalID++
     res.status(200).send(pokemon); 
    },

    deletePokemon: (req, res) => {
        let index = pokemon.findIndex(poke => poke.id === +req.params.id); 
        pokemon.splice(index, 1); 
        res.status(200).send(pokemon); 
    }, 
    
    evolve: (req, res) => {
       
        let index = pokemon.findIndex(poke => poke.id === +req.params.id);
         
         
        if(pokemon[index].name === 'bulbasaur') {
            pokemon[index].name = 'ivysaur'
            
            res.status(200).send(pokemon); 
        }
        else if(pokemon[index].name === 'squirtle') {
            pokemon[index].name = 'wartortle'
            
            res.status(200).send(pokemon);
        }
        else if(pokemon[index].name === 'charmander') {
            pokemon[index].name = 'charmeleon'
            
            res.status(200).send(pokemon);
        }
        else {
            
            res.status(400).send('Sorry, we dont have that evolution.');
        }
        }
        
    }

