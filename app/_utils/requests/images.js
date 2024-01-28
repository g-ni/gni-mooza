import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getPresignedUrl = async (imageDetails) => {
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

export const getTemplateInfo = async (templateDetails) => {
  const res = await axios.get(
    `${apiUrl}/api/images/getInitialTemplateInfo?company=${templateDetails.company}&furnitureType=${templateDetails.furnitureType}&model=${templateDetails.model}`
  );

  return res.data;
};
