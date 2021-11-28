import React from 'react';
import {NavLink} from "react-router-dom";
import { auth,db } from '../firebase';
import { useGlobalContext } from '../context/context';
import { signOut } from '@firebase/auth';
import { updateDoc,doc } from '@firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Nabvar = () => {
    const user = useGlobalContext();
    const navigate = useNavigate();

    const hendlesignout = async() => {
        await updateDoc(doc(db, "users", auth.currentUser.uid),{
            isOnline: false,
        })

        await signOut(auth);
        navigate("/login");
    };

    return (
        <>
          <nav>
              <h3>
                  <NavLink to="/">Messenger</NavLink>
              </h3>
              <div>
                  {user ? 
                  <>
                  <NavLink to="/profile"> Profile</NavLink>
                  <button className="btn" onClick={hendlesignout}>Logout</button>
                  </>
                  :
                  <>
                  <NavLink to="/register"> Resister</NavLink>
                  <NavLink to="/login"> Login </NavLink>
                  </>
                 }
              </div>
          </nav>
        </>
    )
}

export default Nabvar
