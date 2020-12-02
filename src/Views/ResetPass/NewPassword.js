import React, { Fragment } from "react";
import { Link, withRouter } from 'react-router-dom'
import { useForm } from "react-hook-form";
import NavBar from "../../Components/MenuUser/index";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import './index.css';
import { MensajeExito} from './../../utils/toast'

const NewPassword= (props) => { 
    const { handleSubmit, register, errors, formState} = useForm();
    const { isSubmitted } = formState;
    
    const onSubmit = () => { 
        MensajeExito("Has creado una nueva contraseña");
        props.history.push('/inicio-sesion')
    }          

    const [see, setSee] = React.useState(false)
    const seePass = () =>
    {
        setSee(!see)        
    }
    
    return (
        <Fragment>
            <NavBar/>
            <div className="row justify-content-center container-padding row-no-magin">
                <div className="col-12 col-sm-8 col-md-6">
                    <h1 className='h1-custom-restore'>CREA UNA NUEVA CONTRASEÑA</h1>
                <form onSubmit= { handleSubmit(onSubmit) } className='form-container'>
                    <label className="label-form">
                        Nueva Contraseña
                        <div className="icon-see-container">
                            {see 
                                ? 
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
                    <section  className="container-buttons">
                        <Link
                            className="btn-cancel-register btn" 
                            type= 'submit' 
                            to="/registro"
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
                </form>
            </div>
        </div>           
        </Fragment>
    )
}
export default withRouter(NewPassword)