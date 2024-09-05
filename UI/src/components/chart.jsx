import React from "react";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
import Possession from "../../../models/possessions/Possession";
import Flux from "../../../models/possessions/Flux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./chart.css";
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function MyChart() {
    const [possessions, setPossessions] = useState([]);
    const [months, setMonths] = useState([]);
    const [values, setValues] = useState([]);
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [day, setDay] = useState(1); // Valeur par défaut pour le jour

    useEffect(() => {
        axios.get('http://localhost:3500/possession')
            .then((response) => {
                const data = response.data.data;
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
                    new Date(oneData.dateFin),
                    oneData.tauxAmortissement || 0,
                    oneData.jour,
                    oneData.valeurConstante
                );
            }
            return new Possession(
                oneData.possesseur.nom,
                oneData.libelle,
                oneData.valeur,
                new Date(oneData.dateDebut),
                new Date(oneData.dateFin),
                oneData.tauxAmortissement || 0
            );
        });
        setPossessions(newPossessions);
    }

    function datePickerDebut(e) {
        setDateDebut(e.target.value);
    }

    function datePickerFin(e) {
        setDateFin(e.target.value);
    }

    function dayPicker(e){
        setDay(e.target.value);
    }

    function getMonthsInRange(startDate, endDate) {
        const monthsArray = [];
        const current = new Date(startDate);

        while (current <= endDate) {
            const month = current.toLocaleString('default', { month: 'short' });
            const year = current.getFullYear();
            monthsArray.push(`${month} ${year}`);
            current.setMonth(current.getMonth() + 1);
        }

        return monthsArray;
    }

    function calculateValueForMonth(possession, start, end, day) {
        if (possession.dateFin < start || possession.dateDebut > end) {
            return 0;
        }
        
        const adjustedEnd = new Date(end);
        adjustedEnd.setDate(day);
        if (adjustedEnd > end) {
            adjustedEnd.setMonth(adjustedEnd.getMonth() + 1);
            adjustedEnd.setDate(0);
        }

        if (possession instanceof Flux) {
            return possession.getValeur(adjustedEnd);
        } else {
            return possession.getValeurApresAmortissement(adjustedEnd);
        }
    }

    function getValuePerMonth() {
        const valuePermonth = axios.get('http://localhost:3500/patrimoine/range')

        return valuePermonth;
    }

    const options = {};

    const chartData = {
        labels: months,
        datasets: [
            {
                label: "Valeurs calculées",
                data: values,
                borderColor: "rgb(182, 135, 35)"
            }
        ]
    };

    function ShowOption(){
        for(let i = 1; i<= 31; i++){
            return (
                <option value={i}>{i}</option>
            )
        }
    }
    

    return (
        <>
            <div className="mainContainer">
                <div className="leftContainer">
                    <h1>VOTRE PATRIMOINE</h1>
                    <p className="explanation">Veuillez nous fournir la date de début et la date de fin afin de calculer la valeur de votre Patrimoine </p>
                    <div className="input-group mb-3 oneInput">
                        <span className="input-group-text">Date début</span>
                        <input type="date" className="form-control" onChange={datePickerDebut} />
                    </div>
                    <div className="input-group mb-3 oneInput">
                        <span className="input-group-text">Date fin</span>
                        <input type="date" className="form-control" onChange={datePickerFin} />
                    </div>

                    <select className="form-select form-select-sm selectDay" onChange={(e) => setDay(Number(e.target.value))}>
                        
                            
                            

                    </select>

                    <input className="btn btn-primary bouton" type="button" value="Valider" onClick={getValuePerMonth} />
                </div>

                <div className="container">
                    <Line options={options} data={chartData} />
                </div>
            </div>
        </>
    );
}

export default MyChart;
