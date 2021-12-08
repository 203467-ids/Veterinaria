import React from 'react';
import Cita from './Cita';
import Menu from './Menu';
import './Citas.css'



class Citas extends React.Component {

	render() {

		return(

			<>

			<Menu />

			<main role="main" className="flex-shrink-0 mt-5">

		        <div  class="flexbox-container">
		  	  		
                <div class="center"><img src="cita.png"/></div>
                <div><Cita/></div>

		  	  		<hr className="featurette-divider" />

		        </div>

	  		</main>

	  		

	  		</>

		)

	}

}

export default Citas;