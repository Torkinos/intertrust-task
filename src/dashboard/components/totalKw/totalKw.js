import React     from "react";
import PropTypes from "prop-types";
import "./styles.scss";

import { TOTAL_KW } from "../../../static/constants/constants";

const totalKw = props => {

	const total = props.total + TOTAL_KW.kw;

	return (
		<div className = "total-kw">

			{/*header*/ }
			<div className = "total-kw__header">
				{ TOTAL_KW.title }
			</div>

			{/*info number*/ }
			<div className = "total-kw__info">
				{ total }
			</div>
		</div>
	);
};

totalKw.propTypes = {
	total: PropTypes.number
};

export default totalKw;
