import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './detailedView.css';

export default function DetailedView(props, name) {
    // console.log("XXXXXXXXXXXXXXX")
    // console.log(props.match.params.name)
    const [data, setData] = useState({
        'abilities': [],
        'types': [{'type':{}}]
    })

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://pokeapi.co/api/v2/pokemon/${props.match.params.name}`,
            );

            setData(result.data);
        };

        fetchData();
    }, []);

    return (
        // <div className="detailedBG">
        <div className="cardBox">
            <Link className='button is-info' to='/' ><div className="crossClosing">X</div></Link>
            <img className="cardImgDetailed" align="center" src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${data.name}.gif`} />
            <div className="cardTitle">{data.name}</div>
            <h3 className="cardText">ID: {data.id}</h3>
            <h3 className="cardText">Type: {data.types[data.types.length-1].type.name}</h3>
            {/* {console.log(data)} */}
            <h3 className="cardText">Height: {data.height}</h3>
            <h3 className="cardText">Habilities<ul>
                {data.abilities.reverse().map(item => (
                    <li key={item.ability.name}>{item.ability.name}</li>
                ))}
            </ul>
            </h3>


        </div>
        // </div>
    )
}
