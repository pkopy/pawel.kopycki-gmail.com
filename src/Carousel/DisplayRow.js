import React, {useEffect, useState} from 'react';

export default function (props) {
    const [height, setHeight] = useState(-220)
    const [prevNumber, setPrevNumber] = useState()
    const [number, setNumber] = useState(props.number)
    const [vis, setVis] = useState('hidden')
    const [opa, setOpa] = useState(1)
    useEffect(() => {
        console.log(props)
        setVis('hidden')
        setTimeout(() => {
            // if (prevNumber<number) {
            //     setHeight(220)
            // }else{

            setHeight(-220)

            // }
            // setHeight(-220)
        }, 200)

        // // setHeight(-200)
        setTimeout(() => {
            setVis('visible')
            setPrevNumber(number)
            setNumber(props.number)

            setHeight(-30)
        }, 400)

        // setHeight(0)
        // // setTimeout(() => {
        // // //
        // //     setHeight(0)
        // // }, 500)
        // setPrevNumber(props.number)
        // if (prevNumber<props.number) {
        //     setHeight(200)
        // } else {
        //     setHeight(-200)
        //     setHeight(0)
        // }
        // console.log(prevNumber, props.number)
        // return () => {
        //     setHeight(0)
        // }
    }, [props.number])
    // useEffect(() =>{
    //     setTimeout(() => {
    //
    //         setOpa(0)
    //     },1000)
    //     setTimeout(() => {
    //
    //         setOpa(1)
    //     },1500)
    //
    // },[])

    return (
        <div>

            {/*<button onClick={() => setOpa(0)}>iiii</button>*/}
            <div style={{
                fontSize: '15em', position: "absolute", left: 10, overflow: 'hidden',

                // border: '1px solid',
                width: 250,
                height: 200
            }}>
                <div style={{textShadow: '2px 2px 5px #999aa5', top: height, opacity: opa, position: 'absolute', transition: '.2s', visibility: vis}}>
                    {number}
                    {props.children}
                    {/*{prevNumber}*/}
                </div>

                {/*<button style={{ position: 'absolute'}}onClick={setNum}>JJJJJ</button>*/}
            </div>
        </div>
    )


}