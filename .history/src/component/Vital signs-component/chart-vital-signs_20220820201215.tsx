import React from "react";
import ReactDOM from "react-dom";
import { LineChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
// Or
// import "@carbon/charts/styles/styles.scss";

// IBM Plex should either be imported in your project by using Carbon
// or consumed manually through an import

export default class ChartVitalSigns extends React.Component {
	state = {
		data: [
	{
		"group": "Dataset 1",
		"date": "2019-01-01T05:00:00.000Z",
		"value": 50000,
		"surplus": 105050535.42796655
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-05T05:00:00.000Z",
		"value": 65000,
		"surplus": 221764763.52215555
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-08T05:00:00.000Z",
		"value": null,
		"surplus": 12114.275379318395
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-13T05:00:00.000Z",
		"value": 49213,
		"surplus": 140198083.27467287
	},
	{
		"group": "Dataset 1",
		"date": "2019-01-17T05:00:00.000Z",
		"value": 51213,
		"surplus": 1157147908.118657
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-02T05:00:00.000Z",
		"value": 0,
		"surplus": 16190.372031971767
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-06T05:00:00.000Z",
		"value": 57312,
		"surplus": 785490321.4260587
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-08T05:00:00.000Z",
		"value": 27432,
		"surplus": 487195957.0095622
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-15T05:00:00.000Z",
		"value": 70323,
		"surplus": 750147611.159392
	},
	{
		"group": "Dataset 2",
		"date": "2019-01-19T05:00:00.000Z",
		"value": 21300,
		"surplus": 366680575.34008896
	},
],
		options: {
	"title": "Line (time series)",
	"axes": {
		"bottom": {
			"title": "2019 Annual Sales Figures",
			"mapsTo": "date",
			"scaleType": "time"
		},
		"left": {
			"mapsTo": "value",
			"title": "Conversion rate",
			"scaleType": "linear"
		}
	},
	"curve": "curveMonotoneX",
	"height": "400px"
}
	};

	render = () => (
		<LineChart
			data={this.state.data}
			options={this.state.options}>
		</LineChart>
	);
}