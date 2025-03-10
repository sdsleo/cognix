export function useTheme(theme: string) {
    if (theme == 'dark') {
      document.documentElement.style.setProperty('--cnx-background-component', '#2d2d2d');
      document.documentElement.style.setProperty('--cnx-background-card-100', '#3c3c3d');
      document.documentElement.style.setProperty('--cnx-background-card-200', '#2a2a2b');
      document.documentElement.style.setProperty('--cnx-background-card-300', '#2d2d2d');
      document.documentElement.style.setProperty('--cnx-background-card-400', '#262626');
      document.documentElement.style.setProperty('--cnx-input-border', 'rgba(255, 255, 255, 0.3)');
      document.documentElement.style.setProperty('--cnx-input-placeholder-text', 'rgba(255, 255, 255, 0.3)');
      document.documentElement.style.setProperty('--cnx-input-text', '#ffffff');
      document.documentElement.style.setProperty('--cnx-input-icon', '#ffffff5e');
      document.documentElement.style.setProperty('--cnx-input-icon-background', 'rgba(255, 255, 255, 0.3)');
      document.documentElement.style.setProperty('--cnx-input-tag-background', 'rgba(128, 128, 128, 0.3)');
      document.documentElement.style.setProperty('--cnx-input-tag-text', 'rgba(255, 255, 255, 0.8)');
      document.documentElement.style.setProperty('--cnx-input-tag-border', 'rgba(202, 202, 202, 0.6)');
      document.documentElement.style.setProperty('--cnx-input-search-hover-option', '#ffffff2d');
      document.documentElement.style.setProperty('--cnx-input-selected-option', 'rgba(0, 0, 0, 0.1)');
      document.documentElement.style.setProperty('--cnx-primary-text', '#ffffff');
      document.documentElement.style.setProperty('--cnx-secondary-text', '#d6d6d6');
      document.documentElement.style.setProperty('--cnx-hint-text', 'rgba(255, 255, 255, 0.3)');
      document.documentElement.style.setProperty('--cnx-semi-transparent-button', 'rgba(255, 255, 255, 0.02)');
      document.documentElement.style.setProperty('--cnx-semi-transparent-button-hover', 'rgba(255, 255, 255, 0.05)');
      document.documentElement.style.setProperty('--cnx-semi-transparent-border-button', 'rgba(255, 255, 255, 0.3)');
      document.documentElement.style.setProperty('--cnx-nth-child-table-color', 'rgba(255, 255, 255, 0.027)');
      document.documentElement.style.setProperty('--cnx-action-button', '#1a73e8');
      document.documentElement.style.setProperty('--cnx-action-button-hover', '#1865ca');
      document.documentElement.style.setProperty('--cnx-save-button', '#5ab679');
      document.documentElement.style.setProperty('--cnx-save-button-hover', '#499663');
      document.documentElement.style.setProperty('--cnx-clear-button', '#ffffff0');
      document.documentElement.style.setProperty('--cnx-clear-button-hover', 'rgba(255, 255, 255, 0.05)');
      document.documentElement.style.setProperty('--cnx-button-icon', 'rgba(255, 255, 255, 0.4)');
      document.documentElement.style.setProperty('--cnx-separate-line', 'rgba(255, 255, 255, 0.2)');
    }

    if (theme == 'light') {
      document.documentElement.style.setProperty('--cnx-background-component', '#ffffff');
      document.documentElement.style.setProperty('--cnx-background-card-100', '#dfdfdf');
      document.documentElement.style.setProperty('--cnx-background-card-200', '#d2d1d1');
      document.documentElement.style.setProperty('--cnx-background-card-300', '#c0c0c0');
      document.documentElement.style.setProperty('--cnx-background-card-400', '#a9a9a9');
      document.documentElement.style.setProperty('--cnx-input-border', '#00000046');
      document.documentElement.style.setProperty('--cnx-input-placeholder-text', 'rgba(12, 12, 12, 0.5)');
      document.documentElement.style.setProperty('--cnx-input-text', '#0c0c0c');
      document.documentElement.style.setProperty('--cnx-input-icon', 'rgba(0, 0, 0, 0.369)');
      document.documentElement.style.setProperty('--cnx-input-icon-background', 'rgba(0, 0, 0, 0.3)');
      document.documentElement.style.setProperty('--cnx-input-tag-background', 'rgba(0, 0, 0, 0.1)');
      document.documentElement.style.setProperty('--cnx-input-tag-text', 'rgba(12, 12, 12, 0.8)');
      document.documentElement.style.setProperty('--cnx-input-tag-border', 'rgba(0, 0, 0, 0.275)');
      document.documentElement.style.setProperty('--cnx-input-search-hover-option', 'rgba(0, 0, 0, 0.05)');
      document.documentElement.style.setProperty('--cnx-input-selected-option', 'rgba(0, 0, 0, 0.09)');
      document.documentElement.style.setProperty('--cnx-primary-text', '#0c0c0c');
      document.documentElement.style.setProperty('--cnx-secondary-text', '#1d1d1d');
      document.documentElement.style.setProperty('--cnx-hint-text', 'rgba(12, 12, 12, 0.3)');
      document.documentElement.style.setProperty('--cnx-semi-transparent-button', 'rgba(0, 0, 0, 0.02)');
      document.documentElement.style.setProperty('--cnx-semi-transparent-button-hover', 'rgba(0, 0, 0, 0.05)');
      document.documentElement.style.setProperty('--cnx-semi-transparent-border-button', 'rgba(0, 0, 0, 0.275)');
      document.documentElement.style.setProperty('--cnx-nth-child-table-color', 'rgba(0, 0, 0, 0.027)');
      document.documentElement.style.setProperty('--cnx-action-button', '#1a73e8');
      document.documentElement.style.setProperty('--cnx-action-button-hover', '#1865ca');
      document.documentElement.style.setProperty('--cnx-save-button', '#5ab679');
      document.documentElement.style.setProperty('--cnx-save-button-hover', '#499663');
      document.documentElement.style.setProperty('--cnx-clear-button', '#ffffff0');
      document.documentElement.style.setProperty('--cnx-clear-button-hover', 'rgba(0, 0, 0, 0.05)');
      document.documentElement.style.setProperty('--cnx-button-icon', 'rgba(0, 0, 0, 0.4)');
      document.documentElement.style.setProperty('--cnx-separate-line', '#00000036');
    }
  };
