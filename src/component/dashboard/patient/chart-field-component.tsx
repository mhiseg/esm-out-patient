import React from "react";
import { LineChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import styles from "./dashboard.scss";




export default function ChartVitalSigns({ data, options }) {

	return <>
		<div className={styles.chart}>
		<LineChart
			data={data}
			options={options}
		/>
		</div>
	</>
}