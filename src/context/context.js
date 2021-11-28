import { useContext, useState, createContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Loading from "../components/Loading";

const AppContext = createContext();

const AppProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }




    return (
    <AppContext.Provider value={user}>
    {children}
    </AppContext.Provider>
    )

}

export const useGlobalContext = () =>{
    return useContext(AppContext);
}

export default AppProvider;