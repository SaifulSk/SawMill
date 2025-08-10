import React, { useState, useEffect } from "react";

const RadioBoxes = ({ list, color, radioValues, setRadioValues }) => {
  return (
    <tr className={"alert alert-" + color}>
      <td className="px-0 mx-0">
        {list.length &&
          list.map((i) => (
            <label
              key={i}
              className="radio-box-label mr-1 font-weight-bold mb-0"
            >
              <input
                type="radio"
                name={"r" + list[list.length - 1]}
                value={i}
                className="radio-box-input"
                onChange={(e) =>
                  setRadioValues({
                    ...radioValues,
                    [e.target.name]: e.target.value,
                  })
                }
                checked={radioValues["r" + list[list.length - 1]] == i}
              />
              <span className="radio-box-span">{i}</span>
            </label>
          ))}
      </td>
    </tr>
  );
};

export default RadioBoxes;
