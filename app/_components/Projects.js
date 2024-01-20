import styles from "../_styles/project.module.css";
import { DM_Sans } from "next/font/google";
import { Tabs, Tab, Skeleton, Box } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { getProjectsByUserId } from "@/app/_utils/store/projects";
import { getUser } from "@/app/_utils/store/users";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import SwiperSlider from "./SwiperSlider";
import { postRegister } from "../_utils/requests/auth";
import Vanities from "./Vanities";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const dmFont = DM_Sans({
  style: ["normal"],
  subsets: ["latin"],
  weight: ["700", "500"],
});

const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  color: "#9b8e82",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: dmFont.style.fontFamily,
  fontSize: 20,
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: 20,

  "&.Mui-selected": {
    color: "#146574",
  },
}));

const CustomTabs = styled(Tabs)(({ theme }) => ({
  marginTop: 10,
  "& .MuiTabs-indicator": {
    backgroundColor: "#146574",
  },
}));

const CustomTabList = styled(TabList)(({ theme }) => ({
  marginTop: 10,
  "& .MuiTabs-indicator": {
    backgroundColor: "#146574",
  },
}));

const Projects = () => {
  const [activeTab, setActiveTab] = useState("1");
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const { data } = useSession();
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    if (data) {
      const obj = {
        email: data.user.email,
        password: "password",
      };
      postRegister(obj).then(() => {
        dispatch(getUser(data.user.email)).then((result) => {
          dispatch(getProjectsByUserId(result.payload.UserId));
        });
      });
    }
  }, [dispatch, data]);

  const onChangeTab = (event, value) => {
    setActiveTab(value);
  };
  return (
    <div>
      <div className={styles.mainDiv}>
        <h2 className={`${styles.header} ${dmFont.className}`}>
          Browse for Your Best Design
        </h2>
        <Box sx={{ width: "100%" }}>
          <TabContext value={activeTab}>
            <Box /*sx={{ borderBottom: 1, borderColor: "divider" }}*/>
              <CustomTabList onChange={onChangeTab} centered>
                <CustomTab
                  className={`${styles.tab} ${dmFont.className}`}
                  label="Recent Projects"
                  value="1"
                />
                <CustomTab
                  className={`${styles.tab} ${dmFont.className}`}
                  label="Closets"
                  value="2"
                />
                <CustomTab
                  className={`${styles.tab} ${dmFont.className}`}
                  label="TV Consoles"
                  value="3"
                />
                <CustomTab
                  className={`${styles.tab} ${dmFont.className}`}
                  label="Vanities"
                  value="4"
                />
              </CustomTabList>
            </Box>
            <TabPanel value="1">
              <SwiperSlider projects={projects ? projects : null} />
            </TabPanel>
            <TabPanel value="2">Closets</TabPanel>
            <TabPanel value="3">TV Consoles</TabPanel>
            <TabPanel value="4">
              <Vanities />
            </TabPanel>
          </TabContext>
        </Box>

        {/* <CustomTabs value={activeTab} onChange={onChangeTab} centered>
          <CustomTab
            className={`${styles.tab} ${dmFont.className}`}
            label="Recent Projects"
            tabIndex={0}
            color={activeTab === 0 ? "primary" : "secondary"}
          />
          <CustomTab
            className={`${styles.tab} ${dmFont.className}`}
            label="Closets"
            tabIndex={1}
          />
          <CustomTab
            className={`${styles.tab} ${dmFont.className}`}
            label="TV Consoles"
            tabIndex={2}
          />
          <CustomTab
            className={`${styles.tab} ${dmFont.className}`}
            label="Vanities"
            tabIndex={3}
          />
        </CustomTabs> */}
        <div className={styles.text}>
          <p>
            Unleash Your Creativity and Discover the Perfect Furniture for Your
            Space!
            <br /> Browse our selection of Kitchen, Closets, and Cabinets, and
            effortlessly <br /> bring your dream design to life.
          </p>
        </div>
      </div>
      {/* {data && activeTab === 0 ? (
        <SwiperSlider projects={projects ? projects : null} />
      ) : null}
      {activeTab === 3 && <Vanities />} */}
    </div>
  );
};

export default Projects;
