import { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import AgentList from '../components/AgentList'
import {
  Heading,
  Button
} from '@chakra-ui/react';
import { freeAgents } from '../data/freeAgents'

export default function Home() {
  const [limit, setLimit] = useState(20);

  const handleLoadClick = () => {
    if(limit + 10 > freeAgents.length) setLimit(freeAgents.length);
    else setLimit(curr => curr + 10);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>CSGO Free Agents</title>
        <meta name="description" content="List of free agents in CSGO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading as="h1" size="2xl" mb={10}>CSGO Free Agents List</Heading>
        <AgentList limit={limit}/>
        <Button colorScheme="teal" onClick={handleLoadClick} mt={5}>Load More</Button>
      </main>
    </div>
  )
}
