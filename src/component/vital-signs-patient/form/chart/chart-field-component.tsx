import React, { useState } from "react";
import ReactDOM from "react-dom";
import { LineChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import styles from './chart.scss';
import { Button, Column, Row } from "carbon-components-react";
import { useTranslation } from "react-i18next";



export default function ChartVitalSigns({ title, data, options, value }) {

	const { t } = useTranslation();

	function convertToF(celsius) {
		return (celsius * 9 / 5 + 32);
	}

	function filtreChartType(ChartType) {
		switch (ChartType) {
			case t('temperature'):
				return <>
					{value} <span className={styles.mesure}> {"°C"}</span>
					/
					{convertToF(value)}<span className={styles.mesure}>{"°F"}</span>
				</>;
				break;
			case t('FR/FC'):
				return value;
				break;
			case t('TaSystole') + '/' + t('TaDiastole'):
				return <>
					{value}
					<span className={styles.mesure}> {"mmHg"}</span>
				</>;
				break;
			default:
				break;
		};
	}
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
						<div>{filtreChartType(title)}</div>
					</div>
				</Column>
			</Row>
		</div>
	</>
}