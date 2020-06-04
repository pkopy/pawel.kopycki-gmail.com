import React, {useEffect, useState} from 'react';
import Carousel from "../Carousel/Carousel";
import kolo from '../images/arrow.svg'
import DisplayRow from "../Carousel/DisplayRow";

export default function Kebab(props) {
    const [rowKebab, setRowKebab] = React.useState([]);
    const [active, setActive] = React.useState(2);
    // const [six, setSix]= useState(false)
    const [carousel, setCarousel] = useState({})
    const [change, setChange] = useState(false)
    const [init, setInit] = useState(true)
    useEffect(() => {
        console.log('kebab', props.kebabData)
        if (props.kebabData) {
            // console.log(props.kebabData)
            let keys = Object.keys(props.kebabData);
            // setRowKebab(keys.slice(0,5).reverse());

            if (init && props.kebabData.length > 0) {
                let x = props.kebabData
                if (props.kebabData.length < 5) {
                    for (let i = 0; i < 6 - (props.kebabData.length-2); i++) {

                        x.push([{}])
                    }
                    setActive(4)
                    props.setActiveRow(0)
                }
                let keys = Object.keys(x);
                console.log(x, 'down')
                setRowKebab(keys.slice(0, 5).reverse());
                setInit(false)
            }
            if (props.activeRow > 4) {
                // setRowKebab(keys.slice().reverse());
            }
            // let data =
            // if (keys.length === 6) {
            // if (props.activeRow + 3 > keys.length -1) {
            //     // setActive(1)
            //     // setSix(true)
            //     // props.setActiveRow(props.activeRow + 1)
            //     setRowKebab(keys.slice(keys.length - 5, keys.length).reverse())
            //     console.log(keys.slice(keys.length - 5, keys.length).reverse(), 'row')
            // } else {
            //     // setSix(false)
            //     setRowKebab(keys.slice(props.activeRow - 2, 3 + props.activeRow).reverse())
            //     console.log(keys.slice(props.activeRow - 2, 3 + props.activeRow).reverse(), 'row')
            // }
            // } else if (keys.length === 1) {
            //     setActive(1)
            // }
            // console.log(keys)
        }
    }, [props.kebabData])


    // console.log('render')
    const upRow = () => {
        let x = props.activeRow
        console.log(active, change, props.activeRow, 'down up')
        // console.log(carousel)

        carousel.current.style.height = 'red'
        if (active > 0) {
            setActive(active - 1)
            props.setActiveRow(props.activeRow + 1)
        }
        if (active === 0 && props.activeRow < props.kebabData.length - 1) {
            // setChange(!change)
            let keys = Object.keys(props.kebabData);
            setRowKebab(keys.slice(props.activeRow - 3, props.activeRow + 2).reverse());
            props.setActiveRow(props.activeRow + 1)
            setActive(0)
            console.log(rowKebab, 'up')
        }

    }
    const downRow = () => {
        console.log(props.details, 'det')
        setChange(!change)
        console.log(active, change, props.activeRow, props.kebabData.length, 'down')
        if (active < rowKebab.length - 1) {
            setActive(active + 1)
            props.activeRow === props.kebabData.length - 1 ? props.setActiveRow(props.activeRow - 1) : props.setActiveRow(props.activeRow - 1)
        }
        if (props.activeRow === props.kebabData.length - 1) {
            props.setActiveRow(props.activeRow - 1)
        }
        if (active === 4 && props.activeRow > 0) {
            // setChange(!change)
            let keys = Object.keys(props.kebabData);
            console.log((keys.slice(props.activeRow - 1, props.activeRow + 4).reverse()), 'down key')
            setRowKebab(keys.slice(props.activeRow - 1, props.activeRow + 4).reverse());
            props.setActiveRow(props.activeRow - 1)
            setActive(4)
            console.log(rowKebab, 'down')
        }
        // if (active === props.kebabData.length - 3) {
        //     props.setActiveRow(0)
        // }
        // if (active < 2) {
        //     setActive(active + 1)
        //     // props.setActiveRow(props.activeRow - 1)
        // } else if (active === 2 && props.activeRow >2) {
        //     // if (six) {
        //     //
        //     //     props.setActiveRow(props.activeRow - 2)
        //     //     setActive(active + 1)
        //     // } else {
        //     //
        //         props.setActiveRow(props.activeRow - 1)
        //     // }
        // } else if (props.activeRow < 3 && active < 4) {
        //     // props.setActiveRow(props.activeRow - 1)
        //     setActive(active + 1)
        // }
        // console.log(active)

        // console.log(props.activeRow)
        // console.log(active, change, props.activeRow, 'down =')
    }
    // useEffect(() =>{
    //     props.setDetails([props.activeRow])
    // },[props.stat])
    return (
        <div>
            {props.kebabData && props.kebabData.length > 0 && <div className="contener">
                <div
                    style={{
                        width: 850, height: 100, background: '#c4d6b7', marginLeft: "auto", marginRight: "auto",
                        border: "3px solid #535A80", borderRadius: '50%', position: 'relative', top: 70
                    }}

                />


                {rowKebab && rowKebab.map((elem, ind) => {
                        let newData = []
                        // console.log(elem)

                        for (let i = 0; i < 15; i++) {
                            if (props.kebabData[elem] && props.kebabData[elem][i]) {
                                // console.log(props.data[i])
                                newData.push(props.kebabData[elem][i])
                            } else {
                                newData.push({})
                            }
                        }
                        // console.log(newData, 'new')
                        // props.setDetails(newData[props.activeRow])
                        return (
                            <div key={ind}>
                                {ind === active && <Carousel
                                    data={newData}

                                    setCarousel={setCarousel}
                                    height={200}
                                    opacity={0.95}
                                    background={'#5972FF'}
                                    zIndex={2}
                                    active={true}
                                    activeRow={props.activeRow}
                                    setDetails={props.setDetails}
                                    change={change}
                                    // test={<DisplayRow number={newData[0].DiskIndex}/>}
                                >

                                    {/*<p>{newData[0].DiskIndex}</p>*/}
                                </Carousel>}
                                {ind !== active && (newData[0].DiskIndex) % 2 === 0 && <Carousel
                                    data={newData}
                                    // opacity={0.8}
                                    // setHeight={setHeight}
                                    change={change}
                                    setCarousel={setCarousel}
                                    background={'#A6B3FF'}
                                    active={false}
                                    zIndex={ind > active ? -ind : ind}
                                    setDetails={props.setDetails}
                                />}
                                {ind !== active && (newData[0].DiskIndex) % 2 !== 0 && <Carousel
                                    data={newData}
                                    // opacity={0.8}
                                    // setHeight={setHeight}
                                    change={change}
                                    setCarousel={setCarousel}
                                    background={'#91a0f7'}
                                    active={false}
                                    zIndex={ind > active ? -ind : ind}
                                    setDetails={props.setDetails}
                                />}
                                {/*<div style={{height:5}}> </div>*/}
                            </div>

                        )
                    }
                )}
                <div style={{
                    width: 850,
                    height: 100,
                    background: '#c4d6b7',
                    marginLeft: "auto",
                    marginRight: "auto",
                    border: "3px solid #535A80",
                    borderRadius: '50%',
                    position: 'relative',
                    top: -70,
                    zIndex: -10
                }}/>

            </div>}
            {rowKebab && rowKebab.length > 0 &&
            <div style={{width: 200, marginLeft: "auto", marginRight: "auto", position: "relative",}}>
                <div style={{width: 100}} onClick={upRow}>
                    <img src={kolo} width='100px' style={{transform: 'rotate(180deg)'}}/>
                </div>
                <div style={{width: 100, position: "absolute", right: 0, top: 0}} onClick={downRow}>
                    <img src={kolo} width='100px'/>
                </div>
            </div>}
            {rowKebab && rowKebab.length > 0 && <div style={{height: 250, position: "absolute", top: 100}}>
                <b style={{fontSize:'1.8em'}}>POZIOM:</b>
                {props.activeRow >= 0 && <DisplayRow number={props.activeRow + 1}/>}
            </div>}
            {rowKebab && rowKebab.length > 0 && <div style={{height: 250, position: "absolute", top: 100, right: 200,}}>
                <b style={{fontSize:'1.8em'}}>POZYCJA:</b>
                {props.details && props.details.FilterIndex ? <DisplayRow number={props.details.FilterIndex}/>:<DisplayRow number={1}/>}
                {/*{!props.details && <DisplayRow number={1}/>}*/}
            </div>}
            {/*<div style={{width: 250, height: 350, border: '1px solid', position:'absolute', top: 350}}>*/}
            {/*    {props.details && <p>Filtr: {props.details.FilterIndex}</p>}*/}
            {/*    {props.details && <p>Poziom: {props.details.DiskIndex}</p>}*/}
            {/*</div>*/}
            {/*<button onClick={upRow}>UP</button>*/}
            {/*<button onClick={downRow}>DOWN</button>*/}
            {/*<p>active ROW= {props.activeRow}</p>*/}
            {/*<p>active={active}</p>*/}
            {/*<p>length = {props.kebabData.length}</p>*/}
        </div>
    )
}