import React, { useState } from 'react';
import './register.css';

const Register = () => {
  const [role, setRole] = useState('customer');

  const [customerData, setCustomerData] = useState({
    username: '',
    name: '',
    password: '',
    gender: '',
    age: '',
  });

  const [hostelOwnerData, setHostelOwnerData] = useState({
    username: '',
    name: '',
    password: '',
    address: '',
    price: '',
  });

  const [adminData, setAdminData] = useState({
    username: '',
    name: '',
    password: '',
    contact_no: '',
  });

  const handleChange = (e, roleType) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'number' ? Number(value) : value;

    if (roleType === 'customer') {
      setCustomerData(prev => ({ ...prev, [name]: finalValue }));
    } else if (roleType === 'hostelOwner') {
      setHostelOwnerData(prev => ({ ...prev, [name]: finalValue }));
    } else if (roleType === 'admin') {
      setAdminData(prev => ({ ...prev, [name]: finalValue }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = '';
    let payload = {};

    if (role === 'customer') {
      url = 'https://hostelscore-b.onrender.com/api/auth/register/user';
      payload = customerData;
    } else if (role === 'hostelOwner') {
      url = 'https://hostelscore-b.onrender.com/api/auth/register/hostel';
      payload = hostelOwnerData;
    } else if (role === 'admin') {
      url = 'https://hostelscore-b.onrender.com/api/auth/register/admin';
      payload = adminData;
    }

    console.log("FormData", payload)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      alert(data.message || 'Registration successful!');
    } catch (error) {
      alert('Registration failed.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <div className="role-tabs">
        <button onClick={() => setRole('customer')} className={role === 'customer' ? 'active' : ''}>Customer</button>
        <button onClick={() => setRole('hostelOwner')} className={role === 'hostelOwner' ? 'active' : ''}>Hostel Owner</button>
        <button onClick={() => setRole('admin')} className={role === 'admin' ? 'active' : ''}>Admin</button>
      </div>

      {role === 'customer' && (
        <form className="form" onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={(e) => handleChange(e, 'customer')} required />
          <input name="username" placeholder="Username" onChange={(e) => handleChange(e, 'customer')} required />
          <input name="password" type="password" placeholder="Password" onChange={(e) => handleChange(e, 'customer')} required />
          <input name="age" type="number" placeholder="Age" onChange={(e) => handleChange(e, 'customer')} required />
          <select name="gender" onChange={(e) => handleChange(e, 'customer')} required defaultValue="">
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button type="submit">Register as Customer</button>
        </form>
      )}

      {role === 'hostelOwner' && (
        <form className="form" onSubmit={handleSubmit}>
          <input name="name" placeholder="Hostel Name" onChange={(e) => handleChange(e, 'hostelOwner')} required />
          <input name="address" placeholder="Address" onChange={(e) => handleChange(e, 'hostelOwner')} required />
          <input name="price" type="number" placeholder="Price" onChange={(e) => handleChange(e, 'hostelOwner')} required />
          <input name="username" placeholder="Username" onChange={(e) => handleChange(e, 'hostelOwner')} required />
          <input name="password" type="password" placeholder="Password" onChange={(e) => handleChange(e, 'hostelOwner')} required />
          <button type="submit">Register as Hostel Owner</button>
        </form>
      )}

      {role === 'admin' && (
        <form className="form" onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={(e) => handleChange(e, 'admin')} required />
          <input name="username" placeholder="Username" onChange={(e) => handleChange(e, 'admin')} required />
          <input name="password" type="password" placeholder="Password" onChange={(e) => handleChange(e, 'admin')} required />
          <input name="contact_no" type="number" placeholder="Contact Number" onChange={(e) => handleChange(e, 'admin')} required />
          <button type="submit">Register as Admin</button>
        </form>
      )}
    </div>
  );
};

export default Register;
