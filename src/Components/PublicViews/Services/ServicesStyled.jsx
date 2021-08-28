import styled from "styled-components";

export const ServicesStyled = styled.div`
  width: 85%;
  margin: auto;

  .ContainerListServices {
    display: grid;
    grid-template-columns: 30% 70%;

    .Img {
      width: auto;
    }

    .ListServices {
      display: flex;
      flex-direction: column;
      row-gap: 2px;

      .ItemList {
        display: flex;
        flex-direction: row;
        column-gap: 10px;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
`;
