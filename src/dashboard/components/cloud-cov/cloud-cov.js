import React     from "react";
import PropTypes from "prop-types";
import "./styles.scss";

import { CLOUD_COV } from "../../../static/constants/constants";
import cloudIcon     from "../../../static/icons/cloud.svg";
import cloudSunIcon  from "../../../static/icons/cloud-sun.svg";
import sunIcon       from "../../../static/icons/sun.svg";

const cloudCoverage = props => {

	const { value } = props;

	const info = value + "% " + CLOUD_COV.clearSky;

	let weatherIcon = cloudSunIcon;

	if (value > 66.66) {
		weatherIcon = sunIcon;
	}

	if (value < 33.33) {
		weatherIcon = cloudIcon;
	}

	return (
		<div className = "cloud-cov">

			{/*header*/ }
			<div className = "cloud-cov__header">
				{ CLOUD_COV.title }
			</div>

			{/*icon*/ }
			<div className = "cloud-cov__icon">
				<img
					src = { weatherIcon }
					alt = "weather icon"
				/>
			</div>

			{/*info*/ }
			<div className = "cloud-cov__info">
				{ info }
			</div>
		</div>
	);
};

cloudCoverage.propTypes = {
	value: PropTypes.number,
};

export default cloudCoverage;
