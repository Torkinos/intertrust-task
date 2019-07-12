import React, { Component } from "react";
import PropTypes            from "prop-types";
import { connect }          from "react-redux";
import { getTotalKw }       from "../../selectors";
import "./styles.scss";

import Card from "../../components/card/card";

class Forecast extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {

		const { totalKw } = this.props;

		return (
			<div className = "forecast">

				{/*left container*/ }
				<div className = "forecast__container forecast__container--left">

					{/*total energy*/ }
					<div className = "forecast__inner forecast__inner--top">
						<Card>{ totalKw }</Card>
					</div>

					{/*sky clearness*/ }
					<div className = "forecast__inner forecast__inner--bot">
						<Card></Card>
					</div>
				</div>

				{/*right container*/ }
				<div className = "forecast__container forecast__container--right">
					<Card></Card>
				</div>
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
