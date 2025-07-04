import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import { Headling } from '../../components/Headling/Headling'
import Input from '../../components/Input/Input'
import styles from './Login.module.css'
import { useState, type FormEvent } from 'react'
import axios, { AxiosError } from 'axios'
import { PREFIX_URL } from '../../helpers/API'
import type { AuthInterface } from '../../interfaces/auth.interface'

export type LoginForm = {
    email: {
        value: string;
    },
    password: {
        value: string;
    }
}

export const Login = () => {
    const [loginErrorMessage, setLoginErrorMessage] = useState<string | undefined>('')
    const navigate = useNavigate();

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & LoginForm
        const {email, password} = target;
        await sendLogin(email.value, password.value);

    }

    const sendLogin = async(email: string, password: string) => {
        try{
            const {data} = await axios.post<AuthInterface>(`${PREFIX_URL}/auth/login`, {
                email,
                password
            })
            localStorage.setItem('jwt', data.access_token);
            navigate('/')

        }catch(e){
            if(e instanceof AxiosError){
                setLoginErrorMessage(e.response?.data.message[0])
            }
        }
        
    }

    return (
    <div className={styles.login}>
		<Headling>Вход</Headling>
		{loginErrorMessage && <div className={styles.error}>{loginErrorMessage}</div>}
		<form className={styles.form} onSubmit={submit}>
			<div className={styles.field}>
				<label htmlFor="email">Ваш email</label>
				<Input id="email" name='email' placeholder='Email' />
			</div>
			<div className={styles.field}>
				<label htmlFor="password">Ваш пароль</label>
				<Input id="password" name='password' type="password" placeholder='Пароль' />
			</div>
			<Button appearence="big">Вход</Button>
		</form>
		<div className={styles.links}>
			<div>Нет акканута?</div>
			<Link to="/auth/register">Зарегистрироваться</Link>
		</div>
	</div>
    )
}