import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import '../App.css';
import { Line } from 'react-chartjs-2';


const DataVis = () => {
  const [casesData, setCasesData] = useState([]);
  const [currentTotalCases, setCurrentTotalCases] = useState(0);
  const [vaccineData, setVaccineData] = useState([]);
  const [vaccineDates, setVaccineDates] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(()=> {
      const vaccineDataUrl = `https://disease.sh/v3/covid-19/vaccine/coverage/countries/USA?lastdays=all`
      fetch(vaccineDataUrl)
      .then(response => {
        return response.json();
      }).then(data => {
        console.log('data', data.timeline);
        setVaccineDates(Object.keys(data.timeline));
        setVaccineData(Object.values(data.timeline));
        setIsLoaded(true);
      })
  }, [])

  useEffect(() => {
    const getData = () => {
      // nyt endpoint returns cases and deaths since the beginning of pandemic
      const nytCasesUSA = `https://disease.sh/v3/covid-19/nyt/usa`;
        fetch(nytCasesUSA)
        .then(response => {
          return response.json();
        }).then(data => {
          // filter entries before 12/1/20
          const isMyIndex = element => element.date === "2020-12-01";
          let theIndex = data.findIndex(isMyIndex)
          let filteredData = data.filter( el => data.indexOf(el) > (theIndex - 1))
          console.log('filtered?', filteredData);
          const dash = /-/i;
          const reformatTheDates = (el) => {
            el.date = el.date.slice(5).concat("/", el.date.substring(2,4)).replace(dash, "/")
          }
          filteredData.forEach(el => reformatTheDates(el))
            setCasesData(filteredData.map(el => el.cases));
            console.log('last element?', filteredData[filteredData.length - 1]); 
            setCurrentTotalCases(filteredData[filteredData.length - 1].cases); 
        })    
    }
    getData();
  }, [])

  const chartData = {
    labels: vaccineDates,
    datasets: [
      {
        label: '# of Shots',
        data: vaccineData,
        fill: false,
        backgroundColor: 'rgb(190, 68, 58)',
        borderColor: 'rgba(190, 68, 58, 1)',
      }
      ,
      {
        label: '# Positive Cases',
        data: casesData,
        fill: false,
        backgroundColor: 'rgb(81, 89, 255)',
        borderColor: 'rgba(81, 89, 255, 1)',
      }
    ],
  }


    return(
        <header className="App-header">
        <h5>Positive COVID-19 cases in the US: {currentTotalCases !== 0 ? currentTotalCases.toLocaleString() : 'fetching...'}</h5>
        <Callout>Vaccines Administered vs. Positive Cases (USA) </Callout>
        <Container>
            {!isLoaded ? '' :
              <Line 
              height={600}
              width={1000}
              data={chartData} 
              options={{ maintainAspectRatio: false }}
              />
            } 
        </Container>    
        <Words>
        <em>Data fetched from <Link href="https://covid.ourworldindata.org/"> https://covid.ourworldindata.org/</Link>.</em>
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
const Container = styled.div`
margin: 25px;
padding; 0 15px;
`
const Words = styled.p`
font-size: 0.6em;
color: 'white';
`
const Link = styled.a`
color: white;
`
