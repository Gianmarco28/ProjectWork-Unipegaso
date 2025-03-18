export function generaDatiSimulati(stagione, terreno, varieta, potatura, xylellaChecked, metratura) {
    const ranges = {
        Inverno: { temperatura: [5, 15], umidita: [70, 90], precipitazioni: [80, 100] },
        Primavera: { temperatura: [15, 25], umidita: [50, 70], precipitazioni: [40, 65] },
        Estate: { temperatura: [25, 35], umidita: [20, 40], precipitazioni: [10, 30] },
        Autunno: { temperatura: [10, 20], umidita: [60, 80], precipitazioni: [60, 80] },
    };

    const resaTerreno = { "Pietrosa": 0.7, "Argillosa": 1.0, "Fertile/profonda": 1.3 };
    const resaVarieta = { "Ogliarola Salentina": 0.7, "Leccino": 1.0, "Favolosa": 1.3 };
    const resaPotatura = { "Rinnovamento eccessivo": 0.7, "Produzione tradizionale": 1.0, "Produzione leggera/costante": 1.3 };

    const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const dati = ranges[stagione];
    const temperatura = getRandom(...dati.temperatura);
    const umidita = getRandom(...dati.umidita);
    const precipitazioni = getRandom(...dati.precipitazioni);

    let numeroOlivi = Math.floor(metratura / 6);
    

    if (metratura > 500) numeroOlivi *= 0.5;
    if (metratura > 1000) numeroOlivi *= 0.4;
    numeroOlivi = Math.max(1, Math.floor(numeroOlivi));

    const condizioneClimatica = ((temperatura - 10) * 0.4 + (umidita - 50) * 0.3 + (100 - precipitazioni) * 0.3) / 100;

    let produzione = numeroOlivi * resaTerreno[terreno] * resaVarieta[varieta] * resaPotatura[potatura] * (1 + condizioneClimatica);
    

    const bonusProduzione = metratura > 500 ? 1.8 : metratura > 1000 ? 2.5 : 1.0;
    produzione *= bonusProduzione;


    let resaPerUlivoBonus = 1.0;
    if (metratura > 500) resaPerUlivoBonus = 1.7;
    if (metratura > 1000) resaPerUlivoBonus = 2.2;
    produzione *= resaPerUlivoBonus;

    if (xylellaChecked && stagione === "Estate") {
        if (varieta === "Ogliarola Salentina") {
            produzione *= 0.5;
        } else if (varieta === "Leccino") {
            produzione *= 0.7;
        } else if (varieta === "Favolosa") {
            produzione *= 0.9;
        }
    }

    produzione = Math.max(produzione, 20).toFixed(2);

    const crescitaBase = 120;
    const riduzioneCrescita = ((temperatura > 20 ? 5 : 0) + (umidita < 60 ? 5 : 0) + (precipitazioni < 50 ? 5 : 0));
    let tempiCrescita = Math.max(crescitaBase - riduzioneCrescita, 60);
    
    if (metratura > 500) tempiCrescita -= 15;
    if (metratura > 1000) tempiCrescita -= 30;

    const mediaProduzione = produzione / numeroOlivi;
    

    const efficienzaRaccolto = mediaProduzione > 9 ? "Alta" : mediaProduzione > 6 ? "Media" : "Bassa";

    const usoRisorse = tempiCrescita <= 90 ? "Bassa" : tempiCrescita <= 110 ? "Media" : "Alta";

    let costoMetratura = metratura * 2;
    if (metratura > 500) costoMetratura *= 0.8;
    if (metratura > 1000) costoMetratura *= 0.6;

    const performanceFinanziaria = (produzione * 5) - costoMetratura;
    const performance = performanceFinanziaria > 500 ? "Alta" : performanceFinanziaria > 200 ? "Media" : "Bassa";

    return {
        temperatura,
        umidita,
        precipitazioni,
        produzione,
        tempiCrescita,
        numeroOlivi,
        efficienzaRaccolto,
        usoRisorse,
        performance
    };
}