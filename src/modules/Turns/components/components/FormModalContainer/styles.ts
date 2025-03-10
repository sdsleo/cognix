import styled from 'styled-components'


export const ContainerDynamic = styled.article`
  /* display: flex;
  gap: 8px; */
  border: 1px solid #ccc;
  padding: 20px;
  width: 92.2%;

  .actions{
    width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: flex-end;
  padding-top: 4px;

    .cnx-auth-level-header-action-button-calhab {
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--cnx-button-icon);
      border: none;

      &:hover {
        color: var(--cnx-secondary-text);
      }
    }
  }

  .inputs-container{
    display: flex;
    gap:8px
  }
`


