import React, { Component }                       from "react";
import PropTypes                                  from "prop-types";
import { connect }                                from "react-redux";
import { getTotalKw, getCloudData, getSolarData } from "../../selectors";
import "./styles.scss";

import Card       from "../../components/card/card";
import TotalKw    from "../../components/totalKw/totalKw";
import CloudCov   from "../../components/cloud-cov/cloud-cov";
import SolarChart from "../../components/chart/chart";

class Forecast extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {

		const { totalKw, cloudData, solarData } = this.props;

		const chart = solarData !== null
									? (
										<SolarChart
											data = { solarData.values }
											labels = { solarData.hours }
										/>
									)
									: null;

		return (
			<div className = "forecast">

				{/*left container*/ }
				<div className = "forecast__container forecast__container--left">

					{/*total energy*/ }
					<div className = "forecast__inner forecast__inner--top">
						<Card data = { totalKw !== null }>
							<TotalKw total = { totalKw } />
						</Card>
					</div>

					{/*sky clearness*/ }
					<div className = "forecast__inner forecast__inner--bot">
						<Card data = { solarData !== null }>
							<CloudCov value = { cloudData } />
						</Card>
					</div>
				</div>

				{/*right container*/ }
				<div className = "forecast__container forecast__container--right">
					<Card data = { solarData !== null }>
						{ chart }
					</Card>
				</div>
			</div>
		);
	}
}

Forecast.propTypes = {
	totalKw:   PropTypes.number,
	cloudData: PropTypes.number,
	solarData: PropTypes.object,
};

const mapStateToProps = state => {
	return {
		totalKw:   getTotalKw(state),
		cloudData: getCloudData(state),
		solarData: getSolarData(state),
	};
};

export default connect(mapStateToProps)(Forecast);
