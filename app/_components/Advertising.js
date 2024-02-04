import AdvertisingPic from "@/public/AdvertisingPic.png";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import styles from "@/app/_styles/advertising.module.css";
import Link from "next/link";
import { AdvTypography, StartButton } from "./CustomUI";

const montserrat = Montserrat({
  style: "normal",
  subsets: ["latin"],
  weight: ["400"],
});

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
          <Link href="#tabs">
            <StartButton
              style={{ marginTop: 137, marginLeft: "154.74px" }}
              variant="contained"
            >
              Start Your Design
            </StartButton>
          </Link>
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
