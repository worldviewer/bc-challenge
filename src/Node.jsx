import React, { Component } from 'react';

class Node extends Component {
	constructor(props) {
		super(props);

		this.state = {
			children: [],
			showAdd: false,
			newNodeProperties: {},
			newKey: '',
			newValue: ''
		};

		this.props = props;		
	}

	addChild = () => {
		console.log('add child');

		this.setState({showAdd: true});
	}

	handleAddNode = () => {
		const { newKey, newValue, newNodeProperties } = this.state;

		if (newKey !== '' || newValue !== '') {
			this.handleAddProperty(this.handleAddNode);
			return;
		}

		const
			index = React.Children.count(this.props.children),
			newChild = React.cloneElement(document.reactChild,
				{properties: newNodeProperties, index}),
			children = this.state.children.slice();

		children.push(newChild);

		console.log('handleAddNode children:');
		console.log(children);

		this.setState({
			children,
			newNodeProperties: {},
			newKey: '',
			newValue: '',
			showAdd: false
		});
	}

	handleAddProperty = (callback = null) => {
		const { newKey, newValue } = this.state;

		if (newKey === '' | newValue === '') {
			return;
		}

		const newNodeProperties = {...this.state.newNodeProperties};

		newNodeProperties[newKey] = newValue;

		this.setState({
			newNodeProperties,
			newKey: '',
			newValue: ''
		}, () => typeof callback === 'function' && callback());
	}

	removeChild = index => {
		console.log('remove child no. ' + index);

		const { children } = this.state;

		if (children.length === 1) {
			this.setState({children: []});

		} else if (children.length > 1) {
			const
				sliced = children.slice(0, index)
					.concat(children.slice(index+1)),
				indexed = React.Children.map(sliced, (child, index) =>
					React.cloneElement(child, {index}));
			
			this.setState({children: indexed});
		}
	}

	componentDidMount() {
		const children =
			React.Children.map(this.props.children, (child, index) =>
				React.cloneElement(child, {
					removeNode: this.removeChild,
					index
				}));

		this.setState({children});

		// Store a copy of a child node so that we can generate one later
		// for a node which does not contain any existing children
		if (children && !document.reactChild) {
			document.reactChild = children[0];
		}
	}

	render = () => {
		const
			{ properties, index, removeNode } = this.props,
			{ newNodeProperties, children } = this.state,

			propertiesArray = Object.keys(properties),
			newNodePropertiesArray =
				Object.keys(newNodeProperties).map(key => ({
					[key]: newNodeProperties[key]
				})),
			childrenExist = children ? children.length > 0 : false,

			buttonStyles = {
				color: 'blue',
				cursor: 'pointer'
			};

		return (
			<div>
				<h1>Node (
					<span
						style={buttonStyles}
						onClick={() => removeNode(index)}>-</span>/
					<span
						style={buttonStyles}
						onClick={this.addChild}>+</span>)
				</h1>

				{ this.state.showAdd &&
					<div>
						<p>Add a new node:</p>
						<ul>
							{ newNodePropertiesArray.map((obj, index) =>
								<li key={index}>
									{`${Object.keys(obj)[0]}: ${Object.values(obj)[0]}`}
								</li>)
							}
						</ul>

						<br />

						<span>New property:</span>
						<input
							type='text'
							value={this.state.newKey}
							onChange={({target}) =>
								this.setState({newKey: target.value})} />

						<br />
						<span>New value:</span>

						<input
							type='text'
							value={this.state.newValue}
							onChange={({target}) =>
								this.setState({newValue: target.value})} />

						<br /><br />

						<button onClick={this.handleAddProperty}>
							Submit Property
						</button>
						<button onClick={this.handleAddNode}>
							Submit Node
						</button>

						<br /><br />
					</div> }

				<ul>
					{ propertiesArray.map(property =>
						<li key={property}>
							{`${property}: ${properties[property]}`}
						</li>)
					}
				</ul>

				{ childrenExist &&
					<div>
						<h3>Children:</h3>
						<ul>
							{ children.map((child, index) =>
								<li key={index}>{child}</li>) }
						</ul>
					</div> }
			</div>
		);
	}
};

export default Node;
