import { Header } from "../../components/Header";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from 'next/head';
//yarn add @types/react-modal
import Modal from 'react-modal';
import styles from './styles.module.scss';
import { FiRefreshCcw } from 'react-icons/fi';
import { useState } from "react";
import { TRUE } from "sass";
import { ModalOrder } from "../../components/ModalOrder";
//Criando objeto para pegar os dados da order vindo da api

type OrderProps ={
    id:string;
    table:string | number;
    status: boolean;
    draft:boolean;
    name: string | null;
}

//Criando interface para a listagem das ordens
interface HomeProps{
    orders: OrderProps[];
}

export type OrderItemProps={
    id: string;
    amount:number;
    order_id: string;
    product_id:string;
    product:{
        id: string;
        name: string;
        description: string;
        price: string;
        banner:string;
    }
    order:{
        id: string;
        table: string | number;
        status: boolean;
        name: string | null;
    }
}

export default function Dashboard({ orders }: HomeProps){
    //Criando um varivel que vai receber o q estava sendo recebido na variavel orders que vai se executada antes da criação deste elemento
    //populando a mesma
    const [orderList, setOrderList] = useState(orders || []);
    const [modalItem, setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    function handleCloseModal(){
        setModalVisible(false);
    }

    async function handleOpenModalView(id:string) {
        const apiClient = setupAPIClient();
        
        const response = await apiClient.get('/order/detail', {
            params:{
                order_id: id
            }
        });
        setModalItem(response.data);
        setModalVisible(true);
    }
    
    async function handleFinishItem(id: string) {
        const apiClient = setupAPIClient();

        await apiClient.put('/order/finish', {
            order_id: id,
        });

        const response = await apiClient.get('/orders');
        setOrderList(response.data);
        setModalVisible(false);
    }
    
    async function handleRefreshOrders(){
        const apiClient = setupAPIClient();

        const response = await apiClient.get('/orders')
        setOrderList(response.data)
    }

    Modal.setAppElement('#__next');

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

                        {orderList.length == 0 &&(
                            <span className={styles.emptyList}>
                                Nenhum pedido aberto foi encontrado...
                            </span>
                        )}

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
                <ModalOrder
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModal}
                    order={modalItem}
                    handleFinishOrder={handleFinishItem}
                />
                
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