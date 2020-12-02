import React, { useState, useEffect} from 'react';
import { Link, withRouter } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form";
import DatePicker,{ registerLocale }from "react-datepicker" 
import es from 'date-fns/locale/es';
import ReactStars from 'react-rating-stars-component';

import UtilService from '../../services/util.service';
import UserService from '../../services/user.service';
import { useDispatch, useSelector } from 'react-redux';
import { setJob } from '../../redux-store/user/actions/set-job';
import { removeJob } from '../../redux-store/user/actions/remove-job';
import { updateJob } from '../../redux-store/user/actions/update-job';
registerLocale("es", es);

const WithExperience = (props) => { 

    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { handleSubmit, register, errors, control , formState} = useForm();
    const { isSubmitted } = formState;

    const [ jobLevel, setJobLevel ] = useState([]);
    const [ motivoRetiro, setMotivoRetiro ] = useState([]);

    console.log("current_user",currentUser);
    console.log("lenght", currentUser.jobs.length);
    if(currentUser.jobs.length===0){
        console.log("add job");
        dispatch(setJob({
            name_inst: "",
            address:"",
            department: 0,
            job_level_id: 0,
            from_year: null,
            to_year: null,
            buss_travel: 0,
            distan_home: 0, // EN DURO
            hour_rate: 0,
            job_sati: 0,
            monthly_income: 0,
            over_time: 0,
            work_bal_life: 0, // EN DURO
            job_invol: 0, // EN DURO
            attrition: 0,
            demo: 0
        }));
    }

    const onSubmit = (e) => {
        console.log("eee",e);
        console.log("jobs",currentUser.jobs);
        
        registerJob(currentUser.jobs);
    } 

    const addJob = () => {
        console.log("addjob");
        dispatch(setJob({
            name_inst: "",
            address:"",
            department: 0,
            job_level_id: 0,
            from_year: null,
            to_year: null,
            buss_travel: 0,
            distan_home: 0, // EN DURO
            hour_rate: 0,
            job_sati: 0,
            monthly_income: 0,
            over_time: 0,
            work_bal_life: 0, // EN DURO
            job_invol: 0, // EN DURO
            attrition: 0,
        }));
    };

    const changeValueJob = (e) => {
        let value = e.target.dataset.type && e.target.dataset.type==='int'? parseInt(e.target.value):e.target.value;
        let name = e.target.dataset.name;
        let job = currentUser.jobs[e.target.dataset.index];
        job[name] = value;
        dispatch(updateJob(job));
    }

    const deleteJob = (e) => {
        dispatch(removeJob(e.target.dataset.index))
    };

    async function registerJob(datafield){
        const responseInfo = await UserService.registerUserWithExperience(datafield);
        if(responseInfo.status === 200){

            props.history.push('/informacion-completada-con-exito')
        } else {  
            //Mensaje de error
        }
    }

    useEffect( () => {
        async function listJobLevel(){
        const responseJobLevel = await UtilService.listJobLevel();
        setJobLevel(responseJobLevel.job_levels);
    }
    listJobLevel();
    }, []);

    useEffect( () => {
        async function listMotivoRetiro(){
            const responseMotivoRetiro = await UtilService.listMotivoRetiro();
            setMotivoRetiro(responseMotivoRetiro.attritions);
        }
    listMotivoRetiro();
    }, []);
    
    const onlyNumbers= (e)=> {
        let key = window.event ? e.which : e.keyCode;
            if (key < 48 || key > 57) {
            e.preventDefault();
    }}

    let jobForms = currentUser.jobs.map((job, index) => 
        <div key={index}>
        <div name="myForm" className=''>
            <label htmlFor="cargo" className="label-form mt-1">        
                Cargo
                <select 
                     data-type="int" value={job.job_level} data-index={index} data-name="job_level" onChange={changeValueJob}
                    className={`form-control placeholder mb-2
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
                    {jobLevel.map( element =>(
                        <option key={element.id} value={element.id}>{element.name}</option>
                    )
                    )}
                </select>	
                <span className="span-error mt-1">
                    { errors.cargo && errors.cargo.message}
                </span>
            </label>
            <label htmlFor="empresa"  className="label-form mt-1">
                Empresa
                <input
                    placeholder ="Ejemplo: Compañia SAC" 
                    className={`form-control placeholder
                        ${
                            isSubmitted ? 
                            !errors.empresa ?
                            "input-icono"
                            : 
                            "border-error red-input input-icoerror"       
                            : ''
                        }
                    `}         
                    value={job.name_inst} data-index={index} data-name="name_inst" onChange={changeValueJob}
                    name='empresa'
                    type="text"
                    autoComplete="off"
                    ref={register({
                        required: {value: true, message:"Este campo es requerido"},
                    })}
                />
                <span className="span-error mt-1">
                    { errors.empresa && errors.empresa.message}
                </span>
            </label>
            <label htmlFor="dir_empresa"  className="label-form mt-1">
                Dirección de la empresa
                <input
                    placeholder ="Ejemplo: Victor Andres Belaunde 584" 
                    className={`form-control placeholder
                        ${
                            isSubmitted ? 
                            !errors.dir_empresa ?
                            "input-icono"
                            : 
                            "border-error red-input input-icoerror"       
                            : ''
                        }
                    `}       
                    name='dir_empresa'
                    type="text"
                    autoComplete="off"
                    ref={register({
                        required: {value: true, message:"Este campo es requerido"},
                    })}
                />
                <span className="span-error mt-1">
                    { errors.dir_empresa && errors.dir_empresa.message}
                </span>
            </label>
            <label htmlFor="rubro" className="label-form mt-1" >
                Rubro
                <select 
                    className={`form-control form-text-check-adress
                        ${
                            isSubmitted ? 
                            !errors.rubro 
                            ? 'input-icono'
                            : 'border-error red-input input-icoerror'       
                            : ''
                        }
                    `} 
                    data-type="int" value={job.department} data-index={index} data-name="department" onChange={changeValueJob}
                    name='rubro'
                    ref={register({ required: {value: true, message: "Seleccione una opción"} })}
                >
                <option value="">Seleccione</option>
                <option value="1">Rubro 1</option>   
                <option value="2">Rubro 2</option>   
                <option value="3">Rubro 3</option>   
                </select>
                <span className="span-error mt-1">
                    { errors.rubro && errors.rubro.message}
                </span>
            </label> 
            <div className="row row-no-magin">
                <div className="col-12 col-md-6 pr-md-4 pl-md-0 px-sm-0 px-xs-0 mb-2">
                    <label htmlFor="from_year" className=" label-form">
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
                                                isSubmitted ? 
                                                !errors.from_year ?
                                                ""
                                                : 
                                                "border-error red-input"       
                                                : ''
                                            }
                                        `}  
                                        placeholderText="Mes/Año"
                                        selected={props.value}
                                        onChange={(e) => props.onChange(e)}
                                        dateFormat="MM/yyyy"
                                        locale={es}
                                        maxDate={new Date()}
                                        showMonthYearPicker
                                        name ="from_year" 
                                    />
                                )}
                            rules={{
                                required: 'Coloque una fecha válida'
                            }}
                        />   
                    </section>
                        <span className="span-error mt-1">
                            { errors.from_year && errors.from_year.message}
                        </span>
                    </label>
                </div>
                <div className="col-12 col-md-6 pl-md-4 pr-md-0 px-sm-0 px-xs-0 mb-2">
                    <label htmlFor="to_year" className=" label-form" >
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
                                                isSubmitted ? 
                                                !errors.to_year ?
                                                ""
                                                : 
                                                "border-error red-input"       
                                                : ''
                                            }
                                        `}  
                                        placeholderText="Mes/Año"
                                        selected={props.value}
                                        onChange={(e) => props.onChange(e)}
                                        dateFormat="MM/yyyy"
                                        locale={es}
                                        maxDate={new Date()}
                                        showMonthYearPicker
                                        name ="to_year" 
                                    />
                                )}
                            rules={{
                                required: 'Coloque una fecha válida'
                            }}
                        />   
                    </section>
                    <span className="span-error mt-1">
                        { errors.to_year && errors.to_year.message}
                    </span>
                </label>
                </div>
            </div>
            <label htmlFor="hour_rate" className="label-form mt-1">
                Promedio de horas a la semana
                <input
                    placeholder ="Ejemplo: 40" 
                    className={`form-control placeholder
                        ${
                            isSubmitted ? 
                            !errors.hour_rate ?
                            "input-icono"
                            : 
                            "border-error red-input input-icoerror"       
                            : ''
                        }
                    `}                                         
                    name='hour_rate'
                    maxLength='2'
                    onKeyPress={e =>{onlyNumbers(e)}}
                    type="text"
                    autoComplete="off"
                    ref={register({
                        required: {value: true, message:"Este campo es requerido"},
                    })}
                />
                <span className="span-error mt-1">
                    { errors.hour_rate && errors.hour_rate.message}
                </span>
            </label>
            <label htmlFor="monthly_income" className="label-form mt-1">
                Ingresos mensual
                <input
                    placeholder ="Ejemplo: 1000" 
                    className={`form-control placeholder
                        ${
                            isSubmitted ? 
                            !errors.monthly_income ?
                            "input-icono"
                            : 
                            "border-error red-input input-icoerror"       
                            : ''
                        }
                    `}                                         
                    name='monthly_income'
                    type="text"
                    maxLength='4'
                    onKeyPress={e =>{onlyNumbers(e)}} 
                    ref={register({
                        required: {value: true, message:"Este campo es requerido"},
                    })}
                />
                <span className="span-error mt-1">
                    { errors.monthly_income && errors.monthly_income.message}
                </span>
            </label>
            <label htmlFor="job_sati" className="label-form mt-1">
                Nivel de satisfacción en el trabajo
                <div className= "input-container-radio mt-2">
                    <div className="form-check margin-right">
                        <input 
                            className="form-check-input"
                            type="radio" 
                            name="job_sati" 
                            value="1"
                            ref={register({ required: "Seleccione una opción" })}
                        />
                        <label className="form-text-check">
                            1
                        </label>
                    </div>
                    <div className="form-check margin-right">
                        <input 
                            className="form-check-input"
                            type="radio" 
                            name="job_sati" 
                            value="2"
                            ref={register({ required: "Seleccione una opción" })}
                        />
                        <label className="form-text-check">
                            2
                        </label>
                    </div>
                    <div className="form-check margin-right">
                        <input 
                            className="form-check-input"
                            type="radio" 
                            name="job_sati" 
                            value="3"
                            ref={register({ required: "Seleccione una opción" })}
                        />
                        <label className="form-text-check">
                            3
                        </label>
                    </div>
                    <div className="form-check margin-right">
                        <input 
                            className="form-check-input"
                            type="radio" 
                            name="job_sati" 
                            value="4"
                            ref={register({ required: "Seleccione una opción" })}
                        />
                        <label className="form-text-check">
                            4
                        </label>
                    </div>
                    <div className="form-check margin-right">
                        <input 
                            className="form-check-input"
                            type="radio" 
                            name="job_sati" 
                            value="5"
                            ref={register({ required: "Seleccione una opción" })}
                        />
                        <label className="form-text-check">
                            5
                        </label>
                    </div>
                </div>
                <span className="span-error mt-1">
                    { errors.job_sati && errors.job_sati.message}
                </span>
            </label>
            <label htmlFor="over_time" className="label-form mt-1">
                ¿Realizaste sobre tiempo?
                <div className= "input-container-radio mt-2">
                    <div className="form-check margin-right">
                        <input 
                            className="form-check-input"
                            type="radio" 
                            name="over_time"
                            value="1"
                            ref={register({ required: "Seleccione una opción" })}
                        />
                        <label className="form-text-check">
                            Si
                        </label>
                    </div>
                    <div className="form-check margin-right">
                        <input 
                            className="form-check-input"
                            type="radio" 
                            name="over_time" 
                            value="0"
                            ref={register({ required: "Seleccione una opción" })}
                        />
                        <label className="form-text-check">
                            No
                        </label>
                    </div>
                </div>
                <span className="span-error">
                    { errors.over_time && errors.over_time.message}
                </span>
            </label>
            <label htmlFor="attrition" className="label-form mt-1">
                Motivo de retiro
                <select 
                    className={`form-control form-text-check-adress mt-2
                                    ${
                                        isSubmitted ? 
                                        !errors.attrition ?
                                        ""
                                        : 
                                        "border-error red-input "       
                                        : ''
                                    }
                                `}
                    name='attrition'
                    ref={register({ required: {value: true, message: "Seleccione una opción"} })}
                >
                <option value="">Seleccione</option>
                <option value="1">Despido</option>
                <option value="2">Renuncia</option>
                {motivoRetiro.map( element =>(
                    <option key={element.id} value={element.id}>{element.name}</option>
                )
                )}     
                </select>
                <span className="span-error mt-1">
                    { errors.attrition && errors.attrition.message}
                </span>
            </label>
            <label htmlFor="nivel_par" className="label-form mt-3">
                ¿Cómo calificaría su grado de compromiso con la empresa?
                <section className="mt-2">
                <Controller
                    control={control}
                    name='nivel_par'
                    defaultValue={0}
                    render={(props) => (
                        <ReactStars
                            className={`mt-2`}
                            count={5}
                            value={parseInt(props.value)}
                            onChange={(e) => { props.onChange(e)} }
                            size={25}
                            activeColor="#ffd700"
                        />
                    )}
                    rules={{
                        required: 'Coloque una fecha válida',
                        min: { value: 1 , message:"Seleccione una opción"}
                    }}
                />
                </section>
                <span className="span-error mt-1">
                    { errors.nivel_par && errors.nivel_par.message}
                </span>
            </label>
            <label htmlFor="nivel_sat" className="label-form mt-1">
                ¿Qué tan satisfecho se siente/sintió con la relación entre el trabajo y su vida personal?
                <section className="mt-2">
                <Controller
                    control={control}
                    name='nivel_sat'
                    defaultValue={0}
                    render={(props) => (
                        <ReactStars
                            className={`mt-2`}
                            count={5}
                            value={parseInt(props.value)}
                            onChange={(e) => props.onChange(e)}
                            size={25}
                            activeColor="#ffd700"
                        />
                    )}
                    rules={{
                        required: 'Coloque una fecha válida',
                        min: { value: 1 , message:"Seleccione una opción"}
                    }}
                />
                </section>
                <span className="span-error mt-1">
                    { errors.nivel_sat && errors.nivel_sat.message}
                </span>
            </label>
            <button type="button" className="text-experience" onClick={addJob}>
                AGREGAR OTRA EXPERIENCIA
            </button>
            <button type="button" className="text-experience" data-index={index} onClick={deleteJob}>
                ELIMINAR EXPERIENCIA
            </button>

            {currentUser.jobs.length === index + 1 && (            
                <section  className="container-buttons-form">
                    <Link className="btn-cancel-form btn" to='/inicio'>
                        CANCELAR
                    </Link>
                    <button className="button-continue-restore btn" type="submit">
                        <span className= "text-button-continue-restore">CONTINUAR</span>
                        <span className="icon-next"></span>
                    </button>
                </section>)
            }
        </div> 
        
        </div>
    )

    return (
    <>
          <div>
              <form name="myForm" onSubmit={handleSubmit(onSubmit)} className=''>
                  {jobForms}
              </form>
        </div>
    </>
)

}

export default withRouter(WithExperience);
