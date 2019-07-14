import React     from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const card = props => {
	return (
		<div className = "card">
			{ props.children }
		</div>
	);
};

card.propTypes = {
	loading: PropTypes.bool
};

export default card;
