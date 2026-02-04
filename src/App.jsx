import {useState, useEffect} from 'react'
import './App.css'
import './Dice.jsx'
import Dice from './Dice.jsx'
import Confetti from 'react-confetti'

export default function App() {
  
 const [num, setNumber] = useState(() => gerarNumeros())
 const [record,setRecord] = useState(0)
 const [time,setTime] = useState(0)

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
    setTime(0)
  }

  const game = num.every( obj => obj.selecionado == true ) && valoresIguais() 

useEffect( () => {
  const interval = setInterval(() => {
    if(game) return
    setTime(prev => prev + 1)
  }, 1000)

  return () => clearInterval(interval)
},[game])

useEffect(() => {

  const recordSalvo = localStorage.getItem('record')
  recordSalvo ? setRecord(Number(recordSalvo)) : 0

  if(game){
    localStorage.setItem('record', record)
    if(time < record || record === 0){
      setRecord(time)
      localStorage.setItem('record', time )
    }else{
      null
    }
  }
},[game])

console.log('RECORD',localStorage.getItem('record'))
console.log('RECORD',record)

  return (
    <main className='game-cont'>
      <div className='game'>
        <h1 className='title'>Tenzies</h1>
        <p>Gire os dados até que todos os valores sejam iguais.</p>
        <p className='about'>Clique para segurar um dado.</p>
        <div className='stats'>
          <div className='record'><span className='st'>Record</span> <p>{record}s</p></div>
          <div className='timer'><span className='st'>Time</span><p>{time}s</p></div>
          
        </div>
          <section className='dices-container'>
        {console.log(num)}
        {diceComp}
        {console.log(valoresIguais())}
          </section>
        {  game &&  
          <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={500}/> }
        { game ?
        <button className='roll' onClick={newGame} style={{width:'150px'}}>New game</button> : 
        <button className='roll' onClick={roll}>Roll</button>}
      </div>
    </main>
  )
}
