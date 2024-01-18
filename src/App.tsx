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

  const calc = () => {
    /*
    4- Para el peso se debe manejar un valor mínimo o igual a 40.50 kg o 89.28722 lb y un valor máximo o
      igual de 300 kg o 661.387 lb.

      5- Para la altura un valor entre el rango de 1.40mts y de 2.25mts
      6- El resultado se debe actualizar cuando se cambia cualquier valor ya sea: altura, peso o
      edad.
  7- Para la edad se debe validar un valor mínimo o igual de 16 y un valor máximo de 105
    */

    if(theme === 1){//decimal
      
      if(parseFloat(person.weight) < 40.50){
        const notify = () => toast("The weight must be greater or same than: 40.50kg!");
        notify();
        return
      }

      if(parseFloat(person.weight) >= 300){
        const notify = () => toast("The weight must be less than: 300kg!");
        notify();
        return
      }

    }else if(theme === 2){//imperial

    }

    const notify = () => toast("Wow so easy!");
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
    
    if(theme === 1){//decimal => imperial
        aux.weight = (2.20462 * parseFloat(aux.weight)).toFixed(2).toString();
        aux.height = (parseFloat(aux.height)/2.54).toFixed(2).toString();
    }else if(theme === 2){//imperial => decimal
      aux.weight = (parseFloat(aux.weight) / 2.20462 ).toFixed(2).toString();
      aux.height = (parseFloat(aux.height) * 2.54).toFixed(2).toString();
    }
    setPerson(aux);
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

    if (theme === 1) {
      setTheme(2);
      setThemeValue("70%");
    } else if (theme === 2) {
      setTheme(1);
      setThemeValue("8%"); 
    }

    convertUnits();
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

        <DisplayContainer> {idMetric === 0 ? <Ball/> : <Ball bg="var(--screen-background)"/> }  AGE<Input>{person.age}</Input></DisplayContainer>
        <DisplayContainer> {idMetric === 1 ? <Ball/> : <Ball bg="var(--screen-background)"/> } WEIGHT<Input>{person.weight}</Input></DisplayContainer>
        <DisplayContainer> {idMetric === 2 ? <Ball/> : <Ball bg="var(--screen-background)"/> } HEIGHT<Input>{person.height}</Input></DisplayContainer>
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
          <Button color={"var(--white)"} bg="var(--key-background-red)"  bdbox="var(--key-shadow-dark-red)" onClick={() => {setIdMetric(0); setValue('')}}>AGE</Button>
          : 
          <Button  onClick={() => {setIdMetric(0); setValue('')}}>AGE</Button>
          }

          <Button onClick={() => value.length <= 12 && setValue(value + "1")}>1</Button>
          <Button onClick={() => value.length <= 12 && setValue(value + "2")}>2</Button>
          <Button onClick={() => value.length <= 12 && setValue(value + "3")}>3</Button>
        
          {idMetric === 1 ? 
          <Button size="0.8rem" color={"var(--white)"} bg="var(--key-background-red)"  bdbox="var(--key-shadow-dark-red)" onClick={() => {setIdMetric(1); setValue('')}}>WEIGHT</Button>
          : 
          <Button size="0.8rem"  onClick={() => {setIdMetric(1); setValue('')}}>WEIGHT</Button>
          }

          <Button onClick={() => value.length >= 1 && addSimbol(".")}>.</Button>
          <Button onClick={() => value.length <= 12 && setValue(value + "0")} >0</Button>
          <Button onClick={() => value.length >= 1 && addSimbol(".")}>.</Button>

          
          {idMetric === 2 ? 
          <Button size="0.8rem" color={"var(--white)"} bg="var(--key-background-red)"  bdbox="var(--key-shadow-dark-red)" onClick={() => {setIdMetric(2); setValue('')}}>HEIGHT</Button>
          : 
          <Button size="0.8rem"  onClick={() => {setIdMetric(2); setValue('')}}>HEIGHT</Button>
          }

          <Button
            gc="1/3"
            color="var(--white)"
            bg="var(--key-background-dark-blue)"
            bdbox="var(--key-shadow-dark-blue)"
            onClick={() => setValue("")}
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