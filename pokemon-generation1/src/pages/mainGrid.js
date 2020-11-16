import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './../components/card';
import './mainGrid.css';
import logo from '../assets/pokemon-logo.png'


export default function MainGrid() {
    const [data, setData] = useState({ pokemon_species: [] })
    const generation = 1;

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://pokeapi.co/api/v2/generation/${generation}/`,
            );

            setData(result.data);
        };
        fetchData();
    }, []);

    return (
        <>
            <img className="logoImg" align="center" src={logo} />
            <h2>Generation {generation}</h2>
            <h3>{data.pokemon_species.length} pokemon</h3>
            <div className="pokemonsGrid">
                {data.pokemon_species.map(item => (
                    <Card key={item.name} name={item.name} />
                ))}
                {console.log(data.pokemon_species)}
            </div>
        </>
    );
}