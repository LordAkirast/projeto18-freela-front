import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { format } from 'date-fns'; // Para formatar a data
import { useEffect } from 'react';
import axios from 'axios';



function App() {
  const [inputValue, setInputValue] = useState('> '); // Estado inicial com o caractere '5'
  const [commandValue, setCommandValue] = useState(''); // Inicialize com null
  const [siteName, setsiteName] = useState('')
  const [location, setlocation] = useState('')
  const [count, setcount] = useState(0)
  const [currentTime, setcurrentTime] = useState('')
  const [currentDate, setCurrentDate] = useState('');
  const [messages, setMessages] = useState([]);
  const [lastCommand, setlastCommand] = useState('')

  ///signup
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCommandInputKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();


      ///se o comando for de signup entra aqui
      if (lastCommand.includes('n4m3')) {
        setname(inputValue.replace(/[\s>]+/g, ''))
        setInputValue('')
        setMessages(['Email: '])
        setlastCommand('name')
      }
      else if (lastCommand.includes('name')) {
        setemail(inputValue.replace(/[\s>]+/g, ''))
        setInputValue('')
        setMessages(['Password: '])
        setlastCommand('email')

      } else if (lastCommand.includes('email') && name) {
        setpassword(inputValue.replace(/[\s>]+/g, ''))
        setInputValue('')
        setMessages(['Confirm Password: '])
        setlastCommand('password')
      } else if (lastCommand.includes('password') && name && email) {
        setconfirmPassword(inputValue.replace(/[\s>]+/g, ''))
        setInputValue('')
        setMessages(['PRESS ENTER TO CONTINUE: '])
        setlastCommand('confirmPass')
      } else if (lastCommand.includes('confirmPass') && name && email && password) {
        setInputValue('')
        setMessages(['Name: ', name, 'Email: ', email, 'Password: ', password, 'ConfirmPassword: ', confirmPassword, 'y TO CONFIRM n TO DECLINE'])
        setlastCommand('signComplete')
      } else if (inputValue.includes('y') && lastCommand.includes('signComplete')) {
        setMessages(['SENDING DATA... PRESS ENTER TO CONTINUE'])

        const data = {
          name,
          email,
          password,
          confirmPassword,
        };

        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, data);
          console.log(response.data); // Trate a resposta da API conforme necessário
          setname("")
          setemail("")
          setpassword("")
          setconfirmPassword("")
          setMessages(['SUCCESS: User created!'])
          setInputValue('> ')



        } catch (error) {
          if (!name) {
            setMessages(["ERROR: Name cannot be empty"])
            setname("")
            setemail("")
            setpassword("")
            setconfirmPassword("")
            setlastCommand('error')
            setInputValue('')
          }

          else if (!email) {
            setMessages(["ERROR: Email cannot be empty"])
            setname("")
            setemail("")
            setpassword("")
            setconfirmPassword("")
            setlastCommand('error')
            setInputValue('')
          }

          else if (!password) {
            setMessages(["ERROR: Password cannot be empty"])
            setname("")
            setemail("")
            setpassword("")
            setconfirmPassword("")
            setlastCommand('error')
            setInputValue('')
          }

          else if (!confirmPassword) {
            setMessages(["ERROR: Confirm Passowrd cannot be empty"])
            setname("")
            setemail("")
            setpassword("")
            setconfirmPassword("")
            setlastCommand('error')
            setInputValue('')
          }

          else if (password.length < 3) {
            setMessages(["ERROR: Password must be larger than 3 characters."])
            setname("")
            setemail("")
            setpassword("")
            setconfirmPassword("")
            setlastCommand('error')
            setInputValue('')
          }

          else if (password !== confirmPassword) {
            setMessages(["ERROR: Password and Confirm Password must match."])
            setname("")
            setemail("")
            setpassword("")
            setconfirmPassword("")
            setlastCommand('error')
            setInputValue('> ')
          }


          console.error(error);
          setMessages(['ERROR: ',error.response.data])
          setname("")
          setemail("")
          setpassword("")
          setconfirmPassword("")
          setlastCommand('error')
          setInputValue('> ')
        }

        setlastCommand('')

      } else if (inputValue.includes('n') && lastCommand.includes('signComplete')) {
        setMessages(['OPERATION CANCELED!'])
        setname("")
        setemail("")
        setpassword("")
        setconfirmPassword("")
        setlastCommand('')
        setInputValue('> ')
      } else {


        if (!inputValue.includes('>')) {
          setInputValue('> ')
          setMessages([...messages, 'ERROR: > NEEDED TO USE TERMINAL'])
        } else {
          console.log(inputValue)

          switch (inputValue) {
            case '> \log':
              setInputValue('> ')
              setMessages([...messages, 'LOG: ' + messages])
              setlastCommand(inputValue)
              break;
            case '> \help':
              setInputValue('> ')
              setMessages([...messages, `log - See all history logs. |
            help - See all commands. |
            login - To login. |
            signup - To register. |
            logout - To logout. |
            home - To go to main page. |
            clear - Clear screen. |
           `])
              setlastCommand(inputValue)
              break;

            case '> \clear':
              setInputValue('> ')
              setMessages([])
              setlastCommand(inputValue)
              break;

            case '> \signup':
              setMessages(['NAME: '])
              setlastCommand('n4m3')
              setInputValue('')
              break;


            case '> \last':
              setInputValue('> ')
              setMessages([...messages, lastCommand])
              break;

            default:

              if (inputValue.trim() !== '') {
                setMessages([...messages, `command: ${inputValue} not found. Use 'help' to see commands.`]);
                setInputValue('> ');
              }
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
          <p>User: {name}</p>
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
