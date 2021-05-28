import React, {useState} from 'react';
import {FaCheckCircle, FaTimesCircle} from 'react-icons/fa';
import ToolTip from "./tooltip";

const Input = ({ name, onchangeHandler, isSubmitted, label, mandatory, multiLine }) => {
    const [value, setValue] = useState("");

    const onChange = (e) => {
        const {name, value} = e.target;
        setValue(value)
        onchangeHandler(name, value);
    }
    return (
        <div className="d-flex align-items-center mt-2">
            <div className="col-md-5">
                <label htmlFor={name}>{label}</label>
            </div>
            <div className="col-md-1 text-center">
                <ToolTip />
            </div>
            <div className="col-md-6 d-flex align-items-center">
                {!multiLine &&
                    <input 
                        className="form-control mr-3"
                        style={{width: '90%', marginRight: 10}}
                        name={name}
                        value={value}
                        onChange={onChange}
                    />
                }
                {multiLine &&
                    <textarea
                        className="form-control mr-3"
                        style={{width: 300, height: 150}}
                        name={name}
                        value={value}
                        onChange={onChange}
                    />
                }
                
                {mandatory && isSubmitted && value ? 
                    <FaCheckCircle color="green" size={20} /> :
                    mandatory && isSubmitted && value === "" ?     
                    <FaTimesCircle color="red" size={20} /> :
                     <></>
                    
                }
            </div>
            
        </div>
    )
}


export default Input;