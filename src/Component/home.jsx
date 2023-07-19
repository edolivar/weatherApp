import { useEffect, useState } from "react";
import '../App.css'
import { withRouter } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


function tempFunc(setwInfo) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        toast.error("Geolocation not supported");
    }

    async function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // const resp = await window.fetch(`http://localhost:8080/api/weatherInfo/ll/?latitude=${latitude}&longitude=${longitude}`, {
        //     method: 'GET'
        // })
        const resp = await window.fetch(`https://weatherapp-miea.onrender.com/api/weatherInfo/ll/?latitude=${latitude}&longitude=${longitude}`, {
            method: 'GET'
        })
        setwInfo(await resp.json());
    }

    function error() {
        toast.error("Unable to retrieve your location");
    }
}

function Home({ history }) {
    const [zipCode, setZip] = useState('')
    const [wInfo, setwInfo] = useState()


    async function handleSubmit(event) {
        if (zipCode.length !== 5) {
            toast.error('A zip code should be 5 numbers long.')
        }
        else if (isNaN(zipCode)) {
            toast.error('Numbers Only!')
        }
        else {
            // This WILL need to be changed eventually!*/
            // const resp = await window.fetch(`http://localhost:8080/api/weatherInfo/zipcode/?zip=${zipCode}`, {
            //     method: 'GET'
            // })
            const resp = await window.fetch(`https://weatherapp-miea.onrender.com/api/weatherInfo/zipcode/?zip=${zipCode}`, {
                method: 'GET'
            })

            setwInfo(await resp.json())
        }
    }
    return (
        <>
            {!wInfo ? <>
                <button onClick={() => { tempFunc(setwInfo) }}>Use Location Services!</button>
                <p>OR</p>
                < div > Weather In Your Zip Code!</div >
                <input type="text" value={zipCode} onChange={(event) => {
                    setZip(event.target.value)
                }} />
                <br />
                <button onClick={handleSubmit}>Submit!</button>
            </> : <>
                <button onClick={() => {
                    setwInfo('')
                    setZip('')
                    setErr('')
                }}>New Search!</button>
                <h1>{wInfo.name}</h1>
                <h2>{wInfo.main.temp + 'F'} </h2>
            </>}
            <Toaster />
        </>
    )
}

export default withRouter(Home)