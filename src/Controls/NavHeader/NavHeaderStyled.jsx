import styled from "styled-components";

export const NavHeaderStyled = styled.div`
  height: 60px;
  background: #0078d4;
  width: 100%;

  .NavContent {
    display: grid;
    grid-template-columns: 400px calc(100vw - 710px) 300px;
    column-gap: 5px;

    .ContentTitle {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      align-content: center;
      padding-left: 10px;

      .Title {
        color: white;
        font-size: 18px;
      }
    }

    .NavContainer {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;

      ol,
      li {
        text-decoration: none;
        list-style: none;
        font-size: 18px;
        font-weight: 700;

        .Link {
          text-decoration: none;
          color: white;
        }
      }

      .NavItem {
        :hover {
          font-weight: 900;
          transform: translateY(-5px);
          filter: drop-shadow(3px 2px 2px black);
          transition: all 0.5s;
        }
      }
    }

    .Actions {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;

      .IconButton {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        color: white;
        font-size: 18px;
        :hover {
          color: #0078d4;
        }
      }
    }
  }
`;
