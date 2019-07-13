import React, { Component } from "react";
import PropTypes            from "prop-types";
import Chart                from "chart.js";
import "./styles.scss";

import { SOLAR_ACTIVITY } from "../../../static/constants/constants";

class SolarChart extends Component {

	constructor(props) {
		super(props);
		this.ctx   = React.createRef();
		this.chart = null;

		this.state = {
			tablet: window.innerWidth < 769
		};
	}

	render() {
		return (
			<div className = "chart">

				{/*header*/ }
				<div className = "chart__header">
					{ SOLAR_ACTIVITY.title }
				</div>

				{/*chart*/ }
				<canvas
					ref = { this.ctx }
				/>
			</div>
		);
	}

	componentDidMount() {

		window.addEventListener("resize", this.onResize);

		this.chart = new Chart(this.ctx.current, {
			type:    "line",
			data:    {
				labels:   this.props.labels,
				datasets: [{
					data:            this.props.data,
					backgroundColor: "rgba(255, 255, 255, 0.8)"
				}]
			},
			options: {
				maintainAspectRatio: this.state.tablet,
				legend:              {
					display: false
				},
				scales:              {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		});
	}

	onResize = () => {

		const tablet = window.innerWidth < 769;

		if (this.state.tablet !== tablet) {
			this.setState({ tablet });

			this.chart.options.maintainAspectRatio = tablet;
			this.chart.update();
		}
	};
}

SolarChart.propTypes = {
	data:   PropTypes.array,
	labels: PropTypes.array,
};

export default SolarChart;
