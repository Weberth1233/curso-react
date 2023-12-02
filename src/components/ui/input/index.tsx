import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}
interface TextAreaPropos extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

//{ ...rest } - passagem dos parametros para o input
export function Input({...rest}: InputProps){
    return(
        <input className={styles.input} {...rest}/>
    )
}

export function TextArea({...rest}: TextAreaPropos){
    return(
        <textarea className={styles.input} {...rest}></textarea>
    )
}