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
				return <div className={styles.sign}>
					<Column className={styles.colSign}>{value} <span className={styles.mesure}>°C</span></Column>
					<Column className={styles.colSign}>{convertToF(value)} <span className={styles.mesure}>°F</span></Column>
				</div>;
				break;
			case t('FR/FC'):
				return <div className={styles.sign}>
					<Column className={styles.colSign}>{value[1]}<span className={styles.mesure}>bpm</span></Column>
					<Column className={styles.colSign}>{value[0]}<span className={styles.mesure}>cpm</span></Column>
				</div>
				break;
			case t('TaSystole') + '/' + t('TaDiastole'):
				return <div className={styles.sign}>
					<Column className={styles.colSign}>{value}</Column>
					<Column className={styles.colSign}><span className={styles.mesure}>mmHg</span></Column>
				</div>;
				break;
			default:
				break;
		};
	}
	return <>
		<h6 className={styles.title}>{title}</h6>
		<Row className={styles.pm0}>
			<Column className={styles.pr0}>
				<LineChart
					data={data}
					options={options}
				/>
			</Column>
			<Column className={styles.pm0} lg={1} sm={2} md={2}>
				{filtreChartType(title)}
			</Column>
		</Row>
	</>
}