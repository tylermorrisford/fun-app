import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import '../App.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label, ResponsiveContainer } from 'recharts';

const DataVis = () => {
  const [utahData, setUtahData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [queryState, setQueryState] = useState(`ut`);
  const [stateName, setStateName] = useState(`Utah`);

  useEffect(() => {
    const getData = () => {
      const historicalUtahJson = `https://api.covidtracking.com/v1/states/${queryState}/daily.json`;
        fetch(historicalUtahJson)
        .then(response => {
          return response.json();
        }).then(data => {
          console.log('data', data);
          const utahStats = data.reverse();
          // useState functions - can refactor the names for clarity
            setUtahData(utahStats) 
            setIsLoaded(true)
        })    
    }
    getData();
  }, [queryState])



  const formatDateString = (date) => {
    let newDate = date.substr(0, 2) + '/' + date.substr(2);
    return newDate;
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Date: ${formatDateString(label.toString().slice(4))}`}<br/>
          {`Positive Cases: ${payload[0].payload.positive.toLocaleString()}`}<br/>
          {`Increase: ${payload[0].payload.positiveIncrease}`}</p>
        </div>
      );
    }
    return null;
  };

  
  const renderLineChart = (
    <ResponsiveContainer width='80%' height={600}>
    <LineChart style={{color: 'white'}} data={utahData} margin={{ top: 15, right: 35, bottom: 35, left: 50 }}>
      <Line type="monotone" dataKey="positive" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
      <XAxis dataKey="date" tickFormatter={(label) => `${label.toString().substring(5,6)}`}>
        <Label className="white" value="Month" offset={-25} position="insideBottom"/>
      </XAxis>
      <YAxis dataKey="positive">
        <Label className="white" value="Positive Cases" angle={-90} offset={-40} position="insideLeft"/>
      </YAxis>
      <Tooltip 
      content={isLoaded ? CustomTooltip : null}
      />
    </LineChart>
    </ResponsiveContainer>
  );

    return(
        <header className="App-header">
        <Callout>The covid tracking project stopped collecting new data on March 7. <br />I'll take this opportunity to 
          find a better visualization library - more data vis coming...
        </Callout>
        {/* <h5>Positive COVID-19 cases in {stateName}</h5>
        <h6>{`Current number of patients hospitalized:
          ${utahData.length > 1 ? utahData[utahData.length -1].hospitalizedCurrently : ''}
          `}</h6>
          <div style={{display: 'flex', padding: '10px auto'}}>
          <label htmlFor="states"><Words>Choose a different state: </Words></label>
          <div style={{padding: "5px"}}>
          <Select id="states" onChange={(e) => {setQueryState(e.target.value); 
            setStateName(e.target.value.toUpperCase())}}>
            <option value="al">Alabama</option>
            <option value="ak">Alaska</option>
            <option value="az">Arizona</option>
            <option value="ar">Arkansas</option>
            <option value="ca">California</option>
            <option value="co">Colorado</option>
            <option value="ct">Connecticut</option>
            <option value="de">Delaware</option>
            <option value="fl">Florida</option>
            <option value="ga">Georgia</option>
            <option value="hi">Hawaii</option>
            <option value="id">Idaho</option>
            <option value="il">Illinois</option>
            <option value="in">Indiana</option>
            <option value="ia">Iowa</option>
            <option value="ks">Kansas</option>
            <option value="ky">Kentucky</option>
            <option value="la">Louisiana</option>
            <option value="mn">Maine</option>
            <option value="md">Maryland</option>
            <option value="ma">Massachusetts</option>
            <option value="mi">Michigan</option>
            <option value="mn">Minnesota</option>
            <option value="ms">Mississippi</option>
            <option value="mo">Missouri</option>
            <option value="mt">Montana</option>
            <option value="ne">Nebraska</option>
            <option value="nv">Nevada</option>
            <option value="nh">New Hampshire</option>
            <option value="nj">New Jersey</option>
            <option value="nm">New Mexico</option>
            <option value="ny">New York</option>
            <option value="nc">North Carolina</option>
            <option value="nd">North Dakota</option>
            <option value="oh">Ohio</option>
            <option value="ok">Oklahoma</option>
            <option value="or">Oregon</option>
            <option value="pn">Pennsylvania</option>
            <option value="ri">Rhode Island</option>
            <option value="sc">South Carolina</option>
            <option value="sd">South Dakota</option>
            <option value="tn">Tennessee</option>
            <option value="tx">Texas</option>
            <option value="ut"selected>Utah</option>
            <option value="vt">Vermont</option>
            <option value="va">Virginia</option>
            <option value="wa">Washington</option>
            <option value="wv">West Virginia</option>
            <option value="wi">Wisconsin</option>
            <option value="wy">Wyoming</option>
          </Select>
          </div>
          </div>
        {isLoaded ? renderLineChart : 'Loading...'}
        <Words>
        <em>Data fetched from covidtracking.com, which is updated daily.</em>
        </Words> */}
      </header>
    )
}

export default DataVis;

const Callout = styled.span`
margin-bottom: -20px;
font-size: 0.8em;
font-weight: 200;
`
const Words = styled.p`
font-size: 0.6em;
`
const Select = styled.select`
height: '20px'; 
width: '150px';
border: none;
color: white;
background-color: darkslategray;
`
