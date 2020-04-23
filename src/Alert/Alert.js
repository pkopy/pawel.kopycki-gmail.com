import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';

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

export default function Alert(props) {
    console.log('props:', props)
    const [open, setOpen] = React.useState(false);
    const [buttonOK, setButtonOK] = React.useState(true)
    const handleClickOpen = () => {
        setOpen(true);
    };
    // console.log("props:",props)
    const handleClose = () => {
        setOpen(false);
    };
    const [checked, setChecked] = React.useState([1]);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        let checkedQty = 0;
        for (let elem of props.list) {
            checkedQty += elem.items.length
        }
        (newChecked.length === checkedQty + 1 && !props.doors) ? setButtonOK(false) : setButtonOK(true)
        setChecked(newChecked);
    };

    useEffect(() => {
        let checkedQty = 0;
        for (let elem of props.list) {
            checkedQty += elem.items.length
        }
        (checked.length === checkedQty + 1 && !props.doors) ? setButtonOK(false) : setButtonOK(true)
        // setChecked(newChecked);
    },[props.doors])
    return (
        <div className="moddal" style={{position: 'fixed', top:65}}>
            {/*<Button variant="outlined" color="primary" onClick={handleClickOpen}>*/}
            {/*    Open alert dialog*/}
            {/*</Button>*/}

            <Dialog

                open={true}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={"sm"}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"/>
                    {props.list&&props.list.length > 0 && props.list.map((elem, i) =>
                        <div key={i}>
                            {elem.title && <b style={{margin: 0}}>{elem.title}</b>}
                            {elem.items.length > 0 && <List>
                                {elem.items.map((elem, i) => {
                                    const labelId = `checkbox-list-secondary-label-${elem}}`;
                                    return (
                                        <ListItem key={i}>
                                            <ListItemText id={labelId} primary={elem}/>
                                            <ListItemSecondaryAction>
                                                <Checkbox
                                                    edge="end"
                                                    onChange={handleToggle(elem)}
                                                    checked={checked.indexOf(elem) !== -1}
                                                    inputProps={{'aria-labelledby': labelId}}
                                                />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                })}
                            </List>}
                            {elem.items.length === 0 && <List>
                                <ListItemText  primary={elem.info} style={{paddingLeft:20, color:'red'}}>

                                </ListItemText>
                            </List>}
                            {/*<p style={{}}>{elem.info}</p>*/}
                        </div>
                    )}


                </DialogContent>
                <DialogActions>
                    {/*<Button onClick={handleClose} color="primary">*/}
                    {/*    Disagree*/}
                    {/*</Button>*/}
                    {props.list.length > 0  &&
                    <Button style={{margin: 20}} onClick={props.click} variant="contained" color="primary"
                            disabled={buttonOK}>
                        URUCHOM PROCES
                    </Button>}
                    {/*{props.errors >= 0 &&*/}
                    {/*<Button style={{margin: 20}} onClick={handleClose} variant="contained" color="primary"*/}
                    {/*        disabled={buttonOK}>*/}
                    {/*    DALEJ*/}
                    {/*</Button>}*/}
                    <p></p>
                </DialogActions>
            </Dialog>
        </div>
    )
}