import {useState} from 'react'

export default function Dice(props) {
  return (
    <div className={props.select ? 'dice selected' : 'dice'}
    onClick={() => props.selecionar(props.id)}>
      <p>{props.num}</p>
      </div>
  )
}

