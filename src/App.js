import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Components
import Login from './Components/Login';
import Register from './Components/Register';
import AddData from './Components/AddData';
import DataTable from './Components/DataTable';
import { createContext, useState } from 'react';

export let userContext = createContext();

const App = () => {

  const [user, setUser] = useState("");


  return (
    <>
    <userContext.Provider value={{user, setUser}}>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/addData' element={<AddData />} />
            <Route path='/dataTable' element={<DataTable />} />
          </Routes>
        </BrowserRouter>
    </userContext.Provider>
      
    </>
  );
}

export default App;
