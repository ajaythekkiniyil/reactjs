import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './app.css';
import './components/AdminLogin/AdminLogin.css'
import './components/Dashboard/Dashboard.css'
import './components/AssetDetails/AssetDetails.css'
import './components/CreateAsset/CreateAsset.css'
import './components/AssetHolding/AssetHolding.css'
import './components/UserLogin/UserLogin.css'
import './components/Users/Users.css'
import './components/TotalAssets/TotalAssets.css'
import './components/DashboardView/DashboardView.css'
import './components/Audit/Audit.css'

// mdbootstrap
// import 'mdbreact/dist/css/mdb.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
