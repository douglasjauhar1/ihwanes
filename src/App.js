import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Moment from "moment";

// IMPORT : PAGE
import Home from "./Screens/Home";
import Table from "./Screens/Table";

// IMPORT : LIBS
import { RangeDate } from "./libs/rangeData.lib";

function App() {
  const [date, setDate] = useState({
    tglAwal: "",
    tglAkhir: "",
  });

  useEffect(() => {
    const date = RangeDate();

    setDate({
      tglAwal: date[0],
      tglAkhir: date[1],
    });

    localStorage.setItem("tanggalAwal", JSON.stringify(date[0]));
    localStorage.setItem("tanggalAkhir", JSON.stringify(date[1]));
  }, []);

  return (
    <Router>
      <Route exact path={"/"}>
        <Home tglAwal={date.tglAwal} tglAkhir={date.tglAkhir} />
      </Route>
      <Route exact path={"/table"} component={Table} />
    </Router>
  );
}

export default App;
