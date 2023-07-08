import { Select, styled } from "@mui/material";

const StyledSelect = styled(Select)(() => ({
  "& .MuiInputBase-input": {
    padding: "15.5px 14px",
    color: "rgb(18, 25, 38)",
    backgroundColor: "rgb(248, 250, 252)",
    fontWeight: 500,
    borderRadius: 8,
    fontSize: "0.875rem",
  },
  "&.MuiInputBase-root": {
    borderRadius: "8px",
    padding: 0,
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.875rem",
  },
  "&.Mui-focused": {
    color: "rgb(33, 150, 243)",
  },
}));

export default StyledSelect;
