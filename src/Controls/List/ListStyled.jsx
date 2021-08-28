import styled from "styled-components";

export const ListStyled = styled.ol`
  height: 450px;
  width: 300px;
  background: #f3f2f1;
  overflow: scroll;
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  row-gap: 5px;

  li {
    list-style: none;
  }

  .ItemLi {
    margin-top: 5px;
    margin-left: 5px;
    margin-right: 5px;

    background: white;
    font-size: 16px;

    :hover {
      background: #e1dfdd;
    }
  }

  .ItemLiSelected {
    border: 2px dotted #004e8c;
  }
`;
