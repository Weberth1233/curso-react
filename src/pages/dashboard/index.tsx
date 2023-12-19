import { Header } from "../../components/Header";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from 'next/head';
//yarn add @types/react-modal
import Modal from 'react-modal';
import styles from './styles.module.scss';
import { FiRefreshCcw } from 'react-icons/fi';
import { useState } from "react";
//Criando objeto para pegar os dados da order vindo da api
type OrderProps ={
    id:string;
    table:string;
    status: boolean;
    draft:boolean;
    name: string | null;
}

//Criando interface para a listagem das ordens
interface HomeProps{
    orders: OrderProps[];
}

export default function Dashboard({ orders }: HomeProps){
    //Criando um varivel que vai receber o q estava sendo recebido na variavel orders que vai se executada antes da criação deste elemento
    //populando a mesma
    const [orderList, setOrderList] = useState(orders || []);


    return(
        <>
            <Head>
                <title>
                    Painel -  Sujeito Pizzaria
                </title>
            </Head>
            <div>
                <Header/>
                <main className={styles.container}>
                    <div className={styles.containerHeader}> 
                        <h1>Últimos pedidos</h1>
                        <button>
                            <FiRefreshCcw size={25} color="#3fffa3"/>
                        </button>
                    </div>
                    <article className={styles.listOrders}>
                        {orderList.map( item => (
                            <section key={item.id} className={styles.orderItem}>
                                <button onClick={null}>
                                    <div className={styles.tag}></div>
                                    <span>Mesa {item.table}</span>
                                </button>
                            </section>
                        ))}
                    </article>
                </main>
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async(ctx)=>{
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/orders');
    return{
        props:{
            orders: response.data
        }
    }
})