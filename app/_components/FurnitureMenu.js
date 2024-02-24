import SizeIcon from "@/public/SizeIcon.svg";
import ComponentsIcon from "@/public/ComponentsIcon.svg";
import StyleIcon from "@/public/StyleIcon.svg";
import AddOnsIcon from "@/public/AddOnsIcon.svg";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import { TabContext, TabPanel } from "@mui/lab";
import { FurnitureMenuTab, FurnitureMenuTabList } from "./CustomUI";
import { useState } from "react";
import SizeTab from "./SizeTab";
import ComponentsTab from "./ComponentsTab";
import StyleTab from "./StyleTab";
import AddOnsTab from "./AddOnsTab";

const FurnitureMenu = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <TabContext value={value}>
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
      </Box>
      <Grid
        bgcolor="#F1E6E2"
        width="151px"
        height="610px"
        boxShadow="0px 3.88px 5px 0px rgba(166, 163, 163, 0.10)"
        borderRadius="0px 0px 14px 14px"
        item
        style={{
          justifyContent: value === "2" && "center",
        }}
      >
        <TabPanel value="1">{value === "1" && <SizeTab />}</TabPanel>
        <TabPanel value="2">{value === "2" && <ComponentsTab />}</TabPanel>
        <TabPanel value="3">{value === "3" && <StyleTab />}</TabPanel>
        <TabPanel value="4">{value === "4" && <AddOnsTab />}</TabPanel>
      </Grid>
    </TabContext>
  );
};

export default FurnitureMenu;
