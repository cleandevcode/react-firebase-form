import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import toast from 'toastr';
import './App.css';
import Input from "./input";
import ToolTip from "./tooltip";
import 'toastr/build/toastr.min.css'

const mainLists = [
  {
    name: "name",
    mandatory: true,
  },
  {
    name: "vintage",
    mandatory: true
  },
  { 
    name: "note",
    mandatory: false,
    multiLine: true
  }
];

const mainListLabel = ["What is the name of this wine?", "What is the vintage?", "Any note specific for this vintage? Example: Weather, special circumstances, significant or interesting changes made between this vintage and previous vintage(s)?"];
const propertyLists = [
  {
    name: "color",
    mandatory: true
  },
  {
    name: "style",
    mandatory: true
  },
  {
    name: "body",
    mandatory: false
  },
  {
    name: "aroma",
    mandatory: false
  },
  {
    name: "additional_note",
    mandatory: false
  }
]

const propertyListLabel=["What is the colour of wine?", "What is the style?", "What is the body?", "What is the aroma?", "Do you have any personal tasting notes?"]

const types = [
  {
    name: 'Type1',
    value: 1
  },
  {
    name: 'Type2',
    value: 2
  },
  {
    name: 'Other',
    value: 0
  },
]

function App() {
  const [isSubmit, setSubmit] = useState(false);
  const [editableType, setEditType] = useState(false);
  const [score, setScore] = useState(0);
  const [disable, setDisable] = useState(true);

  const [state, setState] = useState({
      name: '',
      note: '',
      style: '',
      type: '',
      vintage: '',
      color: '',
      body: '',
      additional_note: '',
      aroma: ''
  });

  useEffect(()=>{
    setScore(Object.values(state).filter(item=>item!=="").length + 1);
    if(state.name.length > 0 && state.vintage.length > 0 && state.color.length > 0 && state.style.length > 0) {
      setDisable(false);
    }else{
      setDisable(true);
    }
  },[state]);

  const onchangeHandler = (name, value) => {
    setState({
      ...state,
      [name]: value
    })
  }

  const onChangeType = (e) => {
    setState({...state, type: e.target.value})
  }

  const onSelectType = (e) => {
    const value = e.target.value;
    if(value === "Other") {
      setEditType(true);
      setState({...state, type: ''});
    } else {
      setEditType(false);
      setState({...state, type: value})
    }
  }

  
  const onSubmit = () => {
    setSubmit(true);
    if(!disable) {
      toast.options = {
        hideDuration: 300,
        timeOut: 60000
      }
      firebase.firestore().collection("boards").add({state}).then(res=>{
        console.log("res>>>",res);
        toast.success('Added Successfully!');
        initState();
      }).catch(error=>{
        console.log("error>", error);
        toast.warning('Error Occured.')
      })
    }
    
  }

  const initState = () => {
    setState({
      name: '',
      note: '',
      style: '',
      type: '',
      vintage: '',
      color: '',
      body: '',
      additional_note: '',
      aroma: ''
    })
  }

  return (
    <div className="container p-3">
      <h2>Listing Score: {score}</h2>
      <h4>Tell us a bit about your wine</h4>
      <div className="p-3">
        {mainLists.map((item, idx)=>(
          <Input 
            key={idx}
            name={item.name}
            onchangeHandler={onchangeHandler}  
            isSubmitted={isSubmit}
            label={mainListLabel[idx]}
            mandatory={item.mandatory}
            multiLine={item.multiLine}
          />
        ))}
        <div className="d-flex align-items-center mt-2">
            <div className="col-md-5">
                <label htmlFor="type">What type of wine is this?</label>
            </div>
            <div className="col-md-1 text-center">
                <ToolTip />
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <select name="type" onChange={onSelectType}>
                <option disabled selected>Select Type</option>
                {types.map((item, idx)=>(
                  <option key={idx}>
                    {item.name}
                  </option>
                ))}
              </select>
              {editableType &&
                <input className="form-control mx-3" style={{width: 150}} value={state.type} name="type" onChange={onChangeType} />
              }
            </div>
        </div>
      </div>
      <h4 className="mt-5">Colour & Body</h4>
      <div className="p-3">
      {propertyLists.map((item, idx)=>(
          <Input 
            key={idx}
            name={item.name}
            onchangeHandler={onchangeHandler}  
            isSubmitted={isSubmit}
            label={propertyListLabel[idx]}
            mandatory={item.mandatory}
          />
        ))}
      </div>
      <div className="d-flex justify-content-end">
        <button onClick={onSubmit} className="btn btn-success">Next</button>
      </div>
    </div>
  );
}

export default App;
