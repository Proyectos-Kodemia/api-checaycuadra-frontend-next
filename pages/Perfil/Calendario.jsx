import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Schedule from '../../components/AccountPages/Schedule'

function calendar () {
  return (
    <div>
      <Layout>
        <LateralBar />
        <Schedule />
      </Layout>
    </div>
  )
}
export default calendar
