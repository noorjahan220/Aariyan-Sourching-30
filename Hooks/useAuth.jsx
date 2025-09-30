// This file is ALREADY CORRECT. No changes are needed.
// src/Hooks/useAuth.js

import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider"; // Ensure this path is correct


const useAuth = () => {
       const auth = useContext(AuthContext);
       return auth;
};

export default useAuth; 