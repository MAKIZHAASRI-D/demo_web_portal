
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 
// inside LoginPage component


// after successful login



function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Step 1: Login Request
      const loginRes = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      let loginData;
try {
  loginData = await loginRes.json();
} catch (e) {
  const errorText = await loginRes.text(); // log raw text
  console.error("Server responded with non-JSON:", errorText);
  setMessage("Unexpected server response.");
  return;
}

      if (!loginRes.ok) {
        setMessage(loginData.message || 'Login failed');
        return;
      }

      // Step 2: Use Token to Fetch Profile
      const token = loginData.token;
      localStorage.setItem('token', token);

      const decoded = jwtDecode(token); // ✅ decode JWT to get role
      const role = decoded.role;

      const profileRes = await fetch('/api/profile', {
        headers: { Authorization:`Bearer ${token}` },
      });
      //console.log('Token:', token); // Frontend
      // Backend

      const profileData = await profileRes.json();

      
      setMessage(`welcome,${profileData.message}`);
      if (role==='admin'){
        navigate('/admin');
      }
      else if(role==='user'){
      navigate('/operatorform');}
      else{
        setMessage("unknown role.cannot redirect.")
      }
      
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong');
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
}

export default LoginPage;