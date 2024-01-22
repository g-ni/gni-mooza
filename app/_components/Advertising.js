import AdvertisingPic from "@/public/AdvertisingPic.png";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { styled } from "@mui/material/styles";

const montserrat = Montserrat({
  style: "normal",
  subsets: ["latin"],
  weight: ["400"],
});

const AdvTypography = styled(Typography)(({ theme }) => ({
  color: "#93A5AE",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: 20,
  fontWeight: 400,
  fontStyle: "normal",
  lineHeight: 18,
  fontFamily: "Century Gothic",
}));

const Advertising = () => {
  return (
    <Box display="flex">
      <Box></Box>
      <Box>
        <Image src={AdvertisingPic} />
      </Box>
    </Box>
  );
};

export default Advertising;
