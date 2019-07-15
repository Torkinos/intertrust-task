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
			tablet: window.innerWidth < 1025
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
				<canvas ref = { this.ctx } />
			</div>
		);
	}

	componentDidMount() {

		window.addEventListener("resize", this.onResize);

		this.createChart();
	}

	componentDidUpdate(prevProps) {

		if (prevProps.loading && !this.props.loading) {
			this.chart.destroy();

			this.createChart();
		}
	}

	// chart properties
	createChart = () => {
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
				aspectRatio:         2.5,
				legend:              {
					display: false
				},
				scales:              {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				},
				elements:            {
					point: {
						radius: 0
					}
				}
			}
		});
	};

	// update chart properties on window resize
	onResize = () => {

		const tablet = window.innerWidth < 1025;

		if (this.state.tablet !== tablet) {
			this.setState({ tablet });

			this.chart.options.maintainAspectRatio = tablet;
			this.chart.update();
		}
	};
}

SolarChart.propTypes = {
	loading: PropTypes.bool,
	data:    PropTypes.array,
	labels:  PropTypes.array,
};

export default SolarChart;
