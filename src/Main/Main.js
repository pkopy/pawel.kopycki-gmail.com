import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './Main.scss'
import DatePanel from "../Date/Date";
import Alert from "../Alert/Alert";
import icon from '../images/kolo.svg'
import cos from '../images/ddd.png'
import okArrow from '../images/okArrow.svg'
import lowArrow from '../images/lowArrow.svg'
import hiArrow from '../images/hiArrow.svg'
import clock from '../images/clock.svg'
import Chart from "../Chart/Chart";
import Orders from "../Orders/Orders";


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

const robotErr = {
    1: 'Błąd ogólny na plc',
    2: 'Błąd otwartych drzwiczek',
    3: 'Błąd masy zero',
    4: 'Za duża różnica masy wzorca'
};
const filterType = {
    1: 'Ważenie czystego sączka',
    2: 'Ważenie zabrudzonego sączka',
    3: 'Autotest'
};
const robotStat = {
    1: 'Pobieranie filtru',
    2: 'Odkładanie filtru',
    3: 'Skanowanie',
    4: 'Ważenie badanego filtra',
    5: 'Za dużą różnica masy wzorca',
    6: 'Kalibracja wagi',
    7: 'Ważenie wzorca masy',
    8: 'Oczekiwanie na start zlecenia',
    9: 'Zatrzymano zlecenie'
};

const errorsDetails = {
    GStatErr: {
        err:'Błąd ogólny sterownika',
        title: 'Wciśnięty wyłącznik awaryjny, upewnij się że',
        items: [
            'Filtry są na swoich miejscach',
            'Brak obiektów trzecich w komorze',
            'Wyłącznik awaryjny jest wyciśnięty'
        ]
    },
    GErrFull: {
        err: 'Nieoczekiwana obecność filtra',
        title: 'Nieoczekiwana obecność filtra',
        items: ['Usuń filtr z ramienia podajnika']
    },

    GMassErr: {
        err: 'Błąd masy zero',
        title: 'Błąd masy zero',
        items: ['LoremIpsum1']
    },
    GReferenceErr: {
        err: 'Za duża różnica masy wzorca',
        title: 'Za duża różnica masy wzorca',
        items: ['LoremIpsum2']
    },
    GErrEmpty: {
        err: 'Nieoczekiwany brak filtra',
        title: 'Nieoczekiwany brak filtra',
        items: ['LoremIpsum3']
    },
    GStatMd: {
        err: 'Błąd otwartych drzwiczek',
        title: 'Drzwiczki otwarte',
        items: [],
        info: 'Zamknij drzwiczki.'
    }

};

