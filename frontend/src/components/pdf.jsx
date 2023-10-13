import React from "react";

export default function PDF(props) {

    return (
        <div style={{height:'100%'}}>
            <iframe
                title={`math${props.pdfname}`}
                src={`/course/math/${props.pdfname}.pdf`}
                height="100%"
                width="100%"
            ></iframe>
        </div>
    )
}