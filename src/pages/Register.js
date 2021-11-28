import React,{useState} from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {setDoc, doc, Timestamp} from "firebase/firestore";
import { auth,db } from '../firebase';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email:"",
        password:"",
        error: null,
        loading: false,
    });

    const navigate = useNavigate();

    const {name, email, password, error, loading} = data;

    const handleChange = (e) => {
        setData({
            ...data, [e.target.name] : e.target.value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData({...data, error: null, loading: true})
    
        try{
                //signup function
                const result = await createUserWithEmailAndPassword(auth, email, password)
                
                //set document in firebase firestore
                await setDoc(doc(db, "users", result.user.uid), {
                uid: result.user.uid,
                name,
                email,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true,
              });

            setData({
                name: "",
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
              <h3>Create An Account</h3>
              <form className="form" onSubmit={handleSubmit}>
                <div className="input_container">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={handleChange}/>
                </div>
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
                    {loading ? "Creating ..." : "Register"}
                </button>
        </div>
              </form>
          </section>
        </>
    )
}

export default Register;
