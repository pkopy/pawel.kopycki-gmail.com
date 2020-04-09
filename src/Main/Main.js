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
        title: 'Wciśnięty wyłącznik awaryjny, upewnij się że',
        items: [
            'Filtry są na swoich miejscach',
            'Brak obiektów trzecich w komorze',
            'Wyłącznik awaryjny jest wyciśnięty'
        ]
    },
    GErrFull: {
        title: 'Nieoczekiwana obecność filtra',
        items: ['Usuń filtr z ramienia podejnika']
    },

    GMassErr: {
        title: 'Błąd masy zero',
        items: ['LoremIpsum1']
    },
    GReferenceErr: {
        title: 'Za duża różnica masy wzorca',
        items: ['LoremIpsum2']
    },
    GErrEmpty: {
        title: 'Nieoczekiwany brak filtra',
        items: ['LoremIpsum3']
    },
    GStatMd: {
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
        setTimeout(thb, 5000);
        return () => {
            // console.log('ccccc')
        }

    }, [props.stat])
    useEffect(() => {
        setFilter(filterType[props.stat.Filter_Type]);
        setRobotStatus(robotStat[props.stat.Robot_Status]);
        setRobotError(robotErr[props.stat.Main_Error]);
        let errors = 0;
        let err = []
        if (props.stat && props.stat.Main_Error) {
            for (let elem in props.stat.Main_Error) {
                // console.log(elem)
                errors += props.stat.Main_Error[elem]
                if (props.stat.Main_Error[elem] && errorsDetails[elem]) err.push(errorsDetails[elem])
            }
            setErrors(errors)
            setList(err)
            // console.log('errors', err)
            for (let elem in props.stat.Main_Error) {
                // console.log(elem)
                if (props.stat.Main_Error[elem]) {
                    setBackgroundStatus('#ff5b5b');
                    break
                } else {

                    setBackgroundStatus(undefined)
                }
            }
        }
    }, [props.stat])
    // useEffect(() => {
    //     setRobotStatus(robotStat[props.stat.Robot_Status])
    // }, [props.stat.Robot_Status]);
    const {Time} = props.stat
    const sendReset = () => {
        props.socketAct.send(JSON.stringify({"RBT_CMD": "RESET"}))
    }
    // console.log(Time)
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>

                {/*<Grid item xs={12} sm={6}>*/}
                {/*    <Paper className={classes.paper}>xs=12 sm=9</Paper>*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12} sm={6}>*/}
                {/*    <Paper className={classes.paper}>xs=12 sm=9</Paper>*/}
                {/*</Grid>*/}
                <Grid item xs={12} md={6} xl={3}>
                    <Paper className={classes.paper}
                           style={{height: 400, backgroundColor: backgroundStatus}}>
                        {/*backgroundImage:props.stat.Main_Error?'linear-gradient(141deg, #b33838 0%, #db1f4a 51%, #f32727 75%':undefined*/}
                        <h2 style={{fontSize: '2em'}}>STATUS:</h2>
                        {/*<h3>Rodzaj filtra:</h3>*/}
                        <h3>{filter}</h3>
                        {/*<h3>{robotStatus}</h3>*/}
                        {backgroundStatus && <h3>Błąd: </h3>}
                        {props.stat.Main_Error && props.stat.Main_Error.GStatErr !== 0 &&
                        <p>Błąd ogólny sterownika </p>}
                        {props.stat.Main_Error && props.stat.Main_Error.GStatMd !== 0 &&
                        <p>Błąd otwartych drzwiczek </p>}
                        {props.stat.Main_Error && props.stat.Main_Error.GMassErr !== 0 &&
                        <p>Błąd masy zero</p>}
                        {props.stat.Main_Error && props.stat.Main_Error.GReferenceErr !== 0 &&
                        <p>Za duża różnica masy wzorca</p>}
                        {props.stat.Main_Error && props.stat.Main_Error.GErrFull !== 0 &&
                        <p>Nieoczekiwana obecność filtra</p>}
                        {props.stat.Main_Error && props.stat.Main_Error.GErrEmpty !== 0 &&
                        <p>Nieoczekiwany brak filtra</p>}

                        {props.stat.Main_Error && errors.length > 0 && <Alert
                            title={'Błąd'}
                            // list={['Filtry są na swoich miejscach', 'Drzwiczki są zamknięte', 'Brak obiektów trzecich w komorze', 'Wyłącznik awaryjny jest wyciśnięty']}
                            list={list}
                            click={sendReset}
                            errors={errors}
                            doors={props.stat.Main_Error.GStatMd}
                        />}

                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                    <Paper className={classes.paper} style={{height: 400}}>

                        <h2 style={{fontSize: '2em'}}>FILTR:</h2>
                        <p style={{fontSize: '1.5em'}}>Numer
                            sączka: {props.stat && props.stat.Qr > 0 ? props.stat.Qr : '--'}</p>
                        <p style={{fontSize: '1.5em'}}>Masa
                            sączka: {props.stat && props.stat.Mass > 0 ? props.stat.Mass : '--'}</p>
                        <p style={{fontSize: '1.5em'}}>Położenie: {props.stat && props.stat.FilterInfo ? props.stat.FilterInfo : '--'}</p>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                    <Paper className={classes.paper} style={{height: 400, overflow: "auto"}}>
                        <h2 style={{fontSize: '2em'}}>AKTUALNE ZLECENIA:</h2>
                        <Orders
                            data={props.stat.OrdersInProgress}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} xl={3}>
                    <Paper className={classes.paper} style={{height: 400}}>
                        <div style={{display: "flex"}}>

                            <img src={clock} width={50}/>

                        </div>

                            <h2 style={{fontSize: "3em", textAlign:"center"}}>
                                <DatePanel
                                    time={props.stat}
                                />
                            </h2>


                        {/*<p style={{fontSize: '1.2em'}}><b>Start zlecenia:</b> {Time && Time.Start_Time}</p>*/}
                        {/*<h3>{Time && Time.Start_Time_Description}</h3>*/}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3} xl={3}>
                    <Paper className={classes.paper} style={{height: 400}}>
                        <h2 style={{fontSize: '2em'}}>THB STATUS:</h2>
                        <div style={{display: "flex"}}>
                            <div style={{width: '80%', fontSize: '1.5em'}}>
                                <p>Temperatura: <b>{temp} °C</b></p>
                            </div>
                            <div style={{padding: '5px 50px'}} transform="translate 1s">
                                {lastTemp - temp < step && lastTemp - temp > -step && <img src={okArrow} width={50}/>}
                                {lastTemp - temp < -step && <img src={hiArrow} width={50}/>}
                                {lastTemp - temp > step && <img src={lowArrow} width={50}/>}
                            </div>
                        </div>
                        <div style={{display: "flex"}}>
                            <div style={{width: '80%', fontSize: '1.5em'}}>
                                <p>Wilgotność: <b>{humidity} %</b></p>
                            </div>
                            <div style={{padding: '5px 50px'}}>
                                {lastHumidity - humidity < step && lastHumidity - humidity > -step &&
                                <img src={okArrow} width={50}/>}
                                {lastHumidity - humidity < -step && <img src={hiArrow} width={50}/>}
                                {lastHumidity - humidity > step && <img src={lowArrow} width={50}/>}
                            </div>
                        </div>
                        <div style={{display: "flex"}}>
                            <div style={{width: '80%', fontSize: '1.5em'}}>

                                <p>Ciśnienie: <b>{pressure} hPa</b></p>
                            </div>
                            <div style={{padding: '5px 50px'}} onClick={send}>

                                {lastPressure - pressure < step && lastPressure - pressure > -step &&
                                <img src={okArrow} width={50}/>}
                                {lastPressure - pressure < -step && <img src={hiArrow} width={50}/>}
                                {lastPressure - pressure > step && <img src={lowArrow} width={50}/>}

                            </div>

                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={9} xl={6}>
                    {/*<Paper className={props.stat.Main_Error ? 'errorDiv' : classes.paper}*/}
                    <Paper className={classes.paper}
                           style={{minHeight: 400, color: 'rgba(0, 0, 0, 0.54)'}}>
                        {/*<h1>Nazwa zlecenia: {props.stat && props.stat.Order_Name}</h1>*/}
                        {/*<h2>Opis: </h2><p>{props.stat && props.stat.Order_Desc}</p>*/}
                        {/*<img src={cos} width={48}/>*/}
                        <Chart
                            stat={props.stat}
                        />
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