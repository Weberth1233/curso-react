import Router from "next/router";
import { destroyCookie } from "nookies";
import React, { ReactNode, useState } from "react";
import { createContext } from "vm";

type AuthContextData ={
    user: UserProps;
    isAuthenticated:boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut:()=>void;
}

type UserProps ={
    id:string;
    name:string;
    email:string;
}

type SignInProps ={
    email:string;
    password:string;
}

type AuthProviderProps ={
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut(){
    //Deslogar usuario e destroind o cookie dele
    try{
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/');
    }catch{
        console.log('erro ao deslogar');
    }
}

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>();
    //Se o usuario está vazio ele não está autenticado caso haja valores na variavel usuário ele está autenticado
    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignInProps) {
        try{
            const 
        }
    }
}