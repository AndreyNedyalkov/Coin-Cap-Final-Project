import React, { useEffect } from "react";
import "./BlueBarAdaptive.css";
import DesktopBlueBar from "../BlueBarUnderHeader/DesktopVersion/DesktopBlueBar";
import DesktopBlueBarLoader from "./DesktopVersion/DesktopBlueBarLoader";
import MobileBlueBar from "../BlueBarUnderHeader/MobileVersion/MobileBlueBar";
import axios from "../../../apis/coinranking";
import useAxiosGlobal from "../../../AxiosHooks/getGlobalStats";

export default function BlueBarAdaptive() {
  const globalStats = (function GLOBAL() {
    const [stats, loading] = useAxiosGlobal({
      axiosInstance: axios,
      method: `GET`,
      url: `stats`,
      requestConfig: {
        params: {
          referenceCurrencyUuid: "yhjMzLPhuIDl",
        },
      },
    });
    return [stats, loading];
  })();
  const [stats, loading] = globalStats;

  return (
    <div>
      <div className="Blue-desktop-bar-adaptive">
        {loading ? (
          <DesktopBlueBarLoader />
        ) : (
          <DesktopBlueBar
            marketCap={`${(Number(stats.totalMarketCap)/1000000000).toLocaleString(
              undefined,
              { minimumFractionDigits: 0, maximumFractionDigits: 1 }
            )} T`}
            exchangeVol={String(stats.total24hVolume).slice(0, 2) + ` B`}
            assets={`${(Number(stats.totalCoins)/1).toLocaleString(
              undefined,
              { minimumFractionDigits: 0, maximumFractionDigits: 1 }
            )}`}
            exchanges={stats.totalExchanges}
            markets={`${(Number(stats.totalMarkets)/1).toLocaleString(
              undefined,
              { minimumFractionDigits: 0, maximumFractionDigits: 1 }
            )}`}
            btcDomIndex={`${Number(stats.btcDominance).toFixed(2)}%`}
          />
        )}
      </div>
      <div className="Blue-mobile-bar-adaptive">
        <MobileBlueBar
          marketCap={`$${Number(stats.totalMarketCap).toLocaleString(
            undefined,
            { minimumFractionDigits: 0, maximumFractionDigits: 1 }
          )}`}
          exchangeVol={String(stats.total24hVolume).slice(0, 2) + ` B`}
          assets={stats.totalCoins}
          exchanges={stats.totalExchanges}
          btcDomIndex={`${Number(stats.btcDominance).toFixed(2)}%`}
        />
      </div>
    </div>
  );
}
