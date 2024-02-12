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
      width="1302px"
      height="40px"
      bgcolor="#FFF"
      marginTop="79px"
      marginBottom="7px"
      borderRadius="14px"
    >
      <TabContext value={value}>
        <FurnitureMenuTabList
          onChange={handleChange}
          TabIndicatorProps={{ style: { display: "none" } }}
        >
          <FurnitureMenuTab
            value="1"
            icon={<Image src={SizeIcon} />}
            iconPosition="start"
            label="size"
          />

          <FurnitureMenuTab
            icon={<Image src={ComponentsIcon} />}
            iconPosition="start"
            value="2"
            label="components"
          />
          <FurnitureMenuTab
            icon={<Image src={StyleIcon} />}
            iconPosition="start"
            value="3"
            label="style"
          />
          <FurnitureMenuTab
            icon={<Image src={AddOnsIcon} />}
            iconPosition="start"
            value="4"
            label="add-ons"
          />
        </FurnitureMenuTabList>

        {/* <TabPanel value="1">{value === "1" && <Vanities />}</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel> */}
      </TabContext>
    </Box>
  );
};

export default FurnitureMenu;
