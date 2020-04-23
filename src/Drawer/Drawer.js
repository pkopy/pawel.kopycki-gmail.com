import React, {useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import dict from '../dictionary'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import HomeIcon from '@material-ui/icons/Home';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Carousel from "../Carousel/Carousel";
import Main from "../Main/Main";
import Date from "../Date/Date";
import kolo from '../images/kolo.svg'
import Kebab from "../Kebab/Kebab";
import DisplayRow from "../Carousel/DisplayRow";
import ScrollText from "../ScrollText/ScrollText";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function MiniDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [details, setDetails] = React.useState()
    const [rowKebab, setRowKebab] = React.useState([]);
    const [active, setActive] = React.useState(2)
    const [fakeData, setFakeData] = React.useState([])
    const [errorList, setErrorList] = React.useState([])
    const [errList, setErrList] = React.useState([])
    const [backgroundColor, setBackgroundColor] = React.useState(undefined)

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const makeFakeData = (num) => {
        const f = (i) =>{
            let arr = []
            for (let j = 0; j < 15; j++) {
                let d = {DiskIndex: i+1, FilterIndex: j+1, Status:2}

                arr.push(d)

            }
            return arr
        }
        let data =[]
        for (let i = 0; i < num; i++) {
            if (props.kebabData[18]) {

               let x =  f(i)
                data.push(x)
            }

        }
        setFakeData(data)


    }
    useEffect(() => {
        let arr = []
        console.log('arr',errorList)
        for (let elem of errorList) {
            arr.push(elem.err)
        }
        setErrList(arr)
    }, [errorList])

    useEffect(() => {
        // console.log(props.kebabData, 'kebabData')
        makeFakeData(10)
        // console.log(fakeData,'fake data')
    },[props.kebabData])
    const upRow = () => {
        let x = props.activeRow
        if (active > 2) {
            setActive(active - 1)
        } else if (x < rowKebab.length - 1) {
            // //
            // setActive(active - 1)
            props.setActiveRow(props.activeRow + 1)
            // setActive(active + 1)
        } else if (active > 0) {
            // //     props.setKebabData(props.kebabData)
            //     console.log(active)
            setActive(active - 1)
        }

        // console.log(props.activeRow)
        // console.log(activeRow)
    }
    const downRow = () => {
        if (active < 2) {
            setActive(active + 1)
        } else if (active === 2 && props.activeRow > 2) {
            props.setActiveRow(props.activeRow - 1)
        } else if (props.activeRow < 3 && active < 4) {
            // props.setActiveRow(props.activeRow - 1)
            setActive(active + 1)
        }
        // console.log(active)

        // console.log(props.activeRow)

    }
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                style={{backgroundColor:backgroundColor, zIndex:11100}}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        RB 2.4Y.F
                    </Typography>
                    {/*<Typography variant="h6" noWrap>*/}
                        <div  style={{width:500, marginLeft:100}}>

                            {errList.length>0&&<ScrollText text={errList}></ScrollText>}
                        </div>
                    {/*</Typography>*/}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <Link to='/' className='link'>
                        <ListItem button>

                            <ListItemIcon><HomeIcon color="primary"/></ListItemIcon>
                            <ListItemText/>

                        </ListItem>
                    </Link>
                    {/*<Link to='/orderlist' className='link'>*/}

                    {/*    <ListItem button>*/}

                    {/*        <ListItemIcon><FormatListBulletedIcon color="primary"/></ListItemIcon>*/}
                    {/*        <ListItemText/>*/}

                    {/*    </ListItem>*/}
                    {/*</Link>*/}

                    <Link to='/kebab' className='link'>
                        <ListItem button>

                            {/*<ListItemIcon><InboxIcon color="primary"/></ListItemIcon>*/}
                            <ListItemIcon><img src={kolo} width={30}/></ListItemIcon>
                            <ListItemText/>

                        </ListItem>
                    </Link>
                </List>

            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Switch>
                    <Route exact path='/'>
                        <Main
                            stat={props.stat}
                            socketAct={props.socketAct}
                            setBackgroundColor={setBackgroundColor}
                            setErrorList={setErrorList}
                        />
                    </Route>
                    <Route path='/orderlist'>
                        <DisplayRow number={3}></DisplayRow>
                    </Route>
                    <Route path='/kebab'>

                        <Kebab
                            details={details}
                            setDetails={setDetails}
                            kebabData={props.kebabData}
                            // kebabData={fakeData}
                            activeRow={props.activeRow}
                            setActiveRow={props.setActiveRow}
                        />
                    </Route>
                </Switch>

            </main>
        </div>
    );
}