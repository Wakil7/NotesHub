import React from "react"

function Logo({width = "100%", height="100%", src=""}){
    return (
        <img src={src} alt="" />
    )
}

export default Logo;