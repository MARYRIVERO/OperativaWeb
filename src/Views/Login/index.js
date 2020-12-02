import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import ReactGa from 'react-ga';

import NavBar from '../../Components/MenuUser/index';
import { signIn, setUserError, setSignInUser, setSignUpUser } from '../../redux-store/user';
import './index.css';
import { setInitUser } from '../../redux-store/user/actions/init-user';

const Login = (props) => {
  // llamar accion de redux
  const dispatch = useDispatch();
  const { error: userError, signIn: success } = useSelector((state) => state.user);
  const { handleSubmit, register, errors, formState } = useForm();
  const { isSubmitted } = formState;

  const [error, setError] = useState(null);
  const [see, setSee] = useState(false);

  const seePass = () => {
    setSee(!see);
  };

  const onSubmit = (values) => {

    ReactGa.event({
      category: 'Buttom',
      action: 'Click in the buttom'
    });

    const datafield = {
      email: values.usuario,
      password: values.password
    };

    dispatch(signIn(datafield));
  };

  useEffect(() => {
    dispatch(setUserError(""));
    dispatch(setSignInUser(false));
    dispatch(setSignUpUser(false));
    dispatch(setInitUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Validar Error
  useEffect(() => {
    if (userError) {
      setError(userError);
    } else {
      setError("");
    }
  }, [userError]);

  //Exito
  useEffect(() => {
    if (success) {
      props.history.push('/inicio');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <>
      <NavBar />
      <div className="row justify-content-center container-padding row-no-magin">
        <div className="col-12 col-sm-8 col-md-6">
          <h1 className="h1-custom">INICIA SESIÓN EN OPERATIVA</h1>
          <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
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
                className={`form-control placeholder
                                    ${
                                      isSubmitted
                                        ? !errors.password
                                          ? ''
                                          : 'border-error red-input'
                                        : ''
                                    }
                                `}
                id="password"
                name="password"
                type={!see ? 'password' : 'text'}
                ref={register({
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Debe contener mínimo 6 caracteres' },
                  maxLength: { value: 12, message: 'Debe contener máximo 12 caracteres' }
                })}
              />
            </label>
            <span className="span-error">{errors.password && errors.password.message}</span>
            <div>
              <span className="info-form">
                <a href="/restablecer-contraseña">Restablecer contraseña</a>
              </span>
            </div>
            <section className="container-buttons">
              <Link className="btn-cancel-register btn" type="submit" to="/">
                CANCELAR
              </Link>
              <button className="btn-login btn" type="submit">
                INGRESAR
              </button>
            </section>
            <div className="space-spam-login-register">
              <span className="info-form">
                Si aún no tienes una cuenta <a href="/registro">registrate aquí</a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default withRouter(Login);
