import React     from "react";
import PropTypes from "prop-types";
import "./styles.scss";

import { TOTAL_KW } from "../../../static/constants/constants";

const totalKw = props => {

	const total = Math.round(props.total);

	return (
		<div className = "total-kw">

			{/*header*/ }
			<div className = "total-kw__header">
				{ TOTAL_KW.title }
			</div>

			{/*info number*/ }
			<div className = "total-kw__info">
				{ total + TOTAL_KW.kw }
			</div>
		</div>
	);
};

totalKw.propTypes = {
	total: PropTypes.number
};

export default totalKw;
