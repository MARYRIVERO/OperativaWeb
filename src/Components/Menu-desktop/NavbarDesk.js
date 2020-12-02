import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, withRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';
import LogoMedio from '../../assets/logos/small.svg'
import './index.css';

function NavbarDesk(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const isAuth = () => {
    if(localStorage.getItem('token') !== null) {
        return true
    }
        return false
};

    const cerrarSesion= () =>{
         localStorage.removeItem('token')
         localStorage.removeItem('email')
         props.history.push('/')    
     }
  return (
    <>
      <IconContext.Provider value={{ color: 'white' }}>
        <div className='navbar2-desk fixed-top'>
        <div className="">                
                <a href="/" ><img src= {LogoMedio} className="icon-img-logo"  alt="" /></a>            
        </div>
            <div>
              {
                sidebar ? (
                  (
                    <Link to='#' className='menu-bars-desk'>
                        <AiIcons.AiOutlineClose onClick={showSidebar} 
                        style={{
                            color:"white"
                        }}/>
                    </Link>
                  )              
                  ): (
                    <Link to='#' className='menu-bars-desk'>
                      <FaIcons.FaBars onClick={showSidebar} 
                      style={{
                          color:"white"
                      }}/>
                    </Link>
                )
              }
            </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu '}>
          <ul  className='nav-menu-items ul-sidebar' onClick={showSidebar}>
              {
                 isAuth() ? (
                   
                    <li className ="nav-text">
                      <a href="/#" onClick= {() => cerrarSesion()}><FaIcons.FaUserCircle/>
                      <span className="title-color" >Cerrar sesión</span>  
                      </a>
                    </li>
                  ): (  
                    <li className ="nav-text">
                      <Link to="/inicio-sesion"><FaIcons.FaUserCircle/>
                      <span>Iniciar sesión</span>  
                      </Link>
                    </li>
                  )
              }
              <li className ="nav-text">
                <Link to="/inicio-sesion"><FaIcons.FaRegBuilding/>
                <span>Empresas</span>  
                </Link>
              </li>
                
              
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default withRouter (NavbarDesk);


