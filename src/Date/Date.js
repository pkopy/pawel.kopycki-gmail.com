import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        '& h2': {
            margin: 0
        }
    },
}));


export default function DatePanel(props) {
    const [time, setTime] = useState('')
    // useEffect(() => {
    //     // const timeInMs = new Date();
    //     //
    //     const test = new Date;
    //     function tick() {
    //         return test
    //     }
    //     const timer = setInterval(tick, 1000);
    //     //
    //     // return () => {
    //     //     clearInterval(timer)
    //     // }
    //
    // }, [])
    useEffect(() => {
        // console.log(props.time)
        if (props.time.Time) setTime(props.time.Time.Current_Time)
        // console.log(time)
    }, [props.time])

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         const t = new Date();
    //         setTime(t.toLocaleTimeString())
    //         // console.log(t.toLocaleTimeString())
    //     }, 1000);
    //     return () => {
    //                 clearInterval(timer)
    //             }
    // }, [])
    return (
        <div style={{textAlign:'right', fontSize: '1.5em', width:'80%', fontWeight:'bold'}}>
            {time}
        </div>
    )
}
