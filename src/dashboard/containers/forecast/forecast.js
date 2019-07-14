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

		const { totalKw, cloudData, solarData, cloudDataLoading, solarDataLoading } = this.props;

		const chart = solarData !== null
									? (
										<SolarChart
											data = { solarData.values }
											labels = { solarData.hours }
											loading = { solarDataLoading }
										/>
									)
									: null;

		return (
			<div className = "forecast">

				{/*left container*/ }
				<div className = "forecast__container forecast__container--left">

					{/*total energy*/ }
					<div className = "forecast__inner forecast__inner--top">
						<Card loading = { totalKw !== null }>
							<TotalKw total = { totalKw } />
						</Card>
					</div>

					{/*sky clearness*/ }
					<div className = "forecast__inner forecast__inner--bot">
						<Card loading = { cloudData !== null }>
							<CloudCov value = { cloudData } />
						</Card>
					</div>
				</div>

				{/*right container*/ }
				<div className = "forecast__container forecast__container--right">
					<Card loading = { solarData !== null }>
						{ chart }
					</Card>
				</div>
			</div>
		);
	}
}

Forecast.propTypes = {
	cloudDataLoading: PropTypes.bool,
	solarDataLoading: PropTypes.bool,
	totalKw:          PropTypes.number,
	cloudData:        PropTypes.number,
	solarData:        PropTypes.object,
};

const mapStateToProps = state => {
	return {
		totalKw:          getTotalKw(state),
		cloudData:        getCloudData(state),
		cloudDataLoading: state.dashboard.cloudDataLoading,
		solarData:        getSolarData(state),
		solarDataLoading: state.dashboard.solarDataLoading,
	};
};

export default connect(mapStateToProps)(Forecast);
