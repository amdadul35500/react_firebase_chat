import React,{useState} from 'react';
import {signInWithEmailAndPassword} from "firebase/auth";
import {updateDoc, doc} from "firebase/firestore";
import { auth,db } from '../firebase';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [data, setData] = useState({
        email:"",
        password:"",
        error: null,
        loading: false,
    });

    const navigate = useNavigate();

    const { email, password, error, loading} = data;

    const handleChange = (e) => {
        setData({
            ...data, [e.target.name] : e.target.value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData({...data, error: null, loading: true})
    
        try{
            //login function
            const result = await signInWithEmailAndPassword(auth, email, password)

            //update document in firebase firestore
            await updateDoc(doc(db, "users", result.user.uid), {
                isOnline: true,
              });

            setData({
                email:"",
                error: null,
                loading: false,
                password:"",
            })

            navigate("/");  
           
        }catch(err){
            setData({...data, error: err.message, loading: false})
            console.log(err);
        };
       
    }

    return (
        <>
          <section>
              <h3>Log Into Your Account</h3>
              <form className="form" onSubmit={handleSubmit}>
                <div className="input_container">
                    <label htmlFor="name">email</label>
                    <input type="text" name="email" value={email} onChange={handleChange}/>
                </div>
                <div className="input_container">
                    <label htmlFor="name">password</label>
                    <input type="password" name="password" value={password} onChange={handleChange}/>
                </div>
                {error ? <p className="error">{error}</p> : null}
                <div className="btn_container">
                <button type="submit" className="btn" disabled={loading}>
                {loading ? "Logging in ..." : "Login"}
                </button>
                </div>
              </form>
          </section>
        </>
    )
}

export default Login;
