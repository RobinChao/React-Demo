import React from 'react';

class App extends React.Component {
	render() {
		return (
				<div>
					<h1>Unofficial GitHub Brower v0.01</h1>
					{this.props.children}
				</div>
			);
	}
}

export default App;