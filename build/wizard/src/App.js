import React from 'react';
import "./css/style.sass";
import axios from "axios";


function App() {


    const [authToken, setAuthToken] = React.useState(true);

    React.useEffect(() => {

        axios.get("./auth-token.txt").then((res) => {
            setAuthToken(res.data);
        })
    }, []);

    return (
        <div className="App">
            <section className="hero is-default is-bold">

                <div className="hero-body">
                    <div className="container has-text-centered ">
                        <div className="columns is-vcentered">
                            <div className="column  is-6 is-offset-1">
                                <h1 className="title has-text-white is-2">
                                    Prysm Gnosis Validator
                                </h1>
                                <br />
                                <img src="https://ipfs.io/ipfs/QmVAqwNGshv5eNQTbS33XhB9vvBrEZFrNAWCD95vsJE2yh" alt="Gnosis logo"/>
                                <h2 className="subtitle  has-text-white is-4">
                                    Disclaimer
                                </h2>


                                <p className="has-text-centered has-text-white">
                                    The AVADO Hardware has to run 24/7. If it is not properly connected to electricity or your
                                    router and therefore the internet, it will not work. While unlikely, potential hardware
                                    failures may result in slashing.<br />
                                </p><br />
                                <p className="has-text-centered has-text-white">

                                    I am using AVADO on my own behalf and my own risk, and I accept that software and hardware
                                    bugs may result in me being slashed.
                                </p>
                                <br />
                                <br />

                                <p className="has-text-centered">
                                    <a className="button is-medium is-link" target="_blank"
                                        href={`http://prysm-gnosis-validator.my.ava.do/initialize?token=${authToken}`}>I agree - Open the Prysm web
                                        dashboard</a>

                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}

export default App;
