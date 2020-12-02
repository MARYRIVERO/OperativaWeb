import React from 'react';
import NavBar from '../../Components/MenuUser/index';
import { Link } from 'react-router-dom';

const NotificationReset = (props) => {
  return (
    <>
      <NavBar />
      <div className="row justify-content-center padding-container row-no-magin">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4 container-no-padding">
          <h1 className="h1-custom-notification">
            TE HEMOS ENVIADO UN CORREO ELECTRÓNICO CON INSTRUCCIONES
          </h1>
          <div className="row">
            <div className="col-12">
              <Link className="button-continue-restore-notification btn" to="/inicio-sesion">
                <span className="text-button-continue-restore">CONTINUAR</span>
                <span className="icon-next"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NotificationReset;
