import React from "react";
import ReactDOM from "react-dom";
import { LineChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import styles from './chart.scss';
import { Button, Column, Row } from "carbon-components-react";
// Or
// import "@carbon/charts/styles/styles.scss";

// IBM Plex should either be imported in your project by using Carbon
// or consumed manually through an import

export default function ChartVitalSigns({ title, data, options }) {
	return <>
		<div className={styles.margin_LineChart}>
			<Row>
				<Column>
					<div className={styles.margin_Column}>{title} </div>
				</Column>
				<Column lg={10} sm={10} md={10}>
					<LineChart  data={data} options={options}></LineChart>
				</Column>
				<Column >
					<div className={`${styles.circleDiv}`}>
						<div>{title}</div>
					</div>

				</Column>
			</Row>
		</div>
	</>
}