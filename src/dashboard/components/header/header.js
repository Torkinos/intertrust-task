import React from "react";
import "./styles.scss";

import { HEADER } from "../../../static/constants/constants";

const header = props => {
	return (
		<div className = "header">

			{/*buttons*/ }
			<div className = "header__buttons">

				{/*user guide*/ }
				<div className = "header__button">
					{ HEADER.userGuide }
				</div>

				{/*logout*/ }
				<div className = "header__button">
					{ HEADER.logout }
				</div>
			</div>
		</div>
	);
};

export default header;
