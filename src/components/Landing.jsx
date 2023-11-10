import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import MarketData from "./MarketData";

const Landing = () => {
  const [assets, setassets] = useState([]);
  const [assetstemp, setassetstemp] = useState([]);
  const [offset, setoffset] = useState(50);

  useEffect(() => {
    fetchAssets(0);
  }, []);

  function fetchAssets(offset) {
    axios
      .get(`https://api.coincap.io/v2/assets?limit=50&offset=${offset}`)
      .then((result) => {
        let lst = result.data.data.map((x) => {
          return { ...x, rank: parseInt(x.rank) };
        });
        setassets((prev) => [...prev, ...lst]);
        setassetstemp((prev) => [...prev, ...lst]);
      })
      .catch(() => {});
  }

  function handleViewMore() {
    fetchAssets(offset);
    setoffset((prev) => prev + 50);
  }

  function handleSearch(value) {
    if (value) {
      let lst = assetstemp.filter((x) => x.name.toLowerCase().includes(value));
      setassets(lst);
    } else {
      setassets(assetstemp);
    }
  }

  return (
    <>
      <Header handleSearch={handleSearch} />
      <MarketData assets={assets} handleViewMore={handleViewMore} />
    </>
  );
};
export default Landing;
