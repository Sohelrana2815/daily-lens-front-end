import { useContext } from "react";
import { ThemeContext } from "../Components/ThemeProvider/ThemeProvider";

const useTheme = () => {
  const themeContext = useContext(ThemeContext);
  return themeContext;
};

export default useTheme;
