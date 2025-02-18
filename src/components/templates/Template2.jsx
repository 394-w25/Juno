import React, { useState } from "react";

function Template2({logo, title, subtitle, date, time}) {
    return(
        <div>
            {logo && <img src={logo} alt="logo" className=""/>}
            <h1 className="text-2xl"> {title} </h1>
            <p> {subtitle} </p>
            <p> {date} | {time} </p>
            </div>
    )
}

export default Template2;