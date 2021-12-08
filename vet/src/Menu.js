import React from 'react';
import {NavLink} from "react-router-dom";
import './Menu.css';

class Menu extends React.Component {

  render() {

  	return (

		

  		<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">

		    <NavLink to="/" className="navbar-brand">VETERINARIA</NavLink>
		    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
		     	<span className="navbar-toggler-icon"></span>
		    </button>
		    <div className="collapse navbar-collapse" id="navbarCollapse">
			    <ul className="navbar-nav mr-auto">

			        <li className="nav-item">
			          	<NavLink to="/" className="nav-link">INICIO </NavLink>
			        </li>
			        <li className="nav-item">
			        	<NavLink to="/Mascotas" className="nav-link">MASCOTAS </NavLink>
			        </li>
			        <li className="nav-item">
			          	<NavLink to="/Dueños" className="nav-link">DUEÑOS </NavLink>
			        </li>
			        <li className="nav-item">
			          	<NavLink to="/Citas" className="nav-link">CITAS </NavLink>
			        </li>
					<li className="nav-item">
			          	<NavLink to="/Inventario" className="nav-link">INVENTARIO </NavLink>
			        </li>
					
			    </ul>

			    
		    </div>		    

		</nav>

  	)
    
  }

}

export default Menu;