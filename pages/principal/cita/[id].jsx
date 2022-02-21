import { useState, useEffect } from 'react';
import Head from 'next/head'
import FooterPage from '../../../components/FooterPage'
import NavPage from '../../../components/NavPage'
import Appointment from '../../../components/appointment/appointment'
import { useRouter } from "next/router";
import Snackbar from '../../../components/Notifications/Snackbar'
import { URL_FULL } from '../../../services/config'

// import { RouterTwoTone } from '@material-ui/icons';
// Import material component (toast)
// Opcion crear componente de toast para reausarlo

function Cita ({ children, title = 'Checa y Cuadra' }) {
  
  const router = useRouter()
  const {id} = router.query
  const code = router.query.code
  // console.log("code google", code)
  
  const [accountUser, setAccountUser]=useState({
    name:"",
    lastname:"",
    degree:"",
    degreeId:"",
    profileImage:"",
    description:"",
    role:"",
    evaluation:"",
    specialities:[{
      id:0,
      title:""
    }],
    address:{
      town:"",
      state:""
    },
    Schedule:{
      costHour:"",
    }
  })
  // Fetch de seleccion de card
 
  useEffect(() => {
    
    // console.log("llega el id <use effect>",router)
    if(router.isReady){
      const endpoint=`${URL_FULL}/account/${id}`
    
      // console.log(endpoint)
      const optionsAccount = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
      // console.log(endpoint)
      fetch(`${endpoint}`,optionsAccount).then((res) => {
        res.json().then((value) => {
       //   console.log('resultado value', value)
          setAccountUser(value)
          // setUsers(data.payload) // Revisar
        })
      })
    }
  }, [id])

  const {name, lastname, degree,degreeId,profileImage, description, role, evaluation, specialities, address, Schedule,schedules} = accountUser
//  console.log("todo el objeto en id", accountUser)
  
 // console.log("en id", schedules)
  // console.log('especialidades',specialities)

  // proceso de pago
  const statusPayment = router.query.collection_status

    async function LoginAccount (url) {
      // console.log("entrando a la funcion")
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch(url, options)
      return response.json()
    }

    // const token = sessionStorage.getItem('token')
    //   console.log(token.token)
    //   console.log(token)  


    // Enviar el patch de cita con el boton de confirmar cita
    // Aqui se crea el meeting de google

    const handlerAuthGoogle = async (e)=>{
      e.preventDefault()
      const token = sessionStorage.getItem('token')
      // console.log("tokenn en el handler",token)
      const endpointMeeting = `${URL_FULL}/metting`
      // const endpointAuthGoogle = `${URL_FULL}/google/auth`

      if(statusPayment === "approved"){
          const data = {
            userAccount: id,
            starDate:"2022-01-24T17:00",
            endDateTime:"2022-01-24T18:00",
            title:`consultoria ${name} ${lastname}`,
            unit_price:Schedule.costHour,
            quantity:"1",
            statusPayment: statusPayment
          }
          // post
          const optionsMeeting = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'token': token  // Enviar en el post el token de JWT
            },
            body: JSON.stringify(data)
            
          }
          const response = await fetch(endpointMeeting, optionsMeeting).then((res) => {
            res.json().then((value) => {
              console.log('Objeto Id cita', value)

              const idMeeting = value.payload.meetCreated._id
              window.localStorage.setItem('idMeeting',idMeeting)
         //     console.log("id Meeting",idMeeting)

              return idMeeting
            })
          })



          
    //      console.log("response Prueba Id", responsePrueba)
          // Obtener el id de la cita 
      

          // const optionsAuthGoogle = {
          //   method: 'POST',
          //   redirect:'follow',
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'token': token  // Enviar en el post el token de JWT
          //   },
          // }

          // await LoginAccount(endpointAuthGoogle)
          // .then(response =>{
          //   // location.href = response.payload.authUrl
          //   })
          // .catch(error =>{
          //   console.log(error)
          // })
      }
    }

    // const createMeeting = async (e)=>{
    //   console.log (" en id - createMeeting, finalClickinfo",finalClickInfo)
      
    //   const {starDateTime,endDateTime} = finalClickInfo
    //   e.preventDefault()
    //   const token = sessionStorage.getItem('token')
    //   // console.log("tokenn en el handler",token)
    //   const endpointMeeting = `${URL_FULL}/metting`

    //       const data = {
    //         userAccount: id,
    //         starDate:starDateTime,
    //         endDateTime:endDateTime,
    //         title:`consultoria ${name} ${lastname}`,
    //         unit_price:Schedule.costHour,
    //         quantity:"1",
    //         statusPayment: "pending"
    //       }

    //       console.log("la data en el handler",data)
    //       // post
    //       const optionsMeeting = {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'token': token  // Enviar en el post el token de JWT
    //         },
    //         body: JSON.stringify(data)
            
    //       }
    //       const response = await fetch(endpointMeeting, optionsMeeting).then((res) => {
    //         res.json().then((value) => {
    //           console.log('Objeto Id cita', value)

    //           const idMeeting = value.payload.meetCreated._id
    //           window.localStorage.setItem('idMeeting',idMeeting)
    //      //     console.log("id Meeting",idMeeting)

    //           return idMeeting
    //         })
    //       })



          
    // //      console.log("response Prueba Id", responsePrueba)
    //       // Obtener el id de la cita 
      

    //       // const optionsAuthGoogle = {
    //       //   method: 'POST',
    //       //   redirect:'follow',
    //       //   headers: {
    //       //     'Content-Type': 'application/json',
    //       //     'token': token  // Enviar en el post el token de JWT
    //       //   },
    //       // }

    //       // await LoginAccount(endpointAuthGoogle)
    //       // .then(response =>{
    //       //   // location.href = response.payload.authUrl
    //       //   })
    //       // .catch(error =>{
    //       //   console.log(error)
    //       // })
    //   }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavPage />
      {children}
      <Appointment 
      handlerAuthGoogle = {handlerAuthGoogle}
      id = {id}
      name = {name}
      lastname ={lastname}
      degree = {degree}
      degreeId = {degreeId}
      profileImage = {profileImage}
      description = {description}
      role={role}
      evaluation= {evaluation}
      specialities = {specialities}
      address ={address}
      Schedule = {Schedule}
      times={schedules}
      />
        {statusPayment && (<Snackbar statusPayment={statusPayment} /> )}
      <FooterPage />
    </>
  )
}

export default Cita
