import React from 'react';
import { Link } from 'react-router-dom'
import './card.css';

//Card model
export default function Card(props) {
  return (
    <Link to={`/pokemon/${props.name}`} className="cardLink">
      <div className="cardComplete">
      {props.name === undefined || props.name === "" ?null:<img className="cardImg" align="center" src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${props.name}.gif`} alt="Pokemon big" />}
        <div className="cardTitle">{props.name}</div>
      </div>
    </Link>
  );
}
