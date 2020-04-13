import React from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = React.useState([]);

  React.useEffect(() => {
    api.get('/repositories').then(({ data }) => setRepositories(data));
  }, []);

  async function handleAddRepository() {
    const newRepository = { title: `Novo repositório ${Date.now()}` };
    api.post('/repositories', newRepository)
      .then(({ data }) => setRepositories([...repositories, data ]));
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(() => {
      // api removed the item, then we can remove it from the array
      setRepositories(repositories.filter(r => r.id !== id));
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
