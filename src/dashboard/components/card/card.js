import React     from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const card = props => {

	const loading = (
		<div className = "card__loading-container">
			<div className = "card__loading">
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	);

	const children = props.loading
									 ? loading
									 : props.children;

	return (
		<div className = "card">
			{ children }
		</div>
	);
};

card.propTypes = {
	loading: PropTypes.bool
};

export default card;
