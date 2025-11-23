import axios from "axios";
import type { User,CreateUserPayload, VerificationPayload } from "../types/types";
 
const api = axios.create({
    baseURL:"/api",
});

export const GetUsers = async ()=>{
    const response = await api.get<User[]>('users');
    return response.data;
}

export const CreateUser = async(payload:CreateUserPayload)=>{
    const response = await api.post('users/Signup',payload)
    return response.data;
};

export const Login = async(payload:VerificationPayload)=> {
    const response = await api.post("users/Login",payload);
    return response.data;
}

export const GetProfile = async (token: string) => {
  const response = await api.get<User>("users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

