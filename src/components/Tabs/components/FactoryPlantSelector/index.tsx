import { useRef, useState, useContext } from 'react'

import { useOnClickOutside } from '../../../../hooks/useOnClickOutside';
import MenuContex from '../../../../views/Main/context/menuContex';
import ChevronDownMed from '../../../../assets/icons/FluentUI/SVGs/ChevronDownMed';
import json from '../../../MenuSidebar/menu.json';
import './styles.css';

export function FactoryPlantSelector() {
    const factoryPlantList: any = json;
    const { setFactoryPlant }: any = useContext(MenuContex);
    const [selectedFactoryPlant, setSelectedFactoryPlant] = useState(`${window.about.client}`);
    const ref = useRef(null);
    const handleClickOutside = () => {
        document.querySelector('.cnx-factory-plant-chevron-svg-cfpcs')?.classList.remove('cnx-factory-plant-chevron-svg-up-cfpcsu');
        document.querySelector('.cnx-factory-plant-ul-cfpu')?.classList.remove('cnx-factory-plant-ul-show-cfpus');
    }
    const handleToggle = () => {
        document.querySelector('.cnx-factory-plant-chevron-svg-cfpcs')?.classList.toggle('cnx-factory-plant-chevron-svg-up-cfpcsu');
        document.querySelector('.cnx-factory-plant-ul-cfpu')?.classList.toggle('cnx-factory-plant-ul-show-cfpus');
    }
    useOnClickOutside(ref, handleClickOutside);
    return (
        <div ref={ref} className='cnx-factory-plant-selector-container-cfpsc'>
            <div className='cnx-factory-plant-selector-cfps'>
                <span>{selectedFactoryPlant}</span>
                <button 
                    type='button'
                    onClick={() => handleToggle()}
                >
                    <span className='cnx-factory-plant-chevron-svg-cfpcs'>
                        <ChevronDownMed width='0.6rem' height='0.6rem' />
                    </span>
                </button>
            </div>
            <ul className='cnx-factory-plant-ul-cfpu'>
                {factoryPlantList?.data?.factoryPlants.map((factoryPlant: any) => (
                    <li className='cnx-factory-plant-li-cfpl'>
                        <button 
                            className='cnx-factory-plant-list-options-cfplo'
                            onClick={() => {
                                setSelectedFactoryPlant(factoryPlant?.plantName);
                                setFactoryPlant(factoryPlant);
                                handleClickOutside()
                            }}
                        >
                            <span>{factoryPlant?.plantName}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>

    );
} 