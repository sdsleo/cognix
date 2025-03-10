import { ICustomTheme } from '../types';

export function handleCustomTheme(customTheme: ICustomTheme) {
  customTheme.textPrimary
    ? document.documentElement.style.setProperty(
        '--cnx-color-text-primary',
        customTheme.textPrimary
      )
    : null;
  customTheme.textSecondary
    ? document.documentElement.style.setProperty(
        '--cnx-color-text-secondary',
        customTheme.textSecondary
      )
    : null;
  customTheme.textHint
    ? document.documentElement.style.setProperty(
        '--cnx-color-text-hint',
        customTheme.textHint
      )
    : null;
  customTheme.textDisable
    ? document.documentElement.style.setProperty(
        '--cnx-color-text-disabled',
        customTheme.textDisable
      )
    : null;
  customTheme.inputBackground
    ? document.documentElement.style.setProperty(
        '--cnx-color-input-background',
        customTheme.inputBackground
      )
    : null;
  customTheme.inputBorder
    ? document.documentElement.style.setProperty(
        '--cnx-color-input-border',
        customTheme.inputBorder
      )
    : null;
  customTheme.inputText
    ? document.documentElement.style.setProperty(
        '--cnx-color-input-text',
        customTheme.inputText
      )
    : null;
  customTheme.inputPlaceholder
    ? document.documentElement.style.setProperty(
        '--cnx-color-input-placeholder',
        customTheme.inputPlaceholder
      )
    : null;
  customTheme.buttonBorder
    ? document.documentElement.style.setProperty(
        '--cnx-color-button-border',
        customTheme.buttonBorder
      )
    : null;
  customTheme.buttonBackground
    ? document.documentElement.style.setProperty(
        '--cnx-color-button-background',
        customTheme.buttonBackground
      )
    : null;
  customTheme.buttonHoverBackground
    ? document.documentElement.style.setProperty(
        '--cnx-color-button-hover-background',
        customTheme.buttonHoverBackground
      )
    : null;
  customTheme.buttonIcon
    ? document.documentElement.style.setProperty(
        '--cnx-color-button-icon',
        customTheme.buttonIcon
      )
    : null;
  customTheme.buttonHintIcon
    ? document.documentElement.style.setProperty(
        '--cnx-color-button-hint-icon',
        customTheme.buttonHintIcon
      )
    : null;
  customTheme.buttonText
    ? document.documentElement.style.setProperty(
        '--cnx-color-button-text',
        customTheme.buttonText
      )
    : null;
  customTheme.buttonHintIcon
    ? document.documentElement.style.setProperty(
        '--cnx-color-button-hint-icon',
        customTheme.buttonHintIcon
      )
    : customTheme.buttonHintIcon;
  customTheme.nthChildTable
    ? document.documentElement.style.setProperty(
        '--cnx-color-nth-child-table',
        customTheme.nthChildTable
      )
    : customTheme.nthChildTable;
  customTheme.refreshButton
    ? document.documentElement.style.setProperty(
        '--cnx-color-refresh-button',
        customTheme.refreshButton
      )
    : null;
  customTheme.backgroundColor
    ? document.documentElement.style.setProperty(
        '--cnx-color-background-color',
        customTheme.backgroundColor
      )
    : null;
}
