import { useState } from 'react';

function ColorForm(props) {
  const re = /^#?([a-fA-F0-9]{6})$/;
  let res = [];
  let result = '';
  let backgroundColor = {};
  const[color,setColor]=useState({hexcolor: '#'});
  const handleColorChange = (e) => {
    const {name, value} = e.target;
    if (value.length >= 1 && value.length <= 7) {
      setColor((prevForm) => ({...prevForm, [name]: value}));
    } else if (value.length === 0) {
      setColor((prevForm) => ({...prevForm, [name]: '#'}));
    }
  }
  if (color.hexcolor.length === 7) {
    if (re.test(color.hexcolor)) {
      res = calcRGB(color.hexcolor);
      result = `rgb(${res[0]}, ${res[1]}, ${res[2]})`;
      backgroundColor = {background: color.hexcolor};
    }
    else {
      result = 'Oшибка!';
      backgroundColor = {background: '#fc0362'};
    }
  }

  function calcRGB(hex) {
    const arr = [];
    for (let i = 1; i < 6; i += 2) {
      arr.push(componentRGB(hex.slice(i, i + 2)));
    }
    return arr;
  }

  function componentRGB(component) {
    return parseInt(component, 16);
  }

  return (
    <div className="main" style={backgroundColor}>
      <form>
        <input className='inputText' type="text" value={color.hexcolor} id="hexcolor" name="hexcolor" onInput={handleColorChange} />
        <div className="result">{result}</div>
      </form>
    </div>

  )
}

export default ColorForm;
