import styled from "@emotion/styled";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  padding-left: 15px;
  background-color: white;
  margin-top: -1px;
  user-select: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  &:hover {
    background-color: #fafafa;
  }
`;

export default Container;