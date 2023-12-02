import Head from "next/head";
import styles from '../../styles/Home.module.scss';
import Image from "next/image";
import logoImg from "../../public/logo.svg";
import { Input } from '../components/ui/Input';
import { Button } from "../components/ui/Button";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event:FormEvent) {
    event.preventDefault();

    let data ={
      email, password
    }
    await signIn(data);
  }
  
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
        <div className={styles.containerCenter}>
            <Image className={styles.image} src={logoImg} alt="Logo Sujieto Pizzaria"/>
            <div className={styles.login}>
              <form onSubmit={handleLogin}>
                <Input type="text" placeholder="Digite seu email" value={email} onChange={(e)=>setEmail(e.target.value)}></Input>
                <Input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.validationMessage)}></Input>
                <Button type="submit" loading={false}>Acessar</Button>
              </form>
              <Link href="/signup" className={styles.text}>
                Nao possui uma conta? Cadastre-se
              </Link>
            </div>
        </div>
    </>
  )
}
