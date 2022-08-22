import React from "react";
import ReactDOM from "react-dom";
import { LineChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import styles from '../field.scss';
// Or
// import "@carbon/charts/styles/styles.scss";

// IBM Plex should either be imported in your project by using Carbon
// or consumed manually through an import

export default function ChartVitalSigns({ data, options }) {
	return <>
		<LineChart
			className={styles.margin_field}
			data={data}
			options={options}>
		</LineChart>
	</>
}