import { ComponentsTabButton, CustomizeHeading } from "./CustomUI";
import { Box, Collapse } from "@mui/material";
import Image from "next/image";
import InteriorIcon from "@/public/InteriorIcon.svg";
import ExteriorIcon from "@/public/ExteriorIcon.svg";
import { useState } from "react";

const StyleTab = () => {
  const [isInteriorOpen, setIsInteriorOpen] = useState(false);
  const [isExteriorOpen, setIsExteriorOpen] = useState(false);

  const handleInteriorOpen = () => setIsInteriorOpen(!isInteriorOpen);
  const handleExteriorOpen = () => setIsExteriorOpen(!isExteriorOpen);
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <CustomizeHeading>
        Customize <br /> <span>STYLE</span>
      </CustomizeHeading>

      <ComponentsTabButton
        variant="contained"
        startIcon={<Image src={InteriorIcon} />}
        onClick={handleInteriorOpen}
        buttonOpen={isInteriorOpen ? true : false}
      >
        Interior
      </ComponentsTabButton>
      <Collapse in={isInteriorOpen} timeout={300} unmountOnExit>
        bla bla interior
      </Collapse>
      <ComponentsTabButton
        variant="contained"
        startIcon={<Image src={ExteriorIcon} />}
        onClick={handleExteriorOpen}
        buttonOpen={isExteriorOpen ? true : false}
      >
        Exterior
      </ComponentsTabButton>
      <Collapse in={isExteriorOpen} timeout={300} unmountOnExit>
        bla bla exterior
      </Collapse>
    </Box>
  );
};

export default StyleTab;
