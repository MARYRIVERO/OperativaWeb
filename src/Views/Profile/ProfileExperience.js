import React, { useState} from "react";
import NavBar from "../../Components/MenuUser/index"
import { withRouter } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'

import Stepper from "./Stepper";
import WithoutExperience from '../../Components/Experience/WithoutExperience';
import WithExperience from '../../Components/Experience/WithExperience'
import './index.css';

const ProfileExperience = () => {

    const [experienceBuss, setExperienceBuss]= useState();
    
    const handleExperience= (e) => {
        setExperienceBuss(e)
    }

    return (
        <>
        <NavBar/>
            <div className="row row-no-magin padding-container">
                <div className="col-12 col-md-6 offset-md-3 container-no-padding m-nav-form">
                    <h1 className='h1-title-form'>COMPLETA TU REGISTRO</h1>
                </div>
                <div className="col-12 col-md-6 offset-md-3 container-no-padding mt-stepper">
                    <Stepper current = {3} />
                </div>
                <div className="col-12 col-md-6 offset-md-3 container-no-padding">
                    <h1 className='h1-form'>EXPERIENCIA LABORAL</h1>
                </div>
                <div className="col-12  col-md-6 offset-md-3 container-no-padding">
                        <label htmlFor="workExperience" className="label-form mt-2 mb-2">         
                            <div className= "input-container-select mt-2">
                                <div className="form-check">
                                    <input 
                                        className="form-check-input"
                                        type="radio" 
                                        name="check" 
                                        value=""
                                        onClick= {()=> {handleExperience(1) }}
                                    />
                                    <label className="form-text-check">
                                        Sin experiencia
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input 
                                        className="form-check-input"
                                        type="radio" 
                                        name="check" 
                                        value=""
                                        onClick= {()=> {handleExperience(2) }}
                                    />
                                    <label className="form-text-check">
                                        Con experiencia
                                    </label>
                                </div>
                            </div>
                        </label>
                        { experienceBuss === 1 && <WithoutExperience/> }
                        { experienceBuss === 2 && <WithExperience/> }
                        
                </div>
            </div>
        </>
    )
}

export default withRouter(ProfileExperience);
