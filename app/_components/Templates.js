import { Box } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { useState } from "react";
import Vanities from "./Vanities";
import { TamplatesTabList, CustomTab, Heading } from "./CustomUI";

const Templates = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box style={{ marginTop: 25 }}>
      <Heading id="tabs">Start Your Design</Heading>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{ marginTop: 52 }}
      >
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

          <TabPanel value="1">{value === "1" && <Vanities />}</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Templates;
