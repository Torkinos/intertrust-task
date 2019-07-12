import React, { Component } from "react";
import PropTypes            from "prop-types";
import { connect }          from "react-redux";
import { getTotalKw }       from "../../selectors";
import "./styles.scss";

class Forecast extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {

		const { totalKw } = this.props;

		return (
			<div className = "forecast">
				{ totalKw }
			</div>
		);
	}
}

Forecast.propTypes = {
	totalKw: PropTypes.number
};

const mapStateToProps = state => {
	return {
		totalKw: getTotalKw(state)
	};
};

export default connect(mapStateToProps)(Forecast);
