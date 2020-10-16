import React, { Fragment } from "react";
import { Link, withRouter } from 'react-router-dom'
import { useForm } from "react-hook-form";
import NavBar from "../../Components/MenuUser/index"
import './index.css';

const RestorePassword= (props) => {

    const { handleSubmit, register, errors, formState} = useForm();
    const { isSubmitted } = formState;
    // const [error, setError] = React.useState(null)
    
    const onSubmit = (values) => { 
        console.log(values);
      props.history.push('/notificacion-contraseña')
      }
    return (
      <Fragment>
        <NavBar/>
        <div className="row justify-content-center padding-container row-no-magin">
          <div className="col-12 col-sm-8 col-md-6 container-no-padding">
            <h1 className="h1-custom-restore">RECUPERA TU CONTRASEÑA</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="form-container">
              <label className="label-form">
                Ingresa tu correo electrónico
                <input
                  placeholder="mail@ejemplo.com"
                  className={`form-control placeholder
                                ${
                                  isSubmitted
                                    ? !errors.usuario
                                      ? "input-icono"
                                      : "border-error red-input input-icoerror"
                                    : ""
                                }
                            `}
                  id="email"
                  name="usuario"
                  type="text"
                  autoComplete="off"
                  ref={register({
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Coloque un email valido",
                    },
                  })}
                />
              </label>
              <span className="span-error">
                {errors.usuario && errors.usuario.message}
              </span>
              <section className="container-buttons-continue">
                  <Link
                    className="btn-cancel-pr btn"
                    to="/registro"
                  >
                    CANCELAR
                  </Link>
                  <button
                    className="button-continue-restore btn"
                    type="submit"
                  >
                    <span className= "text-button-continue-restore">CONTINUAR</span>
                    <span className="icon-next"></span>
                  </button>
              </section>
            </form>
          </div>
        </div>
      </Fragment>
    );
}
export default withRouter(RestorePassword)