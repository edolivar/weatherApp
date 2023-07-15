import { useEffect, useState } from "react";
import '../App.css'
import { withRouter } from 'react-router-dom';


function Home({ history }) {
    const [zipCode, setZip] = useState('')
    const [wInfo, setwInfo] = useState()
    async function handleSubmit(event) {
        if (zipCode.length !== 5) {
            throw new Error('A zip code should be 5 numbers long.')
        }
        else if (isNaN(zipCode)) {
            throw new Error('Numbers Only!')
        }
        else {
            /* This WILL need to be changed eventually!*/
            // const resp = await window.fetch(`http://localhost:8080/api/weatherInfo/?zip=${zipCode}`, {
            //     method: 'GET'
            // })
            const resp = await window.fetch(`https://weatherapp-miea.onrender.com/api/weatherInfo/?zip=${zipCode}`, {
                method: 'GET'
            })

            setwInfo(await resp.json())
        }
    }
    return (
        <>
            {!wInfo ? <>
                < div > Weather In Your Zip Code!</div >
                <form action=""></form>
                <input type="text" value={zipCode} onChange={(event) => {
                    setZip(event.target.value)
                }} />
                <br />
                <button onClick={handleSubmit}>Submit!</button>
            </> : <>
                <h1>{wInfo.name}</h1>
                <h2>{wInfo.main.temp + 'F'} </h2>
            </>}
        </>
    )
}

export default withRouter(Home)