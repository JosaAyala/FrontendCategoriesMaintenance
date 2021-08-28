import styled from "styled-components";

export const LoginStyled = styled.div`
  width: 400px;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0 2mm 2mm black);
  background: #faf9f8;

  border: 0.5px solid #e1dfdd;
  border-radius: 8px;

  .LoginContainer {
    margin-top: 20px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;

    .ImgLogin {
      display: block;
      margin: auto;
      width: 150px;
    }

    .FieldsLogin {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }

    .ActionsLogin {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;
