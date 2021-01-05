import React, {useState, useEffect} from "react";
import NavBar from "../../Components/MenuUser/index";
import { onlyLetters, onlyAlphaNumeric } from './../../utils/validation';
import { Link, withRouter } from 'react-router-dom'
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css'
import { useForm, Controller } from "react-hook-form";
import { onlyNumbers } from './../../utils/validation';
import UtilService from '../../services/util.service';
import { MensajeError } from './../../utils/toast'
import CompanyService from '../../services/company.service';
import moment from 'moment';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

registerLocale('es', es);

const Publications = (props) => { 
    const { handleSubmit, register, errors,control, formState} = useForm();
    const { isSubmitted } = formState;
    const [ rubro, setRubro] = useState([]);
    const [ district, setDistrict] = useState([]);

    const onSubmit = (values) => {

        const datafield = {
            job_title: values.name,
            description: values.position,
            requirements: values.requirements,
            job_level_id: values.cargo,
            address: values.address,
            district_id: values.district,
            salary: values.salario,
            from_date: moment(values.start_date).format('YYYY-MM-DD'),
            to_date: moment(values.to_date).format('YYYY-MM-DD'),
        };
        registerPublication(datafield);
    }

    async function registerPublication(datafield){
        try{
        const responsePublication = await CompanyService.registerPublication(datafield);
        if(responsePublication.status === 200){
            props.history.push('/menu-company')
        }
        }catch(error){
            MensajeError("Error: " + error.response.data.message);
        }
    }

    useEffect(() => {
        async function listRubro(){
        const responseRubro = await UtilService.listRubro();
        setRubro(responseRubro.areas);
    }
    listRubro();
    }, [])

    useEffect(() => {
        async function listDistrict(){
        const responseDistrict = await UtilService.listDistrictXLima();
        setDistrict(responseDistrict.districts);
    }
    listDistrict();
    }, [])

    return (
        <>
            <NavBar/>
            <div className="container-central row row-no-magin padding-container">
                <div className="col-12 col-md-6 offset-md-3 container-no-padding m-nav-form">
                    <h1 className='h1-title-form'>CREAR PUBLICACIÓN</h1>
                </div>
                <div className="col-12 col-md-6 offset-md-3 container-no-padding">
                    <h1 className='h1-form'>PUESTO SOLICITADO</h1>
                </div>
                <div className="col-12 col-md-6 offset-md-3 container-no-padding">
                    <form name="myForm" onSubmit={handleSubmit(onSubmit)}  className='form-container-info'>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="to_date" className=" label-form mt-1">
                                    Fecha de caducidad
                                    <section className="customDatePickerWidth">
                                        <Controller
                                        control={control}
                                        name="to_date"
                                        defaultValue=""
                                        render={(props) => (
                                            <DatePicker
                                            className={`form-control label-form-calen height-32 icon-calendar
                                                            ${
                                                                isSubmitted
                                                                ? !errors.to_date
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
                                            minDate={new Date()}
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            name="to_date"
                                            autoComplete="off"
                                            />
                                        )}
                                        rules={{
                                            required: 'Coloque una fecha válida'
                                        }}
                                        />
                                    </section>
                                    <span className="span-error mt-1">
                                        {errors.to_date && errors.to_date.message}
                                    </span>
                                </label>
                            </div> 
                        </div>
                        <label htmlFor="name" className="label-form">
                            Nombre del puesto
                            <input
                                placeholder ="Ejemplo: Operario" 
                                className={`form-control input-text
                                    ${
                                        isSubmitted ? 
                                        !errors.name ?
                                        "input-icono"
                                        : 
                                        "border-error red-input input-icoerror"       
                                        : ''
                                    }
                                `} 
                                name='name'
                                type="text"
                                maxLength="25"
                                onKeyPress={e =>{onlyLetters(e)}} 
                                ref={register({
                                    required: "Este campo es requerido",
                                  })} 
                            />
                            <span className="span-error mt-1">
                                { errors.name && errors.name.message}
                            </span>
                        </label>
                        <label htmlFor="cargo" className="label-form mt-1">        
                            Rubro
                            <select 
                                className={`form-control input-text
                                    ${
                                        isSubmitted ? 
                                        !errors.cargo ?
                                        "input-icono"
                                        : 
                                        "border-error red-input input-icoerror"       
                                        : ''
                                    }
                                `} 
                                name="cargo" 
                                ref={register({
                                    required: "Este campo es requerido", message: "Coloque un Nombre valido"
                                    })}>
                                <option value="">Seleccione</option>
                                {rubro.map( e =>(
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                    )
                                )}	
                            </select>
                            <span className="span-error mt-1">
                                { errors.cargo && errors.cargo.message}
                            </span>
                        </label>

                        <label htmlFor="position" className="label-form mt-1">
                            Funciones del puesto
                                <Controller
                                    control={control}
                                    name="position"
                                    defaultValue=""
                                    render={(props) => (
                                    <CKEditor
                                        editor= {ClassicEditor}
                                        selected={props.value}
                                        onChange={(e, editor) => {
                                            const data = editor.getData();
                                            props.onChange(data);
                                            }
                                        }
                                        name="position"
                                    />
                                    )}
                                rules={{
                                    required: 'Coloque una posición valida'
                                }}
                                />
                            <span className="span-error mt-1">
                                {errors.position && errors.position.message}
                            </span>
                        </label>

                        <label htmlFor="requirements" className="label-form mt-1">
                            Requisitos del puesto
                                <Controller
                                    control={control}
                                    name="requirements"
                                    defaultValue=""
                                    render={(props) => (
                                    <CKEditor
                                        editor= {ClassicEditor}
                                        selected={props.value}
                                        onChange={(e, editor) => {
                                            const data = editor.getData();
                                            props.onChange(data);
                                            }
                                        }
                                        name="requirements"
                                    />
                                    )}
                                rules={{
                                    required: 'Coloque una requirimiento valida'
                                }}
                                />
                            <span className="span-error mt-1">
                                {errors.requirements && errors.requirements.message}
                            </span>
                        </label>

                        <label htmlFor="address" className="label-form mt-1">
                            Dirección
                            <input
                                placeholder ="Ejemplo: Urb Hipolito Unanue 123" 
                                className={`form-control input-text
                                    ${
                                        isSubmitted ? 
                                        !errors.address ?
                                        "input-icono"
                                        : 
                                        "border-error red-input input-icoerror"       
                                        : ''
                                    }
                                `} 
                                name='address'
                                type="text"
                                maxLength='30'
                                onKeyPress={e =>{onlyAlphaNumeric(e)}} 
                                ref={register({
                                    required: {value: true, message: "Agregue una dirección" }
                                })}
                            />
                            <span className="span-error">
                                { errors.address && errors.address.message}
                            </span>
                        </label>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="district" className="label-form mt-1">        
                                    Distrito
                                    <select 
                                        className={`form-control input-text
                                            ${
                                                isSubmitted ? 
                                                !errors.district ?
                                                "input-icono"
                                                : 
                                                "border-error red-input input-icoerror"       
                                                : ''
                                            }
                                        `} 
                                        name="district" 
                                        ref={register({
                                            required: "Este campo es requerido", message: "Coloque un Nombre valido"
                                        })}>
                                        <option value="">Seleccione</option>
                                        {district.map( e =>(
                                            <option key={e.id} value={e.id}>{e.name}</option>
                                            )
                                        )}	
                                        
                                    </select>
                                    <span className="span-error mt-1">
                                        { errors.district && errors.district.message}
                                    </span>
                                </label>
                            </div>
                            <div className="col-6">
                                <label htmlFor="salario" className="label-form mt-1">
                                    Salario
                                    <input
                                        placeholder ="100" 
                                        className={`form-control input-text
                                            ${
                                                isSubmitted ? 
                                                !errors.salario ?
                                                "input-icono"
                                                : 
                                                "border-error red-input input-icoerror"       
                                                : ''
                                            }
                                        `}
                                        onKeyPress={e =>{onlyNumbers(e)}}
                                        name='salario'
                                        type="text"
                                        maxLength='4'
                                        ref={register({
                                            required: "Este campo es requerido", message: "Coloque un Nombre valido"
                                        })}
                                    />
                                    <span className="span-error mt-1">
                                        { errors.salario && errors.salario.message}
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="start_date" className=" label-form mt-1">
                                    Fecha de inicio
                                    <section className="customDatePickerWidth">
                                        <Controller
                                        control={control}
                                        name="start_date"
                                        defaultValue=""
                                        render={(props) => (
                                            <DatePicker
                                            className={`form-control label-form-calen height-32 icon-calendar
                                                            ${
                                                                isSubmitted
                                                                ? !errors.start_date
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
                                            name="start_date"
                                            autoComplete="off"
                                            />
                                        )}
                                        rules={{
                                            required: 'Coloque una fecha válida'
                                        }}
                                        />
                                    </section>
                                    <span className="span-error mt-1">
                                        {errors.start_date && errors.start_date.message}
                                    </span>
                                </label>
                            </div>
                            <div className="col-6">
                                <label htmlFor="period" className="label-form mt-1">        
                                    Período
                                    <select 
                                        className={`form-control input-text
                                            ${
                                                isSubmitted ? 
                                                !errors.period ?
                                                "input-icono"
                                                : 
                                                "border-error red-input input-icoerror"       
                                                : ''
                                            }
                                        `} 
                                        name="period" 
                                        ref={register({
                                            required: "Este campo es requerido", message: "Coloque un Nombre valido"
                                            })}>
                                        <option value="">Seleccione</option>
                                        <option value="1">1 año</option>
                                        <option value="2">2 años</option>
                                        <option value="3">3 años</option>
                                        <option value="4">Mayor a 3 años</option>
                                    </select>
                                    <span className="span-error mt-1">
                                        { errors.period && errors.period.message}
                                    </span>
                                </label>
                            </div>
                        </div>
                        <section className="container-buttons-form">
                            <Link
                                className="btn-cancel-register btn" 
                                to='/menu-company'
                                >
                                CANCELAR
                            </Link> 
                            <button className="btn-register btn" type="submit">
                                PUBLICAR
                            </button>
                        </section>                      
                    </form>
                </div>
            </div>
        </>
    )
}

export default withRouter(Publications)