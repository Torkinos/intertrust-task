import React, { Component } from "react";
import "./styles.scss";

import Header from "./components/header/header";

class DashBoard extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className = "dashboard">

				{/*header*/ }
				<div className = "dashboard__header">
					<Header />
				</div>

				{/*body*/ }
				<div className = "dashboard__body">
				</div>
			</div>
		);
	}
}

export default DashBoard;
