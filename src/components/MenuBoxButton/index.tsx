import './styles.css';
import { IMenuBoxButton } from './types';

export function MenuBoxButton({ icon, title, fn }: IMenuBoxButton) {
    return (
        <button 
            type="button" 
            className='cnx-menu-box-button-cmbb' 
            onClick={() => fn()}
        >
            <span>{icon}</span>
            <span className='cnx-menu-box-title-cmbt'>{title}</span>
        </button>
    );
} 