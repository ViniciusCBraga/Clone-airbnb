'use client';

import {signIn} from 'next-auth/react'
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

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

import Heading from '../Heading';
import Input from '../Inputs/Input';
import {toast} from 'react-hot-toast';
import Button from '../Button';
import Modal from './Modal';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const router = useRouter();

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
            email:'',
            senha:''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback)=>{
            setIsLoading(false);

            if(callback?.ok) {
                toast.success('Seja Bem-Vindo novamente!');
                router.refresh();
                loginModal.onClose();
            }

            if(callback?.error){
                toast.error(callback.error);
            }
            
        })

    }

    const toggle = useCallback(()=>{
        loginModal.onClose();
        registerModal.onOpen();
    },[loginModal, registerModal]);

    const bodyContent = (
        <div className='flex flex-col gap-2'>
            <Heading title='Bem vindo de volta!' subtitle='Entre na sua conta!'/>
            <Input 
                id='email' 
                label = "Email" 
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
                onClick={() =>signIn('google')}
            />
            <Button
                outline
                label = "Continuar com GitHub"
                icon={AiFillGithub}
                onClick={() =>signIn('github')}
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
                    Primeira vez usando o Airbnb?
                    </div>
                    <span 
                        onClick={toggle} 
                        className="
                        text-neutral-800
                        cursor-pointer 
                        hover:underline
                        "
                    > Crie uma conta</span>

                </div>
            </div>
        </div>
    )


  return (
    <Modal
        disabled = {isLoading}
        isOpen = {loginModal.IsOpen}
        title = "Login"
        actionLabel='Continue'
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer = {footerContent}

    />
  )
}

export default LoginModal;