import React, {useEffect, useState} from 'react';
import './Carousel.scss'


export default function ListPanel(props) {
    const carousel = React.useRef();
    const figure = React.useRef();
    const [numImages] = useState(15);
    const theta = 2 * Math.PI / numImages;
    const [currImage, setCurrentImage] = useState(0);
    const [pos, setPos] = useState(0);
    const [data, setData] = useState([]);
    const clickButton = (e, increase = true) => {
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
    useEffect(() => {
        console.log(props.data)
        props.setDetails(props.data[2])
    },[]);


    return (
        <>

            <div className="carousel" ref={carousel} style={{zIndex: props.zIndex}}>
                <figure ref={figure}>
                    {props.data && props.data.map((elem, i) =>
                        <div key={i} onClick={()=>console.log(elem)}>
                            {elem.FilterIndex&&<div className={'cont'}
                                 style={{height: props.height, opacity: props.opacity, background: elem.Status === 8?'#ff5b5b':props.background, zIndex:50}}
                                 onClick={() => console.log(elem)}>

                                <p>Filter index: {elem.FilterIndex}</p>
                                {props.active&&<p>Disk Index: {elem.DiskIndex}</p>}
                                {props.active&&<p>QRCODE: {elem.QRCode}</p>}
                                {props.active&&<p>Last Mass: {elem.LastMass}</p>}
                                {props.active&&<p>Status: {elem.Status}</p>}
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


            </div>
            <div>

                {props.active&&<nav style={{position:"fixed", bottom: 0}}>
                    <button className="nav prev" onClick={(e) => clickButton(e, false)}>Prev</button>
                    <button className="nav next" onClick={clickButton}>Next</button>
                    {/*<button onClick={() => props.setDetails(props.data[currImage])}>ccccc</button>*/}
                </nav>}
            </div>
        </>
    )
}