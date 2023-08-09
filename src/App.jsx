import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { format } from 'date-fns'; // Para formatar a data
import { useEffect } from 'react';



function App() {
  const [inputValue, setInputValue] = useState('>'); // Estado inicial com o caractere '5'
  const [commandValue, setCommandValue] = useState(''); // Inicialize com null
  const [siteName, setsiteName] = useState('')
  const [location, setlocation] = useState('')
  const [count, setcount] = useState(0)
  const [currentTime, setcurrentTime] = useState('')
  const [currentDate, setCurrentDate] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCommandInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!inputValue.includes('>')) {
        setInputValue('>')
        setMessages([...messages, 'ERROR: > NEEDED TO USE TERMINAL'])
      } else {
        console.log(inputValue)

        switch (inputValue) {
          case '> /log':
            setInputValue('>')
            setMessages([...messages, 'LOG: ' + messages])
            break;
          case '> /help':
            setInputValue('>')
            setMessages([...messages, '/log - Para ver o log de comandos. \n /help - Para ver todos os comandos. \n /login - Para realizar login. \n /signin - Para realizar cadastro. \n /logout - Para fazer logout. \n /home - Para navegar para a home. \n /clear - Limpa toda a tela.'])
            break;

          case '> /clear':
            setInputValue('>')
            setMessages([])
            break;

          case '> /signin':
            setInputValue('>')
            setMessages([])
            break;

          default:
            if (inputValue.trim() !== '') {
              setMessages([...messages, `command: ${inputValue} not found.`]);
              setInputValue('>');
            }
        }


      }
    }
  };


  useEffect(() => {
    // Função para obter a geolocalização
    function getGeolocationInfo() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

          if (count === 0) {
            try {
              const response = await fetch(url);
              const data = await response.json();

              if (data.address) {
                const country = data.address.country;
                const city = data.address.city || data.address.town || data.address.village || '';

                console.log('País:', country);
                console.log('Cidade:', city);
                console.log('Latitude', latitude);
                console.log('Longitude', longitude);
                setlocation(`${latitude} ${longitude} ${country} ${city}`);
                setcount(1);
              } else {
                console.log('Localização não encontrada.');
              }
            } catch (error) {
              console.error('Erro ao obter localização:', error);
            }
          } else {
            console.log('Localização já obtida.');
          }
        });
      } else {
        console.log('Geolocalização não suportada pelo navegador.');
      }
    }

    console.log(`
    ▄▀▀█▄▄▄▄  ▄▀▀▀▀▄  ▄▀▀▀█▀▀▄  ▄▀▀▀▀▄   ▄▀▀▄ ▄▀▀▄      ▄▀▀▄ ▄▀▄  ▄▀▀█▄▄▄▄      ▄▀▀█▄   ▄▀▀▄▀▀▀▄  ▄▀▀▄▀▀▀▄  ▄▀▀▀▀▄   ▄▀▀▄  ▄▀▄  ▄▀▀█▀▄    ▄▀▀▄ ▄▀▄  ▄▀▀█▄   ▄▀▀▄ ▀▄  ▄▀▀█▄▄   ▄▀▀▀▀▄       ▄▀▀▄▀▀▀▄  ▄▀▀█▄   ▄▀▀▄▀▀▀▄  ▄▀▀█▀▄    ▄▀▀█▄▄   ▄▀▀█▄   ▄▀▀▄ ▄▀▄  ▄▀▀█▄▄▄▄  ▄▀▀▄ ▀▄  ▄▀▀▀█▀▀▄  ▄▀▀█▄▄▄▄      ▄▀▀█▄▄   ▄▀▀█▄       ▄▀▀▀▀▄  ▄▀▀▄ ▄▀▀▄  ▄▀▀█▄       ▄▀▀▀▀▄    ▄▀▀▀▀▄   ▄▀▄▄▄▄   ▄▀▀█▄   ▄▀▀▀▀▄     ▄▀▀█▀▄   ▄▀▀▀▀▄    ▄▀▀█▄   ▄▀▄▄▄▄   ▄▀▀▀▀▄  
   ▐  ▄▀   ▐ █ █   ▐ █    █  ▐ █      █ █   █    █     █  █ ▀  █ ▐  ▄▀   ▐     ▐ ▄▀ ▀▄ █   █   █ █   █   █ █      █ █    █   █ █   █  █  █  █ ▀  █ ▐ ▄▀ ▀▄ █  █ █ █ █ ▄▀   █ █      █     █   █   █ ▐ ▄▀ ▀▄ █   █   █ █   █  █  █ ▄▀   █ ▐ ▄▀ ▀▄ █  █ ▀  █ ▐  ▄▀   ▐ █  █ █ █ █    █  ▐ ▐  ▄▀   ▐     █ ▄▀   █ ▐ ▄▀ ▀▄     █ █   ▐ █   █    █ ▐ ▄▀ ▀▄     █    █    █      █ █ █    ▌ ▐ ▄▀ ▀▄ █    █     █   █  █ █     ▄▀  ▐ ▄▀ ▀▄ █ █    ▌ █      █ 
     █▄▄▄▄▄     ▀▄   ▐   █     █      █ ▐  █    █      ▐  █    █   █▄▄▄▄▄        █▄▄▄█ ▐  █▀▀▀▀  ▐  █▀▀█▀  █      █ ▐     ▀▄▀  ▐   █  ▐  ▐  █    █   █▄▄▄█ ▐  █  ▀█ ▐ █    █ █      █     ▐  █▀▀█▀    █▄▄▄█ ▐  █▀▀▀▀  ▐   █  ▐  ▐ █    █   █▄▄▄█ ▐  █    █   █▄▄▄▄▄  ▐  █  ▀█ ▐   █       █▄▄▄▄▄      ▐ █    █   █▄▄▄█        ▀▄   ▐  █    █    █▄▄▄█     ▐    █    █      █ ▐ █        █▄▄▄█ ▐    █     ▐   █  ▐ ▐ ▄▄▀▀      █▄▄▄█ ▐ █      █      █ 
     █    ▌  ▀▄   █     █      ▀▄    ▄▀   █    █         █    █    █    ▌       ▄▀   █    █       ▄▀    █  ▀▄    ▄▀      ▄▀ █      █       █    █   ▄▀   █   █   █    █    █ ▀▄    ▄▀      ▄▀    █   ▄▀   █    █          █       █    █  ▄▀   █   █    █    █    ▌    █   █     █        █    ▌        █    █  ▄▀   █     ▀▄   █    █    █    ▄▀   █         █     ▀▄    ▄▀   █       ▄▀   █     █          █      █        ▄▀   █   █      ▀▄    ▄▀ 
    ▄▀▄▄▄▄    █▀▀▀    ▄▀         ▀▀▀▀      ▀▄▄▄▄▀      ▄▀   ▄▀    ▄▀▄▄▄▄       █   ▄▀   ▄▀       █     █     ▀▀▀▀       █  ▄▀   ▄▀▀▀▀▀▄  ▄▀   ▄▀   █   ▄▀  ▄▀   █    ▄▀▄▄▄▄▀   ▀▀▀▀       █     █   █   ▄▀   ▄▀        ▄▀▀▀▀▀▄   ▄▀▄▄▄▄▀ █   ▄▀  ▄▀   ▄▀    ▄▀▄▄▄▄   ▄▀   █    ▄▀        ▄▀▄▄▄▄        ▄▀▄▄▄▄▀ █   ▄▀       █▀▀▀      ▀▄▄▄▄▀  █   ▄▀        ▄▀▄▄▄▄▄▄▀ ▀▀▀▀    ▄▀▄▄▄▄▀ █   ▄▀    ▄▀▄▄▄▄▄▄▀ ▄▀▀▀▀▀▄    ▀▄▄▄▄▀ █   ▄▀   ▄▀▄▄▄▄▀   ▀▀▀▀   
    █    ▐    ▐      █                                 █    █     █    ▐       ▐   ▐   █         ▐     ▐              ▄▀  ▄▀   █       █ █    █    ▐   ▐   █    ▐   █     ▐               ▐     ▐   ▐   ▐   █         █       █ █     ▐  ▐   ▐   █    █     █    ▐   █    ▐   █          █    ▐       █     ▐  ▐   ▐        ▐                 ▐   ▐         █                █     ▐  ▐   ▐     █        █       █       ▐  ▐   ▐   █     ▐           
    ▐                ▐                                 ▐    ▐     ▐                    ▐                             █    ▐    ▐       ▐ ▐    ▐            ▐        ▐                                       ▐         ▐       ▐ ▐                ▐    ▐     ▐        ▐        ▐          ▐            ▐                                                     ▐                ▐                  ▐        ▐       ▐                  ▐                 
   `);


    // Chama a função para obter a geolocalização
    getGeolocationInfo();

    // Função para obter a data atual no formato desejado
    function getCurrentDate() {
      const now = new Date();
      return format(now, 'MMMM dd, yyyy');
    }

    // Chama a função para definir o valor inicial da data
    setCurrentDate(getCurrentDate());

    // Função para obter a hora atual
    function getCurrentTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    }

    // Chama a função para definir o valor inicial da hora
    setcurrentTime(getCurrentTime());

    // Atualiza a hora a cada minuto
    const interval = setInterval(() => {
      setcurrentTime(getCurrentTime());
    }, 60000); // 60000 milissegundos = 1 minuto

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, []); // Array de dependências vazio para executar apenas uma vez







  return (
    <>
      <div>
        <header>
          <p>==============================</p>
          <p>Terminal Services</p>
          <p>==============================</p>
          <p>Date: {currentDate}</p>
          <p>Time: {currentTime}</p>
          <p>Location: {location}</p>
          <p>User: Guest</p>
          <p>==============================</p>
        </header>
        <div className='message-container' style={{ marginTop: '60px' }}>
          {messages.map((message, index) => (
            <div key={index} className='message'>
              {message}
            </div>
          ))}
        </div>
        <div className='input-group'>
          <input
            type='text'
            className='input'
          />
        </div>
        <input
          type='text'
          className='command'
          onKeyDown={handleCommandInputKeyDown}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Digite um comando e pressione Enter'
        />
      </div>
    </>
  );

}

export default App;
