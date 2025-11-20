import axios from "axios";
import type { User,CreateUserPayload, LoginPayload } from "../types/types";
 
const api = axios.create({
    baseURL:"/api",
});

export const GetUsers = async ()=>{
    const response = await api.get<User[]>('users');
    return response.data;
}

export const CreateUser = async(payload:CreateUserPayload)=>{
    const response = await api.post('users',payload)
    return response.data;
};

export const Login = async(payload:LoginPayload)=> {
    const response = await api.post("login",payload);
    return response.data;
}