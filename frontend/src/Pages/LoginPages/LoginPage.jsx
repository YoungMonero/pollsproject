import React from 'react'
import Participant from '../../Component/Participant/Participant'
import Login from '../../Component/Login/Login'
import styles from './styles.module.css'

const LoginPage = () => {
  return (
    <div className={styles.login}>
      <Participant/>
      <Login/>
    </div>
  )
}

export default LoginPage
