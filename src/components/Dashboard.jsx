import React, { useState } from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    Row,
    Col,
    Button,
    FormGroup,
    Input,
    Label,
    Table,
    Alert
} from "reactstrap";
import { FaTachometerAlt } from "react-icons/fa";
import { generaDatiSimulati } from "../data/simulator";

export default function Dashboard() {
    const [stagioneOpen, setStagioneOpen] = useState(false);
    const [terrenoOpen, setTerrenoOpen] = useState(false);
    const [varietaOpen, setVarietaOpen] = useState(false);
    const [potaturaOpen, setPotaturaOpen] = useState(false);

    const [stagione, setStagione] = useState("Stagione");
    const [terreno, setTerreno] = useState("Terreno");
    const [varieta, setVarieta] = useState("Varietà di Olivo");
    const [potatura, setPotatura] = useState("Tipo di Potatura");

    const [xylellaChecked, setXylellaChecked] = useState(false);
    const [metratura, setMetratura] = useState("");
    const [simulationResult, setSimulationResult] = useState(null);
    const [error, setError] = useState("");

    const toggleStagione = () => setStagioneOpen(!stagioneOpen);
    const toggleTerreno = () => setTerrenoOpen(!terrenoOpen);
    const toggleVarieta = () => setVarietaOpen(!varietaOpen);
    const togglePotatura = () => setPotaturaOpen(!potaturaOpen);

    const resetValues = () => {
        setStagione("Stagione");
        setTerreno("Terreno");
        setVarieta("Varietà di Olivo");
        setPotatura("Tipo di Potatura");
        setXylellaChecked(false);
        setMetratura("");
        setSimulationResult(null);
        setError("");
    };

    const handleSimulate = () => {
        const metraturaValue = parseInt(metratura);

        if (
            stagione === "Stagione" ||
            terreno === "Terreno" ||
            varieta === "Varietà di Olivo" ||
            potatura === "Tipo di Potatura" ||
            !metratura ||
            metraturaValue < 6
        ) {
            setError("Compila tutti i campi (Xylella è facoltativo) e inserisci una metratura minima di 6 mq.");
            setSimulationResult(null);
            return;
        }

        setError("");
        const numeroOlivi = Math.floor(metraturaValue / 6);
        const result = generaDatiSimulati(stagione, terreno, varieta, potatura, xylellaChecked, metraturaValue, numeroOlivi);
        setSimulationResult({ ...result, numeroOlivi });
    };

    return (
        <Container className="py-4">
            <Row className="mb-4">
                <Col xs="auto" className="dashboard-header">
                    <FaTachometerAlt className="dashboard-icon" />
                    <h1 className="dashboard-title">Dashboard</h1>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col xs="12" md="6" lg="2" className="dropdown-container">
                    <Dropdown isOpen={stagioneOpen} toggle={toggleStagione} className="mt-2 w-100">
                        <DropdownToggle caret className="w-100">
                            {stagione}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => setStagione("Inverno")}>Inverno</DropdownItem>
                            <DropdownItem onClick={() => setStagione("Primavera")}>Primavera</DropdownItem>
                            <DropdownItem onClick={() => setStagione("Estate")}>Estate</DropdownItem>
                            <DropdownItem onClick={() => setStagione("Autunno")}>Autunno</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Col>

                <Col xs="12" md="6" lg="3" className="dropdown-container">
                    <Dropdown isOpen={terrenoOpen} toggle={toggleTerreno} className="mt-2 w-100">
                        <DropdownToggle caret className="w-100">
                            {terreno}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => setTerreno("Pietrosa")}>Pietrosa</DropdownItem>
                            <DropdownItem onClick={() => setTerreno("Argillosa")}>Argillosa</DropdownItem>
                            <DropdownItem onClick={() => setTerreno("Fertile/profonda")}>Fertile/profonda</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Col>

                <Col xs="12" md="6" lg="3" className="dropdown-container">
                    <Dropdown isOpen={varietaOpen} toggle={toggleVarieta} className="mt-2 w-100">
                        <DropdownToggle caret className="w-100">
                            {varieta}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => setVarieta("Ogliarola Salentina")}>Ogliarola Salentina</DropdownItem>
                            <DropdownItem onClick={() => setVarieta("Leccino")}>Leccino</DropdownItem>
                            <DropdownItem onClick={() => setVarieta("Favolosa")}>Favolosa</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Col>

                <Col xs="12" md="6" lg="4" className="dropdown-container">
                    <Dropdown isOpen={potaturaOpen} toggle={togglePotatura} className="mt-2 w-100">
                        <DropdownToggle caret className="w-100">
                            {potatura}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => setPotatura("Rinnovamento eccessivo")}>Rinnovamento eccessivo</DropdownItem>
                            <DropdownItem onClick={() => setPotatura("Produzione tradizionale")}>Produzione tradizionale</DropdownItem>
                            <DropdownItem onClick={() => setPotatura("Produzione leggera/costante")}>Produzione leggera/costante</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xs="12" md="6" lg="2">
                    <FormGroup inline>
                        <Label for="metratura">Metratura Terreno (mq)</Label>
                        <Input
                            type="number"
                            id="metratura"
                            value={metratura}
                            onChange={(e) => setMetratura(e.target.value)}
                            required
                            min="6"
                        />
                    </FormGroup>
                </Col>
                <Col xs="12" md="6" lg="2" className="d-flex justify-content-center align-items-center">
                    <FormGroup check inline>
                        <Label check>
                            <Input
                                type="checkbox"
                                checked={xylellaChecked}
                                onChange={(e) => setXylellaChecked(e.target.checked)}
                            />
                            Xylella
                        </Label>
                    </FormGroup>
                </Col>
            </Row>


            <Row className="justify-content-center">
                <Col xs="auto" className="mt-2 d-flex gap-2">
                    <Button color="danger" onClick={resetValues}>Azzera campi</Button>
                    <Button color="success" onClick={handleSimulate}>Simula</Button>
                </Col>
            </Row>

            <hr />

            {error && (
                <Alert color="danger" className="mt-3">{error}</Alert>
            )}

            {simulationResult && (
                <div className="table-responsive">
                    <Table bordered className="mt-4 text-center">
                        <thead>
                            <tr>
                                <th className="table-header">Temperatura (°C)</th>
                                <th className="table-header">Umidità (%)</th>
                                <th className="table-header">Precipitazioni (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{simulationResult.temperatura}°</td>
                                <td>{simulationResult.umidita}%</td>
                                <td>{simulationResult.precipitazioni}%</td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th className="table-header">Numero Olivi</th>
                                <th className="table-header">Produzione (kg)</th>
                                <th className="table-header">Tempo di crescita (giorni)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{simulationResult.numeroOlivi}</td>
                                <td>{simulationResult.produzione}kg</td>
                                <td>{simulationResult.tempiCrescita}</td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th className="table-header">Efficienza del raccolto</th>
                                <th className="table-header">Uso delle risorse</th>
                                <th className="table-header">Performance finanziaria</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{simulationResult.efficienzaRaccolto}</td>
                                <td>{simulationResult.usoRisorse}</td>
                                <td>{simulationResult.performance}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )}
        </Container>
    );
}