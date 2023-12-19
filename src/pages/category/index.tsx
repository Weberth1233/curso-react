import Head from "next/head";
import { Header } from "../../components/Header";
import styles from './styles.module.scss';
import { canSSRAuth } from "../../utils/canSSRAuth";
import { FormEvent, useState } from "react";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";

export default function Category(){
    const [name, setName] = useState('');

    async function handleCategory(event: FormEvent){
        event.preventDefault();
        if(name === ''){
            return;
        }
        const apiCliente = setupAPIClient();
        await apiCliente.post('category',{
            name:name
        })
        toast.success("Cadastrado com sucesso!");
        setName('');
    }

    return(
        <>
            <Head>
                <title>Tela de categorias - Sujeito Pizzaria</title>
            </Head>
            <Header/>
            <main className={styles.container}>
                <h1>Cadastrar categorias</h1>
                <form className={styles.form} onSubmit={handleCategory}>
                    <input type="text" 
                    placeholder="Digite o nome da categoria" 
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                    <button className={styles.buttonAdd} type="submit">
                        Cadastrar
                    </button>
                </form>
            </main>
        </>
    );
} 

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
      props: {}
    }
  
});