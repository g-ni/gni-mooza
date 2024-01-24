import AdvertisingPic from "@/public/AdvertisingPic.png";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { styled } from "@mui/material/styles";
import styles from "@/app/_styles/advertising.module.css";

const montserrat = Montserrat({
  style: "normal",
  subsets: ["latin"],
  weight: ["400"],
});

const AdvTypography = styled(Typography)(({ theme }) => ({
  color: "#FE671F",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: "51.225px",
  fontWeight: 400,
  fontStyle: "normal",
  lineHeight: "62.608px",
  fontFamily: montserrat.style.fontFamily,
}));
const StartButton = styled(Button)(({ theme }) => ({
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

const Advertising = () => {
  return (
    <Box style={{ marginTop: 64, marginBottom: 51 }}>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <AdvTypography
            style={{ marginTop: "55.72px", marginLeft: "63.56px" }}
          >
            Advertising space
            <br />
            <br />
            <span style={{ color: "#000" }}>Lorem Ipsum</span>
          </AdvTypography>
          <StartButton
            style={{ marginTop: 137, marginLeft: "154.74px" }}
            variant="contained"
          >
            Start Your Design
          </StartButton>
        </Box>
        <Box>
          <Image className={styles.advImg} src={AdvertisingPic} />
        </Box>
      </Box>
      <Box
        style={{
          width: "100%",
          height: "100%",
          paddingTop: 12.33,
          paddingBottom: 11.38,
          paddingLeft: 25.61,
          paddingRight: 24.66,
          justifyContent: "center",
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        <Typography
          style={{
            color: "#93A5AE",
            fontSize: 28.46,
            fontFamily: montserrat.style.fontFamily,
            fontWeight: "400",
            // lineHeight: 28.46,
            wordWrap: "break-word",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Box>
    </Box>
  );
};

export default Advertising;
