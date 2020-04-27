import React, {useEffect, useState} from 'react';
import './Carousel.scss'
import kolo from '../images/arrow.svg'
import DisplayRow from "./DisplayRow";

export default function ListPanel(props) {
    const carousel = React.useRef();
    const figure = React.useRef();
    const [numImages] = useState(15);
    const theta = 2 * Math.PI / numImages;
    const [currImage, setCurrentImage] = useState(0);
    const [pos, setPos] = useState(0);
    const [data, setData] = useState(30);
    const clickButton = (e, increase = true) => {
        // console.log(e)
        let x = currImage;
        let y = pos;
        increase ? ++x: --x;
        increase ? ++y: --y;
        setPos(y);
        if (x > 14) x = 0;
        if (x < 0) x = 14;
        setCurrentImage(x);
        figure.current.style.transform = `rotateY(${y * -theta}rad)`;
        props.setDetails(props.data[x]);

    };
    const details = () => {
        // console.log(props.data[currImage])
    };
    // useEffect(() => {
    //     let y = 0
    //     const timer = setInterval(() => {
    //
    //         y += 10
    //         if (y >= 200) clearInterval(timer)
    //         console.log(y)
    //         figure.current.style.height = y
    //     }, 100)
    //
    // });
    useEffect(() =>{
        props.setCarousel(figure)
        // props.setDetails(props.data[props.activeRow])
    },[props.active])
    // useEffect(() =>{
    //
    //     setTimeout(() => {
    //         props.setDetails(props.data[props.activeRow])
    //         }, 3000
    //
    //     )
    // },[])
    return (
        <>
            {props.children}
            <div className="carousel" ref={carousel} style={{zIndex: props.zIndex}}>
                <div >
                    {props.test}
                </div>
                {/*{props.active&&<div style={{position:"absolute", left:1150}}>*/}
                {/*    <DisplayRow number={currImage + 1}/>*/}
                {/*</div>}*/}
                <figure ref={figure}>
                    {props.data && props.data.map((elem, i) =>
                        <div key={i} onClick={()=>setData(200)} style={{margin:2}}>
                            {elem.FilterIndex&&<div className={'cont'}
                                 style={{padding:5,height: props.height, opacity: props.opacity, background: elem.Status === 8?'#ff5b5b':props.background, zIndex:50, color: props.active?'#fff':'#535A80',transition: '.5s'}}
                                 onClick={() => console.log(elem)}>

                                {<p>Disk Index: {elem.DiskIndex}</p>}
                                {props.active&&<p>Filter index: {elem.FilterIndex}</p>}
                                {props.active&&<p>QRCODE: {elem.QRCode}</p>}
                                {props.active&&<p>Last Mass: {elem.LastMass}</p>}
                                {props.active&&<p>Status: {elem.Status}</p>}
                                {/*<p style={{position:"fixed", bottom: 0}}>{elem.DiskIndex}</p>*/}

                            </div>}
                            {!elem.FilterIndex&&<div className={'cont'}
                                                   style={{height: props.height, opacity: props.opacity, background: '#d2d2d2', zIndex:50}}
                                                   onClick={() => console.log(elem)}>

                                {/*<p>Filter index: {elem.FilterIndex}</p>*/}
                                {/*<p>Disk Index: {elem.DiskIndex}</p>*/}
                                {/*<p>QRCODE: {elem.QRCode}</p>*/}
                                {/*<p>Last Mass: {elem.LastMass}</p>*/}
                                {/*<p>Status: {elem.Status}</p>*/}
                            </div>}

                        </div>
                    )}

                </figure>


                    {/*<button className="nav prev" onClick={(e) => clickButton(e, false)}>Prev</button>*/}
                    {/*<button className="nav next" onClick={clickButton}>Next</button>*/}



            </div>
            {/*{props.data&&props.active&&<DisplayRow number={props.data[0].DiskIndex} change={props.change}/>}*/}

                {/*{props.data&&props.active&&<div style={{position:"fixed", bottom: 200, left:350, fontSize:'4em', fontWeight:'bold'}}>*/}
                {/*    {props.data[0].DiskIndex}/{currImage}*/}
                {/*</div>}*/}

            {props.active&&<div style={{position:"fixed", bottom:250, height:100, width:'100%', zIndex:10}}>
                <div style={{width:1050,marginLeft:"auto", marginRight:"auto", position:"relative",}}>
                    {props.active&&<div style={{width:100}} onClick={clickButton}>
                        <img src={kolo} width='100px' style={{transform:'rotate(90deg)'}}/>
                    </div>}
                    {props.active &&<div style={{width:100, position:"absolute", right:0, top:0}} onClick={(e) => clickButton(e, false)}>
                        <img src={kolo} width='100px'style={{transform:'rotate(-90deg)'}}/>
                    </div>}
                </div>

            </div>}

                {/*{props.active&&<nav style={{position:"absolute"}}>*/}
                {/*    <div style={{transform:'rotate(90deg)'}} onClick={clickButton}>*/}
                {/*        <img src={kolo} width='100px'/>*/}
                {/*    </div>*/}
                {/*    /!*<button className="nav prev" onClick={(e) => clickButton(e, false)}>Prev</button>*!/*/}
                {/*    /!*<button className="nav next" onClick={clickButton}>Next</button>*!/*/}

                {/*</nav>}*/}

        </>
    )
}