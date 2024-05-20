"use client";
import React, { useState } from "react";
import backgroundImage from './texture.jpg';

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "@/firebaseConfig";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

import { useRouter } from "next/navigation";
import { useAuth } from '@/components/AuthContext';

export default function Auth() {

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const auth = getAuth(app);
  const { setUserEmail, setUserToken } = useAuth();
  
  const navigate = useRouter();
  // const handleAuth = async () => {
  //   try {
  //     if (isLogin) {
  //       await signInWithEmailAndPassword(auth, email, password);
  //       setMessage("Login successful!");
  //       setUserEmail(email);
  //       setShowSuccess(true);
  //       navigate.push('./Home')
  //     } else {
  //       await createUserWithEmailAndPassword(auth, email, password);
  //       setMessage("Sign up successful!");
  //       setShowSuccess(true);
  //     }

  //     setError(null);
  //     setShowError(false);
  //   } catch (error: any) {
  //     setError(error.message);
  //     setShowError(true);
  //     setShowSuccess(false);
  //   }
  // };
  const handleAuth = async () => {
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken(); // Get JWT from the user

        setUserToken(token); // Update the token in your context
        setMessage("Login successful!");
        setUserEmail(email);
        setShowSuccess(true);
        navigate.push('./Home')
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken(); // Get JWT from the user

        setUserToken(token); // Update the token in your context
        setMessage("Sign up successful!");
        setShowSuccess(true);
      }

      setError(null);
      setShowError(false);
    } catch (error: any) {
      setError(error.message);
      setShowError(true);
      setShowSuccess(false);
    }
  };

  const successVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.1, ease: "easeInOut" },
    },
  };

  const errorVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center bg-[url('texture.jpg')] bg-cover bg-center">
      
      <div
        className="mx-auto max-w-[400px] space-y-6 bg-gradient-to-br from-gray-400 to-gray-600 p-6 rounded-lg shadow-lg dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900"
        style={{ border: "2px solid white" }}
      >
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white dark:text-gray-100">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-gray-200 dark:text-gray-400">
            Enter your email and password to {isLogin ? "sign in" : "sign up"}.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-200 dark:text-gray-400" htmlFor="email">
              Email
            </Label>
            <Input
              className="bg-white/80 dark:bg-gray-800 dark:text-gray-100"
              id="email"
              placeholder="m@example.com"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label
              className="text-gray-200 dark:text-gray-400"
              htmlFor="password"
            >
              Password
            </Label>
            <Input
              className="bg-white/80 dark:bg-gray-800 dark:text-gray-100"
              id="password"
              placeholder=".........."
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                variants={successVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="text-black-500 mt-2"
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showError && (
              <motion.div
              variants={errorVariants}
              initial="hidden"
              animate="visible"
                exit="hidden"
                className="text-red-500 mt-2"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            className="w-full bg-white text-purple-500 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
            onClick={handleAuth}
          >
            {isLogin ? "Sign in" : "Sign up"}
          </Button>
          <Button
            className="w-full bg-white text-purple-500 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Create account" : "Already have an account?"}
          </Button>
        </div>
      </div>
    </div>
</>
  );
}
