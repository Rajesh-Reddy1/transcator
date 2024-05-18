
import 'firebase/auth';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAybFermTx5Pxd1NIH3OxSvUkLdU6718o8",
  authDomain: "manager-69.firebaseapp.com",
  projectId: "manager-69",
  storageBucket: "manager-69.appspot.com",
  messagingSenderId: "493256231265",
  appId: "1:493256231265:web:7329468e1ed551c6a6dd20"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);