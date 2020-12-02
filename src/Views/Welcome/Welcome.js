import React, {useEffect} from "react";
import NavBar from "../../Components/MenuUser/index"
import {withRouter} from 'react-router-dom'
import Ilustracion from "../../assets/images/ilustracion2.svg"
import { useDispatch } from 'react-redux';
import './index.css';

import { setSignInUser, setSignUpUser } from '../../redux-store/user';

const Welcome= (props) => { 

    const dispatch = useDispatch();

    const onSubmit = () => {  
        props.history.push('/info');
    }

    useEffect(() => {
        dispatch(setSignInUser(false));
        dispatch(setSignUpUser(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <NavBar/>
            <div className="row justify-content-center row-no-magin">
                <div className="col-12 col-sm-8 col-md-6">
                    <div className="card box-card" >
                        <div className="card-body">
                            <img src= {Ilustracion} className="icon-ilustracion-welcome" alt="..."/>
                            <h1 className='h1-title-card'>BIENVENIDO A OPERATIVA</h1>
                            <p className="text-one-card">Para poder conectarte con tu trabajo ideal, necesitamos que completes tu perfil..</p>
                            <p className="text-one-card">Llenar tus datos te tomará aproximadamente 5 minutos.</p>
                        <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-primary text-button-next " 
                            type= 'submit' 
                            onClick= {onSubmit}
                            >
                            <span className="text-button-continue-restore-inicio">CONTINUAR</span>
                            <span className="icon-next-button-blue"></span>
                        </button> 
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>  
        )
}
export default withRouter(Welcome)
