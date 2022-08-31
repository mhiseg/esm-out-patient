import React from "react";
import ReactDOM from "react-dom";
import { LineChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import styles from './chart.scss';
import { Button, Column, Row } from "carbon-components-react";


export default function ChartVitalSigns({ title, data, options,value }) {
	return <>
		<div className={styles.margin_LineChart}>
			<Row className={styles.p0}>
				<Column className={styles.p0}>
					<div className={styles.shartTitle}>{title}</div>
				</Column>
				<Column className={styles.p0} lg={10} sm={10} md={10}>
					<LineChart
						data={data}
						options={options}
					/>
				</Column>
				<Column className={styles.p0}>
					<div className={styles.circleDiv}>
						<div>{value}</div>
					</div>
				</Column>
			</Row>
		</div>
	</>
}