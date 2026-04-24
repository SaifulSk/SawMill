import React, { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import arr from "../data/calculationArray";
import radioRows from "./RadioRows";
import { toast } from "react-toastify";

const SawMillCalculator = () => {
  const initialValues = {
    r10: 1,
    r9: 0,
    r6: 1,
    r11: 0,
  };
  const [radioValues, setRadioValues] = useState(initialValues);
  const [kaliValue, setKaliValue] = useState("0-0-0");
  const [tableData, setTableData] = useState([]);
  const [totalKali, setTotalKali] = useState("0-0-0");
  const [itemAdded, setItemAdded] = useState(false);

  const reset = () => {
    localStorage.removeItem("tableData");
    setKaliValue("0-0-0");
    setRadioValues(initialValues);
    setTableData([]);
    setTotalKali("0-0-0");
  };

  const addToTab = () => {
    if (kaliValue !== "0-0-0") {
      const newTableData = [
        ...tableData,
        {
          measurement: `${radioValues.r10}.${radioValues.r9} x ${radioValues.r6}.${radioValues.r11}`,
          kali: kaliValue,
        },
      ];
      setTableData(newTableData);
      setKaliValue("0-0-0");
      // setRadioValues(initialValues);
      setItemAdded(false);
    } else {
      toast.error("Please enter a valid Kali value.", {
        autoClose: 5000,
        closeOnClick: true,
        theme: "colored",
      });
    }
  };

  const delRow = (index) => {
    let newData = tableData.filter((_, i) => i !== index);
    setTableData(newData);
    localStorage.setItem("tableData", JSON.stringify(newData));
  };

  useEffect(() => {
    const [x, y, z] =
      arr[radioValues.r10][radioValues.r9 / 3][radioValues.r6][radioValues.r11];
    setKaliValue(`${x}-${y}-${z}`);
  }, [radioValues]);

  useEffect(() => {
    if (tableData.length > 0) {
      let t1 = 0,
        t2 = 0,
        t3 = 0;
      tableData.map((item) => {
        const [x, y, z] = item.kali.split("-").map(Number);
        t1 += x;
        t2 += y;
        t3 += z;
      });
      t2 += parseInt(t3 / 12);
      t3 %= 12;
      t1 += parseInt(t2 / 12);
      t2 %= 12;
      setTotalKali(`${t1}-${t2}-${t3}`);
      localStorage.setItem("tableData", JSON.stringify(tableData));
    } else {
      setTotalKali("0-0-0");
      // localStorage.removeItem("tableData");
    }
  }, [tableData]);

  useEffect(() => {
    if (kaliValue !== "0-0-0") setItemAdded(true);
  }, [kaliValue]);

  useEffect(() => {
    const storedTableData = localStorage.getItem("tableData");
    if (storedTableData) setTableData(JSON.parse(storedTableData));
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <h3 className="my-3 col-12 text-center">Saw Mill Calculator</h3>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <form>
              <div className="row radios">
                <table className="table text-center">
                  {radioRows(setRadioValues, radioValues)}
                </table>
              </div>
              <div
                className="form-group row mt-3"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="col-xs-1">
                  <div className="kali-box">{kaliValue}</div>
                </div>
                <div className="col-xs-1">
                  <button
                    type="button"
                    className={
                      "btn btn-" + (itemAdded ? "primary" : "danger") + " ml-2"
                    }
                    id="submitBtn"
                    onClick={addToTab}
                  >
                    Add To Table
                  </button>
                </div>
              </div>
            </form>
            <div
              className="form-group row"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "70px",
              }}
            >
              <table className="table table-bordered text-center mt-3" id="tab">
                <thead>
                  <tr className="bg bg-success text-white">
                    <th>Measurement</th>
                    <th>Kali</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.length ? (
                    tableData.map((item, index) => (
                      <tr key={index}>
                        <td className="text-primary font-weight-bold">
                          {item.measurement}
                        </td>
                        <td className="text-success font-weight-bold">
                          {item.kali}
                        </td>
                        <td>
                          <i
                            className="btn btn-danger btn-sm fa fa-trash"
                            onClick={() => delRow(index)}
                          ></i>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {tableData.length ? (
                <>
                  <div>
                    <button className="btn btn-dark" id="rst" onClick={reset}>
                      Clear All
                    </button>
                  </div>
                  <button
                    className="btn btn-info ml-2"
                    id="pdf"
                    onClick={() => console.log("save()")}
                  >
                    Save Pdf
                  </button>
                </>
              ) : null}
              <table
                className="table table-bordered text-center position-fixed m-0"
                id="tot"
                style={{ bottom: "0px" }}
              >
                <tbody>
                  <tr>
                    <th className="bg bg-warning">Total</th>
                    <th
                      className="bg bg-danger text-white font-weight-bolder"
                      style={{ fontSize: "20px" }}
                      id="totv"
                    >
                      {totalKali}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SawMillCalculator;
