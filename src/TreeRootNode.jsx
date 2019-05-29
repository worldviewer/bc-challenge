import React, { Component } from 'react';

class TreeRootNode extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	render = () => {
		const
			propertiesArray = Object.keys(this.props.properties),
			childrenExist = React.Children.count(this.props.children) > 0,
			nodeProperties = this.props.properties;

		return (
			<div>
				<h1>Tree Root</h1>
				<ul>
					{ propertiesArray.map(property =>
						<li key={property}>{`${property}: ${nodeProperties[property]}`}</li>) }
				</ul>

				{ childrenExist &&
					<div>
						<h3>Children:</h3>
						<ul>
							{ React.Children.map(this.props.children, (child, index) =>
								<li key={`${nodeProperties.name}-${index}`}>
									{ child }
								</li>) }
						</ul>
					</div> }
			</div>
		);
	}
};

export default TreeRootNode;
