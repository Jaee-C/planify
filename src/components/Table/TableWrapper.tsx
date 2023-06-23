import { Paper, styled } from "@mui/material";

const TableWrapper = styled(Paper)({
  "& .MuiPaper-root": {
    boxShadow: "none",
    border: 0,
    backgroundColor: "pink",
    width: "100%",
    marginBottom: "2rem",
  },
});

export default TableWrapper;
