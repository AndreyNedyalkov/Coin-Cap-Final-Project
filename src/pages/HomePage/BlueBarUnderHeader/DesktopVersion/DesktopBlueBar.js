import React from "react";
import "./DesktopBlueBar.css"

export default function DesktopBlueBar({ marketCap, exchangeVol, assets, exchanges, markets, btcDomIndex }) {

    return (
        <div className="Desktop-blue-bar-container">
            <div className="Desktop-blue-bar-half">
                <div className="Desktop-blue-bar-item">
                    <h5>MARKET CAP</h5>
                    <h2>{marketCap}</h2>
                </div>
                <div className="Desktop-blue-bar-item">
                    <h5>EXCHANGE VOL</h5>
                    <h2>{exchangeVol}</h2>
                </div>
                <div className="Desktop-blue-bar-item">
                    <h5>ASSETS</h5>
                    <h2>{assets}</h2>
                </div>
            </div>
            <div className="Desktop-blue-bar-half">
                <div className="Desktop-blue-bar-item">
                    <h5>EXCHANGES</h5>
                    <h2>{exchanges}</h2>
                </div>
                <div className="Desktop-blue-bar-item">
                    <h5>MARKETS</h5>
                    <h2>{markets}</h2>
                </div>
                <div className="Desktop-blue-bar-item">
                    <h5>BTC DOM INDEX</h5>
                    <h2>{btcDomIndex}</h2>
                </div>
            </div>
        </div>
    )
}


