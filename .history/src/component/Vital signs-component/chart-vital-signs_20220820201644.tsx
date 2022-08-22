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
		"group": "Dataset 4",
		"date": "2019-01-02T05:00:00.000Z",
		"value": 20000,
		"surplus": 449083596.2270672
	},
	{
		"group": "Dataset 4",
		"date": "2019-01-06T05:00:00.000Z",
		"value": 37312,
		"surplus": 385442604.63402385
	},
	{
		"group": "Dataset 4",
		"date": "2019-01-08T05:00:00.000Z",
		"value": 51432,
		"surplus": 648998378.2324682
	},
	{
		"group": "Dataset 4",
		"date": "2019-01-15T05:00:00.000Z",
		"value": 25332,
		"surplus": 601955968.6356899
	},
	{
		"group": "Dataset 4",
		"date": "2019-01-19T05:00:00.000Z",
		"value": null,
		"surplus": 1889.9243467256133
	}
],
		options: {
	"axes": {
		"bottom": {
			"mapsTo": "date",
			"scaleType": "time"
		},
		"left": {
			"mapsTo": "value",
			"title": "FR/FC",
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