import { Grid, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getImages,
  getPresignedUrl,
  getTemplateInfo,
} from "../_utils/requests/images";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/app/_utils/store/users";
import { newProject } from "@/app/_utils/store/projects";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getImagesByDetails } from "@/app/_utils/store/images";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import { TailSpin } from "react-loader-spinner";
import TemplateBox from "./TemplateBox";

const montserrat = Montserrat({
  style: "normal",
  subsets: ["latin"],
  weight: ["400", "700", "500"],
});

const SmallHeading = styled(Typography)(({ theme }) => ({
  color: "#93A5AE",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: montserrat.style.fontFamily,
  fontSize: 30,
  fontWeight: 500,
}));

const Vanities = () => {
  const dispatch = useDispatch();
  const { data } = useSession();
  const router = useRouter();
  const user = useSelector((state) => state.users.user);
  const images = useSelector((state) => state.images.images);

  const [preSignedImages, setPresignedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTemplatesHandler = async () => {
    let presignedArr = [];
    //looping through the images array and turning them to presigned urls
    for (let i = 0; i < images.length; i++) {
      const imageDetails = {
        bucket: process.env.NEXT_PUBLIC_AWS_TEMPLATES_BUCKET,
        key: images[i].Key,
        imageType: "template",
      };
      //the match method extracts the name of the image like this "mooza_A2_LD"
      const templateIdFullString = images[i].Key.match(/([^/]*)\.svg$/)[1];
      //this function extracts from this "mooza_A2_LD" to this "A2_LD"
      function extractDesiredPart(string) {
        const parts = string.split("_");
        console.log(parts);
        if (parts.length === 3) {
          // Case 1: "mooza_A2_LD"
          console.log(parts);
          return parts[1] + " " + parts[2];
        } else {
          // Case 2: "mooza_A3DS"
          return parts[1];
        }
      }

      const templateId = extractDesiredPart(templateIdFullString);
      const templateDetails = {
        company: "mooza",
        furnitureType: "vanity",
        model: templateIdFullString,
      };

      try {
        const imageUrl = await getPresignedUrl(imageDetails);
        const initialInfo = await getTemplateInfo(templateDetails);
        //presignedArr will be an array of objects, each object has the imageUrl and the templateId
        presignedArr.push({
          imageUrl,
          templateId,
          initialInfo,
        });
      } catch (error) {
        console.error(error);
      }
    }
    console.log(presignedArr);
    setPresignedImages(presignedArr);
    setIsLoading(false);
  };

  useEffect(() => {
    const templateDetails = {
      company: "mooza",
      furnitureType: "vanity",
    };
    //getImages returns the urls of the existing images of templates
    dispatch(getImagesByDetails(templateDetails));
  }, [dispatch]);

  useEffect(() => {
    if (images.length > 0) {
      getTemplatesHandler();
    }
  }, [images]);

  useEffect(() => {
    if (data) {
      dispatch(getUser(data.user.email));
    }
  }, [data, dispatch]);

  const onClickTemplate = (template) => {
    console.log(template);
    const chatId = uuidv4();
    const projectId = uuidv4();
    const templateId = template.templateId;
    console.log(templateId);
    if (user.UserId !== undefined || null) {
      const projectDetails = {
        userId: user.UserId,
        cutList: [],
        imageList: [],
        price: [],
        chatId: chatId,
        templateId: templateId,
        projectId: projectId,
        chat: [],
      };

      dispatch(newProject(projectDetails)).then(() => {
        router.push(`/chat/${projectId}`);
      });
    }
  };

  return (
    <Box width={1206} margin="auto">
      <SmallHeading style={{ margin: "55px 88px 55px" }}>
        Pick a template to start your design
      </SmallHeading>
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TailSpin visible color="#F0916B" />
        </div>
      ) : (
        <Grid container spacing={6.16} justifyContent="center">
          {preSignedImages.map((template, index) => {
            return (
              <Grid item key={index}>
                <TemplateBox
                  bgBox="#F1E6E2"
                  onClick={() => onClickTemplate(template)}
                  image={
                    <Image
                      src={template.imageUrl}
                      alt={`Image ${index + 1}`}
                      fill
                    />
                  }
                  text={
                    <>
                      <Typography
                        style={{
                          color: "#F0916B",
                          fontFeatureSettings: "'clig' off, 'liga' off",
                          fontFamily: montserrat.style.fontFamily,
                          fontSize: "24.648px",
                          fontWeight: 700,
                        }}
                      >
                        {template.templateId}
                      </Typography>
                      <Typography
                        style={{
                          color: "#808E96",
                          fontFeatureSettings: "'clig' off, 'liga' off",
                          fontFamily: montserrat.style.fontFamily,
                          fontSize: "22.752px",
                          fontWeight: 700,
                        }}
                      >
                        {" "}
                        Measures: H”, W”
                      </Typography>
                      <Typography
                        style={{
                          color: "#808E96",
                          fontFeatureSettings: "'clig' off, 'liga' off",
                          fontFamily: montserrat.style.fontFamily,
                          fontSize: "22.752px",
                          fontWeight: 700,
                        }}
                      >
                        {" "}
                        Starting from: {template.initialInfo.initial_price}{" "}
                        {template.initialInfo.currency}
                      </Typography>
                    </>
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default Vanities;
