import { ComponentsTabButton, CustomizeHeading } from "./CustomUI";
import { Box, Collapse } from "@mui/material";
import Image from "next/image";
import TopIcon from "@/public/TopIcon.svg";
import InteriorIcon from "@/public/InteriorIcon.svg";
import ExteriorIcon from "@/public/ExteriorIcon.svg";
import BaseIcon from "@/public/BaseIcon.svg";
import { useState } from "react";

const ComponentsTab = () => {
  const [isTopOpen, setIsTopOpen] = useState(false);
  const [isInteriorOpen, setIsInteriorOpen] = useState(false);
  const [isExteriorOpen, setIsExteriorOpen] = useState(false);
  const [isBaseOpen, setIsBaseOpen] = useState(false);

  const handleTopOpen = () => setIsTopOpen(!isTopOpen);
  const handleInteriorOpen = () => setIsInteriorOpen(!isInteriorOpen);
  const handleExteriorOpen = () => setIsExteriorOpen(!isExteriorOpen);
  const handleBaseOpen = () => setIsBaseOpen(!isBaseOpen);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <CustomizeHeading>
        Customize <br /> <span>COMPONENTS</span>
      </CustomizeHeading>
      <ComponentsTabButton
        variant="contained"
        startIcon={<Image src={TopIcon} />}
        onClick={handleTopOpen}
        buttonOpen={isTopOpen ? true : false}
      >
        Top
      </ComponentsTabButton>
      <Collapse in={isTopOpen} timeout={300} unmountOnExit>
        bla bla top
      </Collapse>
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
      <ComponentsTabButton
        variant="contained"
        startIcon={<Image src={BaseIcon} />}
        onClick={handleBaseOpen}
        buttonOpen={isBaseOpen ? true : false}
      >
        Base
      </ComponentsTabButton>
      <Collapse in={isBaseOpen} timeout={300} unmountOnExit>
        bla bla base
      </Collapse>
    </Box>
  );
};

export default ComponentsTab;
