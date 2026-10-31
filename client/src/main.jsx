import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {AuthProvider,ContentProvider} from './context/PlatformContext';
import './platform.css';
import {StoreProvider} from './context/StoreContext';
import './legacy.css';
import './react.css';
import './brand-home.css';
createRoot(document.getElementById('root')).render(<React.StrictMode><AuthProvider><ContentProvider><StoreProvider><App/></StoreProvider></ContentProvider></AuthProvider></React.StrictMode>);
import './readability.css';

import './home-october-update.css';

import './japanese-pages.css';

import './reference-oct18.css';

import './storefront-oct31.css';
import './client-feedback.css';
