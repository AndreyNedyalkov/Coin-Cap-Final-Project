import * as React from "react";
import "./PortfolioOverview.css";

export default function BoxSx({total}) {
  return (
    <div className="portfolio-overview">
      <div className="portfolio-container">
        <span>{total}</span>
        <span>Total Balance</span>
      </div>
      <div className="portfolio-container">
        <span>$1,595.25 </span>
        <div>
          <span>24h Portfolio Change</span>
          <span>(+1.72%)</span>
        </div>
      </div>
      <div className="portfolio-container">
        <span>$2,416.43 </span>
        <div>
          <span>Total Profit Loss</span>
          <span>(+1.94%)</span>
        </div>
      </div>
    </div>
  );
}
