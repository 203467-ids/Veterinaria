import React from 'react';
import Mascota from './Mascota';
import Menu from './Menu';
import './Citas.css'



class Mascotas extends React.Component {

	render() {

		return(

			<>

			<Menu />

			<main role="main" className="flex-shrink-0 mt-5">

		        <div  class="flexbox-container">
		  	  		
                <div class="center"><img src="mascotas.png" width="800" height="600"/></div>
                <div><Mascota/></div>

		  	  		<hr className="featurette-divider" />

		        </div>

	  		</main>

	  		

	  		</>

		)

	}

}

export default Mascotas;