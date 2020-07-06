import React, {useEffect, useState} from 'react';
import './App.scss';
import Drawer from './Drawer/Drawer'



function App() {
    const [socketAct, setSocketAct] = React.useState({});
    const host = process.env.NODE_ENV !== 'production' ? '10.10.3.84' : window.location.hostname;
    const [stat, setStat] = React.useState({})
    const [kebabData, setKebabData] = React.useState([])
    const [activeRow, setActiveRow] = React.useState(2);
    // const [host, setHost] = React.useState(process.env.NODE_ENV !== 'production' ? '10.10.3.84' : window.location.hostname)
    const [x,setX] = useState(false)
    const run = () => {
        let socket = new WebSocket(`ws://${host}:1880/ws/status`);
        socket.onopen = () => {
            console.log('socket Open')
            setSocketAct(socket);
        }
        socket.onmessage = (e) => {
            let data = e.data;
            const response = JSON.parse(data);
            setStat(response);
            // setKebabData(response.OrderDetailsInfo)
            // console.log(response);
        }
        socket.onclose = () => {
            socket = '';
            // console.log(socket);
            setX(!x)

        }
    }
    // React.useEffect(() => {
    //
    //     run()
    //
    // }, [])
    React.useEffect(() => {

        run()

    }, [x]);

    React.useEffect(() => {
        const newData = []


        if (stat &&stat.OrderDetailsInfo&&stat.OrderDetailsInfo.length > 0)  {
            console.log(stat)
            for (let elem of stat.OrderDetailsInfo) {
                if (!newData.hasOwnProperty(elem.DiskIndex)) {
                    newData[elem.DiskIndex] = [];
                    newData[elem.DiskIndex].push(elem)
                } else {
                    newData[elem.DiskIndex].push(elem)
                }
            }
            setKebabData(newData)

        }
    }, [stat])

    return (
        <Drawer
            // data={data}
            stat={stat}
            kebabData={kebabData}
            setKebabData={setKebabData}
            socketAct={socketAct}
            activeRow={activeRow}
            setActiveRow={setActiveRow}
        />

    );
}

export default App;
