import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {StoreProvider} from './context/StoreContext';
import './legacy.css';
import './react.css';
import './brand-home.css';
createRoot(document.getElementById('root')).render(<React.StrictMode><StoreProvider><App/></StoreProvider></React.StrictMode>);
