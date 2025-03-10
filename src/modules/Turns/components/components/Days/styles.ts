import styled from "styled-components";

export const AuthLevelContainer = styled.div`
  width: 100%;
  height: calc(100vh - 210px);
  display: flex;
  flex-direction: column;
  gap: 15px;

  .cnx-auth-level-span-cals {
    color: var(--cnx-secondary-menu-text);
    font-size: 0.85rem;
    font-weight: 400;
  }
`;

export const FixedFormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 1px solid var(--cnx-input-border);
  padding-bottom: 15px;

  .cnx-auth-level-input-container-calic {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .cnx-auth-level-action-buttons-container-calabc {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  .cnx-auth-level-action-button-calab {
    height: 33px;
    padding-left: 8px;
    padding-right: 8px;
    background-color: var(--cnx-semi-transparent-button);
    border: 1px solid var(--cnx-semi-transparent-border-button);
    border-radius: 3px;
    color: var(--cnx-secondary-menu-text);
    font-size: 0.9rem;
    cursor: pointer;

    &:hover {
      background-color: var(--cnx-semi-transparent-button-hover);
    }
  }
`;

export const DynamicFormContainer = styled.div`
  width: 100%;
  height: 100% !important;
  display: flex;
  gap: 8px;
  flex-direction: column;
  overflow-y: auto !important;

  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  .cnx-auth-level-form-item-calfi {
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--cnx-semi-transparent-border-button);
    border-radius: 3px;
    padding: 0px 10px 10px 10px;
    gap: 8px;
  }

  .cnx-auth-level-background-disable-calbd {
    background-color: var(--cnx-semi-transparent-button);
  }

  .cnx-auth-level-minus-width-text-calmwt {
    width: 193px !important;
    height: 33px;
    background-color: transparent;
    border-radius: 3px;
    border: solid 1px var(--cnx-input-border);
    color: var(--cnx-primary-text);
    padding-left: 8px;
  }

  .cnx-auth-level-minus-width-calmw {
    width: 193px !important;
  }

  .cnx-auth-level-input-container-calic {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .cnx-auth-level-action-buttons-container-calabc {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  .cnx-auth-level-action-button-calab {
    height: 33px;
    padding-left: 8px;
    padding-right: 8px;
    background-color: var(--cnx-semi-transparent-button);
    border: 1px solid var(--cnx-semi-transparent-border-button);
    border-radius: 3px;
    color: var(--cnx-secondary-menu-text);
    font-size: 0.9rem;
    cursor: pointer;

    &:hover {
      background-color: var(--cnx-semi-transparent-button-hover);
    }
  }
`;

export const HeaderActions = styled.div`
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
`;
