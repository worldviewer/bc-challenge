import React, { useRef } from 'react';

const Node = props => {
	const
		ref = useRef(null),
		propertiesArray = Object.keys(props.properties),
		nodeProperties = props.properties,
		childrenExist = React.Children.count(props.children) > 0;

	console.log('props:');
	console.log(props);

	return (
		<div ref={ref}>
			<h1>Node</h1>
			<ul>
				{ propertiesArray.map(property =>
					<li key={property}>{`${property}: ${nodeProperties[property]}`}</li>) }
			</ul>

			{ childrenExist &&
				<div>
					<h3>Children:</h3>
					<ul>
						{ React.Children.map(props.children, (child, index) =>
							<li key={`${nodeProperties.name}-${index}`}>
								{ React.cloneElement(child, {parent: ref}) }
							</li>) }
					</ul>
				</div> }
		</div>
	);
};

export default Node;
