import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getPresignedUrl = async (imageDetails) => {
  // console.log("IN PRESIGNED URL GET REQUEST 111!!!!!!!!!!!!!!!!!!");
  // console.log(imageDetails);
  // console.log(imageDetails.bucket);
  // console.log(imageDetails.key);
  const res = await axios.get(
    `${apiUrl}/api/images/getPresignedUrl?bucket=${imageDetails.bucket}&key=${imageDetails.key}&imageType=${imageDetails.imageType}`
  );
  return res.data;
};

export const getImages = async (templateDetails) => {
  const res = await axios.get(
    `${apiUrl}/api/images/getImages?company=${templateDetails.company}&furnitureType=${templateDetails.furnitureType}`
  );

  return res.data;
};
