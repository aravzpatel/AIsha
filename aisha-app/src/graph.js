import React from "react";
import ReactDOM from "react-dom";
import { Chart } from "react-charts";
// import ResizableBox from "./ResizableBox";


function Graph(props) { 

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
        <Chart data={makeSeries(props.data)} series={series} axes={axes} tooltip style={{width: "300px", height: "300px"}}/>
      {/* </ResizableBox> */}
    </>
  );
}

export default Graph
