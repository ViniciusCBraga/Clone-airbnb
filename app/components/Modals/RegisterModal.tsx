'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {FaFacebookSquare} from 'react-icons/fa'

import{
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'

import useRegisterModal from '@/app/hooks/useRegisterModal';

import Heading from '../Heading';
import Input from '../Inputs/Input';
import {toast} from 'react-hot-toast';
import Button from '../Button';
import Modal from './Modal';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const{
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues :{
            nome:'',
            email:'',
            senha:''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() =>{
                registerModal.onClose();
                
            })
            .catch((error) =>{
                toast.error('Algo esta errado!');
            })
            .finally(() =>{
                setIsLoading(false);
            })

    }

    const toggle = useCallback(()=>{
        registerModal.onClose();
        loginModal.onOpen();
    },[loginModal, registerModal]);

    const bodyContent = (
        <div className='flex flex-col gap-2'>
            <Heading title='Bem vindo ao Airbnb' subtitle='Crie uma conta!'/>
            <Input 
                id='email' 
                label = "Email" 
                disabled = {isLoading} 
                register={register} 
                errors={errors} 
                required
            />
            <Input 
                id='name' 
                label = "Nome" 
                disabled = {isLoading} 
                register={register} 
                errors={errors} 
                required
            />
            <Input 
                id='password' 
                type= "password"
                label = "Senha" 
                disabled = {isLoading} 
                register={register} 
                errors={errors} 
                required
            />
        </div>
    );
    const footerContent = (
        <div className='flex flex-col gap-2 mt-2'>
            <hr/>
            <Button
                outline
                label = "Continuar com Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label = "Continuar com GitHub"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            {/* <Button
                outline
                label = "Continuar com Facebook"
                icon={FaFacebookSquare}
                onClick={() =>{}}
            /> */}
            <div 
                className='
                text-neutral-500
                text-center
                mt-2
                font-light
                '
            >   
                <div className=' justify-center flex flex-row items-center gap-2'>
                    <div >
                    Você já possui uma conta?
                    </div>
                    <span 
                        onClick={toggle} 
                        className="
                        text-neutral-800
                        cursor-pointer 
                        hover:underline
                        "
                    > Entrar</span>

                </div>
            </div>
        </div>
    )


  return (
    <Modal
        disabled = {isLoading}
        isOpen = {registerModal.IsOpen}
        title = "Cadastro"
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer = {footerContent}

    />
  )
}

export default RegisterModal;