import React, { Component } from "react";
import PropTypes            from "prop-types";
import { connect }          from "react-redux";
import { getPanelData }     from "../../selectors";
import "./styles.scss";

import Card      from "../../components/card/card";
import PanelItem from "../../components/panel-item/panel-item";

class Panels extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {

		const { panels } = this.props;

		let list = null;

		if (panels) {
			list = panels.map((item, index) => {
				return (
					<div
						className = "panels__item"
						key = { index }
					>
						<Card data = { item !== null }>
							<PanelItem
								id = { item.id }
								wattage = { item.wattage }
								voltage = { item.voltage }
							/>
						</Card>
					</div>
				);
			});
		}

		return (
			<div className = "panels">
				{ list }
			</div>
		);
	}
}

Panels.propTypes = {
	panels: PropTypes.array
};

const mapStateToProps = state => {
	return {
		panels: getPanelData(state),
	};
};

export default connect(mapStateToProps)(Panels);
