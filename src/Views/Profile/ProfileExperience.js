import React, { Fragment, useEffect} from "react";
import NavBar from "../../Components/MenuUser/index"
import { Link, withRouter } from 'react-router-dom'
import DatePicker,{registerLocale}from "react-datepicker"
import { useForm, Controller } from "react-hook-form";
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css'
import Stepper from "./Stepper";
import './index.css';

registerLocale("es", es);

const ProfileAdress = (props) => { 

    const [experienceBuss, setExperienceBuss]= React.useState(false);
    const { handleSubmit, register, errors, control, formState} = useForm();
    const { isSubmitted } = formState;

    const onSubmit = (values) => { 
        console.log(values);
        props.history.push('/informacion-completada-con-exito')
    } 

    const handleExperience= (e)=>{
        console.log()
        setExperienceBuss(e)
    }
    const useHeadings = () => {
        const [listHeadings , setListHeadings] = React.useState([])
        
        useEffect(() => {
            fetch('json/rubros.json')
            .then(response => response.json())
                    .then(datos => {
                        setListHeadings(datos)
                    })
        }, [])
        return listHeadings
    }  
    
    const listHeadings= useHeadings();
    return (
        <Fragment>
        <NavBar/>
            <div className="row row-no-magin padding-container">
                <div className="col-12 col-md-6 offset-md-3 container-no-padding m-nav-form">
                    <h1 className='h1-title-form'>COMPLETA TU REGISTRO</h1>
                </div>
                <div className="col-12 col-md-6 offset-md-3 container-no-padding mt-stepper">
                    <Stepper current = {3} />
                </div>
                <div className="col-12 col-md-6 offset-md-3 container-no-padding">
                    <h1 className='h1-form'>Completa tu experiencia profesional</h1>
                </div>
                <div className="col-12  col-md-6 offset-md-3 container-no-padding">
                <form name="myForm" onSubmit={handleSubmit(onSubmit)} className=''>
                    <label htmlFor="workExperience" className="label-form mt-2 mb-2">         
                        Expericia laboral
                        <div className= "input-container-select mt-2">
                            <div classNme="form-check">
                                <input 
                                className="form-check-input"
                                type="radio" 
                                name="workExperience" 
                                id="" 
                                value="option1"
                                onClick= {()=> {handleExperience(false) }}
                                checked={!experienceBuss ? 'checked': '' }
                                ref={register}
                                />
                                <label className="form-text-check">
                                    Sin experiencia
                                </label>
                            </div>
                            <div className="form-check">
                                <input 
                                className="form-check-input"
                                type="radio" 
                                name="workExperience" 
                                id="" 
                                value="option2"
                                required=""
                                onClick= {()=> {handleExperience(true) }}
                                checked={experienceBuss ? 'checked': '' }
                                ref={
                                    register({
                                        required: "Seleccione una opción",
                                    })}
                                />
                                <label className="form-text-check">
                                    Con experiencia
                                </label>
                            </div>
                        </div>
                        <span className="span-error">
                                { errors.workExperience && errors.workExperience.message}
                        </span>
                    </label>
                    {
                        experienceBuss ? (
                    <>
                    <label htmlFor="workPosition" className="label-form">
                                Cargo
                                <input
                                    placeholder ="Operario" 
                                    className={`form-control placeholder
                                        ${
                                            isSubmitted ? 
                                            !errors.workPosition ?
                                            "input-icono"
                                            : 
                                            "border-error red-input input-icoerror"       
                                            : ''
                                        }
                                    `}                                         
                                    id=''
                                    name='workPosition'
                                    type="text"
                                    autoComplete="off"
                                    ref={register({
                                        required: {value: true, message:"Este campo es requerido"},
                                    })}
                                />
                            </label>
                            <span className="span-error">
                                { errors.workPosition && errors.workPosition.message}
                            </span>
                            <label htmlFor="registerBusiness"  className="label-form">
                                Empresa
                                <input
                                    placeholder ="Compañia SAC" 
                                    className={`form-control placeholder
                                        ${
                                            isSubmitted ? 
                                            !errors.registerBusiness ?
                                            "input-icono"
                                            : 
                                            "border-error red-input input-icoerror"       
                                            : ''
                                        }
                                    `}                                              
                                    id=''
                                    name='registerBusiness'
                                    type="text"
                                    autoComplete="off"
                                    ref={register({
                                        required: {value: true, message:"Este campo es requerido"},
                                    })}
                                />
                            </label>
                            <span className="span-error">
                                { errors.registerBusiness && errors.registerBusiness.message}
                            </span>
                            <label htmlFor="registerRubros" 
                            className="label-form" >
                                Rubro de interés
                                <select 
                                    name='registerRubros'
                                    className={`form-control form-text-check-adress mt-2
                                        ${
                                            isSubmitted ? 
                                            !errors.registerRubros ?
                                            ""
                                            : 
                                            "border-error red-input "       
                                            : ''
                                        }
                                    `} 
                                    ref={register({ required: {value: true, message: "Seleccione una opción"} })}
                                    id=""
                                    >
                                        <option value={""}>Logística</option>
                                        {
                                            listHeadings.map(item =>(
                                                <option >{item.name}</option>
                                            ))
                                        }
                                </select>
                            </label> 
                            <span className="span-error mt-2">
                                { errors.registerRubros && errors.registerRubros.message}
                            </span>
                            <div className="row row-no-magin ">
                                <div className="col-12 col-md-6 pr-md-4 pl-md-0 px-sm-0 px-xs-0">
                                    <label htmlFor="startDate" className=" label-form mt-3" >
                                    Fecha de inicio
                                    <section className="customDatePickerWidth">
                                        <Controller
                                            control={control}
                                            name="startDate"
                                            defaultValue=""
                                            render={(props) => (
                                                <DatePicker
                                                className={`form-control label-form-calen icon-calendar
                                                    ${
                                                        isSubmitted ? 
                                                        !errors.startDate ?
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
                                                    showYearDropdown
                                                    defaultValue=""
                                                    name ="startDate"
                                                    autoComplete="off"     
                                                />
                                            )}
                                                    rules={{
                                                        required: 'Coloque una fecha válida'
                                                    }}
                                        /> 
                                    </section>
                                    <span className="span-error mt-2">{ errors.startDate && errors.startDate.message}</span>
                                </label>
                                </div>
                                <div className="col-12 col-md-6 pl-md-4 pr-md-0 px-sm-0 px-xs-0">
                                    <label htmlFor="endDate" className=" label-form mt-3" >
                                    Fecha de fin
                                    <section className="customDatePickerWidth">
                                        <Controller
                                            control={control}
                                            name="endDate"
                                            defaultValue=""
                                            render={(props) => (
                                                <DatePicker
                                                className={`form-control label-form-calen icon-calendar
                                                    ${
                                                        isSubmitted ? 
                                                        !errors.startDate ?
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
                                                    showYearDropdown
                                                    defaultValue=""
                                                    name ="endDate"
                                                    autoComplete="off"     
                                                />
                                            )}
                                                    rules={{
                                                        required: 'Coloque una fecha válida'
                                                    }}
                                        /> 
                                    </section>
                                    <span className="span-error mt-2">{ errors.endDate && errors.endDate.message}</span>
                                </label>
                                </div>
                            </div>
                            
                           
                            <label htmlFor="retirement" className="label-form mt-3">
                                Motivo de retiro
                                <input
                                    className={`form-control box-style
                                        ${
                                            isSubmitted ? 
                                            !errors.retirement ?
                                            ""
                                            : 
                                            "border-error red-input"       
                                            : ''
                                        }
                                    `}                           
                                    id=''
                                    name='retirement'
                                    type="text"
                                    autoComplete="off"
                                    ref={register({
                                        required: {value: true, message:"Este campo es requerido"},
                                    })}
                                />
                            </label>
                            <span className="span-error-box">
                                { errors.retirement && errors.retirement.message}
                            </span>
                            <Link
                                className="text-experience"
                                style={{
                                    marginTop:'20px',
                                }}
                                to="/"
                                >
                                AGREGAR OTRA EXPERIENCIA
                            </Link>
                            <section  className="container-buttons-form">
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
                    </> 
                            ) : (
                    <>
                        <label htmlFor="rubroOption" className="label-form" >
                            Rubro de interés
                            <select  
                            className={`form-control form-text-check-adress mt-2
                                ${
                                    isSubmitted ? 
                                    !errors.rubroOption ?
                                    ""
                                    : 
                                    "border-error red-input"       
                                    : ''
                                }
                            `}   
                                id=""
                                name="rubroOption"
                                ref={register({ required: {value: true, message: "Seleccione una opción"} })}
                                >
                                    <option value="">Option</option>
                                    {
                                listHeadings.map(item =>(
                                    <option >{item.name}</option>
                                ))
                                    }
                            </select>
                        </label> 
                        <span className="span-error mt-2">
                            { errors.rubroOption && errors.rubroOption.message}
                        </span>
                        <section  className="">
                            <Link
                                className="mt-3" 
                                to="/"
                                >
                                AGREGAR OTRA EXPERIENCIA
                            </Link> 
                        </section>                
                        <section  className="container-buttons-form">
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
                    </> 
                    )
                    }
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default withRouter(ProfileAdress)
