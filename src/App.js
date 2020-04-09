import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import Drawer from './Drawer/Drawer'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


import Carousel from "./Carousel/Carousel";

// const stat = {
//     "Main_Error" : false,
//     "Main_Door" : false,
//     "Level" : 0,
//     "Rotation" : 1,
//     "Mass": 100,
//     "Qr" : "1235",
//     "Order_Name" : "name123",
//     "Order_Desc": "opis1234\r\n1232323\r\ndupa",
//     "Robot_Status": 1,
//     "Filter_Type":2,
//     "THB":
//         {
//             "Temperature" : 20.05,
//             "Humidity" : 50,
//             "Pressure" :1002
//         }
// }


function App() {
    const [socketAct, setSocketAct] = React.useState({});
    const host = process.env.NODE_ENV !== 'production' ? 'localhost' : window.location.hostname;
    const [stat, setStat] = React.useState({})
    const [kebabData, setKebabData] = React.useState({})
    const [activeRow, setActiveRow] = React.useState(2);

    const [x,setX] = useState(false)
    const run = () => {
        let socket = new WebSocket(`ws://10.10.2.232:1888/ws/status`);
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
        const newData = {}

        // console.log('new',newData)
        if (stat &&stat.OrderDetailsInfo&&stat.OrderDetailsInfo.length > 0)  {
            console.log(stat)
            // for (let i = 0; i < 15; i++) {
            //     if (props.data[i]) {
            //         console.log(props.data[i])
            //         newData.push(props.data[i])
            //     } else {
            //         newData.push({})
            //     }
            // }
            // console.log(newData)
            // setData([])
            // setData(newData)
            for (let elem of stat.OrderDetailsInfo) {
                if (!newData.hasOwnProperty(elem.DiskIndex)) {
                    newData[elem.DiskIndex] = [];
                    newData[elem.DiskIndex].push(elem)
                } else {
                    newData[elem.DiskIndex].push(elem)
                }
            }
            setKebabData(newData)
            // console.log(newData)
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
        // <div>
        //     <div>
        //         <nav>
        //             <ul>
        //                 <li>
        //                     <Link to="/">Home</Link>
        //                 </li>
        //                 <li>
        //                     <Link to="/about">About</Link>
        //                 </li>
        //                 <li>
        //                     <Link to="/users">Users</Link>
        //                 </li>
        //             </ul>
        //         </nav>
        //
        //         {/* A <Switch> looks through its children <Route>s and
        //     renders the first one that matches the current URL. */}
        //         <Switch>
        //             <Route path="/about">
        //                 <About />
        //             </Route>
        //             <Route path="/users">
        //                 <Users />
        //             </Route>
        //             <Route path="/">
        //                 <Home />
        //             </Route>
        //         </Switch>
        //     </div>
        // </div>
        // <div className="contener">
        //     <Carousel
        //         data={data}
        //     />
        //     <Carousel
        //         data={data}/>
        //     <Carousel
        //         data={data}
        //         height={200}
        //         opacity={0.95}
        //         background={'#1796E2'}
        //         zIndex={2}
        //     />
        //     <Carousel
        //         data={data}
        //         zIndex={1}
        //         opacity={0.8}
        //     />
        //     <Carousel
        //         data={data}
        //         opacity={0.8}/>
        //
        // </div>
    );
}

export default App;
