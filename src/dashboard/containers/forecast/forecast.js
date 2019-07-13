import React, { Component }         from "react";
import PropTypes                    from "prop-types";
import { connect }                  from "react-redux";
import { getTotalKw, getCloudData } from "../../selectors";
import "./styles.scss";

import Card     from "../../components/card/card";
import TotalKw  from "../../components/totalKw/totalKw";
import CloudCov from "../../components/cloud-cov/cloud-cov";

class Forecast extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {

		const { totalKw, cloudData } = this.props;

		return (
			<div className = "forecast">

				{/*left container*/ }
				<div className = "forecast__container forecast__container--left">

					{/*total energy*/ }
					<div className = "forecast__inner forecast__inner--top">
						<Card>
							<TotalKw total = { totalKw } />
						</Card>
					</div>

					{/*sky clearness*/ }
					<div className = "forecast__inner forecast__inner--bot">
						<Card>
							<CloudCov value = { cloudData } />
						</Card>
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
	totalKw:   PropTypes.number,
	cloudData: PropTypes.number,
};

const mapStateToProps = state => {
	return {
		totalKw:   getTotalKw(state),
		cloudData: getCloudData(state),
	};
};

export default connect(mapStateToProps)(Forecast);
