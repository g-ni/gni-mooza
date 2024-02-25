import { Box } from "@mui/material";
import {
  CustomizeHeading,
  SizeDimensions,
  WidthButton,
  WidthInput,
  MinMax,
} from "./CustomUI";
import { useState } from "react";

const SizeTab = () => {
  const [widthValue, setWidthValue] = useState(0);

  const increaseWidth = () => {
    setWidthValue(widthValue + 1);
  };

  const decreaseWidth = () => {
    setWidthValue(widthValue - 1);
  };
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <CustomizeHeading>
        Customize <br /> <span>SIZE</span>
      </CustomizeHeading>
      <SizeDimensions marginTop="25px">Height</SizeDimensions>
      <Box
        width="121px"
        height="33px"
        flexShrink={0}
        bgcolor="#FFF"
        borderRadius="5px"
        // margin="auto"
        marginTop="4.53px"
      ></Box>
      <SizeDimensions marginTop="44px">Depth</SizeDimensions>
      <Box
        width="121px"
        height="33px"
        flexShrink={0}
        bgcolor="#FFF"
        borderRadius="5px"
        // margin="auto"
        marginTop="4.53px"
      ></Box>
      <SizeDimensions marginTop="44px" isActive>
        Width
      </SizeDimensions>
      <Box display="flex" flexDirection="column">
        <Box
          width="121px"
          height="33px"
          flexShrink={0}
          bgcolor="#FFF"
          borderRadius="5px"
          margin="auto"
          marginTop="4.53px"
          display="flex"
        >
          <Box display="flex" justifyContent="space-evenly" alignItems="center">
            <WidthButton
              disabled={widthValue === 0}
              variant="contained"
              onClick={decreaseWidth}
            >
              -
            </WidthButton>
            <WidthInput
              fullWidth
              value={widthValue}
              onChange={(event) => setWidthValue(event.target.value)}
              InputProps={{
                endAdornment: <span>"</span>,
              }}
            />
            <WidthButton variant="contained" onClick={increaseWidth}>
              +
            </WidthButton>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <MinMax>Min : X</MinMax>
          <MinMax>Max : Y</MinMax>
        </Box>
      </Box>
    </Box>
  );
};

export default SizeTab;
