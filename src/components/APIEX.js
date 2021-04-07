import React from 'react';
import styled from 'styled-components'
import '../App.css';

const key = process.env.REACT_APP_WEATHER_API_KEY;
const url = `https://api.openweathermap.org/data/2.5/weather?id=5780993&units=Imperial&appid=${key}`;
var dayjs = require('dayjs');

class APIEX extends React.Component{
   constructor(){
     super()
     this.state={
       ready: false,
       location: '',
       locationData: {},
       temp: null,
       sunrise: null, // translate UTC to date format
       sunset: null,
       description: null,
       name: null,
       country: null
     }
   }

   
   componentDidMount(){
     console.log("I know... ohhh wwwwooooooowwwww, a weather api app.... ammaaazzzzing! I know. \n\n I know.");
    fetch(url)
    .then(response => {
      return response.json();
    }).then(data => {
      console.log('success! data: ', data);
      this.setState({
        ready: true,
        locationdata: data,
        temp: data.main.temp,
        feels: data.main.feels_like,
        description: data.weather[0].description,
        name: data.name,
        location: '',
        country: data.sys.country,
        sunrise: data.sys.sunrise * 1000,
        sunset: data.sys.sunset * 1000
      })
    })
  }

  render(){

    const handleSubmit = (e) => {
      console.log(e)
      e.preventDefault();
      this.setState({
        location: e.target.value
      })
      if (this.state.location === ''){alert('Please enter a city or location name')}
      else {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&units=Imperial&appid=${key}`;
      fetch(url)
      .then(response => {
        return response.json();
      }).catch( (error) => {
        console.log(error);
      })
      .then(data => { // add if statement to catch data.cod === '404' and return a message 'city not found'
        console.log('data', data);
        this.setState({
          ready: true,
          locationdata: data,
          temp: data.main.temp,
          feels: data.main.feels_like,
          description: data.weather[0].description,
          name: data.name,
          location: '',
          country: data.sys.country,
          sunrise: data.sys.sunrise * 1000,
          sunset: data.sys.sunset * 1000
        })
      })
    }
  }
    
    const handleChange = (e) => {
      this.setState({
        location: e.target.value
      }) 
    }

    return(
        <header className="App-header">
        <Brand>API example</Brand>
        <Callout>Check current weather</Callout>
        <Callout>a.k.a. "Can I go outside?</Callout>
        <form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Enter your location" onChange={handleChange} value={this.state.location || ''}/><br/>
          <Button type="submit" name="submit">Get Weather &rarr;</Button>
          {this.state.name ? <h4><em>for  {this.state.name}, {this.state.country}</em></h4> : null}
          {this.state.temp ? <h5>Current Temp: {this.state.temp}˚F <br /> Feels like: {this.state.feels}˚F</h5> : null}
          {this.state.description ? <h6>Conditions: {this.state.description}</h6> : null}
          {this.state.sunrise ? <h6>Sunrise: {dayjs(this.state.sunrise).format(`h:mm A`)}  /  Sunset: {dayjs(this.state.sunset).format(`h:mm A`)}</h6> : null}
        </form>
      </header>
    )
  }
  
}

export default APIEX;


// styled components
const Callout = styled.span`
  margin-bottom: 5px;
  font-size: 0.8em;
  font-weight: 200;
`

const Brand = styled.h3`
  margin-top: 2px;
`
const Input = styled.input`
  border: 1px solid white;
  height: 25px;
  background-color: #282c34;
  width: 150px;
  margin-bottom: 15px;
  color: white;
  padding: 0 auto;
    :focus{
      border: 2px solid #494A5F;
    }
  `
const Button = styled.button`
  height: 40px;
  margin: 10px;
  border-radius: 4px;
  background-color: #282c34;
  color: white;
  border: 2px solid #494A5F;

`