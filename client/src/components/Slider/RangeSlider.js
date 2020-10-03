import React from 'react';
import Slider from '@material-ui/core/Slider';


export default function RangeSlider({setRangeYears,rangeYears}) {
  const handleChange = (event, newValue) => {
    setRangeYears(newValue)
  };
  return (
    <div style={{ width: '300px'}}>
      <Slider
        value={rangeYears}
        onChange={handleChange}
        max={new Date().getFullYear()}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
    </div>
  );
}