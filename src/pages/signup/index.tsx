import Head from 'next/head'
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';

import logoImg from '../../../public/logo.svg';

import Link from 'next/link';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/Button';

export default function SignUp() {
  return (
    <>
    <Head>
      <title>Faça seu cadastro agora!</title> 
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

      <div className={styles.login}>
        <h1>Criando sua conta</h1>

        <form>
          <Input
            placeholder="Digite seu nome"
            type="text"
          />

          <Input
            placeholder="Digite seu email"
            type="text"
          />

          <Input
            placeholder="Sua senha"
            type="password"
          />
          
          <Button
            type="submit"
            loading={false}
          >
            Cadastrar
          </Button>
        </form>
        <Link href="/" className={styles.text}>
            Já possui uma conta? Faça login!
        </Link>
      </div>
    </div>
    </>
  )
}