// RegistrationForm.js

import React, { useState } from "react";
import{ fb} from "../../firebase";
import './SignUp.css'
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = fb.auth();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      // Registration successful, you can redirect to the viewBlog page here
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle registration errors here (e.g., display an error message)
    }
  };

  return (
    <div className="signUp">
      <form onSubmit={handleRegister}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
    dffdfgfddddddd
    fdg
    fdg
    fdg
    fddddddddddddddddd
    </div>
    
  );
};

export default SignUp;
