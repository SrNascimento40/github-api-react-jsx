import React, { useState, useEffect } from 'react';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  /* function handleAddRepository() {
    setRepositories([...repositories, {id: Math.random(), name:"Novo repositório"}])
  } */

  useEffect(() => {
    async function AddingRepos() {
      const response = await fetch('https://api.github.com/users/SrNascimento40/repos');
      const data = await response.json();

      setRepositories(data)
    }
    AddingRepos() 
  }, [])
//{executar}, [variaveis condicionantes, se esse array estiver vazio só executa uma vez]
//await: The keyword "await" makes JavaScript wait until that promise settles and returns its result
//async: sempre que usar await, antes deve ter async na função


  return (
    <>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </>
  );
}
