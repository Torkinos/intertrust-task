import React, { Component } from "react";
import PropTypes            from "prop-types";
import { connect }          from "react-redux";
import * as action          from "./actions";
import "./styles.scss";

import Header   from "./components/header/header";
import Forecast from "./containers/forecast/forecast";
import Panels   from "./containers/panels/panels";

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

					{/*container top*/ }
					<div className = "dashboard__container dashboard__container--top">
						<Forecast />
					</div>

					{/*container bot*/ }
					<div className = "dashboard__container dashboard__container--bot">
						<Panels />
					</div>
				</div>
			</div>
		);
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData = () => {

		const second = 1000,
					minute = second * 60;

		// fetch forecast data
		this.props.fetchCloudData();
		this.props.fetchSolarData();

		// fetch panel data
		this.props.fetchPanelData();

		// set fetching intervals
		setInterval(() => {
			this.props.fetchPanelData();
		}, second * 10);

		setInterval(() => {
			this.props.fetchCloudData();
			this.props.fetchSolarData();
		}, minute * 5);
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
