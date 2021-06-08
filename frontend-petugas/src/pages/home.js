import React from "react"
import Navbar from "../component/Navbar"
import HeroSection from "../component/HeroSection"

export default class Home extends React.Component{
    constructor(){
        super()
    }
    
    render(){
        return(
            <div>
                <Navbar/>
                <HeroSection/>
            </div>
        )
    }
}