export function MainHeadCells() {
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
      id: "price",
      numeric: true,
      disablePadding: false,
      label: "Price",
    },
    {
      id: "marketCap",
      numeric: true,
      disablePadding: false,
      label: "MarketCap",
    },
    {
      id: "volume",
      numeric: true,
      disablePadding: false,
      label: "Volume",
    },
    {
      id: "change",
      numeric: true,
      disablePadding: false,
      label: "Change",
    },
    {
      id: "LastTwentyFourHours",
      numeric: false,
      disablePadding: false,
      label: "Last 24 Hours",
    },
  ];
  return headCells;
}
