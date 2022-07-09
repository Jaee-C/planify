import { Button } from "reactstrap";
import styled from "@emotion/styled";

const MyButton = styled(Button)`
  &:focus {
    outline: none;
    box-shadow: none;
    border-width: medium;
  }
`;

export default MyButton;
