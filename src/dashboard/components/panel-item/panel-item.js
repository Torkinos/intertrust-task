import React     from "react";
import PropTypes from "prop-types";
import "./styles.scss";

import { PANEL } from "../../../static/constants/constants";

const panelItem = props => {

	const wattage = Math.round(props.wattage);
	const voltage = Math.round(props.voltage);

	return (
		<div className = "pan-item">
			<div className = "pan-item__inner">

				{/*id*/ }
				<div className = "pan-item__container pan-item__container--left">
					{ props.id }
				</div>

				{/*wattage*/ }
				<div className = "pan-item__container pan-item__container--mid">
					{ wattage + PANEL.kw }
				</div>

				{/*voltage*/ }
				<div className = "pan-item__container pan-item__container--right">
					{ voltage + PANEL.v }
				</div>
			</div>
		</div>
	);
};

panelItem.propTypes = {
	id:      PropTypes.string,
	wattage: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]),
	voltage: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]),
};

export default panelItem;
