import React from 'react';
import Clientes from './Clientes';
import Menu from './Menu';
import './Citas.css'



class Dueños extends React.Component {

	render() {

		return(

			<>

			<Menu />

			<main role="main" className="flex-shrink-0 mt-5">

		        <div  class="flexbox-container">
		  	  		
                <div class="center"><img src="dueño.png" width="500" height="600"/></div>
                <div><Clientes/></div>

		  	  		<hr className="featurette-divider" />

		        </div>

	  		</main>

	  		

	  		</>

		)

	}

}

export default Dueños;