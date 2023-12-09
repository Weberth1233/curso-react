import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";

export function canSSRAuth<P>(fn:GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): 
        Promise<GetServerSidePropsResult<P>> =>{
         //pegando cokies da sessão do cara logado
        const cookies = parseCookies(ctx);
        
        const token = cookies['@nextauth.token'];
        //Se não existe token
        if(!token){
            return{
                redirect:{
                    destination: '/',
                    permanent: false,
                }
            }
        }
       
        try{
             //Se existe token
            return await fn(ctx);
        }catch(err){
            //Caso o usuário altere o token 
            if(err instanceof AuthTokenError){
                destroyCookie(ctx, '@nextauth.token');
                return{
                    redirect:{
                        destination:'/',
                        permanent: false
                    }
                }
            }
        }
    }
}