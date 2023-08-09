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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCommandInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      setCommandValue(event.target.value);
      setInputValue('>'); // Restaura o caractere '>' no input após pressionar Enter
      event.target.value = ''; // Limpa o input após pressionar Enter
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
        <div className='input-group'>
          <input type='text' value={inputValue} readOnly className='input' />
        </div>
        <input
          type='text'
          className='command'
          onKeyDown={handleCommandInputKeyDown}
          placeholder='Digite um comando e pressione Enter'
        />
      </div>
    </>
  )
}

export default App
