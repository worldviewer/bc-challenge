import React, { useRef } from 'react';

const TreeRootNode = props => {
	const
		ref = useRef(null),
		propertiesArray = Object.keys(props.properties),
		childrenExist = React.Children.count(props.children) > 0,
		nodeProperties = props.properties;

	return (
		<div ref={ref}>
			<h1>Tree Root</h1>
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

export default TreeRootNode;
