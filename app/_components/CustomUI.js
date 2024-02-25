import { styled } from "@mui/material/styles";
import { Montserrat, Inter } from "next/font/google";
import { Typography, Button, Tab, TextField } from "@mui/material";
import { TabList } from "@mui/lab";

const montserrat = Montserrat({
  style: "normal",
  subsets: ["latin"],
  weight: ["400", "700", "500"],
});

const inter = Inter({
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

export const FurnitureMenuTabList = styled(TabList)(({ theme }) => ({
  "&.MuiTabList-indicator": {
    background: "#F0B49C",
    borderRadius: "14px",
    width: "207px",
    height: "35px",
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

export const FurnitureMenuTab = styled(Tab)(({ theme }) => ({
  "&.Mui-selected": {
    background: "#F0B49C",
    borderRadius: "14px",
    width: "207px",
    height: "35px",
    minHeight: 0,
    color: "#1A2A39",
  },

  background: "#FFF",
  borderRadius: "14px",
  width: "207px",
  height: "35px",
  minHeight: 0,
  color: "#1A2A39",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: montserrat.style.fontFamily,
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "16px " /* 100% */,
}));

export const LogoTypography = styled(Typography)(({ theme }) => ({
  color: "#93A5AE",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: 20,
  fontWeight: 400,
  fontStyle: "normal",
  fontFamily: "Century Gothic",
}));

export const SmallHeading = styled(Typography)(({ theme }) => ({
  color: "#93A5AE",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: montserrat.style.fontFamily,
  fontSize: 30,
  fontWeight: 500,
}));

export const CustomizeHeading = styled(Typography)(({ theme }) => ({
  color: "#1A2A39",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: 18,
  fontWeight: 500,
  fontStyle: "normal",
  fontFamily: montserrat.style.fontFamily,
  wordWrap: "break-word",
  marginTop: 21,
  span: {
    color: "#FF661F",
    fontSize: 16,
    fontWeight: 700,
  },
}));

export const SizeDimensions = styled(Typography)(({ theme, isActive }) => ({
  color: isActive ? "#1A2A39" : "var(--Grays-86888D, #86888D)",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: 16,
  fontWeight: 500,
  fontStyle: "normal",
  fontFamily: montserrat.style.fontFamily,
}));

export const WidthButton = styled(Button)(({ theme }) => ({
  "&.MuiButton-contained": {
    borderRadius: "4px",
    background: "var(--Grays-F5F5F5, #F5F5F5)",
    minWidth: "24px",
    width: "24px",
    height: "24px",
    flexShrink: 0,
    color: "#1A2A39",
    textAlign: "center",
    fontFeatureSettings: "'case' on",
    fontFamily: inter.style.fontFamily,
    fontSize: "28px",
    fontStyle: "normal",
    fontWeight: 400,
    padding: 0,
  },
}));

export const WidthInput = styled(TextField)(({ theme }) => ({
  width: "40%",
  height: "24px",
  flexDirection: "row",
  input: {
    color: "#1A2A39",
    textAlign: "center",
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontSize: 16,
    fontWeight: 400,
    fontStyle: "normal",
    fontFamily: montserrat.style.fontFamily,
  },
}));

export const MinMax = styled(Typography)(({ theme }) => ({
  color: "#1A2A39",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: 12,
  fontWeight: 400,
  fontStyle: "normal",
  fontFamily: montserrat.style.fontFamily,
}));

export const ComponentsTabButton = styled(Button)(({ theme, buttonOpen }) => ({
  "&.MuiButton-contained": {
    borderRadius: "5px",
    background: buttonOpen ? "#F0B49C" : "#F1D7CD",
    width: "121px",
    height: buttonOpen ? "81px" : "29px",
    flexShrink: 0,
    color: "#1A2A39",
    textAlign: "center",
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: montserrat.style.fontFamily,
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    padding: 0,
    marginTop: "15px",
    textTransform: "none",
  },
}));
