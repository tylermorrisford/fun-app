import React from 'react';
import styled from 'styled-components'
import '../App.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const Callout = styled.span`
margin-bottom: 0;
font-size: 0.8em;
font-weight: 200;
`

const Brand = styled.h3`
margin-top: 2px;
`
const historicalUtahJson = 'https://covidtracking.com/api/v1/states/ut/daily.json';

const DataVis = () => {
  const data = [{name: '3/7', positive: 1}, {name: '3/14', positive: 6}, {name: '3/21', positive: 136}, {name: '3/28', positive: 602}, {name: 'April 4', positive: 1428}, {name: '4/11', positive: 2206}, {name: '4/18', positive: 2931}, {name: '4/24', positive: 3782}];

  const renderLineChart = (
    <LineChart styee={{color: 'white'}} width={800} height={500} data={data} margin={{ top: 15, right: 20, bottom: 5, left: 20 }}>
      <Line type="monotone" dataKey="positive" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis dataKey="positive" ticks={[0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000]}/>
      <Tooltip />
    </LineChart>
  );
    return(
        <header className="App-header">
        <Callout>this is</Callout>
        <Brand>DataVis</Brand>
        <br/>
        <h4>Positive Covid-19 cases in Utah</h4>
        {renderLineChart}
      </header>
    )
}

export default DataVis;