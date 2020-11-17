import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './../components/card';
import './mainGrid.css';
import logo from '../assets/pokemon-logo.png';
import redLogo from '../assets/redlogo.png';

export default function MainGrid() {
    const [data, setData] = useState({ pokemon_species: [{ "name": "", "url": "" }] })
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const generation = 1; //Change to see other generations

    // Sort Array by ID 
    const orderArray = (arrayResponse) => {
        arrayResponse.sort(function (a, b) {
            var idA = popID(a.url),
                idB = popID(b.url);
            if (idA < idB) return -1;
            if (idA > idB) return 1;
            return 0;
        });
        return arrayResponse;
    }

    // Getting ID field from URL
    const popID = (dataURL) => {
        return (dataURL.length > 0 ? parseInt(dataURL.slice(0, -1).split("/").pop()) : null)
    }

    // Handling text input filter
    const handleChange = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    // API data fecth, sorting call and set in state
    useEffect(() => {
        const fetchData = async () => {
            try {
                //I prefered fetching data directly from the 1st generation endpoint
                //instead adding the limit parameter on the all Pokemons request 
                //If ever the all Pokemons list gets messy we can prevent errors
                const result = await axios(
                    `https://pokeapi.co/api/v2/generation/${generation}/`,
                );
                setLoading(true);
                orderArray(result.data.pokemon_species)
                setData(result.data);
            } catch (e) {
                console.log(e)
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <img alt="Logo rojo" className="redLogo" align="center" src={redLogo} />
            <img alt="Pokemon Logo" className="logoImg" align="center" src={logo} />
            {loading ? (<><h2>Generation {generation}</h2>
                <h3>{data.pokemon_species.filter(num => num.name.includes(search.toLowerCase())).length} pokemon</h3>
                <input className="input" onChange={handleChange} type="text" placeholder="Search by name..."></input>

                <div className="pokemonsGrid">
                    {data.pokemon_species.filter(num => num.name.includes(search.toLowerCase())).map(item => (
                        <Card key={item.name} name={item.name} />
                    ))}
                </div></>) : <div className="loadingIndicator">Loading</div>}
        </>
    );
}