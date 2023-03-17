import React, { useState,useEffect } from "react"
import "./style.css"

function App() {

const[ cep, setCepNumber] = useState('') // estado para buscar VALOR do  cep do INPUT.
const [button,setButton] = useState() // estado para atualizar a pagina com UseEfect
const [cepData, setCepData] = useState({rua:'', bairro:'', cidade:'', error:''}) // estado para pegar informações do cep e adiciona-las.

useEffect(()=> {        // useEffect Usado para toda vez que o BUTTON for apertado, realizar uma requisição 
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
      .catch(error =>  { console.error('Erro! Digite Novamente') // Caso a requisiçao apresente um ERRO, os valores atribuidos sao zerados e sem seguida apresentando uma mensagem de ERRO para o usuário
        setCepData({
          rua:'',
          bairro: '',
          cidade: '',
          error:'Cep nao identificado!'
        })
      })
  
},[button])

  return (
    <div className="conteiner">
      <h1>Busca Endereço</h1>

      <header>
        <section>
          <input 
           placeholder="Digite seu cep" 
            type="text"
            onChange={e => setCepNumber(e.target.value)}
          />
          <button 
            onClick={e=> setButton(e.clientX)}
          placeholder="Buscar">
            Buscar
          </button>
        </section>
        <p>Rua: {cepData.rua}</p>
        <p>Bairro: {cepData.bairro}</p>
        <p>Cidade: {cepData.cidade}</p>
        <p className="error">{cepData.error}</p>
      </header>
    </div>

    
  )
}

export default App
