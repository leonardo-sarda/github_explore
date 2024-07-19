import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 *
 ReactDom.render(
   <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );

  Pode ser feito desse modo tambem, a diferença que ali em cima tem uma variavel
 */
