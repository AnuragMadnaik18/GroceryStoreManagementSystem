// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { loginUser } from '../services/user'

// function Login() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const navigate = useNavigate()

//   const onLogin = async () => {
//     if (email.length === 0) {
//       toast.warn('Please enter email')
//     } else if (password.length === 0) {
//       toast.warn('Please enter password')
//     } else {
//       const result = await loginUser(email, password)
//       if (result['status'] === 'success') {
//         toast.success('Welcome to Grocery Store')

//         const { token, name } = result['data']
//         sessionStorage.setItem('token', token)
//         sessionStorage.setItem('name', name)

//         navigate('/home')
//       } else {
//         toast.error(result['error'])
//       }
//     }
//   }

//   return (
//     <div className='container mt-5'>
//       <div className='row justify-content-center'>
//         <div className='col-md-6'>
//           <div className='card shadow'>
//             <div className='card-body'>
//               <h2 className='text-center mb-4'>Login</h2>

//               <div className='mb-3'>
//                 <label>Email</label>
//                 <input
//                   type='email'
//                   className='form-control'
//                   onChange={(e) => setEmail(e.target.value)}
//                   value={email}
//                 />
//               </div>

//               <div className='mb-3'>
//                 <label>Password</label>
//                 <input
//                   type='password'
//                   className='form-control'
//                   onChange={(e) => setPassword(e.target.value)}
//                   value={password}
//                 />
//               </div>

//               <div className='d-flex justify-content-between'>
//                 <button
//                   onClick={onLogin}
//                   className='btn btn-success'
//                 >
//                   Login
//                 </button>

//                 <Link
//                   to='/register'
//                   className='btn btn-outline-primary'
//                 >
//                   Register
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // 🔁 Evaluation State
  const navigate = useNavigate();

  const handleLogin = (role) => {
    if (!username || !password) {
      setError('Username and Password must not be empty!');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      if (role === 'admin') {
        if (username === 'admin' && password === 'admin123') {
          navigate('/admin/dashboard');
        } else {
          setError('Incorrect username or password (Admin)');
        }
      } else if (role === 'user') {
        if (username === 'user' && password === 'user123') {
          navigate('/user/registration');
        } else {
          setError('Incorrect username or password (User)');
        }
      }
      setLoading(false);
    }, 1000); // Simulate 1s delay
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url(https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1050&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backdropFilter: 'blur(2px)'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0px 0px 15px rgba(0,0,0,0.3)',
        width: '350px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login Page</h2>

        {error && (
          <div style={{
            backgroundColor: '#ffdddd',
            padding: '10px',
            marginBottom: '15px',
            color: '#d8000c',
            borderRadius: '5px',
            border: '1px solid #d8000c'
          }}>
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />

        <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '14px' }}>
          You don’t have an account?{' '}
          <span
            onClick={() => navigate('/user/registration')}
            style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Create Now
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={() => handleLogin('admin')}
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Logging in...' : 'Admin Login'}
          </button>

          <button
            onClick={() => handleLogin('user')}
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Logging in...' : 'User Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
