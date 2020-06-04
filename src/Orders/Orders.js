import React, {useEffect, useState} from "react";
import dict from '../dictionary'
import './Orders.scss'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';

export default function Orders(props) {

    // console.log(props.data)
    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(0)

    const pageUp = () => {
        if (page < orders.length) {

            setPage(page+1)
        }
    }
    const pageDown = () => {
        if (page > 0) {

            setPage(page - 1)
        }
    }
    useEffect(() => {
        let length = props.data?props.data.length:0;
        let arr = []
        if (length > 6) {
            for (let i = 0; i < Math.ceil(length/6); i++) {
                let helpArr = []
                for (let j = 0; j < 6; j++) {
                    if (props.data[i*6 +j]) helpArr.push(props.data[i*6 +j])
                }
                arr.push(helpArr)
            }
        } else if (length > 0){
            arr.push(props.data)
        }
        setOrders(arr)
        console.log(arr)
    }, [props.data])

    // useEffect(() => {
    //     if (page > )
    // },[page])
    return (
        <div style={{width: "100%", position:"relative", marginTop:20}}>
            <div>


                <table style={{borderCollapse: "collapse", width: "100%"}}>
                    <tbody>


                    <tr>
                        <th>Typ</th>
                        <th>Nazwa</th>
                        <th>Status</th>
                        <th>Stacja</th>
                        <th>Poziom</th>
                        <th className='column' style={{width: '15%'}}>Data następnej akcji</th>
                        <th  className='column' style={{width: '15%'}}>Przewidywany czas</th>
                    </tr>

                    {orders.length > 0 && orders[page].map((elem, i) =>
                        <tr key={i} style={{background: elem.In_Process ? '#9ee0fb' : undefined}}>
                            <td>{dict.orderType[elem.OrderType]}</td>
                            <td>{elem.Name}</td>
                            <td>{dict.robotStat[elem.Status]}</td>
                            <td>{elem.Customer_Name}</td>
                            <td style={{textAlign: 'center'}}>{elem.Disks}</td>
                            <td className='column'>{elem.date}</td>
                            <td className='column'>{elem.timeDesc}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            {orders.length - 1>0&&<div style={{position:"absolute", margin: 10, right:0, top:260}}>

                <Button disabled={page === 0} onClick={pageDown}><KeyboardArrowLeftIcon></KeyboardArrowLeftIcon></Button>
                <span>Strona {page+1} z {orders.length}</span>
                <Button  disabled={page >= orders.length-1} onClick={pageUp}><KeyboardArrowRightIcon/></Button>
            </div>}
        </div>
    )
}
