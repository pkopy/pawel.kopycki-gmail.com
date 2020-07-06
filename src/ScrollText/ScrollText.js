import React, {useEffect, useState} from "react";
import './ScrollText.scss'

export default function SrollText(props) {
    const [text, setText] = useState('')
    const [opa, setOpa] = useState(1)
    const [fontSize, setFontSize] = useState('1.3em')
    useEffect(() => {

        // while (props.text.length === 0) {
        //     console.log('ooo')
        // }

        let arr = props.text
        if (props.fontSize) setFontSize(props.fontSize)
        let x = 0
        setText(arr[x])
        setOpa(1)
        setTimeout(() => {
            setOpa(0)
        }, 3000)
        const timer = setInterval(() => {
            x++
            console.log('interval')
            setOpa(1)

            if (x >= arr.length) {
                x = 0
            }
            setText(arr[x])
            setTimeout(() => {
                setOpa(0)
            },  3000)

        },  5000)

        return (() => {
            clearInterval(timer)
        })
    }, [])
    return (
        // <div style={{height:20, overflow: "hidden", width: "100%", display: "flex"}}>
        //
        //
        //
        //     <div className="text">
        //
        //         <p><b>{props.text.toUpperCase()}</b></p>
        //
        //
        //     </div>
        // </div>
        // <div className="banner">
        //     <div className="ground">
        //         <div><p><b>{props.text.toUpperCase()}</b></p></div>
        //         <div><p><b>{props.text.toUpperCase()}</b></p></div>
        //         <div><p><b>{props.text.toUpperCase()}</b></p></div>
        //         <div><p><b>{props.text.toUpperCase()}</b></p></div>
        //
        //     </div>
        //
        // </div>
        <div className={props.className} style={{opacity: opa, transition: '2s', fontSize: props.fontSize}}>
            {!props.small && text && text.length > 0 && <p><b>{text.toUpperCase()}</b></p>}
            {props.small && text && text.length > 0 && <p><b>{text}</b></p>}
        </div>
    )
}
