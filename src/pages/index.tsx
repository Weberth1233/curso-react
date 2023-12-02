import Head from "next/head";
import styles from '../../styles/Home.module.scss';
import Image from "next/image";
import logoImg from "../../public/logo.svg";
import { Input } from '../components/ui/input';
import { Button } from "../components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
        <div className={styles.containerCenter}>
            <Image className={styles.image} src={logoImg} alt="Logo Sujieto Pizzaria"/>
            <div className={styles.login}>
              <form>
                <Input type="text" placeholder="Digite seu email"></Input>
                <Input type="password" placeholder="Digite sua senha"></Input>
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
