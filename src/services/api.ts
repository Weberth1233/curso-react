import axios, { AxiosError } from "axios";
import { error } from "console";
import { parseCookies } from "nookies";
import { signOut } from "../context/AuthContext";
import { AuthTokenError } from "./errors/AuthTokenError";

export function setupAPIClient(ctx = undefined){
    let cookies = parseCookies(ctx);

    //Configurando base da api e passando o cookies pela headers da pagina
    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    });
    /*Os interceptores no Axios permitem que você execute código ou transforme dados antes ou depois de uma requisição ou resposta serem tratadas pelo aplicativo. No seu caso,
     parece que você está lidando com interceptores de resposta.*/ 
    api.interceptors.response.use(response =>{
        return response;
    },(error: AxiosError)=>{
        if(error.response.status == 401){
            if(typeof window != undefined){
                signOut();
            }else{
                return Promise.reject(new AuthTokenError())
            }
        }
        return Promise.reject(error);
    });
    return api;
}