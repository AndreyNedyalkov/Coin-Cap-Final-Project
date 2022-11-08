export function TableHeadCells() {
    const headCells = [
        {
          id: "rank",
          numeric: true,
          disablePadding: false,
          label: "Rank",
        },
        {
          id: "name",
          numeric: false,
          disablePadding: false,
          label: "Name",
        },
        {
          id: "tradingPairs",
          numeric: true,
          disablePadding: false,
          label: "Trading Pairs",
        },
        {
          id: "volume",
          numeric: true,
          disablePadding: false,
          label: "Volume",
        },
        {
          id: "marketShare",
          numeric: true,
          disablePadding: false,
          label: "Market Share",
        },
        {
          id: "recommended",
          numeric: true,
          disablePadding: false,
          label: "Recommended",
        },
      ];
      return headCells
}