import React from 'react';
import NavBar from '../../Components/MenuUser/index';
import { Link, withRouter } from 'react-router-dom';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { useForm } from 'react-hook-form';
import { onlyNumbers, onlyLetters , onlyAlphaNumeric  } from './../../utils/validation';
import MunicipalityService from '../../services/municipality.service';
import document  from '../../assets/docs/terminosycondiciones.pdf'
registerLocale('es', es);

const ProfileMunicipality = (props) => {
  const { handleSubmit, register, errors, formState } = useForm();
  const { isSubmitted } = formState;

  const onSubmit = (values) => {
    const datafield = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.mail,
      razon_social: values.business_name,
      document_number: values.ruc,
      phone: values.phone,
      interest_area_id : ""
    };
    registerMunicipality(datafield);
  }
  
  async function registerMunicipality(datafield){
    const responseCompany = await MunicipalityService.registerMunicipality(datafield);
    if(responseCompany.status === 200){
      props.history.push('/solicitud-enviada')
    } else {
      // Mensaje de error
    }
  }
  
  return (
    <>
    <NavBar />
    <div className="row justify-content-center padding-container row-no-magin">
        <div className="col-12 col-sm-8 col-md-6 container-no-padding">
          <h1 className="h1-custom-restore">Solicitud de nuevo usuario</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <p className="text-form-company">
              Completa los siguientes campos para ser parte de Operativa.
              <br/>Si ya tienes una cuenta <a href="/registro">inicia sesión</a>
            </p>
            <label htmlFor="first_name" className="label-form mt-1">
              Nombre
              <input
                placeholder="Ejemplo: Pedro Luis"
                className={`form-control placeholder
                                ${
                                  isSubmitted
                                    ? !errors.first_name
                                      ? 'input-icono'
                                      : 'border-error red-input input-icoerror'
                                    : ''
                                }
                            `}
                name="first_name"
                type="text"
                maxLength="25"
                onKeyPress={e =>{onlyLetters(e)}} 
                autoComplete="off"
                ref={register({
                  required: { value: true, message: 'Este campo es requerido' }
                })}
              />
              <span className="span-error mt-1">
                {errors.first_name && errors.first_name.message}
              </span>
            </label>
            <label htmlFor="last_name" className="label-form mt-1">
              Apellido
              <input
                placeholder="Ejemplo: Castillo Lopez"
                className={`form-control placeholder
                                ${
                                  isSubmitted
                                    ? !errors.last_name
                                      ? 'input-icono'
                                      : 'border-error red-input input-icoerror'
                                    : ''
                                }
                            `}
                name="last_name"
                type="text"
                maxLength="25"
                onKeyPress={e =>{onlyLetters(e)}} 
                autoComplete="off"
                ref={register({
                  required: { value: true, message: 'Este campo es requerido' }
                })}
              />
              <span className="span-error mt-1">
                {errors.last_name && errors.last_name.message}
              </span>
            </label>
                        <label className="label-form">
              Correo Electrónico
              <input
                placeholder="mail@ejemplo.com"
                className={`form-control placeholder
                                    ${
                                      isSubmitted
                                        ? !errors.mail
                                          ? 'input-icono'
                                          : 'border-error red-input input-icoerror'
                                        : ''
                                    }
                                `}
                name="mail"
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
              <span className="span-error mt-1">
                  { errors.mail && errors.mail.message}
              </span> 
            </label>
            <label htmlFor="business_name" className="label-form mt-1">
              Razon Social
              <input
                placeholder="Ejemplo: Operativa"
                className={`form-control placeholder
                                ${
                                  isSubmitted
                                    ? !errors.business_name
                                      ? 'input-icono'
                                      : 'border-error red-input input-icoerror'
                                    : ''
                                }
                            `}
                name="business_name"
                type="text"
                maxLength="25"
                autoComplete="off"
                onKeyPress={e =>{onlyAlphaNumeric(e)}} 
                ref={register({
                  required: { value: true, message: 'Este campo es requerido' }
                })}
              />
              <span className="span-error mt-1">
                {errors.business_name && errors.business_name.message}
              </span>
            </label>
            <label htmlFor="ruc" className="label-form mt-1">
              RUC
              <input
                placeholder="Ejemplo: 20145874585"
                className={`form-control placeholder
                                ${
                                  isSubmitted
                                    ? !errors.ruc
                                      ? 'input-icono'
                                      : 'border-error red-input input-icoerror'
                                    : ''
                                }
                            `}
                name="ruc"
                type="text"
                maxLength="11"
                onKeyPress={e =>{onlyNumbers(e)}} 
                autoComplete="off"
                ref={register({
                  required:  {value: true, message: 'Este campo es requerido'},
                  minLength: {value: 8, message: 'Ingrese un RUC valido'} 
                })}
              />
              <span className="span-error mt-1">
                {errors.ruc && errors.ruc.message}
              </span>
            </label>
            <label htmlFor="phone" className="label-form mt-1">
              Teléfono
              <input
                  placeholder="Ejemplo: 958478595"
                  className={`form-control placeholder mb-2
                      ${
                          isSubmitted ? 
                          !errors.phone ?
                          "input-icono"
                          : 
                          "border-error red-input input-icoerror"       
                          : ''
                      }
                  `}
                  name='phone'
                  type="text"
                  maxLength="9"
                  autoComplete="off"
                  onKeyPress={e =>{onlyNumbers(e)}} 
                  ref={register({
                      required: "Este campo es requerido",
                          maxLength : {
                              value: 9,
                              message: 'Coloque un número telefónico válido' 
                          },
                          minLength: {
                              value: 9,
                              message: 'Coloque un número telefónico válido' 
                          }
                  })} 
              />
              <span className="span-error">
                  { errors.phone && errors.phone.message}
              </span> 
            </label>
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
                Acepto los{' '}
                
                <a href={document} target = "_blank" rel="noopener noreferrer">terminos y condiciones</a>
              </span>
            </label>
            <span className="span-error">{errors.terms && errors.terms.message}</span>

            <section className="container-buttons-continue">
              <Link className="btn-cancelar-sol text-center" to="/">
                CANCELAR
              </Link>
              <button className="btn-continue-sol text-center" type="submit">
                ACEPTAR
              </button>
            </section>
          </form>
        </div>
      </div>

    </>
  );
};

export default withRouter(ProfileMunicipality);
