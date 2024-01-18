import { useEffect, useState } from "react";
import GlobalStyle1 from "./Styles/theme1";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Container,
  Header,
  WrapperSwitch,
  Switch,
  SwitcherContainer,
  Switcher,
  Input,
  ButtonContainer,
  Button,
  Output,
  DisplayContainer,
  Ball,
} from "./App.style";

function App() {
  const [value, setValue] = useState("");
  const [person, setPerson] = useState({
    age:"",
    weight:"",
    height:""
  });
  const [idMetric, setIdMetric] = useState(0); // 0->AGE; 1->WEIGHT;  2->HEIGHT;
  const [result, setResult] = useState("0");
  const [theme, setTheme] = useState(1); // 1->decimal; 2->imperial;
  const [themeValue, setThemeValue] = useState("8%");

  useEffect(()=>{
    updateDataInput(idMetric);
  },[value])

  const functionKcal = (weight:number) =>{
    console.log("///////////////////////////////////");
    console.log(person);

     let factor = 1.6;  // Menos de 165 lb (75 kg)
    
    if (weight >= 165 && weight < 200) {
       factor = 1.4;
     } else if (weight >= 200 && weight < 220) {
       factor = 1.2;
     } else {
       factor = 1;  // Más de 220 lb (100 kg)
     }

     return (((10 * parseFloat(person.weight) + 6.25 * parseFloat(person.height )) - (10 * parseFloat(person.age)) + 5) * factor).toString();
    }

  const calc = () => {
    let auxPerson;
    
    if(parseFloat(person.age) < 16){
      toast("The age must be greater or same than: 16 years old");
      return
    }

    if(parseFloat(person.age) >= 105){
      toast("The age must be less than: 105 years old");
      return
    }
   
    if(theme === 1){//decimal
      auxPerson = convertUnits();

      if(parseFloat(person.weight) < 40.50){
        toast("The weight must be greater or same than: 40.50kg!");
        return
      }

      if(parseFloat(person.weight) >= 300){
        toast("The weight must be less than: 300kg!");
        return
      }

      if(parseFloat(person.height) <  140){
        toast("The height must be greater or same than: 1.40m!");
        return
      }

      if(parseFloat(person.height) >= 225){
        toast("The height must be less than: 2.25m!");
        return
      }

      setResult(functionKcal(parseFloat(auxPerson.weight)));
      
    }else if(theme === 2){//imperial

      if(parseFloat(person.weight) < 89.28){
        toast("The weight must be greater or same than: 89.28lb!");
        return
      }

      if(parseFloat(person.weight) >= 661.38){
        toast("The weight must be less than: 661.38lb!");
        return
      }

      if(parseFloat(person.height) < 55.11){
        toast("The height must be greater or same than: 55.11 inch!");
        return
      }
  
      if(parseFloat(person.height) >= 88.58){
        toast("The height must be less than: 88.58 ich!");
        return
      }

      setResult(functionKcal(parseFloat(person.weight)));
    }

  }

  const convertUnits = () =>{
    const aux = {...person};
    if(aux.age === ""){
      aux.age = "0";
    }
    if(aux.weight === ""){
      aux.weight = "0";
    }
    if(aux.height === ""){
      aux.height = "0";
    } 
    
    if(theme === 1){//decimal => imperial - rubens
        aux.weight = (2.20462 * parseFloat(aux.weight)).toFixed(2).toString();
        aux.height = (parseFloat(aux.height)/2.54).toFixed(2).toString();
    }else if(theme === 2){//imperial => decimal
        aux.weight = (parseFloat(aux.weight) / 2.20462 ).toFixed(2).toString();
        aux.height = (parseFloat(aux.height) * 2.54).toFixed(2).toString();
    }
    return aux;
  }
  
  const updateDataInput = (index:number) => {
    const aux = {...person};
    if(index === 0){
        aux.age = value;
        
    }else if(index === 1){
        aux.weight = value;
        
    }else if(index === 2){
      aux.height = value;
    }

    setPerson(aux);
  }

  const changeInput = (index:number) => {
    setIdMetric(index); 
    setValue('');
    updateDataInput(index);
  }

  const deleteValue = () => {
    if (value.slice(-1) === " ") {
      setValue(value.substring(0, value.length - 3));
    } else if (value.slice(-2) === "0.") {
      setValue(value.substring(0, value.length - 2));
    } else {
      setValue(value.substring(0, value.length - 1));
    }
  };

  const addSimbol = (simbol: string) => {
    if (value.slice(-1) !== " " && value.slice(-1) !== ".") {
      setValue(value + simbol);
    }
  };

  const hadleTheme = () => {
    const aux = convertUnits();
    

    if (theme === 1) {
      setTheme(2);
      setThemeValue("70%");
    } else if (theme === 2) {
      setTheme(1);
      setThemeValue("8%"); 
    }

    setPerson(aux);
    
  };

  const resect = () => {
    
    setPerson({
      age:"",
      weight:"",
      height:""
    });
    setValue("");
    setResult("0");

  };

  return (
    <>
      <GlobalStyle1 />
      <Container>
        <Header>
          RubensKCal
          <WrapperSwitch>
            Decimal
            <Switch>
              <SwitcherContainer onClick={hadleTheme}>
                <Switcher theme={themeValue} />
              </SwitcherContainer>
            </Switch>
            Imperial
          </WrapperSwitch>
        </Header>

        <DisplayContainer> {idMetric === 0 ? <Ball/> : <Ball bg="var(--screen-background)"/> } AGE<Input onClick={() => changeInput(0)} >{person.age}</Input></DisplayContainer>
        <DisplayContainer> {idMetric === 1 ? <Ball/> : <Ball bg="var(--screen-background)"/> } WEIGHT<Input onClick={() => changeInput(1)}>{person.weight}</Input></DisplayContainer>
        <DisplayContainer> {idMetric === 2 ? <Ball/> : <Ball bg="var(--screen-background)"/> } HEIGHT<Input onClick={() => changeInput(2)}>{person.height}</Input></DisplayContainer>
        <DisplayContainer> RESULT<Output>{result}</Output></DisplayContainer>
        

        <ButtonContainer>
          <Button onClick={() => value.length <= 12 && setValue(value + "7")}>7</Button>
          <Button onClick={() => value.length <= 12 && setValue(value + "8")}>8</Button>
          <Button onClick={() => value.length <= 12 && setValue(value + "9")}>9</Button>
          <Button onClick={() => value.length >= 1 && deleteValue()}
                  color="var(--white)"
                  bg="var(--key-background-dark-blue)"
                  bdbox="var(--key-shadow-dark-blue)"
          >
            DEL
          </Button>
          <Button onClick={() => value.length <= 12 && setValue(value + "4")}>4</Button>
          <Button onClick={() => value.length <= 12 && setValue(value + "5")}>5</Button>
          <Button onClick={() => value.length <= 12 && setValue(value + "6")}>6</Button>
          
          {idMetric === 0 ? 
          <Button color={"var(--white)"} bg="var(--key-background-red)"  bdbox="var(--key-shadow-dark-red)" onClick={() => changeInput(0)}>AGE</Button>
          : 
          <Button  onClick={() => changeInput(0)}>AGE</Button>
          }

          <Button onClick={() => value.length <= 12 && setValue(value + "1")}>1</Button>
          <Button onClick={() => value.length <= 12 && setValue(value + "2")}>2</Button>
          <Button onClick={() => value.length <= 12 && setValue(value + "3")}>3</Button>
        
          {idMetric === 1 ? 
          <Button size="0.8rem" color={"var(--white)"} bg="var(--key-background-red)"  bdbox="var(--key-shadow-dark-red)" onClick={() => changeInput(1)}>WEIGHT</Button>
          : 
          <Button size="0.8rem"  onClick={() => changeInput(1)}>WEIGHT</Button>
          }

          <Button onClick={() => value.length >= 1 && addSimbol(".")}>.</Button>
          <Button onClick={() => value.length <= 12 && setValue(value + "0")} >0</Button>
          <Button onClick={() => value.length >= 1 && addSimbol(".")}>.</Button>

          
          {idMetric === 2 ? 
          <Button size="0.8rem" color={"var(--white)"} bg="var(--key-background-red)"  bdbox="var(--key-shadow-dark-red)" onClick={() => changeInput(2)}>HEIGHT</Button>
          : 
          <Button size="0.8rem"   onClick={() => changeInput(2)}>HEIGHT</Button>
          }

          <Button
            gc="1/3"
            color="var(--white)"
            bg="var(--key-background-dark-blue)"
            bdbox="var(--key-shadow-dark-blue)"
            onClick={() => resect()}
          >
            RESET
          </Button>

          <Button
            gc="3/5"
            color={"var(--white)"}
            bg="var(--key-background-red)"
            bdbox="var(--key-shadow-dark-red)"

            onClick={calc}
          >
            =
          </Button>
        </ButtonContainer>
      </Container>
      <ToastContainer position="bottom-center"/>
    </>
  );
}

export default App;