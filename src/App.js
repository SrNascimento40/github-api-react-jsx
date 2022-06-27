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
//{execute}, [conditional variables, if this array is empty, it only executes once]
//await: The keyword "await" makes JavaScript wait until that promise settles and returns its result
//async: always i use await, should have async in the function

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite)

    document.title = `You have ${filtered.length} repositories`
  }, [repositories])
//[with this conditionant, the useEffect will run when repositories change]
//filter gonna get only repos with favorite


  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? {...repo, favorite: !repo.favorite} : repo
    })

    setRepositories(newRepositories)
  }

  return (
    <>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span> (Favorito)</span>}
            <button onClick={() => handleFavorite(repo.id)}>
              Favoritar
            </button>
          </li>
          // arrow function on onClick is for ensuring the function will run first
        ))}
      </ul>
    </>
  );
}
