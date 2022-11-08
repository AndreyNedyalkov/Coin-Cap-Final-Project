import React from "react";
import "./DesktopBlueBar.css"
import Loader from "../../../../components/Loader/LoaderComponent";


export default function DesktopBlueBarLoader() {

    return (
        <div className="Desktop-blue-bar-container">
            <div className="Desktop-blue-bar-half">
                <div className="Desktop-blue-bar-item">
                    <h5>MARKET CAP</h5>
                    <h2><Loader  sizing={25} /></h2>
                </div>
                <div className="Desktop-blue-bar-item">
                    <h5>EXCHANGE VOL</h5>
                    <h2><Loader  sizing={25} /></h2>
                </div>
                <div className="Desktop-blue-bar-item">
                    <h5>ASSETS</h5>
                    <h2><Loader  sizing={25} /></h2>
                </div>
            </div>
            <div className="Desktop-blue-bar-half">
                <div className="Desktop-blue-bar-item">
                    <h5>EXCHANGES</h5>
                    <h2><Loader  sizing={25} /></h2>
                </div>
                <div className="Desktop-blue-bar-item">
                    <h5>MARKETS</h5>
                    <h2><Loader  sizing={25} /></h2>
                </div>
                <div className="Desktop-blue-bar-item">
                    <h5>BTC DOM INDEX</h5>
                    <h2><Loader  sizing={25} /></h2>
                </div>
            </div>
        </div>
    )
}


