import React,{useState,useEffect} from 'react'
import { Button } from 'react-bootstrap';
import './tracker-style.css';
import axios from "axios";
function Tracker() {

    const [active, setactive] = useState(0)
    const [confirmed, setconfirmed] = useState(0)
    const [deceased, setdeceased] = useState(0)
    const [recovered, setrecovered] = useState(0)
    const [updatetime,setupdatetime] = useState(0)
    const [stateinfo,setstateinfo] = useState([])

    useEffect(()=>{
        axios.get('http://data.covid19india.org/data.json',{
            headers: {
            "Access-Control-Allow-Origin"  :  "*"
          }      
        }).then((response)=>{
             console.log(response.data.statewise);
             setactive(response.data.statewise[0].active);
             setconfirmed(response.data.statewise[0].confirmed);
             setdeceased(response.data.statewise[0].deaths);
             setrecovered(response.data.statewise[0].recovered);
             setupdatetime(response.data.statewise[0].lastupdatedtime);
             setstateinfo(response.data.statewise);
          });
     },[]);
    
    // const getCovidData = async () => {
    //      const res = await fetch('https://api.covid19india.org/data.json');
    //      const actualData = await res.json();
    //      console.log(actualData);
    // }

    // useEffect(() => {
    //     getCovidData();
    // },[]);


    return (
       <div className="back">
           <form>
                <div className="header">Covid 19 Tracker INDIA</div>
                <div className="searchbar-outerdiv">
                    <p>Search your district or state</p>
                    <div className="form-group has-search">
                        <span className="fa fa-search form-control-feedback"></span>
                        <input type="text" className="form-control search" placeholder="Search"/>
                    </div>
                </div>
                <div className="lastupdate"><h6>Last Updated : {updatetime}</h6></div>
                <div className="display-all">
                    <div className="confirmed">
                        <p>Confirmed</p>
                        <p> + 3598 </p>
                        <h4> {confirmed}</h4>
                    </div>
                    <div className="active">
                        <p>Active</p>
                        <p> +21 </p>
                        <h4> {active} </h4>
                    </div>
                    <div className="recovered">
                        <p>Recovered</p>
                        <p> +1,076</p>
                        <h4> {recovered} </h4>
                    </div>
                    <div className="deceased">
                        <p>Deceased</p>
                        <p> +66</p>
                        <h4> {deceased}</h4>
                    </div>
                </div>
                <div className="container class-container">
                     <table class="table">
                        <thead>
                            <tr>
                            <th style={{'width':'25%'}}>State/UT</th>
                            <th>Confirmed</th>
                            <th>Active</th>
                            <th>Recovered</th>
                            <th>Deceased</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                stateinfo.map(statewiseinfo =>{
                                        return(<><tr className="statename">
                                            <td>{statewiseinfo.state}</td>
                                            <td>{statewiseinfo.confirmed}</td>
                                            <td>{statewiseinfo.active}</td>
                                            <td>{statewiseinfo.recovered}</td>
                                            <td>{statewiseinfo.deaths}</td>
                                            </tr></>
                                )})
                            }
                        </tbody>
                        </table>
                    </div>            
            </form>
       </div>
    )
}

export default Tracker;
