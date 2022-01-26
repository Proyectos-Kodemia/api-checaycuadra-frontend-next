import React, { useState } from 'react'
import Head from './Head'
import Card from './Card/Card'

function Search () {
  const [users, setUsers] = useState([])
  const [buscar, setBuscar] = useState('')
  const [results, setResults] = useState(0)
  // const [valueStar, setValueStar] = useState(5)
  console.log(users)
  return (
    <div className='principalBox'>
      <Head users={users} setResults={setResults} setUsers={setUsers} buscar={buscar} setBuscar={setBuscar} />

      <div className='textEspecialist'>
        <div>Especialistas en </div>
        <div>{results} resultados para la busqueda</div>
      </div>
      <div className='cards'>
        {users
          .map(({_id, name, lastname, degree, profileImage, description, role, evaluation, address, Schedule }) => (
            <Card key={_id} idAccount={_id} name={name} lastname={lastname} degree={degree} profileImage={profileImage} description={description} role={role} evaluation={evaluation} address={address} Schedule={Schedule} />
          ))}
      </div>
    </div>
  )
}

export default Search
