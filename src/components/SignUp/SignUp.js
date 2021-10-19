
import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import initializeAuthentication from '../../FireBase/firebase.init';
import useAuth from '../../hooks/useAuth';


initializeAuthentication();

const auth = getAuth();

const SignUp = () => {

    const {emailSignUpLogIn,signInUsingGoogle} = useAuth();

    const [displayName, setDisplayName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChanges = e => {
        setEmail(e.target.value);
      }
      const handlePasswordChanges = e => {
        setPassword(e.target.value)
      }
      const handleNameChanges = e => {
        setDisplayName(e.target.value);
      }

      const handleRegistration = e => {
        e.preventDefault();
        console.log(email, password);
        if (password.length < 6) {
          setError('Password Must be at least 6 characters long.')
          return;
        }
        else {
          registerNewUser(email, password);
        }
    
      }
      const registerNewUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then(result => {
            const user = result.user;
            console.log(user);
            setError('');
          })
          .catch(error => {
            setError(error.message);
          })
      }

    return (
        <div>
            <div className="mb-5 mt-5">
           <h2 className="mb-5 text-primary">Please Register</h2>
           <form action=""  onSubmit={handleRegistration }>
               <input type="text" onBlur={handleNameChanges}  name="name" id=""  placeholder="mr.jhon" required/>
               <br />
               <br />
               <input type="email" onBlur={handleEmailChanges} name="email" id=""  placeholder="example@email.com" required/>
               <br />
               <br />
               <input type="password"  onBlur={handlePasswordChanges} name="Password" id=""  placeholder="Enter Your Password" required/>
               <br />
               <br />
               <input type="submit" value="Submit" onClick={emailSignUpLogIn} className="btn btn-secondary"/>
               <br />
               <Link to="/login">Already register ?</Link>
           </form>
       </div>
       <div className="mb-5">
         <hr />
          <button onClick={signInUsingGoogle} className="btn btn-warning mb-5 mt-">Google Sign in</button>
        </div>
        </div>
    );
};

export default SignUp;