import { createTheme } from "@mui/material/styles";

export const moozaTheme = createTheme({
  palette: {
    primary: {
      main: "#FE671F",
      light: "#F0916B",
    },
    secondary: {
      main: "#58646A",
      light: "#93A5AE",
    },
  },
});

// #FE671F start button + main heading
//#93A5AE paragraphs
//#58646A sub titles
//#F0916B tabs color
//rgba(243, 223, 217, 0.50) tabs bg
//#ECCDC3 inactive tab color
//rgba(243, 223, 217, 0.10) inactive tab bg
//rgb(240, 145, 107) template name
//rgb(128, 142, 150) template description
//rgb(241, 230, 226) template box bg
//rgb(207, 215, 219) projcts box bg

export const theme = createTheme({
  // components: {
  //   MuiTab: {
  //     styleOverrides: {
  //       textColorPrimary: "#146574",
  //       textColorSecondary: "#9b8e82",
  //       root: {
  //         textTransform: "none",
  //         "& .MuiSelected": "#146574",
  //       },
  //     },
  //   },
  //   MuiTabs: {
  //     defaultProps: {
  //       textColor: "#146574",
  //     },
  //   },
  // },
});
