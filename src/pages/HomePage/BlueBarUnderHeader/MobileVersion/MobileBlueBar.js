import React from "react";
import "./MobileBlueBar.css"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { height, textAlign } from "@mui/system";

export default function MobileBlueBar({ marketCap, exchangeVol, assets, exchanges, markets, btcDomIndex }) {
    return (
        <div className="Mobile-blue-bar">
            <Accordion className="Mobile-blue-bar-accordion">
                <AccordionSummary
                    sx={{ color: "white" }}
                    expandIcon={<ArrowDropDownIcon sx={{ color: "white" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div className="Blue-mobile-bar-accordion-header-title">Market Snapshot</div>
                </AccordionSummary>
                <AccordionDetails
                    sx={{ color: "white" }}
                >
                    <div className="Mobile-blue-bar-accordion-item">
                        <p>Market cap:</p>
                        <p>{marketCap}</p>
                    </div>
                    <div className="Mobile-blue-bar-accordion-item">
                        <p>Exchange Vol:</p>
                        <p>{exchangeVol}</p>
                    </div>
                    <div className="Mobile-blue-bar-accordion-item">
                        <p>Assets:</p>
                        <p>{assets}</p>
                    </div>
                    <div className="Mobile-blue-bar-accordion-item">
                        <p>Exchanges:</p>
                        <p>{exchanges}</p>
                    </div>
                    <div className="Mobile-blue-bar-accordion-item">
                        <p>Markets:</p>
                        <p>{markets}</p>
                    </div>
                    <div className="Mobile-blue-bar-accordion-item">
                        <p>BTC Dom Index:</p>
                        <p>{btcDomIndex}</p>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}