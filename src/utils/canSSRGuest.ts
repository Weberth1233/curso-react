import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

export function canSSRGuest<P>(fn:GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): 
        Promise<GetServerSidePropsResult<P>> =>{
         //pegando cokies da sessão do cara logado
        const cookies = parseCookies(ctx);
        // Se o cara tentar acessar a pagina porem tendo já um login 
        // salvo redirecionamos
        if(cookies['@nextauth.token']){
            return {
                redirect:{
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }
        return await fn(ctx);
    }
}