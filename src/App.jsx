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
  const [dev, setdev] = useState(0)
  const [token, settoken] = useState('')
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(1);




  ///services
  const [creator, setcreator] = useState('')
  const [creatorEmail, setcreatorEmail] = useState('')
  const [serviceName, setserviceName] = useState('')
  const [serviceDescription, setserviceDescription] = useState('')
  const [serviceCategory, setserviceCategory] = useState('')
  const [servicePrice, setservicePrice] = useState(0)
  const [serviceDeadline, setserviceDeadline] = useState('')
  const [services, setservices] = useState([])
  const [username, setusername] = useState('')





  ///signup
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')


  ///
 

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  //função para obter os servicos
  const getServices = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/services`);
      console.log(response.data); // Trate a resposta da API conforme necessário
      setservices(response.data)
      setMessages(['SUCCESS: GET SERVICES!'])
      setInputValue('> ')



    } catch (error) {


      console.error(error);
      setMessages(['ERROR: ', error.response.data])

      setlastCommand('error')
      setInputValue('> ')
    }

  }

  //função para obter os meus serviços
  const getServicesMe = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/services/${email}`);
      console.log(response.data); // Trate a resposta da API conforme necessário
      setservices(response.data)
      setMessages(['SUCCESS: GET OWN SERVICES!'])
      setInputValue('> ')



    } catch (error) {


      console.error(error);
      setMessages(['ERROR: ', error.response.data])

      setlastCommand('error')
      setInputValue('> ')
    }

  }

    //função para obter serviços por usuário
    const getServicesbyCreator = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/services/${email}`);
        console.log(response.data); // Trate a resposta da API conforme necessário
        setservices(response.data)
        setMessages(['SUCCESS: GET OWN SERVICES!'])
        setInputValue('> ')
  
  
  
      } catch (error) {
  
  
        console.error(error);
        setMessages(['ERROR: ', error.response.data])
  
        setlastCommand('error')
        setInputValue('> ')
      }
  
    }
  

  const handleCommandInputKeyDown = async (e) => {

    if (e.key === 'Enter') {
      e.preventDefault();


      setCommandHistory([...commandHistory, inputValue])







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
          setMessages(['ERROR: ', error.response.data])
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
      }   ///login

      else if (lastCommand.includes('log1n')) {
        setemail(inputValue.replace(/[\s>]+/g, ''))
        setInputValue('')
        setMessages(['Password: '])
        setlastCommand('logword')
      }
      else if (lastCommand.includes('logword') && email) {

        setpassword(inputValue.replace(/[\s>]+/g, ''))
        setInputValue('')
        setMessages(['Logging... PRESS ENTER TO CONTINUE '])
        setlastCommand('logw0rding')
      } else if (lastCommand.includes('logw0rding')) {

        const data = {
          email,
          password,
        };


        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, data);
          console.log(response.data); // Trate a resposta da API conforme necessário
          setname(response.data.name)
          setemail(response.data.email)
          settoken(response.data.token)
          setlastCommand('')
          setMessages(['SUCCESS: LOGGED IN! New commands have been unlocked. Use the "help" command to explore the new functions.'])
          setInputValue('> ')



        } catch (error) {


          if (!email) {
            setMessages(["ERROR: Email cannot be empty"])
            setemail("")
            setpassword("")
            setlastCommand('error')
            setInputValue('')
          }

          else if (!password) {
            setMessages(["ERROR: Password cannot be empty"])
            setemail("")
            setpassword("")
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


          console.error(error);
          setMessages(['ERROR: ', error.response.data])
          setname("")
          setemail("")
          setpassword("")
          setconfirmPassword("")
          setlastCommand('error')
          setInputValue('> ')
        }


      } else if (lastCommand.includes('sertitle')) {
        setserviceName(inputValue.replace(/[\s>]+/g, ''))
        setInputValue('')
        setMessages(['SERVICE DESCRIPTION: '])
        setlastCommand('sercription')

      } else if (lastCommand.includes('sercription') && token) {
        setserviceDescription(inputValue.replace(/[\s>]+/g, ''))
        setInputValue('')
        setMessages(['SERVICE CATEGORY: '])
        setlastCommand('sercat')

      } else if (lastCommand.includes('sercat') && token) {
        setserviceCategory(inputValue.replace(/[\s>]+/g, ''))
        setInputValue('')
        setMessages(['SERVICE PRICE: EX: 45.00 - number only'])
        setlastCommand('serprice')

      } else if (lastCommand.includes('serprice') && token) {
        setservicePrice(inputValue.replace(/[\s>]+/g, ''))
        setInputValue('')
        setMessages(['SERVICE DEADLINE: Maximum days needed to finish the job.'])
        setlastCommand('serline')
      }
      else if (lastCommand.includes('serline') && token) {
        setserviceDeadline(inputValue.replace(/[\s>]+/g, ''))
        setInputValue('')
        setMessages(['CREATING SERVICE... PRESS ENTER TO CONTINUE '])
        setlastCommand('creserv')

      } else if (lastCommand.includes('creserv')) {
        setcreator(name)
        setcreatorEmail(email)


        const data = {
          creator,
          creatorEmail,
          serviceName,
          serviceCategory,
          serviceDeadline,
          serviceDescription,
          servicePrice,
          token
        };


        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/services`, data);
          console.log(response.data); // Trate a resposta da API conforme necessário
          setlastCommand('')
          //setcreator('');
          //setcreatorEmail('');
          setserviceName('');
          setserviceDescription('');
          setserviceCategory('');
          setservicePrice(0);
          setserviceDeadline('');
          setMessages(['SUCCESS: SERVICE CREATED! You can check the service in the homepage using the command "home" or in your services using the command for that.'])
          setInputValue('> ')



        } catch (error) {


          console.error(error);
          setMessages(['ERROR: ', error.response.data])

          setlastCommand('error')
          setInputValue('> ')
        }


      }



      else {


        if (!inputValue.includes('>')) {
          setInputValue('> ')
          setMessages([...messages, 'ERROR: > NEEDED TO USE TERMINAL'])
        } else {
          console.log(inputValue)


          if (!token) {
            switch (inputValue) {
              case '> \log':
                setInputValue('> ')
                setMessages([...messages, 'LOG: ' + messages])
                setlastCommand(inputValue)
                // setCommandHistory([...commandHistory, lastCommand])
                break;
              case '> \help':
                setInputValue('> ')
                setMessages([...messages, `log - See all history logs. |
            help - See all commands. |
            login - To login. |
            signup - To register. |
            home - To go to main page. |
            clear - Clear screen. |
            last - See last command used. |
           `])
                setlastCommand(inputValue)
                break;

              case '> \clear':
                setInputValue('> ')
                setMessages([])
                setservices([])
                setlastCommand(inputValue)
                break;

              case '> \signup':
                setMessages(['NAME: '])
                setlastCommand('n4m3')
                setInputValue('')
                setservices([])
                break;


              case '> \last':
                setInputValue('> ')
                setMessages([...messages, lastCommand])
                break;

              case '> \login':
                setMessages(['EMAIL: '])
                setlastCommand('log1n')
                setInputValue('')
                setservices([])
                break;

              case '> \home':
                getServices();
                break;

              case '> \dev':
                setMessages(dev === 0 ? ['DEVMODE ACTIVATED'] : ['DEVMODE DEACTIVATED'])
                setlastCommand('dev')
                setdev(dev === 0 ? 1 : 0)
                setInputValue('> ')
                break;

              default:

                if (inputValue.trim() !== '') {
                  setMessages([...messages, `command: ${inputValue} not found or you don't have permission to use it. Use 'help' to see commands.`]);
                  setInputValue('> ');
                }
            }
          } else {
            ///logged user
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
            services - To create a service. |
            showvices - To display all your services |
            searchuser - To search for an user. |
           `])
                setlastCommand(inputValue)
                break;

              case '> \clear':
                setInputValue('> ')
                setMessages([])
                setservices([])
                setlastCommand(inputValue)
                break;

                case '> \home':
                  getServices();
                  break;

              case '> \signup':
                setMessages(['NAME: '])
                setlastCommand('n4m3')
                setInputValue('')
                setservices([])
                break;

              case '> \services':
                setMessages(['SERVICE TITLE: '])
                setlastCommand('sertitle')
                setInputValue('')
                setservices([])
                break;
              
                case '> \showvices':
                  setlastCommand(inputValue)
                  getServicesMe();
                  break;


              case '> \last':
                setInputValue('> ')
                setMessages([...messages, lastCommand])
                break;

              case '> \login':
                setMessages(['EMAIL: '])
                setlastCommand('log1n')
                setInputValue('')
                setservices([])
                break;

              case '> \logout':
                setMessages(['LOGOUT SUCCESS! '])
                setlastCommand('logout')
                setcount(0)
                settoken('')
                setname('')
                setemail('')
                setpassword('')
                setconfirmPassword('')
                setInputValue('> ')
                break;

              case '> \dev':
                setMessages(['DEVMODE ACTIVATED'])
                setlastCommand('dev')
                setdev(1)
                setInputValue('> ')
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
    } else if (e.key === "ArrowUp") {

      // Tecla de seta para cima
      e.preventDefault();
      const previousCommand = commandHistory[commandHistory.length - currentCommandIndex];
      if (currentCommandIndex > commandHistory.length) {
        setInputValue(previousCommand)
        setCurrentCommandIndex(currentCommandIndex - 1)
      } else {
        setCurrentCommandIndex(currentCommandIndex + 1);
        console.log("ArrowUp - previouscommand:", previousCommand)
        console.log("ArrowUp - commandhistory:", commandHistory)
        console.log("ArrowUp - command.lenght:", commandHistory.length)
        console.log("ArrowUp - currentCommandIndex:", currentCommandIndex)
        setInputValue(previousCommand);
      }

    } else if (e.key === "ArrowDown") {

      // Tecla de seta para baixo
      e.preventDefault();
      if (currentCommandIndex > 0) {
        const previousCommand = commandHistory[commandHistory.length - currentCommandIndex + 1];
        setCurrentCommandIndex(currentCommandIndex - 1);
        console.log("ArrowDown - previouscommand:", previousCommand)
        console.log("ArrowDown - commandhistory:", commandHistory)
        console.log("ArrowDown - currentCommandIndex:", currentCommandIndex)
        setInputValue(previousCommand);
      } else {
        setInputValue("");
        setCurrentCommandIndex(-1);
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
          {dev === 1 ? <p>LastCommand: {lastCommand} </p> : ''}
          {dev === 1 ? <p>CommandHistory: {commandHistory} </p> : ''}
          <p>User: {name}</p>
          <p>==============================</p>
        </header>

        
        <div className={`conditional-div ${services ? 'visible' : 'hidden'}`} >
          {services.map((service, index) => (
            <div key={index} className='service'>
              <p style={{ display: 'flex', flexDirection: 'row-reverse' }}>{service.id}</p>
              <p>{service.creator}</p>
              <p>TITLE: {service.servicename}</p>
              <p>CATEGORY: {service.category}</p>
              <p>DESCRIPTION: {service.servicedescription}</p>
              <p>DEADLINE: {service.deadline} | PRICE: {service.price}</p>
              {/* Renderize outras propriedades conforme necessário */}
            </div>
          ))}
        </div>
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
          type={email ? (password ? 'text' : 'password') : undefined}
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
