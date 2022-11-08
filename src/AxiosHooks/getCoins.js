import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAxios = (configObj) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function handleError() {
    navigate("*");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
        });
        let getNeededData = res.data.data.coins.map((coin) => {
          if (coin.price) {
            coin.price = +coin.price;
          }
          if(coin["24hVolume"]){
            coin["24hVolume"] = +coin["24hVolume"];
          }
          if (coin.marketCap) {
            coin.marketCap = +coin.marketCap;
          }
          if (coin.change) {
            coin.change = +coin.change;
          }
          return coin;
        });
        setResponse(getNeededData);
      } catch (err) {
        handleError();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return [response, loading];
};
export default useAxios;
