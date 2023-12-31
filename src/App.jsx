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
  const [earnings, setearnings] = useState(0)




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



  ///buyService
  const [serviceId, setserviceId] = useState(0)
  const [serviceQtd, setserviceQtd] = useState(0)



  ///signup
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')


  ///transactions
  const [transactions, settransactions] = useState(0)


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
    setlastCommand('searched')

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/services/user/${username}`);
      console.log(response.data.rows);
      console.log(response.data[0]); // Trate a resposta da API conforme necessário
      setservices(response.data)
      response.data[0].includes('USER DOES NOT HAVE ANY SERVICES') ? setMessages(['USER ' + username + ' DOES NOT HAVE ANY SERVICE!']) : setMessages(['SUCCESS: GET SERVICES BY USERNAME!'])

      setInputValue('> ')



    } catch (error) {


      console.error(error);
      setMessages(['ERROR: ', error.response.data])

      setlastCommand('error')
      setInputValue('> ')
    }

  }


  //função para comprar serviço
  const buyService = async () => {
    setlastCommand('bought')

    const data = {
      buyer: name,
      serviceQtd: serviceQtd,
      token: token,
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/services/buy/${serviceId}`, data);
      console.log(response.data);
      setserviceId(0)
      setserviceQtd(0)
      setMessages(['SUCCESS! SERVICE BOUGHT!'])

      setInputValue('> ')



    } catch (error) {


      console.error(error);
      setMessages(['ERROR: ', error.response.data])

      setlastCommand('error')
      setInputValue('> ')
    }

  }

  ///função para desativar serviço
  const deactivateService = async () => {
    setlastCommand('deactiv4ted')

    const data = {
      creatorEmail: email,
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/services/deactivate/${serviceId}`, data);
      console.log(response.data);
      setserviceId(0)
      setMessages(['SUCCESS! SERVICE DEACTIVATED!'])

      setInputValue('> ')



    } catch (error) {


      console.error(error);
      setMessages(['ERROR: ', error.response.data])

      setlastCommand('error')
      setInputValue('> ')
    }

  }

  ///função para sativar serviço
  const activateService = async () => {
    setlastCommand('activ4ted')

    const data = {
      creatorEmail: email,
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/services/activate/${serviceId}`, data);
      console.log(response.data);
      setserviceId(0)
      setMessages(['SUCCESS! SERVICE ACTIVATED!'])

      setInputValue('> ')



    } catch (error) {


      console.error(error);
      setMessages(['ERROR: ', error.response.data])

      setlastCommand('error')
      setInputValue('> ')
    }

  }

  ///função para cancelar serviço
  const cancelService = async () => {
    setlastCommand('c4nc3l3d')

    const data = {
      buyer: name,
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/services/cancel/${serviceId}`, data);
      console.log(response.data);
      setserviceId(0)
      setMessages(['SUCCESS! SERVICE CANCELED!'])

      setInputValue('> ')



    } catch (error) {


      console.error(error);
      setMessages(['ERROR: ', error.response.data])

      setlastCommand('error')
      setInputValue('> ')
    }

  }


  ///função para entregar serviço
  const deliverService = async () => {
    setlastCommand('d#liver33dd')

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/services/deliver/${serviceId}`);
      console.log(response.data);
      setserviceId(0)
      setMessages(['SUCCESS! SERVICE DELIVERED!'])

      setInputValue('> ')



    } catch (error) {


      console.error(error);
      setMessages(['ERROR: ', error.response.data])

      setlastCommand('error')
      setInputValue('> ')
    }

  }


  //função para obter as minhas transações
  const getTransactions = async () => {



    setlastCommand('sh0w0rd3rs')
    settransactions(1)

    const data = {
      buyer: name,
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/services/transactions/${name}`);
      console.log(response);
      setservices(response.data)
      setMessages(['SUCCESS: GET YOUR TRANSACTIONS!'])
      setInputValue('> ')



    } catch (error) {


      console.error(error);
      setMessages(['ERROR: ', error.response.data])

      setlastCommand('error')
      setInputValue('> ')
    }

  }

///chijo
function redirectToYouTube() {
  window.location.href = 'https://youtu.be/zS9wOoN0oI4';
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
          setearnings(response.data.earnings)
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


      } else if (lastCommand.includes('s3archu53r')) {
        setusername(inputValue.replace(/[\s>]+/g, ''))
        setInputValue('')
        setMessages(['PRESS ENTER TO CONTINUE... '])
        setlastCommand('searching')
      } else if (lastCommand.includes('searching')) {
        getServicesbyCreator();
      } else if (lastCommand.includes('bser1d')) {
        setserviceId(inputValue.replace(/[\s>]+/g, ''))
        setInputValue('')
        setMessages(['SERVICE QUANTITY: Integer only - ex: 1,2,3...'])
        setlastCommand('bserqtd')
      } else if (lastCommand.includes('bserqtd')) {
        setserviceQtd(inputValue.replace(/[\s>]+/g, ''))
        setInputValue('')
        setMessages(['PRESS ENTER TO CONTINUE...'])
        setlastCommand('buying')
      } else if (lastCommand.includes('buying')) {
        buyService();
      } else if (lastCommand.includes('deacid')) {
        setserviceId(inputValue.replace(/[\s>]+/g, ''))
        setInputValue('')
        setMessages(['PRESS ENTER TO CONTINUE...'])
        setlastCommand('deactivating')
      } else if (lastCommand.includes('deactivating')) {
        deactivateService();
      } else if (lastCommand.includes('activate')) {
        setserviceId(inputValue.replace(/[\s>]+/g, ''))
        setInputValue('')
        setMessages(['PRESS ENTER TO CONTINUE...'])
        setlastCommand('activatingo')
      } else if (lastCommand.includes('activatingo')) {
        activateService();
      } else if (lastCommand.includes('cancel')) {
        setserviceId(inputValue.replace(/[\s>]+/g, ''))
        setInputValue('')
        setMessages(['PRESS ENTER TO CONTINUE...'])
        setlastCommand('canc3ling')
      } else if (lastCommand.includes('canc3ling')) {
        cancelService();
      } else if (lastCommand.includes('d3l1v3r')) {
        setserviceId(inputValue.replace(/[\s>]+/g, ''))
        setInputValue('')
        setMessages(['PRESS ENTER TO CONTINUE...'])
        setlastCommand('d3l1ver1ng')
      } else if (lastCommand.includes('d3l1ver1ng')) {
        deliverService();
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
                settransactions(0)
                break;

              case '> \clear':
                setInputValue('> ')
                setMessages([])
                setservices([])
                setlastCommand(inputValue)
                settransactions(0)
                break;

              case '> \signup':
                setMessages(['NAME: '])
                setlastCommand('n4m3')
                setInputValue('')
                setservices([])
                settransactions(0)
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
                settransactions(0)
                break;

              case '> \home':
                getServices();
                settransactions(0)
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
            showvices - To display all your created services |
            searchuser - To search for an user's services.. |
            sbuy - To buy a service. |
            deacvices - To deactivate a service that belongs to you. |
            activate - To activate a service that belongs to you. |
            scancel - To cancel a service that is in progress. |
            showorders - To show all your services orders. |
            sdeliver - To deliver a service. |
            mrschijo - If you are in good humor. |
           `])
                setlastCommand(inputValue)
                break;

              case '> \clear':
                setInputValue('> ')
                setMessages([])
                setservices([])
                setlastCommand(inputValue)
                settransactions(0)
                break;

              case '> \home':
                getServices();
                settransactions(0)
                break;

              case '> \signup':
                setMessages(['NAME: '])
                setlastCommand('n4m3')
                setInputValue('')
                setservices([])
                settransactions(0)
                break;

              case '> \services':
                setMessages(['CREATE SERVICE - SERVICE TITLE: '])
                setlastCommand('sertitle')
                setInputValue('')
                setservices([])
                settransactions(0)
                break;


              case '> \sbuy':
                setMessages(['BUY SERVICE - SERVICE ID: '])
                setlastCommand('bser1d')
                setInputValue('')
                settransactions(0)
                break;

              case '> \showvices':
                setlastCommand(inputValue)
                getServicesMe();
                settransactions(0)
                break;

              case '> \deacvices':
                setMessages(['DEACTIVATE SERVICE - SERVICE ID: '])
                setlastCommand('deacid')
                setInputValue('')
                settransactions(0)
                break;

              case '> \activate':
                setMessages(['ACTIVATE SERVICE - SERVICE ID: '])
                setlastCommand('activate')
                setInputValue('')
                settransactions(0)
                break;

              case '> \scancel':
                setMessages(['CANCEL SERVICE - SERVICE ID: '])
                setlastCommand('cancel')
                setInputValue('')
                settransactions(0)
                break;

              case '> \showorders':
                setlastCommand(inputValue)
                getTransactions()
                break;

              case '> \sdeliver':
                setMessages(['DELIVER SERVICE - SERVICE ID: '])
                setlastCommand('d3l1v3r')
                setInputValue('')
                settransactions(0)
                break;

              case '> \mrschijo':
                setMessages(['DO YOU KNOW WHAT YOU DID?'])
                redirectToYouTube();
                break;

              case '> \searchuser':
                setMessages(['CREATOR NAME: '])
                setlastCommand('s3archu53r')
                setInputValue('')
                settransactions(0)
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
                settransactions(0)
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
                settransactions(0)
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
          <p>{token ? 'User:' : 'Not Logged'} {name}</p>
          {token ? <p>Earnings: {earnings}</p> : ''}
          <p>==============================</p>
        </header>


        {transactions === 1 ? <div className={`conditional-div ${services ? 'visible' : 'hidden'}`} >
          {services.map((service, index) => (
            <div key={index} className='service'>
              <p style={{ display: 'flex', flexDirection: 'row-reverse' }}>{service.id}</p>
              <p>{service.creator}</p>
              <p>BUYER: {service.buyer}</p>
              <p>SELLER: {service.seller}</p>
              <p>QUANTITY: {service.serviceqtd}</p>
              <p>PRICE: {service.transactionprice} | STATUS: {service.transactionstatus}</p>
              {/* Renderize outras propriedades conforme necessário */}
            </div>
          ))}
        </div> : <div className={`conditional-div ${services ? 'visible' : 'hidden'}`} >
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
        }


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
