import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import KaliCalculator from "./components/SawMillCalculator";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [paymentStatus, setPaymentStatus] = useState(1); // 0 for not paid, 1 for paid, 2 for pending for admin approval

  useEffect(() => {
    const uid = localStorage.getItem("sawmill-device-key");
    if (!uid) {
      console.log(uuidv4());
      localStorage.setItem("sawmill-device-key", uuidv4());
    } else {
      checkPaymentStatus(uid);
    }
  }, []);

  const checkPaymentStatus = async (uid) => {};

  return (
    <>
      <ToastContainer />
      {paymentStatus == 1 ? (
        <KaliCalculator />
      ) : paymentStatus == 2 ? (
        <div>Your payment is pending approval.</div>
      ) : (
        <div>Please complete the payment to access the calculator.</div>
      )}
    </>
  );
};

export default App;
