import React, { useEffect, useState } from "react";
import NavBar from "../../Components/MenuUser/index"
import { Link, withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";

import Stepper from "./Stepper";
import UtilService from '../../services/util.service';
import UserService from '../../services/user.service';
import { setUserInfo } from '../../redux-store/user';
import './index.css';
import { onlyNumbers } from './../../utils/validation';
import { onlyAlphaNumeric } from './../../utils/validation';

const ProfileAdress = (props) => { 
    const dispatch = useDispatch();
    const { handleSubmit, register, errors, formState} = useForm();
    const { currentUser } = useSelector((state) => state.user);
    const { isSubmitted } = formState;

    const [listDepartament, setListDepartament]= useState([])
    const [listProvince, setListProvince]= useState([])
    const [listDistrict, setListDistrict]= useState([])
    const [civil, setCivil] = useState([]);
    
    const onSubmit = (values) => { 
        //OBTENER LOS VALORES DEL FRONT
        const datafield = {
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            type_doc: currentUser.type_doc,
            num_doc: currentUser.num_doc,
            birth_date: currentUser.birth_date,
            gender: currentUser.gender,
            provider_id: currentUser.id_provider,
            address: values.address,
            phone: values.phone,
            country_id: 1,
            department_id: parseInt(values.id_country),
            province_id: parseInt(values.id_state),
            district_id: parseInt(values.id_city),
            civil_id: parseInt(values.id_civil_status),
        };
        console.log("Envio de datos");
        console.log(datafield);

        // Guardar los valores en mi Store Usuario
        dispatch(setUserInfo(datafield));
        //const userInfo = {...currentUser, ...datafield}
        registerUser(datafield);
    } 

    async function registerUser(user){
        const responseInfo = await UserService.registerUserInfo(user);
        if(responseInfo.status === 200){
            props.history.push('/informacion-academica')
        } else {  

        }
    }

    useEffect( () => {
        console.log(currentUser);
     }, [currentUser]);

    // Obtener la lista de estado civil
    useEffect( () => {
        async function listCivil(){
            const responseCivil = await UtilService.listCivil();
            setCivil(responseCivil.civils);
        }
        listCivil();
    }, []);

    useEffect(() => {
        async function listDepartment(){
            const responseDepartment = await UtilService.listDepartment();
            setListDepartament(responseDepartment.departments);
        }
        listDepartment();
    }, [])

    const [listprovinciaBase, setListprovinciaBase]= useState([])
    useEffect(() => {
        async function listProvince(){
            const responseProvince = await UtilService.listProvince();
            setListprovinciaBase(responseProvince.provinces);
        }
        listProvince();
    }, [])

    const [listdistritoBase, setListdistritoBase]= useState([])
    useEffect(() => {
        async function listDistrict(){
            const responseDistrict = await UtilService.listDistrict();
            setListdistritoBase(responseDistrict.districts);
        }
        listDistrict();
    }, [])

    //Button:
    const handlerdepartamento = (e) =>{
        let id = e.target.value;
        setListProvince([])
        setListDistrict([])
        let filterProvinceData = listprovinciaBase.filter(item => item.department_id == id) 
        setListProvince(filterProvinceData)
    }
        
    //Button:
    const handlerProvincia = function(e){
        let id = e.target.value;
        setListDistrict([])
        let filterDistritoData = listdistritoBase.filter(item => item.province_id == id) 
        setListDistrict(filterDistritoData)
    }
        
        return (
            <>
            <NavBar/>
                <div className="row row-no-magin padding-container">
                    <div className="col-12 col-md-6 offset-md-3 container-no-padding m-nav-form">
                        <h1 className='h1-title-form'>COMPLETA TU REGISTRO</h1>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3 container-no-padding mt-stepper">
                        <Stepper current = {1} />
                    </div>
                    <div className="col-12 col-md-6 offset-md-3 container-no-padding">
                        <h1 className='h1-form'>Completa tu registro</h1>
                    </div>
                    <div className="col-12  col-md-6 offset-md-3 container-no-padding">
                        <form name="myForm" onSubmit={handleSubmit(onSubmit)} className='form-container-info'>
                            <label htmlFor="address" className="label-form mt-1">
                                Dirección
                                <input
                                    placeholder ="Ejemplo: Urb Hipolito Unanue 123" 
                                    className={`form-control placeholder
                                        ${
                                            isSubmitted ? 
                                            !errors.adress ?
                                            "input-icono"
                                            : 
                                            "border-error red-input input-icoerror"       
                                            : ''
                                        }
                                    `} 
                                    id='address'
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

                            <div className="row row-no-magin ">
                                <div className="col-12 col-md-4 pr-md-4 pl-md-0 px-sm-0 px-xs-0">
                                    <label  htmlFor="id_country" className="label-form" >
                                        Departamento
                                        <select 
                                            className={`form-control form-text-check-adress
                                                ${
                                                    isSubmitted ? 
                                                    !errors.id_country ?
                                                    ""
                                                    : 
                                                    "border-error red-input"       
                                                    : ''
                                                }
                                            `}
                                            id="id_country"
                                            name="id_country"
                                            onChange= {handlerdepartamento}
                                            ref={register({ required: {value: true, message: "Seleccione una opción"} })}
                                            > 
                                            <option value="">Seleccione</option>
                                            {
                                                listDepartament.map((item) => (
                                                <option key= {item.id}
                                                value= {item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            ))
                                            }
                                        </select>
                                        <span className="span-error">
                                            { errors.id_country && errors.id_country.message}
                                        </span>
                                    </label>
                                </div>
                                <div className="col-12 col-md-4 pr-md-3 pl-md-0 px-sm-0 px-xs-0">
                                    <label htmlFor="id_state" className="label-form" >
                                        Provincia
                                        <select
                                            className={`form-control form-text-check-adress
                                                ${
                                                    isSubmitted ? 
                                                    !errors.id_state?
                                                    ""
                                                    : 
                                                    "border-error red-input"       
                                                    : ''
                                                }
                                            `}
                                            id="id_state"
                                            name="id_state"
                                            onChange={handlerProvincia}
                                            ref={register({ required: {value: true, message: "Seleccione una opción"} })}
                                            >
                                                <option value="">Seleccione</option>
                                            {
                                                listProvince.map((item) => (
                                                <option key= {item.id} value= {item.id}>
                                                    {item.name}
                                                </option>
                                            ))
                                            }
                                        </select>
                                        <span className="span-error">
                                            { errors.id_state && errors.id_state.message}
                                        </span>
                                    </label>
                                </div>
                                <div className="col-12 col-md-4 pl-md-2 pr-md-0 px-sm-0 px-xs-0">
                                    <label htmlFor="id_city" className="label-form" >
                                        Distrito
                                        <select
                                            className={`form-control form-text-check-adress
                                                ${
                                                    isSubmitted ? 
                                                    !errors.id_city ?
                                                    ""
                                                    : 
                                                    "border-error red-input"       
                                                    : ''
                                                }
                                            `}
                                            id="id_city"
                                            name="id_city"
                                            ref={register({ required: {value: true, message: "Seleccione una opción"} })}
                                            >
                                            <option value="">Seleccione</option>
                                            {
                                                listDistrict.map((item) => (
                                                <option key= {item.id} 
                                                value= {item.id}
                                                >
                                                    {item.name}
                                                </option>
                                                ))
                                            }
                                        </select>
                                        <span className="span-error">
                                            { errors.id_city && errors.id_city.message}
                                        </span>
                                    </label>

                                </div>
                            </div> 
                            <label htmlFor="phone" className="label-form mt-1">
                                Teléfono
                                <input
                                    maxLength="9"
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
                                    id='phone'
                                    name='phone'
                                    type="text"
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
                            <label htmlFor="id_civil_status" className="label-form mt-1">         
                                Estado Civil
                                <select 
                                    className={`form-control
                                            ${
                                                isSubmitted ? 
                                                !errors.id_civil_status ?
                                                ""
                                                : 
                                                "border-error red-input"       
                                                : ''
                                            }
                                    `}
                                    name="id_civil_status" 
                                    id="id_civil_status"
                                    ref={register({
                                        required: "Este campo es requerido"
                                    })}>
                                    <option value="">Seleccione</option>
                                    {civil.map( element =>(
                                        <option key={element.id} value={element.id}>{element.name}</option>
                                    )
                                    )}
                                </select>
                                <span className="span-error">
                                    { errors.id_civil_status && errors.id_civil_status.message}
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

export default withRouter(ProfileAdress)
