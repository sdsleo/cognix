import { useId } from 'react';
import ChevronDownMed from '../../../../assets/icons/FluentUI/SVGs/ChevronDownMed'
import { IBoxProfileExpanded } from './types';
import './styles.css';

export function BoxProfileExpanded({ icon, title, children }: IBoxProfileExpanded) {
    const dataExpandedId = useId();
    const chevronId = useId();

    const hasChildrenCount = children?.length === undefined ? 1 : children?.length;
    const childrenCount = children ? hasChildrenCount : 0;

    const addClass = () => {
        const dataExpanded = document.getElementById(dataExpandedId)!.getAttribute('data-expanded');

        if (dataExpanded === 'false') {
            document.getElementById(dataExpandedId)!.setAttribute('data-expanded', 'true');
            document.getElementById(dataExpandedId)!.setAttribute('style', `height:${(childrenCount * 50) + 50}px; transition: 0.3s ease-in;`);
            document.getElementById(chevronId)?.classList.toggle('cnx-box-profile-chevron-svg-up-cbpcsu')
        } else {
            document.getElementById(dataExpandedId)!.setAttribute('data-expanded', 'false');
            document.getElementById(dataExpandedId)!.setAttribute('style', 'height:50px; transition: 0.3s ease-in;');
            document.getElementById(chevronId)?.classList.toggle('cnx-box-profile-chevron-svg-up-cbpcsu')
        }
    };

    return (
        <div 
            id={dataExpandedId} 
            data-expanded={'false'} 
            className={'cnx-expansive-profile-container-cepc'}
        >
            <button 
                type='button' 
                className='cnx-box-profile-button-cbpb'
                onClick={() => addClass()}
            >
                <div className='cnx-icon-title-container-citc'>
                    <span>{icon}</span>
                    <span className='cnx-box-profile-title-cbpt'>{title}</span>
                </div>
                <span id={chevronId} className='cnx-box-profile-chevron-svg-cbpcs'>
                    <ChevronDownMed width='0.6rem' height='0.6rem' />
                </span>
            </button>
            <div className='cnx-box-profile-background-expanded-cbpbe'>
                {children}
            </div>
        </div>
    );
} 