import React from "react";
import RadioBoxes from "./RadioBoxValues";

const radioRows = (setRadioValues, radioValues) => {
  return (
    <tbody>
      <RadioBoxes
        list={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        color="warning"
        setRadioValues={setRadioValues}
        radioValues={radioValues}
      />
      <RadioBoxes
        list={[0, 3, 6, 9]}
        color="success"
        setRadioValues={setRadioValues}
        radioValues={radioValues}
      />
      <RadioBoxes
        list={[1, 2, 3, 4, 5, 6]}
        color="warning"
        setRadioValues={setRadioValues}
        radioValues={radioValues}
      />
      <RadioBoxes
        list={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
        color="success"
        setRadioValues={setRadioValues}
        radioValues={radioValues}
      />
    </tbody>
  );
};

export default radioRows;
