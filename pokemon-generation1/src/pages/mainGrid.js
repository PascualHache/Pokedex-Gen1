import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './../components/card';
import './mainGrid.css';
import logo from '../assets/pokemon-logo.png'


export default function MainGrid() {
    const [data, setData] = useState({ pokemon_species: [{ "name": "", "url": "" }] })
    const [search, setSearch] = useState("")
    const generation = 1;

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
            const result = await axios(
                `https://pokeapi.co/api/v2/generation/${generation}/`,
            );
            orderArray(result.data.pokemon_species)
            setData(result.data);
        };
        fetchData();
    }, []);

    return (
        <>
            <img alt="Pokemon Logo" className="logoImg" align="center" src={logo} />
            <h2>Generation {generation}</h2>
            <h3>{data.pokemon_species.filter(num => num.name.includes(search.toLowerCase())).length} pokemon</h3>
            <input className="input" onChange={handleChange} type="text" placeholder="Search by name..."></input>
            <div className="pokemonsGrid">
                {/* {data.pokemon_species.map(item => (
                    <Card key={item.name} name={item.name} />
                ))} */}
                {/* {console.log("veamos",data.pokemon_species.filter( num => num.name.includes('J'.toLowerCase())))} */}
                {data.pokemon_species.filter(num => num.name.includes(search.toLowerCase())).map(item => (
                    <Card key={item.name} name={item.name} />
                ))}
            </div>
        </>
    );
}