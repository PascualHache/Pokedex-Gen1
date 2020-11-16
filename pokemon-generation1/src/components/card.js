import React from 'react';
import { Link } from 'react-router-dom'
import './card.css';

export default function Card(props) {
  return (
    <Link to={`/pokemon/${props.name}`} className="cardLink">
      <div className="cardComplete">
        <img className="cardImg" align="center" src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${props.name}.gif`} />
        <div className="cardTitle">{props.name}</div>
      </div>
    </Link>
  );
}
