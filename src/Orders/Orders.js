import React, {useEffect, useState} from "react";
import dict from '../dictionary'
import  './Orders.scss'
export default function Orders(props) {
    // console.log(props.data)
    return (
        <div style={{width: "100%"}}>
            <div>


            <table style={{borderCollapse: "collapse", width: "100%"}}>
                <tbody>


                <tr >
                    <th>Typ</th>
                    <th>Nazwa</th>
                    <th>Status</th>
                    <th>Klient</th>
                    <th>Poziom</th>
                    <th style={{width:'15%'}}>Data następnej akcji</th>
                    <th style={{width:'15%'}}>Przewidywany czas</th>
                </tr>
                {props.data && props.data.map((elem,i) =>
                    <tr key={i} style={{background:elem.In_Process?'#9ee0fb': undefined}}>
                        <td>{dict.orderType[elem.OrderType]}</td>
                        <td>{elem.Name}</td>
                        <td>{dict.robotStat[elem.Status]}</td>
                        <td>{elem.Customer_Name}</td>
                        <td style={{textAlign: 'center'}}>{elem.Disks}</td>
                        <td>{elem.date}</td>
                        <td>{elem.timeDesc}</td>
                    </tr>

                )}
                </tbody>
            </table>
            </div>
        </div>
    )
}