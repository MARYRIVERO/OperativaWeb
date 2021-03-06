import React, { Fragment } from "react";
import { Link, withRouter } from 'react-router-dom'
import { useForm } from "react-hook-form";
import NavBar from "../../Components/MenuUser/index";
import * as OPTIONS from "../../services/options"
import axios from "axios";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import ReactGa from "react-ga"
import './index.css';

const Login= (props) => {
    const { handleSubmit, register, errors, formState} = useForm();
    const { isSubmitted } = formState;

    const [error, setError] = React.useState(null)
    const [see, setSee] = React.useState(false)
    
    const seePass = () => {
        setSee(!see)        
    }

    const onSubmit = (values) => { 
        console.log(values);

        ReactGa.event({
            category: 'Buttom',
            action:"Click in the buttom"
        })

        let datafield = {
            "email": values.usuario, 
            "password": values.password 
        }
        axios.post(OPTIONS.baseUrl + 'auth/login', datafield, OPTIONS.options)
        .then((response) => {
            if(response.status === OPTIONS.OK_RESPONSE) {
                localStorage.setItem('token', response.data.Authorization);
                axios.get(OPTIONS.baseUrl + 'user/'+ values.usuario)
                .then((response) => {   
                    //Guardar Email
                    localStorage.setItem('email', response.data.email);
                    props.history.push('/inicio');
                })
                .catch(function(error) {
                    console.log(error)
                })             
            } else if(response.status === OPTIONS.ERROR_PAGE) {
                    alert(response.data.message);
            } else {
                alert("Ha ocurrido un error interno.");
                console.log(response);
            }
        })
        .catch(function(error) {
            console.log(error)
            setError('Usuario y contraseña Incorrecta')
            return
        })
    }
    return (
        <Fragment>
        <NavBar/>
            <div className="row justify-content-center container-padding row-no-magin">
                <div className="col-12 col-sm-8 col-md-6">
                    <h1 className='h1-custom'>INICIA SESIÓN EN OPERATIVA</h1>
                    <form  className='form-container' onSubmit= { handleSubmit(onSubmit) } >
                       {
                            error ? (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                            ) : null
                        }
                        <label className="label-form">
                            Correo Electrónico
                            <input
                                placeholder ="mail@ejemplo.com"                    
                                className={`form-control placeholder
                                    ${
                                        isSubmitted ? 
                                        !errors.usuario ?
                                        "input-icono"
                                        : 
                                        "border-error red-input input-icoerror"       
                                        : ''
                                    }
                                `} 
                                name="usuario"
                                type="text"
                                autoComplete="off"
                                ref={register({
                                    required: "Este campo es requerido",
                                    pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Coloque un email valido"
                                    }
                                  })}
                            />
                        </label>
                        <span className="span-error">
                            {errors.usuario && errors.usuario.message}
                        </span>
                        <label className="label-form">
                            Contraseña
                            <div className="icon-see-container">
                                {see ? 
                                    <IoIosEye className="space-icon-see" onClick={seePass}/> 
                                    :
                                    <IoIosEyeOff className="space-icon-see" onClick={seePass}/>
                                }
                            </div>
                            <input
                                placeholder=".........."
                                className={`form-control placeholder
                                    ${
                                        isSubmitted ? 
                                            !errors.password ?
                                            ""
                                            : 
                                            "border-error red-input"                                            
                                        : ''
                                    }
                                `} 
                                id='password'
                                name='password'
                                type={!see ? 'password' : 'text'}
                                ref={register({
                                        required: "Este campo es requerido",
                                        minLength: { value: 6, message: "Debe contener mínimo 6 caracteres" },
                                        maxLength: { value: 12, message: "Debe contener máximo 12 caracteres" }
                                    }
                                )}
                            />
                        </label>
                            <span className="span-error">
                                {errors.password && errors.password.message}
                            </span>                       
                            <div>
                                <span className="info-form"><a href="/restablecer-contraseña">Restablecer contraseña</a></span>
                            </div>
                        <section  className="container-buttons">
                            <Link
                                className="btn-cancel-register btn" 
                                type= 'submit' 
                                to="/"
                                >
                                CANCELAR  
                            </Link> 
                            <button 
                                className="btn-login btn" 
                                type= 'submit'
                                >
                                SOLICITAR
                            </button>
                        </section>
                        <div className="space-spam-login-register">
                            <span className="info-form">Si aún no tienes una cuenta <a href="/registro">registrate aquí</a></span>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
export default withRouter(Login)