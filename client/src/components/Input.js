import { Input } from "reactstrap";
import styled from "@emotion/styled";

const MyInput = styled(Input)`
  &:focus {
    outline: none;
    box-shadow: none;
    border-width: medium;
  }
`

export default MyInput;