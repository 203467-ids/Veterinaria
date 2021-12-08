import React from 'react';
import Inventario from './Inventario';
import Menu from './Menu';
import './Citas.css'



class Dueños extends React.Component {

	render() {

		return(

			<>

			<Menu />

			<main role="main" className="flex-shrink-0 mt-5">

		        <div  class="flexbox-container">
		  	  		
                <div class="center"><img src="medicamentos.png" width="500" height="600"/></div>
                <div><Inventario/></div>

		  	  		<hr className="featurette-divider" />

		        </div>

	  		</main>

	  		

	  		</>

		)

	}

}

export default Dueños;