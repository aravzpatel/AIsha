import React from "react";
import ReactDOM from "react-dom";
// import { timeDay } from "d3";

import { Chart } from "react-charts";

// import useDemoConfig from "./useDemoConfig";
// import useLagRadar from "./useLagRadar";
// import ResizableBox from "./ResizableBox";
// import "./styles.css";

export default function Graph() {
 

const test_data = [{"day": 26, "month": 8, "moodscore": {"Anger": 0.03424658486649458, "Fear": 0.006849561819119073, "Joy": 0.9109566905364948, "Sadness": 0.04794716277789124}, "year": 2020}, {"day": 27, "month": 8, "moodscore": {"Anger": 0.02112711838556208, "Fear": 0.007042384711719865, "Joy": 0.9225331120047077, "Sadness": 0.049297384898010034}, "year": 2020}, {"day": 28, "month": 8, "moodscore": {"Anger": 0.02427192218911397, "Fear": 0.9466026567574002, "Joy": 0.014563033854842363, "Sadness": 0.01456238719864371}, "year": 2020}, {"day": 29, "month": 8, "moodscore": {"Anger": 0.00800251048024011, "Fear": 0.002664018841275694, "Joy": 0.33519171786590374, "Sadness": 0.6541417528125801}, "year": 2020}, {"day": 30, "month": 8, "moodscore": {"Anger": 0.4457637231038975, "Fear": 0.0007192010386700447, "Joy": 0.026756132541997435, "Sadness": 0.5267609433154381}, "year": 2020}, {"day": 31, "month": 8, "moodscore": {"Anger": 0.5697522180527133, "Fear": 0.41036672008823366, "Joy": 0.0006908739542276425, "Sadness": 0.019190187904825146}, "year": 2020}, {"day": 1, "month": 9, "moodscore": {"Anger": 9.35168464941404e-05, "Fear": 0.16116322172646444, "Joy": 0.8383396121639924, "Sadness": 0.00040364926304875775}, "year": 2020}]

function makeSeries(input_data) {

	return [{
      label: 'Fear',
      data: [...new Array(7)].map((_, i) => {
        const x = new Date(input_data[i].year, input_data[i].month-1, input_data[i].day);
        const y = input_data[i].moodscore.Fear 
        return {
          primary: x,
          secondary: y,
      };
	  })
	},
  {
    label: 'Joy',
    data: [...new Array(7)].map((_, i) => {
      const x = new Date(input_data[i].year, input_data[i].month-1, input_data[i].day);
      const y = input_data[i].moodscore.Joy 
      return {
        primary: x,
        secondary: y,
			};
		})
	},
	{
    label: 'Anger',
    data: [...new Array(7)].map((_, i) => {
      const x = new Date(input_data[i].year, input_data[i].month-1, input_data[i].day);
      const y = input_data[i].moodscore.Anger 
      return {
        primary: x,
        secondary: y,
			};
		})
  },
	{
    label: 'Sadness',
    data: [...new Array(7)].map((_, i) => {
      const x = new Date(input_data[i].year, input_data[i].month-1, input_data[i].day);
      const y = input_data[i].moodscore.Sadness 
      return {
        primary: x,
        secondary: y,
			};
		})
	}
];
  }


  const series = React.useMemo(
    () => ({
      showPoints: true
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: "time",
        position: "bottom"
        // filterTicks: (ticks) =>
        //   ticks.filter((date) => +timeDay.floor(date) === +date),
      },
      { type: "linear", position: "left" }
    ],
    []
  );

  return (
    <>
      {/* <ResizableBox> */}
        <Chart data={makeSeries(test_data)} series={series} axes={axes} tooltip />
      {/* </ResizableBox> */}
    </>
  );
}

ReactDOM.render(<Graph />, document.getElementById("app"));


