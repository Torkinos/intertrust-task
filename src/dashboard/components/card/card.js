import React     from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const card = props => {

	const children = props.data
									 ? props.children
									 : "LOADING";

	return (
		<div className = "card">
			{ children }
		</div>
	);
};

card.propTypes = {
	data: PropTypes.bool
};

export default card;
