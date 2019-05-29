// In order to add + remove nodes, we have to generate events w onClick props
// on the nodes as well as handlers to process those onClick events which have
// occurred downstream.  Then, in order to actually remove a node, we have to
// simply apply a conditional inside of the node's parent to control the display.

// The functionality to process this could optionally be placed inside of
// the root, but there is no real advantage to doing this since the root would then
// have to remotely control that parent node's state.  What this suggests is that
// we need to switch our nodes from functional to class-based components, so that
// we can implement our click handlers within the parent nodes themselves.

import React, { Component } from 'react';

class Node extends Component {
	constructor(props) {
		super(props);

		this.props = props;		
	}

	render = () => {
		const
			propertiesArray = Object.keys(this.props.properties),
			nodeProperties = this.props.properties,
			childrenExist = React.Children.count(this.props.children) > 0;

		console.log('this.props:');
		console.log(this.props);

		return (
			<div>
				<h1>Node</h1>
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
									{child}
								</li>) }
						</ul>
					</div> }
			</div>
		);
	}
};

export default Node;
