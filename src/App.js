import {useState} from 'react';
import { FiSearch} from 'react-icons/fi';
import './styles.css';
import api from './services/api';
function App() {

  const [input,setInput]= useState('');
  const [cep, setCep] = useState({});


  async function handleSearch(){
    
    if(input ===''){
      alert("Coloque o CEP")
      return;
    }

    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("");
    }catch{
      alert("erro ao buscar");
      setInput("")
    }
  }

  return (
    <div className='tudo'>
      <div className="conteiner">
        <h1 className="titulo">Busca CEP</h1>

        <div className="imput">
          <input 
            value={input}
            onChange={(evento) => setInput(evento.target.value) }
            type="text"
            placeholder="Digite seu cep"
          />  

          <button  className="botao" onClick={handleSearch}>
            <FiSearch size={25} color="#000"/>
          </button>

        </div>

        {Object.keys(cep).length > 0 && ( 
          <main className="main">
            <h2>CEP: {cep.cep}</h2>
            <span>Rua: {cep.logradouro}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>Cidade: {cep.localidade}</span>
            <span>Estado: {cep.uf}</span>
          </main>
        )} 

        
      </div>
    </div>




  );
}

export default App;
