import React, { useState, useEffect, FormEvent } from 'react';
import api from '../../services/api';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom'; //vou usar para trocar de pagina porem nao recarrega tudo denovo, como é a tag A no html

import logoImg from '../../assets/Logo.svg';

import { Title, Form, Repositories, Error } from './style';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputErro] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storageRepositories = localStorage.getItem(
            '@GithubExplore:repositories',
        );
        //verifica se tem algo e se tiver ele salva na pagina se nao retoran vazio
        if (storageRepositories) {
            return JSON.parse(storageRepositories);
        } else {
            return [];
        }
    });

    //salvando para ficar na pagina a cada pesquisa
    useEffect(() => {
        localStorage.setItem(
            '@GithubExplore:repositories',
            JSON.stringify(repositories),
        );
    }, [repositories]);

    async function handleAddRepository(
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        event.preventDefault();

        if (!newRepo) {
            setInputErro('Digite autor/nome do repositorio');
            return;
        }

        try {
            const response = await api.get<Repository>(`repos/${newRepo}`);

            const repository = response.data;

            setRepositories([...repositories, repository]);
            setNewRepo('');
            setInputErro('');
        } catch (err) {
            setInputErro('Repositório não encontrado');
        }

        //adição de um novo Repositorio
        //Consumir Api do Github
        //salva novo repositorio
    }

    return (
        <>
            <img src={logoImg} alt="Github Explore" />
            <Title>Expore Repositorio Github</Title>

            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                    type="text"
                    placeholder="Digite o nome do repositorio"
                />
                <button type="submit">Buscar</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            <Repositories>
                {repositories.map((repository) => (
                    <Link
                        key={repository.full_name}
                        to={`/repositories/${repository.full_name}`}
                    >
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                        <FiChevronRight size={20} />
                    </Link>
                ))}
            </Repositories>
        </>
    );
};

export default Dashboard;

/**
 * function Dashboard() {} é a mesma coisa que const Dashboard = () =>{}
 * São maneiras diferente de fazer
 */
