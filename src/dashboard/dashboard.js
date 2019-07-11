import React, { Component } from "react";
import PropTypes            from "prop-types";
import { connect }          from "react-redux";
import * as action          from "./actions";
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

	componentDidMount() {
		this.fetchData();
	}

	fetchData = () => {
		this.props.fetchCloudData();
		this.props.fetchSolarData();
		this.props.fetchPanelData();
	};
}

DashBoard.propTypes = {
	fetchCloudData: PropTypes.func,
	fetchSolarData: PropTypes.func,
	fetchPanelData: PropTypes.func,
};


const mapDispatchToProps = dispatch => {
	return {
		fetchCloudData: () => dispatch(action.fetchCloudData()),
		fetchSolarData: () => dispatch(action.fetchSolarData()),
		fetchPanelData: () => dispatch(action.fetchPanelData()),
	};
};

export default connect(null, mapDispatchToProps)(DashBoard);
