import React, { useEffect, useState } from 'react';
import { useMatch, useParams, RouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/Logo.svg';

import { Header, RepositoryInfo, Issues } from './style';

interface Repository {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    owner: {
        login: string;
        avatar_url: string;
    };
}

interface Issue {
    id: number;
    title: string;
    html_url: string;
    user: {
        login: string;
        //avatar_url: string;
    };
    //created_at: string;
}

const Repository: React.FC = () => {
    const [repo, setRepo] = useState<Repository | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);

    const { '*': repository } = useParams();

    useEffect(() => {
        //Dois modos de fazer
        // 1:
        api.get(`/repos/${repository}`).then((response) => {
            setRepo(response.data);
        });

        api.get(`/repos/${repository}/issues`).then((response) => {
            setIssues(response.data);
        });
        //2:
        //async function loadData(): Promise<void> {
        //    const [repoData, issuesData] = await Promise.all([
        //         api.get(`/repos/${repository}`),
        //         api.get(`/repos/${repository}/issues`),
        //     ]);
        //  }
        //
        //  loadData();
    }, [repository]);

    return (
        /*<h1>Teste: {repository}</h1>;*/
        <>
            <Header>
                <img src={logoImg} alt="GithubExplore" />
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>

            {repo && (
                <RepositoryInfo>
                    <header>
                        <img
                            src={repo.owner.avatar_url}
                            alt={repo.owner.login}
                        />
                        <div>
                            <strong>{repo.full_name}</strong>
                            <p>{repo.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repo.stargazers_count}</strong>
                            <span>stars</span>
                        </li>
                        <li>
                            <strong>{repo.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repo.open_issues_count}</strong>
                            <span>Issues abertas</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}

            <Issues>
                {issues.map((issue) => (
                    <a key={issue.id} href={issue.html_url} target="__blank">
                        <div>
                            <strong>{issue.title}</strong>
                            <p>{issue.user.login}</p>
                        </div>
                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Issues>
        </>
    );
};

export default Repository;

/*<h1> TESTEE</h1>
            <img src={logoImg} alt="Github Explore" />

            <Profile>
                <img
                    src="https://avatars.githubusercontent.com/u/114500655?v=4"
                    alt="Leonardo"
                />
                <div>
                    <strong>Leonardo</strong>
                    <p>Descrição do repo</p>
                </div>
            </Profile>
            <h1>Separando</h1>
            <Repositories>
                <a href="Github.com">
                    <div>
                        <strong>TrabalhoWeb2</strong>
                        <p>Trabalho crude para faculdade</p>
                    </div>
                    <FiChevronRight size={20} />
                </a>
            </Repositories>*/
