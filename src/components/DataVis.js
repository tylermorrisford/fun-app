import React from 'react';
import styled from 'styled-components'
import '../App.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label, ResponsiveContainer } from 'recharts';



class DataVis extends React.Component{
  constructor(){
    super()
    this.state = {
      utahData: [],
      isLoaded: false,
      dataLength: 0
    }
  }
  
  
  componentDidMount() {
    const historicalUtahJson = 'https://covidtracking.com/api/v1/states/ut/daily.json';
      fetch(historicalUtahJson)
      .then(response => {
        return response.json();
      }).then(data => {
        console.log('data', data);
        const utahStats = data.reverse();
        this.setState({
          utahData: utahStats, 
          isLoaded: true,
          dataLength: utahStats.length
        })
      })    
  }

  render() {

  const len = this.state.dataLength - 1

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
    <LineChart style={{color: 'white'}} data={this.state.utahData} margin={{ top: 15, right: 35, bottom: 35, left: 50 }}>
      <Line type="monotone" dataKey="positive" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
      <XAxis dataKey="date" tickFormatter={(label) => `${label.toString().substring(5,6)}`}>
        <Label className="white" value="Month" offset={-25} position="insideBottom"/>
      </XAxis>
      <YAxis dataKey="positive">
        <Label className="white" value="Positive Cases" angle={-90} offset={-40} position="insideLeft"/>
      </YAxis>
      <Tooltip 
      content={this.state.isLoaded ? CustomTooltip : null}
      />
    </LineChart>
    </ResponsiveContainer>
  );
    return(
        <header className="App-header">
        <Callout>{" "}</Callout>
        <h4>Positive Covid-19 cases in Utah</h4>
        {`Current number of patients hospitalized:
          ${this.state.isLoaded ? this.state.utahData[len].hospitalizedCurrently : ''}
         `}
        {this.state.isLoaded ? renderLineChart : 'Loading...'}
        <Words>
          First positive case was recorded on March 7.<br/>
        <em>Data fetched from covidtracking.com, which is updated daily.</em>
        </Words>
      </header>
    )
}
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
