"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { UserAuth } from "app/context/AuthContext.js";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const IconButton = dynamic(() => import("@mui/material/IconButton"));
const InputAdornment = dynamic(() => import("@mui/material/InputAdornment"));
const TextField = dynamic(() => import("@mui/material/TextField"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const Visibility = dynamic(() => import("@mui/icons-material/Visibility"));
const VisibilityOff = dynamic(() =>
  import("@mui/icons-material/VisibilityOff")
);
// import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginPage = () => {
  const t = useTranslations("login");

  const { signIn, signUp } = UserAuth();
  const router = useRouter(); // Get the router object using useRouter hook

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRegistered, setIsRegistered] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false); // New state for signup success
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setEmailError(validateEmail(value) ? "" : t("Message-4"));
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
        // Redirect to profile page after successful login
        router.push("/profile");
      } catch (error) {
        console.error("Error signing in:", error);
      }
    } else {
      try {
        await signUp(email, password);
        setSignupSuccess(true);
        // Redirect to profile page after successful Sign Up
        router.push("/profile");
      } catch (error) {
        console.error("Error signing up:", error);
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
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full p-6 bg-white dark:bg-indigoDay rounded-md shadow-md">
        <Typography variant="h4" align="center" gutterBottom>
          {isRegistered ? "Login" : "Sign Up"}
        </Typography>
        {signupSuccess && (
          <Typography
            variant="body1"
            color="success"
            align="center"
            gutterBottom
          >
            {t("Message-1")}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-semibold">
              {t("Email")}:
            </label>
            <TextField
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
              className="w-full dark:bg-bodyWhite rounded-xl"
              required
              placeholder={isRegistered ? "xyz@learnU.com" : t("Placeholder-2")}
            />
          </div>
          {!isRegistered && (
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 font-semibold">
                {t("Uesrname")}:
              </label>
              <TextField
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                className="w-full dark:bg-bodyWhite rounded-xl"
                required
                placeholder="learnU"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-semibold">
              {t("Password")}:
            </label>
            <TextField
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full dark:bg-bodyWhite rounded-xl"
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
            {isRegistered ? t("login") : t("Signup")}
          </button>
          <p className="mt-2 text-center">
            {isRegistered ? t("Message-2") : t("Message-3")}{" "}
            <button
              type="button"
              className="text-blue-500 font-semibold"
              onClick={handleToggleForm}
            >
              {isRegistered ? t("Signup") : t("login")}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
