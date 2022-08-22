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
	{
		"group": "Dataset 3",
		"date": "2019-01-01T05:00:00.000Z",
		"value": 40000,
		"surplus": 459306080.3128546
	},
	{
		"group": "Dataset 3",
		"date": "2019-01-05T05:00:00.000Z",
		"value": null,
		"surplus": 926.0082227326383
	},
	{
		"group": "Dataset 3",
		"date": "2019-01-08T05:00:00.000Z",
		"value": 18000,
		"surplus": 306365712.91610426
	},
	{
		"group": "Dataset 3",
		"date": "2019-01-13T05:00:00.000Z",
		"value": 39213,
		"surplus": 582477137.9115808
	},
	{
		"group": "Dataset 3",
		"date": "2019-01-17T05:00:00.000Z",
		"value": 61213,
		"surplus": 17986073.62632561
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