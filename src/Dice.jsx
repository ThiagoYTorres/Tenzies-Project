import {useState} from 'react'

export default function Dice(props) {
  const diceImg = `./src/imgs/dice${props.num}.png`
  return (
    <div className={props.select ? 'dice selected' : 'dice'}
    onClick={() => props.selecionar(props.id)}>
      <img src={diceImg} draggable="false"/>
      </div>
  )
}

