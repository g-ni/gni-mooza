import { Box, Typography, Button, Tabs, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { styled } from "@mui/material/styles";
import { Montserrat } from "next/font/google";
import { useState } from "react";

const montserrat = Montserrat({
  style: "normal",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const TamplatesTabList = styled(TabList)(({ theme }) => ({
  "&.MuiTabList-indicator": {
    background: "rgba(243, 223, 217, 0.50)",
    color: "#F0916B",
    borderRadius: "13.272px",
    textTransform: "none",
    fontFamily: montserrat.style.fontFamily,
    fontSize: "28.44px",
    fontWeight: 700,
    textAlign: "center",
    fontFeatureSettings: "'clig' off, 'liga' off",
  },
  // "&.Mui-disabled": {
  //   background: "rgba(243, 223, 217, 0.10)",
  //   color: "#ECCDC3",
  //   fontWeight: 600,
  //   lineHeight: "43.608px",
  // },
}));

const TabButton = styled(Button)(({ theme }) => ({
  "&.MuiButton-contained": {
    background: "rgba(243, 223, 217, 0.50)",
    color: "#F0916B",
    borderRadius: "13.272px",
    textTransform: "none",
    fontFamily: montserrat.style.fontFamily,
    fontSize: "28.44px",
    fontWeight: 700,
    textAlign: "center",
    fontFeatureSettings: "'clig' off, 'liga' off",
  },
  "&.Mui-disabled": {
    background: "rgba(243, 223, 217, 0.10)",
    color: "#ECCDC3",
    fontWeight: 600,
    lineHeight: "43.608px",
  },
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  "&.Mui-selected": {
    background: "rgba(243, 223, 217, 0.50)",
    color: "#F0916B",
    borderRadius: "13.272px",
    textTransform: "none",
    fontFamily: montserrat.style.fontFamily,
    fontSize: "28.44px",
    fontWeight: 700,
    textAlign: "center",
    fontFeatureSettings: "'clig' off, 'liga' off",
  },

  background: "rgba(243, 223, 217, 0.10)",
  color: "#ECCDC3",
  fontWeight: 600,
  lineHeight: "43.608px",
  borderRadius: "13.272px",
  textTransform: "none",
  fontFamily: montserrat.style.fontFamily,
  fontSize: "28.44px",
}));

const Heading = styled(Typography)(({ theme }) => ({
  color: "#58646A",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: montserrat.style.fontFamily,
  fontSize: "34.128px",
  fontWeight: 700,
  lineHeight: "43.608px",
}));

const Templates = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box style={{ marginTop: 25 }}>
      <Heading>Start Your Design</Heading>
      <Box display="flex" justifyContent="center" style={{ marginTop: 52 }}>
        <TabContext value={value}>
          <TamplatesTabList
            onChange={handleChange}
            TabIndicatorProps={{ style: { display: "none" } }}
          >
            <CustomTab label="Vanities" value="1" />

            <CustomTab
              style={{ margin: "0 32.23px" }}
              label="Lorem"
              value="2"
            />
            <CustomTab label="Ipsum" value="3" />
          </TamplatesTabList>

          {/* <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel> */}
        </TabContext>
        {/* <TabButton
          variant="contained"
          disabled={activeButton !== "button1"}
          onClick={() => setActiveButton("button1")}
        >
          Vanities
        </TabButton>
        <TabButton
          style={{ margin: "0 32.23px" }}
          variant="contained"
          disabled={activeButton !== "button2"}
          onClick={() => setActiveButton("button2")}
        >
          Lorem
        </TabButton>
        <TabButton
          variant="contained"
          disabled={activeButton !== "button3"}
          onClick={() => setActiveButton("button3")}
        >
          Ipsum
        </TabButton> */}
      </Box>
    </Box>
  );
};

export default Templates;
