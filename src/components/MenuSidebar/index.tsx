import { ReactElement } from "react";
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { menuSidebarList } from './menuSidebarList';
import './styles.css';

export function MenuSideBar() {

    const cnxMenuList: ReactElement[] = menuSidebarList();

    const matches = useMediaQuery('(min-width: 819px)');
    const matches2 = useMediaQuery('(max-height: 820px) and (max-width: 1180px)');
    const matches3 = useMediaQuery('(max-height: 1180px) and (max-width: 820px)');
    
    const addClass = () => {
        if(matches2) return;
        if(matches3) return;
        document.querySelector('.cnx-menu-sidebar-cms')!.classList.add('cnx-menu-side-bar-expanded-cmsbe')
    };
    const removeClass = () => {
        if(matches2) return;
        if(matches3) return;
        document.querySelector('.cnx-menu-sidebar-cms')!.classList.remove('cnx-menu-side-bar-expanded-cmsbe')
    };
    return (
        <div 
            className="cnx-menu-sidebar-cms" 
            onMouseOver={() => matches ? addClass() : null}
            onMouseOut={() => matches ? removeClass() : null}
        >
            <ul>
                {cnxMenuList?.map((item: ReactElement, index: number) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}