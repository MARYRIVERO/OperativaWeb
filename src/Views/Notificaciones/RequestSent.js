import React from 'react';
import NavBar from '../../Components/MenuUser/index';
import { Link } from 'react-router-dom';

import SolicitudEnviada from '../../assets/images/solicitud-enviada.svg';

const RequestSent = (props) => {
  return (
    <>
    <NavBar />

    <div className="row justify-content-center container-padding row-no-magin">
        <div className="col-12 col-sm-6 col-md-10">
            <h1 className="h1-custom-restore"> </h1>
            <div className="row box-container-title">
                
                <div className="col-4 col-md-5 container-no-padding">
                    <img alt="conexion" src={SolicitudEnviada} className="icon-image-solicitud-enviada"/>
                </div>
                <div className="col-8 col-md-7 container-no-padding">
                    <h1 className="title-solicitud">Solicitud enviada</h1>
                    <p className="text-box-four">
                        La solicitud ha sido enviada para su aprobación, en un plazo máximo de 24 horas recibirá un correo con la contraseña de su usuario.
                        <br/><br/>
                        En caso de presentar algún inconveniente no dude en comunicarse con nosotros a través del correo soportetecnico@operativa.com
                    </p>
                    <div className="d-flex justify-content-center">
                        <Link to="/" className="btn btn-solicitud">VOLVER AL INICIO</Link>
                    </div>
                </div>
            </div>
        </div>
  
    </div>
    </>
  );
};
export default RequestSent;
