import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import '../App.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label, ResponsiveContainer } from 'recharts';



const DataVis = () => {
  const [utahData, setUtahData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [dataLength, setDataLength] = useState(0)

  useEffect(() => {
    getData();
  }, [])


  const getData = () => {
    const historicalUtahJson = 'https://api.covidtracking.com/v1/states/ut/daily.json';
      fetch(historicalUtahJson)
      .then(response => {
        return response.json();
      }).then(data => {
        console.log('data', data);
        const utahStats = data.reverse();
        // useState
          setUtahData(utahStats) 
          setIsLoaded(true)
          setDataLength(utahStats.length)
      })    
  }

  const len = dataLength - 1;
  console.log('this is len: ', len);
  

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Date: ${label.toString().slice(4)}`}<br/>
          {`Positive Cases: ${payload[0].payload.positive}`}<br/>
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
        <Callout>{" "}</Callout>
        <h4>Positive COVID-19 cases in Utah</h4>
        {`Current number of patients hospitalized:
          ${len > 1 ? utahData[len].hospitalizedCurrently : ''}
         `}
        {isLoaded ? renderLineChart : 'Loading...'}
        <Words>
          First positive case was recorded on March 7.<br/>
        <em>Data fetched from covidtracking.com, which is updated daily.</em>
        </Words>
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