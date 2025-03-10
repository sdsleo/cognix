import { useId } from 'react';
import ChevronDownMed from '../../assets/icons/FluentUI/SVGs/ChevronDownMed'
import { IMenuExpandBoxButton } from './types';
import './styles.css';

export function MenuExpandBoxButton({ icon, title, children }: IMenuExpandBoxButton) {
    const dataExpandedId = useId();
    const chevronId = useId();

    const hasChildrenCount = children?.length === undefined ? 1 : children?.length;
    const childrenCount = children ? hasChildrenCount : 0;

    const addClass = () => {
        const dataExpanded = document.getElementById(dataExpandedId)!.getAttribute('data-expanded');

        if (dataExpanded === 'false') {
            document.getElementById(dataExpandedId)!.setAttribute('data-expanded', 'true');
            document.getElementById(dataExpandedId)!.setAttribute('style', `height:${(childrenCount * 50) + 50}px; transition: 0.3s ease-in;`);
            document.getElementById(chevronId)?.classList.toggle('cnx-menu-chevron-svg-up-cmcsu')
        } else {
            document.getElementById(dataExpandedId)!.setAttribute('data-expanded', 'false');
            document.getElementById(dataExpandedId)!.setAttribute('style', 'height:50px; transition: 0.3s ease-in;');
            document.getElementById(chevronId)?.classList.toggle('cnx-menu-chevron-svg-up-cmcsu')
        }
    };

    return (
        <div 
            id={dataExpandedId} 
            data-expanded={'false'} 
            className={'cnx-expansive-menu-container-cemc'}
        >
            <button 
                type='button' 
                className='cnx-menu-expand-box-button-cmebb'
                onClick={() => addClass()}
            >
                <div className='cnx-icon-title-container-citc'>
                    <span>{icon}</span>
                    <span className='cnx-menu-expand-box-title-cmebt'>{title}</span>
                </div>
                <span id={chevronId} className='cnx-menu-chevron-svg-cmcs'>
                    <ChevronDownMed width='0.6rem' height='0.6rem' />
                </span>
            </button>
            <div className='cnx-menu-background-expanded-cmbe'>
                {children}
            </div>
        </div>
    );
} 