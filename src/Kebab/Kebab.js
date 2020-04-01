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
    useEffect(() => {
        if (props.kebabData) {
            // console.log(props.kebabData)
            let keys = Object.keys(props.kebabData);
            // let data =
            // if (keys.length === 6) {
            if (props.activeRow + 3 > keys.length -1) {
                // setActive(1)
                // setSix(true)
                // props.setActiveRow(props.activeRow + 1)
                setRowKebab(keys.slice(keys.length - 5, keys.length).reverse())
            } else {
                // setSix(false)
                setRowKebab(keys.slice(props.activeRow - 2, 3 + props.activeRow).reverse())
            }
            // } else if (keys.length === 1) {
            //     setActive(1)
            // }
            // console.log(keys)
        }
    }, [props.kebabData, props.activeRow])


    // console.log('render')
    const upRow = () => {
        let x = props.activeRow
        // console.log(carousel)
        setChange(!change)
        carousel.current.style.height='red'
        if (active > 2) {
            setActive(active - 1)
        } else if (x < rowKebab.length - 1 ) {

                // if (six) {
                //
                //     props.setActiveRow(props.activeRow + 2)
                //     setActive(active - 1)
                // } else {

                    props.setActiveRow(props.activeRow + 1)
                // }

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
        setChange(!change)
        if (active < 2) {
            setActive(active + 1)
        } else if (active === 2 && props.activeRow > 2) {
            // if (six) {
            //
            //     props.setActiveRow(props.activeRow - 2)
            //     setActive(active + 1)
            // } else {
            //
                props.setActiveRow(props.activeRow - 1)
            // }
        } else if (props.activeRow < 3 && active < 4) {
            // props.setActiveRow(props.activeRow - 1)
            setActive(active + 1)
        }
        // console.log(active)

        // console.log(props.activeRow)

    }

    return (
        <div>
        <div className="contener">
            <div
                style={{width:850, height:100, background:'#6BB336', marginLeft:"auto", marginRight:"auto",
                    border:"3px solid #535A80", borderRadius:'50%', position:'relative', top:70
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
                    return (
                        <div key={ind} >
                            {ind === active && <Carousel
                                data={newData}

                                setCarousel={setCarousel}
                                height={200}
                                opacity={0.95}
                                background={'#5972FF'}
                                zIndex={2}
                                active={true}
                                setDetails={props.setDetails}
                                change={change}
                                test={<DisplayRow number={newData[0].DiskIndex}/>}
                            >

                                {/*<p>{newData[0].DiskIndex}</p>*/}
                            </Carousel>}
                            {ind !== active && <Carousel
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
                            {/*<div style={{height:5}}> </div>*/}
                        </div>

                    )
                }
            )}
            <div style={{width:850, height:100, background:'#6BB336', marginLeft:"auto", marginRight:"auto", border:"3px solid #535A80", borderRadius:'50%', position:'relative', top:-70, zIndex:-10}}/>

        </div>
            <div style={{width:200,marginLeft:"auto", marginRight:"auto", position:"relative",}}>
                <div style={{width:100}} onClick={upRow}>
                    <img src={kolo} width='100px' style={{transform:'rotate(180deg)'}}/>
                </div>
                <div style={{width:100, position:"absolute", right:0, top:0}} onClick={downRow}>
                    <img src={kolo} width='100px'/>
                </div>
            </div>
            {/*<button onClick={upRow}>UP</button>*/}
            {/*<button onClick={downRow}>DOWN</button>*/}
            <p>active = {props.activeRow}</p>
        </div>
    )
}