import React from 'react';

import Menu from './Menu';



class Home extends React.Component {

	render() {

		return(

			<>

			<Menu />

			<main role="main" className="flex-shrink-0 mt-5">

		        <div className="container">
		  	  		
				<div class="center"><img src="cm.png" width="1000" height="600"/></div>

		  	  		<hr className="featurette-divider" />

		        </div>

	  		</main>

	  		

	  		</>

		)

	}

}

export default Home;