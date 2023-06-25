import { useState } from "react";
import Button from "./component/Button";
import Checkbox from "./component/Checkbox";
import usePasswordGenetor from "./hooks/use-password-generator";
import "./styles.css";

export default function App() {
  const initialState = [
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false }
  ];
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState(initialState);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };
  const handleCopy = () => {
    // navigator.clipboard.writeText(password);
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  const { password, errorMessage, generatePassword } = usePasswordGenetor();
  return (
    <div className="container">
      {/* {password text and copy} */}
      {password && (
        <div className="header">
          <div className="title"> {password}</div>
          <Button
            customClass="copyBtn"
            text={copied ? "copied" : "copy"}
            onClick={handleCopy}
          />
        </div>
      )}

      {/* Character Length */}
      <div className="charlength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      <div className="checkboxes">
        {checkboxData.map((item, index) => {
          return (
            <Checkbox
              text={item.title}
              onChange={() => handleCheckboxChange(index)}
              state={item.state}
            />
          );
        })}
      </div>
      <div className="error-msg">{errorMessage}</div>
      <Button
        text="Generate Password"
        onClick={() => generatePassword(checkboxData, length)}
        customClass="generateBtn"
      />
    </div>
  );
}
