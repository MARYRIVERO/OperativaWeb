import React, { useEffect, useState } from "react";
import NavBar from "../../Components/MenuUser/index"
import { Link, withRouter } from 'react-router-dom'
import DatePicker,{registerLocale} from "react-datepicker"
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css'

import es from 'date-fns/locale/es';
import { useForm, Controller } from "react-hook-form";
import moment from 'moment';

import Stepper from "./Stepper";
import UtilService from '../../services/util.service';
import { setUserInfo } from '../../redux-store/user';
import './index.css';
import { onlyNumbers } from './../../utils/validation';
import { onlyLetters } from './../../utils/validation';

registerLocale("es", es);

const ProfileInfo = (props) => { 
    // Obtener los valores de mi storage
    const { currentUser } = useSelector((state) => state.user);
    const type_document = currentUser.type_doc ? currentUser.type_doc : '';
    const type_provider = currentUser.id_provider ? currentUser.id_provider : '';
    const fechaNacimiento = currentUser.birth_date? moment(currentUser.birth_date, "DD-MM-YYYY").toDate() : moment().toDate();
    
    const [selectDocument, setSelectDocument] = useState(type_document);
    const [selectProvider, setSelectProvider] = useState(type_provider);

    const [ typeDocument, setTypeDocument ] = useState([]);
    const [ provider, setProvider ] = useState([]);

    const defaultValues = {
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        num_doc: currentUser.num_doc,
        birth_date : fechaNacimiento
    };

    const dispatch = useDispatch();
    const { handleSubmit, register, errors, control, formState} = useForm({ defaultValues });
    const { isSubmitted } = formState;

    const onSubmit = (values, e) => { 
        // Obtiene los valores
        const datafield = {
            first_name: values.first_name,
            country_id:1,
            last_name: values.last_name,
            type_doc: parseInt(selectDocument),
            num_doc: values.num_doc,
            birth_date: moment(values.birth_date).format('YYYY-MM-DD'),
            gender: parseInt(values.gender),
            provider_id: parseInt(selectProvider)
        };
        // Guardar los valores en mi Store Usuario
        dispatch(setUserInfo(datafield));
        props.history.push('/info-direccion')
    }

        // Obtener la lista de proveedores
    useEffect( () => {
        async function listProvider(){
            const responseProvider = await UtilService.listProvider();
            setProvider(responseProvider.providers);
        }
        listProvider();
    }, []);

    // Cargar combo tipo de documento
    useEffect( () => {
        async function listDoc(){
            const responseDocument = await UtilService.listDocument();
            setTypeDocument(responseDocument.documents);
        }
        listDoc();
     }, []);

    return (
        <>
            <NavBar/>
            <div className="row row-no-magin padding-container">
                <div className="col-12 col-md-6 offset-md-3 container-no-padding m-nav-form">
                    <h1 className='h1-title-form'>COMPLETA TU REGISTRO</h1>
                </div>
                <div className="col-12 col-md-6 offset-md-3 container-no-padding mt-stepper">
                    <Stepper current = {0} />
                </div>
                <div className="col-12 col-md-6 offset-md-3 container-no-padding">
                    <h1 className='h1-form'>DATOS PERSONALES</h1>
                </div>
                <div className="col-12 col-md-6 offset-md-3 container-no-padding">
                    <form name="myForm" onSubmit={handleSubmit(onSubmit)}  className='form-container-info'>
                        <label htmlFor="first_name" className="label-form">
                            Nombres
                            <input
                                placeholder ="Ejemplo: Maria Jose" 
                                className={`form-control placeholder
                                    ${
                                        isSubmitted ? 
                                        !errors.first_name ?
                                        "input-icono"
                                        : 
                                        "border-error red-input input-icoerror"       
                                        : ''
                                    }
                                `} 
                                id='first_name'
                                name='first_name'
                                type="text"
                                maxLength="25"
                                onKeyPress={e =>{onlyLetters(e)}} 
                                ref={register({
                                    required: "Este campo es requerido",
                                    pattern: {
                                        value:  /^[A-Za-z]+$/i,
                                        message: "Ingrese un nombre valido",
                                    },
                                })}
                            />
                            <span className="span-error mt-1">
                                { errors.first_name && errors.first_name.message}
                            </span>
                        </label>
                        <label htmlFor="last_name" className="label-form mt-1">
                            Apellidos
                            <input
                                placeholder="Ejemplo: Ortiz Pérez"
                                className={`form-control placeholder mb-2
                                    ${
                                        isSubmitted ? 
                                        !errors.last_name ?
                                        "input-icono"
                                        : 
                                        "border-error red-input input-icoerror"       
                                        : ''
                                    }
                                `} 
                                id='last_name'
                                name='last_name'
                                type="text"
                                onKeyPress={e =>{onlyLetters(e)}} 
                                ref={register({
                                    required: "Este campo es requerido",
                                    pattern: {
                                        value:  /^[A-Za-z]+$/i,
                                        message: "Ingrese un nombre valido",
                                      },
                                  })}
                            />
                            <span className="span-error mt-1">
                                { errors.last_name && errors.last_name.message}
                            </span>
                        </label>
                        <label htmlFor="type_doc" className="label-form mt-1">        
                            Tipo de Documento
                            <select 
                                className={`form-control placeholder mb-2
                                    ${
                                        isSubmitted ? 
                                        !errors.type_doc ?
                                        "input-icono"
                                        : 
                                        "border-error red-input input-icoerror"       
                                        : ''
                                    }
                                `} 
                                name="type_doc" 
                                id="type_doc"
                                value={selectDocument}
                                onChange={(e => setSelectDocument(e.target.value))}
                                ref={register({
                                    required: "Este campo es requerido", message: "Coloque un Nombre valido"
                                  })}>
                                <option value="">Seleccione</option>
                                {typeDocument.map( element =>(
                                    <option key={element.id} value={element.id}>{element.name}</option>
                                )
                                )}
                            </select>	
                            <span className="span-error mt-1">
                                { errors.type_doc && errors.type_doc.message}
                            </span>
                        </label>
                        <label  htmlFor="num_doc" className="label-form mt-1">
                            Número de documento
                            <input
                                placeholder="Ejemplo: 58748595"
                                className={`form-control placeholder mb-2
                                    ${
                                        isSubmitted ? 
                                        !errors.num_doc ?
                                        "input-icono"
                                        : 
                                        "border-error red-input input-icoerror"       
                                        : ''
                                    }
                                `} 
                                id='num_doc'
                                name='num_doc'
                                type="text"
                                maxLength='12'
                                onKeyPress={e =>{onlyNumbers(e)}}
                                ref={register({
                                    required: "Este campo es requerido",
                                        maxLength : {
                                            value: 12,
                                            message: 'Coloque un documento válido' 
                                        },
                                        minLength: {
                                            value: 8,
                                            message: 'Coloque un documento válido' 
                                        }
                                  })} 
                            />
                            <span className="span-error mt-1">
                                { errors.num_doc && errors.num_doc.message }
                            </span>
                        </label>
                        <label htmlFor="birth_date" className=" label-form mt-2" >
                            Fecha de nacimiento
                            <section className="customDatePickerWidth">
                                <Controller
                                    control={control}
                                    name="birth_date"
                                    render={(props) => (
                                        <DatePicker
                                        className={`form-control label-form-calen icon-calendar
                                                ${
                                                    isSubmitted ? 
                                                    !errors.birth_date ?
                                                    ""
                                                    : 
                                                    "border-error red-input"       
                                                    : ''
                                                }
                                            `} 
                                            placeholderText="DD/MM/AAAA"
                                            onChange={(e) => props.onChange(e)}
                                            selected={props.value}
                                            dateFormat="dd/MM/yyyy"
                                            locale={es}
                                            maxDate={new Date()}
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            name ="birth_date"
                                        />
                                    )}
                                    rules={{
                                        required: 'Coloque una fecha válida'
                                    }}
                                /> 
                            </section>

                        </label>
                            <span className="span-error mt-1">
                                {errors.birth_date && errors.birth_date.message}
                            </span>
                        <label htmlFor="gender" className="label-form mt-1">
                            Genero
                            <div className= "input-container-radio mt-2">
                                <div className="form-check margin-right">
                                    <input 
                                        className="form-check-input"
                                        type="radio" 
                                        name="gender"
                                        value='1'
                                        ref={register({ required: "Seleccione una opción" })}
                                    />
                                    <label className="form-text-check">
                                        Masculino
                                    </label>
                                </div>
                                <div className="form-check margin-right">
                                    <input 
                                        className="form-check-input"
                                        type="radio" 
                                        name="gender" 
                                        value="2"
                                        ref={register({ required: "Seleccione una opción" })}
                                    />
                                    <label className="form-text-check">
                                        Femenino
                                    </label>
                                </div>
                                <div className="form-check margin-right">
                                    <input 
                                        className="form-check-input"
                                        type="radio" 
                                        name="gender" 
                                        value="0"
                                        ref={register({ required: "Seleccione una opción" })}
                                    />
                                    <label className="form-text-check">
                                        Otros
                                    </label>
                                </div>
                            </div>
                            <span className="span-error">
                                { errors.gender && errors.gender.message}
                            </span>
                        </label>
                        <label htmlFor="id_provider" className="label-form mt-1">        
                            ¿Como te enteraste de operativa?
                            <select 
                                className={`form-control placeholder mb-2
                                    ${
                                        isSubmitted ? 
                                        !errors.id_provider ?
                                        "input-icono"
                                        : 
                                        "border-error red-input input-icoerror"       
                                        : ''
                                    }
                                `} 
                                name="id_provider" 
                                id="id_provider"
                                value={selectProvider}
                                onChange={(e => setSelectProvider(e.target.value))}
                                ref={register({
                                    required: "Este campo es requerido", message: "Coloque un Nombre valido"
                                  })}>
                                <option value="">Seleccione</option>
                                {provider.map( element =>(
                                    <option key={element.id} value={element.id}>{element.name}</option>
                                )
                                )}
                            </select>	
                            <span className="span-error mt-1">
                                { errors.id_provider && errors.id_provider.message}
                            </span>
                        </label>
                        <section className="container-buttons-form">
                            <Link
                                className="btn-cancel-form btn" 
                                to='/inicio'
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
        </>
    )
}

export default withRouter(ProfileInfo)

