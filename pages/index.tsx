import type { NextPage } from 'next'
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
      <div className={styles.container}>
       <h2>This is Home page</h2>
       <Image width="800" height="533" src='/Images/HomeImage.jpg' alt='Home'/>
      </div>
  )
}

export default Home
