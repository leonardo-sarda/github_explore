import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';
import RoutesComponent from './routes';

const App: React.FC = () => (
    <>
        <BrowserRouter>
            <RoutesComponent />
        </BrowserRouter>
        <GlobalStyle />
    </>
);

export default App;
