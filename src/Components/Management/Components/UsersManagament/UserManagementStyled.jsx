import styled from "styled-components";

export const UserManagementStyled = styled.div`
  .ContainerUsers {
    background: #f3f2f1;
    height: 400px;
    overflow: auto;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 10px;
    padding-left: 10px;
    width: 700px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 10px;

    .CardItem {
      background: white;
      border-radius: 9px;
      color: black;
      padding-top: 5px;
      padding-bottom: 5px;
      padding-right: 5px;
      padding-left: 5px;
      height: min-content;

      .CardHeader {
        font-size: 14pt;
      }

      .CardBody {
        display: flex;
        flex-direction: column;
        row-gap: 5px;
        border-top: solid 1px #0078d4;
        border-bottom: solid 1px #0078d4;
        margin-top: 5px;
        margin-bottom: 5px;
      }

      .CardFooter {
        display: flex;
        flex-direction: row;
        column-gap: 5px;
        margin-top: 5px;
        margin-bottom: 5px;
      }
    }
  }
`;
