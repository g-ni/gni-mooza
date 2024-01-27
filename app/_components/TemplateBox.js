import { Box } from "@mui/material";
const TemplateBox = (props) => {
  return (
    <Box
      height={346}
      width={314}
      style={{ borderRadius: "13.272px", background: props.bgBox }}
    >
      <Box
        position="relative"
        height={221}
        width={304}
        bgcolor="#FFF"
        borderRadius="13.272px"
        top="4.74px"
        marginLeft="4.74px"
        style={{ cursor: "pointer" }}
        onClick={props.onClick}
        // onClick={() => onClickTemplate(template)}
      >
        {props.image}
      </Box>
      <Box marginTop="9.48px" marginLeft="13.27px">
        {props.text}
      </Box>
    </Box>
  );
};

export default TemplateBox;
