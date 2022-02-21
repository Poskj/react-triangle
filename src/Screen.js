import React, {useState} from 'react'
import { Form } from "react-bootstrap";
import "./screen.css"


function Display() {
    const [result, setResult] = useState("");
    const [resultColor, setResultColor] = useState("");
      
  
    //ดูว่าค่าสามเหลี่ยมอยู่ในขอบเขตรึเปล่า
    function text_length_limiter(side) {
      return side < 0 || side > 999999;
    }
  
    //ดูว่าค่า input ใช้ได้กับสามเหลี่ยมรึเปล่า
    function Input_Validater(side1, side2, side3) {
      let isValid = true;
      if (text_length_limiter(side1) || text_length_limiter(side2) || text_length_limiter(side3))
        isValid = false;
      return isValid;

    }
  
    // ให้ side 1 เป็นด้านแรกของสามเหลี่ยม, side 2 เป็นด้านที่สอง และ side 3 เป็นด้านตรงข้ามมุม
    function Calculation(side1, side2, side3) {
      const allSides = [side1, side2, side3].sort();
      const Side1 = allSides[0];
      const Side2 = allSides[1];
      const Side3 = allSides[2];

      if (
        Side1 === Side2 &&
        Side1 === Side3 &&
        Side2 === Side3
      ) {
        setResultColor("green");
        return "Equilateral triangle";
      } else if (
        Side1 === Side2 ||
        Side1 === Side3 ||
        Side2 === Side3
      ) {
        setResultColor("green");
        return "Isosceles triangle";
      } else if (Side3 ** 2 === Side1 ** 2 + Side2 ** 2) {
        setResultColor("green");
        return "Right triangle";
      } else if (
        Side1 !== Side2 &&
        Side1 !== Side3 &&
        Side2 !== Side3
      ) {
        setResultColor("green");
        return "Scalene triangle";
      } else {
        setResultColor("red");
        return "Not A Triangle";
      }
    }

  
    //เป็นการ check ค่าก่อน submit
    function handleSubmit(e) {
      e.preventDefault();
      const newSide1 = e.currentTarget.side1.value;
      const newSide2 = e.currentTarget.side2.value;
      const newSide3 = e.currentTarget.side3.value;
      if (Input_Validater(newSide1, newSide2, newSide3)) {
        const calcResult = Calculation(newSide1, newSide2, newSide3);
        setResult(calcResult);
      } else {
        setResultColor("red");
        setResult("Not A Triangle");
      }
    }
    
    function isEmpty(){
      let side1 = document.getElementById("side1").value;
      let side2 = document.getElementById("side2").value;
      let side3 = document.getElementById("side3").value;

      if (side1 !==" " && side2 !==" " && side3 !==" "){
        document.getElementById("btn").removeAttribute("disabled");
      }      
    }

    function checkDec(el){
      var ex = /^[0-9]+\.?[0-9]*$/;
      if(ex.test(el.value)==false){
        el.value = el.value.substring(0,el.value.length - 1);
       }
     }

    
    return (
      <main>
        
        <div className="box">
          <h1 className='header'>
            Enter the length of
            each sides 
          </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group >
              <div
              style={{ paddingBottom: "10px" }}>
                <h5
                  className ="inp"
                  style={{ whiteSpace: "nowrap", paddingRight: "20px" }}
                >
                  Side 1 (input 1)
                </h5>
                <Form.Control
                  className="form"
                  type="number"
                  pattern="\d*"
                  class="form-control" required name="balance" min="0.001" max="999999.999" step="0.001" maxlength="10"
                  id="side1"
                  onKeyUp={isEmpty}
                  placeholder="side 1 (number only)"
                />
              </div>
              <div
                style={{ paddingBottom: "10px" }}
              >
                <h5
                  className ="inp"
                  style={{ whiteSpace: "nowrap", paddingRight: "20px" }}
                >
                  Side 2 (input 2)
                </h5>
                <Form.Control
                  className="form"
                  type="number"
                  pattern="\d*"
                  class="form-control" required name="balance" min="0.001" max="999999.999" step="0.001" maxlength="10"
                  id="side2"
                  onkeyup={isEmpty}
                  placeholder="side 2 (number only)"
                />
              </div>
              <div
                style={{ paddingBottom: "10px" }}
              >
                <h5
                  className ="inp"
                  style={{ whiteSpace: "nowrap", paddingRight: "20px" }}
                >
                  Side 3 (input 3)
                </h5>
                <Form.Control
                  className="form"
                  type="number"
                  pattern="\d*"
                  class="form-control" required name="balance" min="0.001" max="999999.999" step="0.001" maxlength="10"
                  id="side3"
                  onkeyup={isEmpty}
                  placeholder="side 3 (number only)"
                />
              </div>
              
              <button
                id = "btn"
                type="submit"
                className="btncolor"
                style={{
                  paddingBottom: "10px",
                  marginBottom: "20px",
                  background: "green",
                  border: "lawngreen",
                  boxSizing: "border-box",
                  borderRadius: "13.2698px",
                }}
                disabled
              >
                <span className="mr-2">Enter</span>
              </button>
            </Form.Group>
          </Form>
  
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ paddingBottom: "10px" }}
          >
            <h5
              className ="inp"
            >
              Result
            </h5>
            <input
              className="form-control bg-transparent border-info"
              type="text"
              id="result"
              style={{ color: resultColor }}
              value={result}
              disabled
              readOnly
            />
          </div>
        </div>
      </main>
    );
  }
  
  export default Display;