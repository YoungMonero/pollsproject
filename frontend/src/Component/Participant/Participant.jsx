import React, {useState} from 'react'
import styles from './styles.module.css'
import {ArrowRight} from 'lucide-react'

const Participant = () => {
    
    const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
  };

    
  return (
   <div className={styles.body}>
     <div className={styles.participant}>
      <h2>Joining as a participant ?</h2>
      <p>No account needed</p>
      <div className={styles.handleinput}>
          <form onSubmit={handleSubmit} >
        <label>
          <span>#</span>
          <input
            type="text"
            placeholder="Enter slido code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </label>
        <button type="submit" onClick={() => handleNavigation("./Session")}><ArrowRight/></button>
      </form>
      </div>
    </div>
   </div>
  )
}

export default Participant
