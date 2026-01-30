import {useState} from 'react'
import './App.css'
import './Dice.jsx'
import Dice from './Dice.jsx'
import Confetti from 'react-confetti'

export default function App() {
  
 const [num, setNumber] = useState(() => gerarNumeros())

 // Criando um array com 10 elementos
 function gerarNumeros(){
    const numbers = []
    for( let i = 0; i < 10 ; i++ ){
      numbers.push(Math.ceil(Math.random() * 6))
    }
// Cada elemento vira um objeto, fazendo uma lista de objetos   
    const renderObjs = numbers.map( (el,index) => ({
      value: el,
      selecionado: false,
      id: index
  }))
    return renderObjs
  }
  
// A partir desses objetos, renderizo os componentes <Dice/>
  const diceComp = num.map((el)=> {
    return <Dice 
      num={el.value} 
      select={el.selecionado} 
      id={el.id} 
      key={el.id} 
      selecionar={selecionar}/>
  })

  function roll(){
    setNumber(prev => prev.map( el => el.selecionado ? el : {...el, value: Math.ceil(Math.random() * 6) } ))
    setRolls( prev => prev + 1)
  }
  
  function selecionar(id){
    setNumber( prev => prev.map((el)=> {
      return el.id == id ? {...el,selecionado:!el.selecionado} : el
  }))
   
  }

  function valoresIguais(){
    for( let i = 0; i < num.length; i++ ){
      const objIgual = num[0].value
      if( objIgual !== num[i].value){
        return false
      }
    }
   return true
    
  }
  
  function newGame(){
    setNumber(gerarNumeros())
  }
  
  return (
    <main className='game-cont'>
      <div className='game'>
        <h1 className='title'>Tenzies</h1>
        <p>Gire os dados até que todos os valores sejam iguais.</p>
        <p className='about'>Clique para segurar um dado.</p>
          <section className='dices-container'>
        {console.log(num)}
        {diceComp}
        {console.log(valoresIguais())}
          </section>
        { num.every( obj => obj.selecionado == true ) && valoresIguais() &&  
          <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={500}/> }
        { num.every( obj => obj.selecionado == true && obj.value ) && valoresIguais() ?
        <button className='roll' onClick={newGame} style={{width:'150px'}}>New game</button> : 
        <button className='roll' onClick={roll}>Roll</button>}
      </div>
    </main>
  )
}
