import React from "react";
import {Line} from "react-chartjs-2"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Possession from "../../../models/possessions/Possession";
import Flux from "../../../models/possessions/Flux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./chart.css"


import{
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend

} from "chart.js"

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

function MyChart(){
    const [possessions, setPossessions] = useState([]);
    const [data, setData] = useState(null);
    

    useEffect(() => {
        axios.get('http://localhost:3500/possession')
            .then((response) => {
                const data = response.data.data;
                console.log(data) 
                setData(data);
                if (data && data[1] && Array.isArray(data[1].data.possessions)) {
                    instancing(data[1].data.possessions);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function instancing(possessionsData) {
        const newPossessions = possessionsData.map((oneData) => {
            if (oneData.libelle === "Alternance" || oneData.libelle === "Survie") {
                return new Flux(
                    oneData.possesseur.nom,
                    oneData.libelle,
                    oneData.valeur,
                    new Date(oneData.dateDebut),
                    oneData.dateFin,
                    oneData.tauxAmortissement || "0",
                    oneData.jour,
                    oneData.valeurConstante
                );
            }
            return new Possession(
                oneData.possesseur.nom,
                oneData.libelle,
                oneData.valeur,
                new Date(oneData.dateDebut),
                oneData.dateFin,
                oneData.tauxAmortissement || 0
            );
        });
        setPossessions(newPossessions);
    }

    

    const options = {}

    const chartData = {
        labels:[
            "Day 1",
            "Day 2",
            "Day 3",
            "Day 4",
            "Day 5",
            "Day 6"
        ],

        datasets: [
            {
                label: "Valeurs calculées",
                data: [
                    10,
                    20,
                    5,
                    9,
                    40,
                    30
                ],
                borderColor: "rgb(182, 135, 35)"
            }
        ]
    }
    

    return(
        <>
        <div className="mainContainer">
            <div className="leftContainer">
                <h1>VOTRE PATRIMOINE</h1>
                <p className="explanation">Veuillez nous fournir la date de début et la date de fin afin de calculer la valeur de votre Patrimoine </p>
                <div class="input-group mb-3 oneInput">
                    <span class="input-group-text" id="inputGroup-sizing-default">Date début</span>
                    <input type="date" className="form-control " aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"></input>
                </div>
                <div class="input-group mb-3 oneInput">
                    <span class="input-group-text" id="inputGroup-sizing-default">Date fin</span>
                    <input type="date" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"></input>
                </div>

                <select class="form-select form-select-sm selectDay" aria-label="Small select example">
                    <option selected>Jour</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>

                <input class="btn btn-primary bouton" type="submit" value="Valider"></input>
            </div>
        


        <div className="container">
        <Line options={options} data={chartData}/>
        </div>
        </div>
     
        
        </>
        
    )
}

export default MyChart;