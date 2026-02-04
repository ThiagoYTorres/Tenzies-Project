import dice1 from "./imgs/dice1.png"
import dice2 from "./imgs/dice2.png"
import dice3 from "./imgs/dice3.png"
import dice4 from "./imgs/dice4.png"
import dice5 from "./imgs/dice5.png"
import dice6 from "./imgs/dice6.png"

const dadosImg = {
  1: dice1,
  2: dice2,
  3: dice3,
  4: dice4,
  5: dice5,
  6: dice6,
}

export default function Dice(props) {
  return (
    <div className={props.select ? 'dice selected' : 'dice'}
    onClick={() => props.selecionar(props.id)}>
      <img src={dadosImg[props.num]} draggable="false"/>
      </div>
  )
}

