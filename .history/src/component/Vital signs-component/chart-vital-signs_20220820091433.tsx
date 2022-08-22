import React from "react";
import ReactDOM from "react-dom";
import { LineChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";

function ChartVitalSigns() {
    let state = {
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
            {
                "group": "Dataset 4",
                "date": "2019-01-01T05:00:00.000Z",
                "value": 30000,
                "surplus": 449083596.2270672
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
                "value": 0,
                "surplus": 1889.9243467256133
            }
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

    return <>
    <LineChart
        data={state.data} options={state.options}
    />
</>
}