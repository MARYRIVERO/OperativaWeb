import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import ReactGa from 'react-ga';

import NavBar from '../../Components/MenuUser/index';
import { signUp, setUserError, setSignUpUser, setSignInUser } from '../../redux-store/user';
import './index.css';

const Register = (props) => {
  // llamar accion de redux
  const dispatch = useDispatch();
  const { signUp: account, error: userError } = useSelector((state) => state.user);
  const { handleSubmit, register, errors, formState } = useForm();
  const { isSubmitted } = formState;
  const [see, setSee] = useState(false);
  const [error, setError] = useState(null);
  const [modalTerms, setModalTerms] = useState(false);


  //mostrar Contraseña:
  const seePass = () => {
    setSee(!see); 
  };

  const onSubmit = (values) => {

    ReactGa.event({
      category: 'Buttom',
      action: 'Click in the buttom'
    });
    
    let datafield =  {
          email: values.usuario,
          password: values.password,
          term_condi: values.terms === true ? 1 : 0
    };

    dispatch(signUp(datafield));
  };

  useEffect(() => {
    dispatch(setUserError(""));
    dispatch(setSignUpUser(false));
    dispatch(setSignInUser(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Validación del servicio
  useEffect(() => {
    if (userError) {
      setError(userError);
    } else {
      setError("");
    }
  }, [userError]);

  //Exito
  useEffect(() => {
    if (account) {
      props.history.push('/inicio-sesion');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <>
      <NavBar />
      <div className="row justify-content-center container-padding row-no-magin">
        <div className="col-12 col-sm-8 col-md-6">
          <h1 className="h1-custom">REGISTRATE EN OPERATIVA</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            {error ? <div className="alert alert-danger">{error}</div> : null}
            <label className="label-form">
              Correo Electrónico
              <input
                placeholder="mail@ejemplo.com"
                className={`form-control placeholder
                                          ${
                                            isSubmitted
                                              ? !errors.usuario
                                                ? 'input-icono'
                                                : 'border-error red-input input-icoerror'
                                              : ''
                                          }
                                      `}
                id="email"
                name="usuario"
                type="text"
                autoComplete="off"
                ref={register({
                  required: 'Este campo es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Coloque un email valido'
                  }
                })}
              />
            </label>
            <span className="span-error">{errors.usuario && errors.usuario.message}</span>
            <label className="label-form">
              Contraseña
              <div className="icon-see-container">
                {see ? (
                  <IoIosEye className="space-icon-see" onClick={seePass} />
                ) : (
                  <IoIosEyeOff className="space-icon-see" onClick={seePass} />
                )}
              </div>
              <input
                placeholder=".........."
                className={`form-control  placeholder                                      
                                        ${
                                          isSubmitted
                                            ? !errors.password
                                              ? ''
                                              : 'border-error red-input'
                                            : ''
                                        }
                                   `}
                name="password"
                type={!see ? 'password' : 'text'}
                ref={register({
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 6,
                    message: 'Debe contener mínimo 6 caracteres'
                  },
                  maxLength: {
                    value: 12,
                    message: 'Debe contener máximo 12 caracteres'
                  }
                })}
              />
            </label>
            <span className="span-error">{errors.password && errors.password.message}</span>
            <label className="">
              <input
                className="terms-checkbox "
                name="terms"
                type="checkbox"
                ref={register({
                  required: 'Debe aceptar los términos y condiciones'
                })}
              />
              <span className="info-form-term">
                Acepto{' '}
                
                <button type="button" className="terminos" onClick={(e) => setModalTerms(!modalTerms)}>
                  términos y condiciones
                </button>
              </span>
            </label>
            <span className="span-error">{errors.terms && errors.terms.message}</span>
            <section className="container-buttons">
              <Link className="btn-cancel-register btn" to="/">
                CANCELAR
              </Link>
              <button className="btn-register btn" type="submit">
                SOLICITAR
              </button>
            </section>
            <div className="space-spam-login-register">
              <span className="info-form">
                Si ya tienes una cuenta <a href="/inicio-sesion">inicia sesión aquí</a>
              </span>
            </div>
          </form>
        </div>
      </div>
      

      <Modal isOpen={modalTerms}>
        <ModalHeader>Términos y condiciones.</ModalHeader>
        <ModalBody>
          <p >
          De conformidad con la Ley 29733 de Protección de Datos Personales, autorizo, libre y
          expresamente a la Plataforma OPERATIVA para que mis datos personales sean utilizados
          para fines laborales.
          <br />
          <br />
          Deseo recibir información sobre organizaciones, empresas, que puedan adecuarse a mi
          interés de trabajo.
          <br />
          <br />
          Deseo recibir notificaciones de convocatorias de trabajo en mi correo electrónico.
          </p>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={(e) => setModalTerms(!modalTerms)}>
          {' '}
          Cerrar{' '}
          </button>
        </ModalFooter>
        </Modal>

    </>
  );
};
export default withRouter(Register);
