
// client/src/pages/AdminAddUserPage.js
import React, { useState } from 'react';

const AdminAddUserPage = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    role: 'user',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(data.message);
      setForm({ username: '', password: '', email: '', role: 'user' });
    } else {
      setMessage(data.message || 'Error occurred');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Add New User</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        /><br /><br />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select><br /><br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AdminAddUserPage;
