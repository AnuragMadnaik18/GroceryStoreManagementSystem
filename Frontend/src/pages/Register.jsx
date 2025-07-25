import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser } from '../services/user'

function Register() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const navigate = useNavigate()

  const onRegister = async () => {
    const { name, email, role, phone, password, confirmPassword } = userInfo

    if (name.length === 0) {
      toast.warn('Please enter name')
    } else if (email.length === 0) {
      toast.warn('Please enter email')
    } else if (role.length === 0) {
      toast.warn('Please select role')
    } else if (phone.length === 0) {
      toast.warn('Please enter phone number')
    } else if (password.length === 0) {
      toast.warn('Please enter password')
    } else if (confirmPassword.length === 0) {
      toast.warn('Please confirm password')
    } else if (password !== confirmPassword) {
      toast.warn('Password does not match')
    } else {
      const result = await registerUser(name, email, password, phone, role)

      if (result['status'] === 'success') {
        toast.success('Successfully registered new user')
        navigate('/')
      } else {
        toast.error(result['error'])
      }
    }
  }

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='card shadow'>
            <div className='card-body'>
              <h2 className='text-center mb-4'>Register</h2>

              <div className='row'>
                <div className='col-md-6'>

                  <div className='mb-3'>
                    <label>Name</label>
                    <input
                      type='text'
                      className='form-control'
                      onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    />
                  </div>

                  <div className='mb-3'>
                    <label>Email</label>
                    <input
                      type='email'
                      className='form-control'
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    />
                  </div>

                  <div className='mb-3'>
                    <label>Role</label>
                    <select
                      className='form-control'
                      value={userInfo.role}
                      onChange={(e) => setUserInfo({ ...userInfo, role: e.target.value })}
                    >
                      <option value=''>Select Role</option>
                      <option value='User'>User</option>
                      <option value='Admin'>Admin</option>
                    </select>
                  </div>

                </div>

                <div className='col-md-6'>

                  <div className='mb-3'>
                    <label>Phone Number</label>
                    <input
                      type='tel'
                      className='form-control'
                      onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    />
                  </div>

                  <div className='mb-3'>
                    <label>Password</label>
                    <input
                      type='password'
                      className='form-control'
                      onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                    />
                  </div>

                  <div className='mb-3'>
                    <label>Confirm Password</label>
                    <input
                      type='password'
                      className='form-control'
                      onChange={(e) => setUserInfo({ ...userInfo, confirmPassword: e.target.value })}
                    />
                  </div>

                </div>
              </div>

              <div className='d-flex justify-content-between mt-3'>
                <Link to='/login' className='btn btn-outline-secondary'>
                  Back to Login
                </Link>
                <button onClick={onRegister} className='btn btn-success'>
                  Register
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
