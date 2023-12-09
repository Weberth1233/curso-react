import App, { AppProps } from "next/app";
import React from "react";
import '../../styles/globals.scss';
import { AuthProvider } from "../contexts/AuthContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

function MyApp({ Component, pageProps }: AppProps) {
  return <AuthProvider>
            <Component {...pageProps} />
            <ToastContainer autoClose={3000} />
        </AuthProvider>
}

export default MyApp
