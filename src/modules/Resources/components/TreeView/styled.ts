import styled from 'styled-components';

export const TreeContainer = styled.div`
  padding: 16px;
  border-right: solid 1px var(--cnx-separate-line);
  position: relative;

  .view-max {
    height: 95vh;
    width: 300px;
    overflow-x: auto;
    overflow-y: auto;
    fill: #ccc;
    color: #ccc;
  }

  .cnx-resources-loading {
    position: absolute;
    top: 50%;
    left: 30%;

    span {
      color: var(--cnx-secondary-text);
      font-size: medium;
    }
  }

  .view-min {
    padding-top: 10px;
    height: 100%;
    fill: var(--cnx-secondary-text);
    color: var(--cnx-secondary-text);
  }

  .tree-checkbox {
    margin-top: 4px;
  }

  .resource-icon {
    display: flex;
    vertical-align: center;
    gap: 10px;
    color: var(--cnx-secondary-text);
    font-weight: 400;
    margin-left: 3px;
    font-size: 16px;
  }

  .tree-resource-title {
    cursor: pointer;
  }

  .small {
    font-size: 14px;
  }

  .resource-view-max {
    height: 40px;
    color: var(--cnx-secondary-text);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    button {
      margin-right: 10px;
      border: 0;
      display: flex;
      align-items: center;
      background-color: transparent;
      font-size: 18px;
      color: var(--cnx-secondary-text);
      cursor: pointer;
    }

    h2 {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: normal;
      font-size: 18px;
    }
  }

  .resource-view-min {
    display: flex;
    flex-direction: column;
    gap: 20px;

    button {
      border: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      font-size: 18px;
      color: var(--cnx-secondary-text);
      cursor: pointer;
    }

    h2 {
      writing-mode: vertical-lr;
      text-orientation: upright;
      font-weight: normal;
      font-size: 18px;
    }
  }
`;
