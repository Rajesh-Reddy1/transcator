"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "@/firebaseConfig";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const auth = getAuth(app);
  const { setUserEmail, setUserToken } = useAuth();
  const navigate = useRouter();

  const handleAuth = useCallback(async () => {
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      }
      const user = userCredential.user;
      const token = await user.getIdToken();
      setUserToken(token);
      setUserEmail(email);
      if (isLogin) navigate.push("./Welcome");
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
  }, [auth, email, password, isLogin, setUserToken, setUserEmail, navigate]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setUserToken(token);
        if (user.email) {
          setUserEmail(user.email);
        }
      }
    });
  }, [auth, setUserEmail, setUserToken]);

  return (
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
          {message && <div className="text-black-500 mt-2">{message}</div>}
          {error && <div className="text-red-500 mt-2">{error}</div>}
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
  );
}
