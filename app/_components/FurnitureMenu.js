import SizeIcon from "@/public/SizeIcon.svg";
import ComponentsIcon from "@/public/ComponentsIcon.svg";
import StyleIcon from "@/public/StyleIcon.svg";
import AddOnsIcon from "@/public/AddOnsIcon.svg";
import { Box } from "@mui/material";
import Image from "next/image";
import { TabContext, TabPanel } from "@mui/lab";
import { FurnitureMenuTab, FurnitureMenuTabList } from "./CustomUI";
import { useState } from "react";

const FurnitureMenu = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      height="40px"
      bgcolor="#FFF"
    >
      <TabContext value={value}>
        <FurnitureMenuTabList
          onChange={handleChange}
          TabIndicatorProps={{ style: { display: "none" } }}
        >
          <FurnitureMenuTab value="1" icon={<Image src={SizeIcon} />} />

          <FurnitureMenuTab icon={<Image src={ComponentsIcon} />} value="2" />
          <FurnitureMenuTab icon={<Image src={StyleIcon} />} value="3" />
          <FurnitureMenuTab icon={<Image src={AddOnsIcon} />} value="4" />
        </FurnitureMenuTabList>

        {/* <TabPanel value="1">{value === "1" && <Vanities />}</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel> */}
      </TabContext>
    </Box>
  );
};

export default FurnitureMenu;
