import { createContext, ReactNode, useState } from 'react';

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router';
import { toast } from 'react-toastify';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type SignUpProps = {
  name: String;
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)
export function signOut(){
  try{
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  }catch{
    toast.error('erro ao deslogar');
    console.log('erro ao deslogar')
  }
}

export function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps){
    try{
      const response = await api.post('/session', {
        email,
        password
      })
      // console.log(response.data);
      const { id, name, token } = response.data;
      //Criando token para o usuário logado no site
      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/" // Quais caminhos terao acesso ao cookie
      });
      //Populando variavel user para que seja possivel acessar as informações do usuário em qualquer tela pelo authcontext
      setUser({
        id,
        name,
        email,
      });
      //Passar para proximas requisiçoes o nosso token
      api.defaults.headers['Authorization'] = `Bearer ${token}`
      //Redirecionar o user para /dashboard
      toast.success("Logado com sucesso!");
      Router.push('/dashboard');
      
    }catch(err){
      toast.error("Erro ao acessar!");
      console.log("ERRO AO ACESSAR ", err)
    }
  }

  async function signUp({ name, email, password }: SignUpProps){
    //Passando valores para a api executar o post e mandar os dados bara o banco
    try{
      const response = await api.post('/users', {
        name,
        email,
        password
      })
      //Imprimindo mensagem de sucesso
      toast.success("Conta criada com sucesso!");
      //Mandando para a rota de login
      Router.push('/');
    }catch(err){
      toast.error("Erro ao cadastrar!");
      console.log("ERRO AO ACESSAR ", err)
    }
  }
  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}