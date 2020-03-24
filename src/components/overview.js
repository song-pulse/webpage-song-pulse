import React, {useState, useEffect} from "react"
import Entry from "./entry"
import axios from "axios"

function Overview() {
  const [res, setRes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("http://localhost:8080/simulations")
        .then(function(response) {
          console.log(response.data)
          setRes(response.data);
        })
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  })

  return res ? (<>
    {res.map(sim => <Entry key={sim.id} data={sim}/>)}
    </>) : ""
}

export default Overview