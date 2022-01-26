import React from 'react'
import Layout from '../../components/Layout'
import Search from '../../components/Search/Search'
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';


function Buscador () {
  // Pruebas de code de Google - se recibe el code, no se realiza el fetch
  const router = useRouter
  const {query} = useRouter()
  const code = query.code
  console.log("Aqui el code de google",code)

 

  useEffect(() => {

    if(router.isReady){
      const token = sessionStorage.getItem('token')
      console.log(token)
      const endpoint=`http://localhost:8000/google/callback`
    
      console.log(endpoint)
      const optionsGoogle = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token':token
        },
        body:code
      }
      console.log(optionsGoogle)
      fetch(`${endpoint}`,optionsGoogle).then((res) => {
        res.json().then((value) => {
          console.log('resultado google', value)

        })
      })
    }
    
  }, [code])



  return (
    <Layout>
      <Search />
    </Layout>
  )
}

export default Buscador
