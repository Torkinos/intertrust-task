import React from "react";
import "./styles.scss";

const card = props => {
	return (
		<div className = "card">
			{ props.children }
		</div>
	);
};

export default card;