export default function Main(props) {
    const classes = useStyles();
    const [filter, setFilter] = useState('');
    const [robotStatus, setRobotStatus] = useState('');
    const [robotError, setRobotError] = useState('');
    const [lastTemp, setLastTemp] = useState(undefined);
    const [temp, setTemp] = useState(undefined);
    const [lastHumidity, setLastHumidity] = useState(undefined);
    const [humidity, setHumidity] = useState(undefined);
    const [lastPressure, setLastPressure] = useState(undefined);
    const [pressure, setPressure] = useState(undefined);
    const [backgroundStatus, setBackgroundStatus] = useState(undefined);
    const [errors, setErrors] = useState(0);
    const [list, setList] = useState([]);
    const step = 0.01
    const send = () => {
        // console.log('ccccc')
        props.socketAct.close();
    };

    //check THB every 5 sec
    useEffect(() => {
        if (props.stat.THB && !lastTemp) {
            setTemp(props.stat.THB.Temperature);
            setHumidity(props.stat.THB.Humidity);
            setPressure(props.stat.THB.Pressure);
        }
        const thb = () => {
            setLastTemp(temp);
            setLastHumidity(humidity);
            setLastPressure(pressure);
            // console.log(lastTemp, temp)
            if (props.stat.THB) {
                setTemp(props.stat.THB.Temperature);
                setHumidity(props.stat.THB.Humidity);
                setPressure(props.stat.THB.Pressure);
            }

        };
        // setTimeout(thb, 5000);
        // return () => {
        //     // console.log('ccccc')
        // }

    }, [props.stat])
    useEffect(() => {
        setFilter(filterType[props.stat.Filter_Type]);
        setRobotStatus(robotStat[props.stat.Robot_Status]);
        setRobotError(robotErr[props.stat.Main_Error]);
        let errorsH = 0;
        let err = []
        if (props.stat && props.stat.Main_Error) {
            for (let elem in props.stat.Main_Error) {
                // console.log(elem)
                errorsH += props.stat.Main_Error[elem]
                if (props.stat.Main_Error[elem] && errorsDetails[elem]) err.push(errorsDetails[elem])
            }
            setErrors(errorsH)
            setList(err)
            props.setErrorList(err)
            console.log(list)
            console.log('errors', errors)
            for (let elem in props.stat.Main_Error) {
                // console.log(elem)
                if (props.stat.Main_Error[elem]) {
                    setBackgroundStatus('#ff5b5b');
                    props.setBackgroundColor('#ff5b5b')
                    break
                } else {

                    setBackgroundStatus(undefined)
                    props.setBackgroundColor(undefined)
                }
            }
        }
    }, [props.stat])
    useEffect(() => {
        props.setDetails({})
        props.setActiveRow(2)

        return (() => {
            props.setDetails({})
            props.setActiveRow(2)
        })
    }, []);
    const {Time} = props.stat
    const sendReset = () => {
        console.log('reset')
        props.socketAct.send(JSON.stringify({"RBT_CMD": "RESET"}))
    }


    // console.log(Time)
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>

                {props.stat.Main_Error && errors > 0 &&<Alert
                    title={'Błąd'}
                    // list={['Filtry są na swoich miejscach', 'Drzwiczki są zamknięte', 'Brak obiektów trzecich w komorze', 'Wyłącznik awaryjny jest wyciśnięty']}
                    list={list}
                    click={sendReset}
                    errors={errors}
                    doors={props.stat.Main_Error.GStatMd}
                />}
                <Grid item xs={12} md={3} xl={3}>
                    <Paper className={classes.paper} style={{height: 400}}>

                        <h2 style={{fontSize: '2em'}}>FILTR:</h2>
                        <div style={{margin:'20px 0 0 0'}}>
                            <p style={{fontSize: '2em', margin: 0, paddingTop: 10, borderTop: '1px dotted'}}>Numer filtra: </p>
                            <p style={{fontSize: '2em', margin: 0}}><b>{props.stat && props.stat.Qr > 0 ? props.stat.Qr : '--'}</b></p>
                        </div>
                        <div >

                            <p style={{fontSize: '2em', margin: 0, paddingTop: 10, borderTop: '1px dotted'}}>Masa filtra: </p>
                            <p style={{fontSize: '2em', margin: 0}}><b>{props.stat && props.stat.Mass > 0 ? props.stat.Mass : '--'}</b></p>
                        </div>
                        <div >

                            <p style={{fontSize: '2em', margin: 0, paddingTop: 10, borderTop: '1px dotted'}}>Położenie: </p>
                            <p style={{fontSize: '2em', margin: 0, borderBottom: '1px dotted'}}><b>{props.stat && props.stat.FilterInfo ? props.stat.FilterInfo : '--'}</b></p>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={9} xl={9}>
                    <Paper className={classes.paper} style={{height: 400, overflow: "auto"}}>
                        <h2 style={{fontSize: '2em'}}>AKTUALNE ZLECENIA:</h2>
                        <Orders
                            data={props.stat.OrdersInProgress}
                        />
                    </Paper>
                </Grid>


                <Grid item xs={12} md={3} xl={3}>
                    <Paper className={classes.paper} style={{height: 400}}>
                        <h2 className={'tit'}>WARUNKI ŚRODOWISKOWE:</h2>
                        <div style={{display: "flex", borderTop: '1px dotted', margin:'20px 0 0 0'}}>
                            <div style={{width: '90%', fontSize: '2em'}}>
                                <p className={'t1'}>Temperatura: <b>{temp} °C</b></p>
                            </div>
                            <div className={'arrow'} transform="translate 1s">
                                {temp <=21 && temp >= 19 && <img src={okArrow} width={50}/>}
                                {temp >21 && <img src={hiArrow} width={50}/>}
                                {temp<19 && <img src={lowArrow} width={50}/>}
                            </div>
                        </div>
                        <div style={{display: "flex", borderTop: '1px dotted'}}>
                            <div style={{width: '90%', fontSize: '2em'}}>
                                <p className={'t1'}>Wilgotność: <b>{humidity} %</b></p>
                            </div>
                            <div className={'arrow'} >
                                {humidity <=50 && humidity >= 45 && <img src={okArrow} width={50}/>}
                                {humidity > 50 && <img src={hiArrow} width={50}/>}
                                {humidity < step && <img src={lowArrow} width={50}/>}
                            </div>
                        </div>
                        <div style={{display: "flex", borderTop: '1px dotted', borderBottom: '1px dotted'}}>
                            <div style={{width: '90%', fontSize: '2em'}}>

                                <p className={'t1'}>Ciśnienie: <b>{pressure} hPa</b></p>
                            </div>
                            <div className={'arrow'}  onClick={send}>


                                <img src={okArrow} width={50}/>


                            </div>

                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={9} xl={6}>
                    {/*<Paper className={props.stat.Main_Error ? 'errorDiv' : classes.paper}*/}
                    <Paper className={classes.paper}
                           style={{minHeight: 400, color: 'rgba(0, 0, 0, 0.54)'}}>
                        <Chart
                            stat={props.stat}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3} xl={3}>
                    <Paper className={classes.paper} style={{height: 400}}>
                        <div style={{display: "flex"}}>

                            <img src={clock} width={50}/>

                        </div>

                        <h2 className={'time'}>
                            <DatePanel
                                time={props.stat}
                            />
                        </h2>


                        {/*<p style={{fontSize: '1.2em'}}><b>Start zlecenia:</b> {Time && Time.Start_Time}</p>*/}
                        {/*<h3>{Time && Time.Start_Time_Description}</h3>*/}
                    </Paper>
                </Grid>
                {/*<Grid item xs={12} xl={6}>*/}
                {/*    /!*<Paper className={props.stat.Main_Error ? 'errorDiv' : classes.paper}*!/*/}
                {/*    <Paper className={classes.paper}*/}
                {/*           style={{minHeight: 400, color: 'rgba(0, 0, 0, 0.54)'}}>*/}
                {/*        <h1>Nazwa zlecenia: {props.stat && props.stat.Order_Name}</h1>*/}
                {/*        <h2>Opis: </h2><p>{props.stat && props.stat.Order_Desc}</p>*/}
                {/*        <img src={cos} width={48}/>*/}
                {/*    </Paper>*/}
                {/*</Grid>*/}
            </Grid>
        </div>
    );
}