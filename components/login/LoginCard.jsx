"use client";
import React, { useState } from 'react';
import { UserAuth } from 'app/context/AuthContext.js';
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { signIn, signUp } = UserAuth();
  const router = useRouter(); // Get the router object using useRouter hook

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistered, setIsRegistered] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false); // New state for signup success
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setEmailError(validateEmail(value) ? '' : 'Please enter a valid email address');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistered) {
      try {
        await signIn(email, password);
        // Redirect to home page after successful login
        router.push('/main/home');
      } catch (error) {
        console.error('Error signing in:', error);
      }
    } else {
      try {
        await signUp(email, password);
        setSignupSuccess(true);
      } catch (error) {
        console.error('Error signing up:', error);
      }
    }
  };

  const handleToggleForm = () => {
    setIsRegistered(!isRegistered);
    setSignupSuccess(false); // Reset signup success state when switching forms
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-gray">
      <div className="max-w-md w-full p-6 bg-primary-white rounded-md shadow-md">
        <Typography variant="h4" align="center" gutterBottom>
          {isRegistered ? 'Login' : 'Sign Up'}
        </Typography>
        {signupSuccess && (
          <Typography variant="body1" color="success" align="center" gutterBottom>
            Signup is successful! Please login with your credentials.
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email:
            </label>
            <TextField
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
              className="w-full"
              required
              placeholder={isRegistered ? 'xyz@learnU.com' : 'Enter your email'}
            />
          </div>
          {!isRegistered && (
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 font-semibold">
                Username:
              </label>
              <TextField
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                className="w-full"
                required
                placeholder="learnU"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-semibold">
              Password:
            </label>
            <TextField
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full"
              required
              placeholder="********"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary-blue hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none"
          >
            {isRegistered ? 'Login' : 'Sign up'}
          </button>
          <p className="mt-2 text-center">
            {isRegistered ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              className="text-blue-500 font-semibold"
              onClick={handleToggleForm}
            >
              {isRegistered ? 'Sign up' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
