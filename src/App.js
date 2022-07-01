import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import AdiminLogin from './components/AdminLogin/AdminLogin';
import Dashboard from './components/Dashboard/Dashboard';
import AssetDetails from './components/AssetDetails/AssetDetails';
import CreateAsset from './components/CreateAsset/CreateAsset';
import AssetHolding from './components/AssetHolding/AssetHolding';
import UserLogin from './components/UserLogin/UserLogin';
import AddUser from './components/AddUser/AddUser';
import Audit from './components/Audit/Audit';
import ErrorPage from './components/ErrorPage/ErrorPage';
import ViewUserHoldings from './components/ViewUserHoldings/ViewUserHoldings';



function App() {
  return (
      <Router>
        <Routes>
          <Route exact path='/' element={<UserLogin/>}></Route>
          <Route exact path='/user' element={<AssetHolding/>}></Route>
          <Route exact path='/admin' element={<AdiminLogin/>}></Route>
          <Route exact path='/dashboard' element={<Dashboard/>}></Route>
          <Route exact path='/asset-details' element={<AssetDetails/>}></Route>
          <Route exact path='/create-asset' element={<CreateAsset/>}></Route>
          <Route exact path='/add-user' element={<AddUser/>}></Route>
          <Route exact path='/audit' element={<Audit/>}></Route>
          <Route exact path='/view-user-holdings' element={<ViewUserHoldings/>}></Route>
          <Route path='*' element={<ErrorPage/>}></Route>
        </Routes>
      </Router>
      
  )
      
}


export default App;
