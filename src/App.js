import React from "react";
import { app } from "./firebase";
import { getFirestore } from "firebase/firestore";
 import Nabvar from "./components/Nabvar";
 import Home from "./pages/Home";
 import Login from "./pages/Login";
 import Profile from "./pages/Profile";
 import Register from "./pages/Register";
 import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
 import AppProvider from "./context/context";
 import PrivateRoute from "./components/PrivateRoute";


function App() {

  return (
    <>
    <AppProvider>
    <BrowserRouter>
      <Nabvar/>
      <Routes>
        <Route path="/" element={<PrivateRoute/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </BrowserRouter>
    </AppProvider>
    </>
  );
}

export default App;
