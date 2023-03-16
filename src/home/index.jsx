import React, { useState,useEffect } from "react"
import "./style.css"

function App() {

const[ cep, setCepNumber] = useState('') // estado para buscar cep do INPUT.
const [cepData, setCepData] = useState({rua:'', bairro:'', cidade:'', error:''}) // estado para pegar informações do cep e adiciona-las.

useEffect(()=> {        // useEffect Usado para toma vez que o INPUT ser modificado, realizar uma requisição 
  console.log('chamado')
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        setCepData({
          rua:data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade
        })
      })
      .catch(error =>  { console.error('Erro! Digite Novamente')
        setCepData({
          rua:'',
          bairro: '',
          cidade: '',
          error:'Cep nao identificado!'
        })
      })
  
},[cep,setCepNumber])

  return (
    <div className="conteiner">
      <h1>Busca Endereço</h1>

      <header>
        <input 
         placeholder="Digite seu cep" 
         type="text"
         onChange={e => setCepNumber(e.target.value)}
         />

        <p>Rua: {cepData.rua}</p>
        <p>Bairro: {cepData.bairro}</p>
        <p>Cidade: {cepData.cidade}</p>
        <p className="error">{cepData.error}</p>
      </header>
    </div>

    
  )
}

export default App
