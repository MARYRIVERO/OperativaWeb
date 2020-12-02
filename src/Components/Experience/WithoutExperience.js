import React, {useState, useEffect} from 'react';
import { Link, withRouter } from 'react-router-dom'
import { useForm } from "react-hook-form";

import UtilService from '../../services/util.service';
import UserService from '../../services/user.service';
import  'react-multiple-select-dropdown-lite/dist/index.css'

const WithoutExperience = (props) => { 

    const {handleSubmit, register, errors, formState} = useForm();
    const { isSubmitted } = formState;
    const [ rubro, setRubro] = useState([]);

    useEffect(() => {
        async function listRubro(){
        const responseRubro = await UtilService.listRubro();
        setRubro(responseRubro.areas);
    }
    listRubro();
    }, [])

    const onSubmit = (values) => {
        const datafield = {
            rotating_schedule: values.rotating_schedule,
            extra_hours: values.extra_hours,
            work_weekend: values.weekend,
            interest_area_id: values.cargo,
        };
        WithoutExperience(datafield);
    } 

    async function WithoutExperience(datafield){
        const responseEducation = await UserService.registerUserWithoutExperience(datafield);
            if(responseEducation.status === 200){
                props.history.push('/informacion-completada-con-exito')
            } else {
                // Mensaje de error
            }
    }

    return (
        <>
            <form name="myForm" onSubmit={handleSubmit(onSubmit)} className=''>
                <label htmlFor="cargo" className="label-form mt-1">        
                Rubro de interés
                    <select 
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
                        {rubro.map( e =>(
                            <option key={e.id} value={e.id}>{e.name}</option>
                            )
                        )}	
                    </select>
                    <span className="span-error mt-1">
                        { errors.cargo && errors.cargo.message}
                    </span>
                </label>
                <label htmlFor="rotativo" className="label-form mt-1">
                    ¿Cuenta con disponibilidad para trabajar en horarios rotativos?
                    <div className="input-container-radio mt-2">
                        <div className="form-check margin-right">
                            <input 
                                className="form-check-input"
                                type="radio" 
                                name="rotativo"
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
                                name="rotativo"
                                value="0"
                                ref={register({ required: "Seleccione una opción" })}
                            />
                            <label className="form-text-check">
                                No
                            </label>
                        </div>
                    </div>
                    <span className="span-error">
                        { errors.rotativo && errors.rotativo.message}
                    </span>
                </label>
                <label htmlFor="extra_hours" className="label-form mt-1">
                    ¿Cuenta con disponibilidad para trabajar horas extras?
                    <div className= "input-container-radio mt-2">
                        <div className="form-check margin-right">
                            <input 
                                className="form-check-input"
                                type="radio" 
                                name="extra_hours"
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
                                name="extra_hours"
                                value="0"
                                ref={register({ required: "Seleccione una opción" })}
                            />
                            <label className="form-text-check">
                                No
                            </label>
                        </div>
                    </div>
                    <span className="span-error">
                        { errors.extra_hours && errors.extra_hours.message}
                    </span>
                </label>
                <label htmlFor="weekend" className="label-form mt-1">
                    ¿Cuenta con disponibilidad para trabajos fin de semana?
                    <div className= "input-container-radio mt-2">
                        <div className="form-check margin-right">
                            <input 
                                className="form-check-input"
                                type="radio" 
                                name="weekend"
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
                                name="weekend"
                                value="0"
                                ref={register({ required: "Seleccione una opción" })}
                            />
                            <label className="form-text-check">
                                No
                            </label>
                        </div>
                    </div>
                    <span className="span-error">
                        { errors.weekend && errors.weekend.message}
                    </span>
                </label>
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
                        <span className="text-button-continue-restore">CONTINUAR</span>
                        <span className="icon-next"></span>
                    </button>
                </section>
            </form>                
        </>
    )
}

export default withRouter(WithoutExperience)
