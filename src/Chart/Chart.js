import {Line} from 'react-chartjs-2';
import React, {useEffect, useState} from "react";


export default function MyChart(props) {
    // console.log(props.stat.THB.LastDayAvg)
    // console.log(props.stat)
    const [temp1, setTemp1] = useState([]);
    const [temp2, setTemp2] = useState([]);
    const [humidity1, setHumidity1] = useState([]);
    const [humidity2, setHumidity2] = useState([]);

    useEffect(() => {
        let temp1 = [];
        let temp2 = [];
        let humidity1 = [];
        let humidity2 = [];

        if (props.stat && props.stat.THB) {
            // console.log(props.stat.THB.LastDayAvg)
            for (let elem of props.stat.THB.LastDayAvg) {
                temp1.push(elem.temperature1)
                temp2.push(elem.temperature2)
                humidity1.push(elem.humidity1)
                humidity2.push(elem.humidity2)
            }
        }

        setTemp1(temp1);
        setTemp2(temp2);
        setHumidity1(humidity1);
        setHumidity2(humidity2);

    }, [props.stat])
    const data = {
        // labels: ['Temp'],
        labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
        datasets: [
            // {
            //     label: 'max',
            //     yAxisID: 'left',
            //     // data: [20, 50, 100, 75, 25, 0],
            //     // showLine:showChart.max,
            //     // this dataset is drawn below
            //     borderColor: 'rgba(255,0,0,1)',
            //     order: 3,
            //     type: 'line',
            //     fill: false,
            //     borderWidth: 0,
            //     pointBorderWidth: 0,
            //     pointRadius: 0,
            //     lineTension: 0.1,
            // }


            {
                // This dataset appears on the first axis
                data: temp1,
                borderColor: 'rgba(255,0,0,1)',
                label: 'Temperatura waga ',
                type: 'line',
                fill: false,
                lineTension: 0.1,
                pointRadius: 1,
                // This binds the dataset to the left y axis
                yAxisID: 'first-y-axis'
            },
            {
                // This dataset appears on the second axis
                data: temp2,
                label: 'Temperatura magazyn',
                type: 'line',
                fill: false,
                borderColor: 'rgba(0,0,255,1)',
                pointRadius: 0,
                // This binds the dataset to the right y axis
                yAxisID: 'first-y-axis'
            },
            {
                // This dataset appears on the second axis
                data: humidity1,
                label: 'Wilgotność waga',
                type: 'line',
                fill: false,
                borderColor: 'rgba(0,255,0,1)',
                pointRadius: 0,
                // This binds the dataset to the right y axis
                yAxisID: 'second-y-axis'
            },
            {
                // This dataset appears on the second axis
                data: humidity2,
                label: 'Wilgotność magazyn',
                type: 'line',
                fill: false,
                borderColor: 'rgba(0,255,255,1)',
                pointRadius: 0,

                // This binds the dataset to the right y axis
                yAxisID: 'second-y-axis'
            }
        ]
    }


    return (
        <div>
            <Line data={data}
                  height={350}
                  options={
                      {
                          scales: {
                              yAxes: [{
                                  id: 'first-y-axis',
                                  type: 'linear',
                                  position: 'left',
                                  ticks: {
                                      min: 18,
                                      max: 22
                                  }
                              },
                                  {
                                      id: 'second-y-axis',
                                      type: 'linear',
                                      position: 'right',
                                      ticks: {
                                          min: 44,
                                          max: 51
                                      }
                                  }
                              ]
                          },
                          maintainAspectRatio: false
                      }
                  }
            />
        </div>
    )
}