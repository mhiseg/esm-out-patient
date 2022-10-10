import React from "react";
import { LineChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import styles from './chart.scss';
import { Column, Row } from "carbon-components-react";
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
		<div>
			<h6 className={styles.title}>{title}</h6>
			<Row className={styles.pm0}>
				<Column className={styles.pr0}>
					<LineChart
						data ={data}
						options={options}
					/>
				</Column>
				<Column className={styles.pm0} lg={1} sm={1} md={1}>
					<div className={styles.circleDiv}>
						<div>{filtreChartType(title)}</div>
					</div>
				</Column>
			</Row>
		</div>
	</>
}