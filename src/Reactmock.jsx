import React, { useState } from 'react'
import cm from './reactmck.module.css'
import axios from 'axios'

const Reactmock = () => {
    let [location,setLocation]=useState("")
    let [details,setDetails]=useState({
        plname:"",
        temp:0,
        humid:"",
        weather:""
    })
    let {plname,temp,humid,weather}=details
    let search=(e)=>{
        setLocation(e.target.value)
    }
    let submit=async (e)=>{
        e.preventDefault()
        let apidata=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5396dc24488bdf9745431426bbecfcda`)
        setDetails({plname:apidata.data.name,
                    temp:`${apidata.data.main.temp-273}`,
                    humid:`${apidata.data.main.humidity}%`,
                    weather:apidata.data.weather[0].main
        })
    }
  return (
    <div id={cm.main}>
        <form onSubmit={submit}>
            <input type="text" onChange={search} name='search' id={cm.bx}/>
            <input type="submit" id={cm.sub}/>
        </form>
        <div id={cm.content}>
            <article className={cm.detail}>Place : <p> {plname}</p></article>
            <article className={cm.detail}>Temperature : <p> {Math.trunc(temp)}<sup>o</sup>C</p></article>
            <article className={cm.detail}>Humidity : <p> {humid}</p></article>
            <article className={cm.detail}>Weather Condition : <p> {weather}</p></article>
        </div>
    </div>
  )
}

export default Reactmock