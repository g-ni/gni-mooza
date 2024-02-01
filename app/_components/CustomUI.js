import { styled } from "@mui/material/styles";
import { Montserrat } from "next/font/google";
import { Typography, Button, Tab } from "@mui/material";
import { TabList } from "@mui/lab";

const montserrat = Montserrat({
  style: "normal",
  subsets: ["latin"],
  weight: ["400", "700", "500"],
});

export const Heading = styled(Typography)(({ theme }) => ({
  color: "#58646A",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: montserrat.style.fontFamily,
  fontSize: "34.128px",
  fontWeight: 700,
  lineHeight: "43.608px",
}));

export const AdvTypography = styled(Typography)(({ theme }) => ({
  color: "#FE671F",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: "51.225px",
  fontWeight: 400,
  fontStyle: "normal",
  lineHeight: "62.608px",
  fontFamily: montserrat.style.fontFamily,
}));
export const StartButton = styled(Button)(({ theme }) => ({
  "&.MuiButton-contained": {
    background: "#FE671F",
    borderRadius: "13.28px",
    // width: "258.022px",
    height: "79.683px",
    flexShrink: 0,
    textTransform: "none",
    fontFamily: montserrat.style.fontFamily,
    fontSize: 26,
    fontWeight: 700,
    textAlign: "center",
    // lineHeight: 30,
  },
}));

export const TamplatesTabList = styled(TabList)(({ theme }) => ({
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
}));

export const CustomTab = styled(Tab)(({ theme }) => ({
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
