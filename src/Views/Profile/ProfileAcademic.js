import React, {useState, useEffect} from 'react';
import NavBar from '../../Components/MenuUser/index';
import { Link, withRouter } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { useForm, Controller } from 'react-hook-form';
import moment from 'moment';

import Stepper from './Stepper';
import UtilService from '../../services/util.service';
import UserService from '../../services/user.service';
import './index.css';

registerLocale('es', es);

const ProfileAcademic = (props) => {
  const { handleSubmit, register, errors, control, formState } = useForm();
  const { isSubmitted } = formState;
  const [ level, setLevel ] = useState([]);
  const [ field, setField] = useState([]);

  const onSubmit = (values) => {

  const datafield = {
    level_id: parseInt(values.level),
    name_inst: values.name_inst,
    field_id: parseInt(values.field),
    from_year: moment(values.from_year).format('YYYY-MM-DD'),
    to_year: moment(values.to_year).format('YYYY-MM-DD')
  };

  UserEducation(datafield);
  };

  async function UserEducation(datafield){
    const responseEducation = await UserService.registerUserEducation(datafield);
    if(responseEducation.status === 200){
      props.history.push('/info-experiencia');
    } else {
      // Mensaje de error
    }
  }

  useEffect( () => {
    async function listLevel(){
        const responseLevel = await UtilService.listLevel();
        setLevel(responseLevel.levels);
    }
    listLevel();
  }, []);

  useEffect( () => {
    async function listField(){
        const responseField = await UtilService.listField();
        setField(responseField.fields);
    }
    listField();
  }, []);

  return (
    <>
      <NavBar />
      <div className="row row-no-magin padding-container">
        <div className="col-12 col-md-6 offset-md-3 container-no-padding m-nav-form">
          <h1 className="h1-title-form">COMPLETA TU REGISTRO</h1>
        </div>
        <div className="col-12 col-md-6 offset-md-3 container-no-padding mt-stepper">
          <Stepper current={2} />
        </div>
        <div className="col-12 col-md-6 offset-md-3 container-no-padding">
          <h1 className="h1-form">ESTUDIOS</h1>
        </div>
        <div className="col-12  col-md-6 offset-md-3 container-no-padding">
          <form name="myForm" onSubmit={handleSubmit(onSubmit)} className="">
            <p className="text-form-academic">
              Ingresa los datos del último nivel de estudios que alcanzaste.
            </p>
            <label htmlFor="level" className="label-form mt-1">
              Nivel máximo alcanzado
              <select 
                  className={`form-control placeholder
                                  ${
                                    isSubmitted
                                      ? !errors.level
                                        ? 'input-icono'
                                        : 'border-error red-input input-icoerror'
                                      : ''
                                  }
                              `}
                  name="level"
                  ref={register({
                    required: { value: true, message: 'Este campo es requerido' }
                  })}
                  >
                  <option value="">Seleccione</option>
                  {level.map( element =>(
                      <option key={element.id} value={element.id}>{element.name}</option>
                  )
                  )}
              </select>
              <span className="span-error mt-1">
                {errors.level && errors.level.message}
              </span>
            </label>
            <label htmlFor="name_inst" className="label-form mt-1">
              Institución educativa
              <input
                placeholder="Ejemplo: Colegio Fé y Alegría"
                className={`form-control placeholder
                                ${
                                  isSubmitted
                                    ? !errors.name_inst
                                      ? 'input-icono'
                                      : 'border-error red-input input-icoerror'
                                    : ''
                                }
                            `}
                name="name_inst"
                type="text"
                autoComplete="off"
                ref={register({
                  required: { value: true, message: 'Este campo es requerido' }
                })}
              />
              <span className="span-error mt-1">
                {errors.name_inst && errors.name_inst.message}
              </span>
            </label>
            <label htmlFor="field" className="label-form mt-1">
              Especialidad
              <select 
                  className={`form-control placeholder
                                ${
                                  isSubmitted
                                    ? !errors.field
                                      ? 'input-icono'
                                      : 'border-error red-input input-icoerror'
                                    : ''
                                }
                            `}
                  name="field" 
                  ref={register({
                    required: { value: true, message: 'Seleccione un registro' }
                  })}>
                  <option value="">Seleccione</option>
                  {field.map( element =>(
                      <option key={element.id} value={element.id}>{element.name}</option>
                  )
                  )}
              </select>
              <span className="span-error mt-1">
                {errors.field && errors.field.message}
              </span>
            </label>

            <div className="row row-no-magin ">
              <div className="col-12 col-md-6 pr-md-4 pl-md-0 px-sm-0 px-xs-0">
                <label htmlFor="from_year" className=" label-form mt-2">
                  Fecha de inicio
                  <section className="customDatePickerWidth">
                    <Controller
                      control={control}
                      name="from_year"
                      defaultValue=""
                      render={(props) => (
                        <DatePicker
                          className={`form-control label-form-calen icon-calendar
                                          ${
                                            isSubmitted
                                              ? !errors.from_year
                                                ? 'input-icono'
                                                : 'border-error red-input input-icoerror'
                                              : ''
                                          }
                                      `}
                          placeholderText="DD/MM/AAAA"
                          selected={props.value}
                          onChange={(e) => props.onChange(e)}
                          dateFormat="dd/MM/yyyy"
                          locale={es}
                          maxDate={new Date()}
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          name="from_year"
                          autoComplete="off"
                        />
                      )}
                      rules={{
                        required: 'Coloque una fecha válida'
                      }}
                    />
                  </section>
                  <span className="span-error mt-1">
                    {errors.from_year && errors.from_year.message}
                  </span>
                </label>
              </div>
              <div className="col-12 col-md-6 pl-md-4 pr-md-0 px-sm-0 px-xs-0">
                <label htmlFor="to_year" className=" label-form mt-2">
                  Fecha de fin
                  <section className="customDatePickerWidth">
                    <Controller
                      control={control}
                      name="to_year"
                      defaultValue=""
                      render={(props) => (
                        <DatePicker
                          className={`form-control label-form-calen icon-calendar
                                                    ${
                                                      isSubmitted
                                                        ? !errors.to_year
                                                          ? 'input-icono'
                                                          : 'border-error red-input input-icoerror'
                                                        : ''
                                                    }
                                                `}
                          placeholderText="DD/MM/AAAA"
                          selected={props.value}
                          onChange={(e) => props.onChange(e)}
                          dateFormat="dd/MM/yyyy"
                          locale={es}
                          maxDate={new Date()}
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          name="to_year"
                          autoComplete="off"
                        />
                      )}
                      rules={{
                        required: 'Coloque una fecha válida'
                      }}
                    />
                  </section>
                  <span className="span-error mt-1">
                    {errors.to_year && errors.to_year.message}
                  </span>
                </label>
              </div>
            </div>
            <section className="container-buttons-form">
              <Link className="btn-cancel-form btn" to="/inicio">
                CANCELAR
              </Link>
              <button className="button-continue-restore btn" type="submit">
                <span className="text-button-continue-restore">CONTINUAR</span>
                <span className="icon-next"></span>
              </button>
            </section>
          </form>
        </div>
      </div>
    </>
  );
};

export default withRouter(ProfileAcademic);
