import React from 'react';
import TreeRootNode from './TreeRootNode';
import Node from './Node';
import { grandfatherProps,
	fatherProps,
	brotherProps,
	sisterProps,
	childProps } from './PropertiesData';

function App() {
	const appStyles = {
		padding: '50px'
	};

	return (
		<div style={appStyles}>
			<TreeRootNode properties={grandfatherProps} >
				<Node properties={fatherProps}>
					<Node properties={brotherProps} />

					<Node properties={sisterProps}>
						<Node properties={childProps} />
					</Node>
				</Node>
			</TreeRootNode>
		</div>
	);
}

export default App;
