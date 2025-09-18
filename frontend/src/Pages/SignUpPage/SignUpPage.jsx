import React from 'react'
import Participant from '../../Component/Participant/Participant'
import Register from '../../Component/Signup/Signup'
import styles from './styles.module.css'

const SignUpPage = () => {
  return (
    <div className={styles.register}>
      <Participant/>
      <Register/>
    </div>
  )
}

export default SignUpPage
