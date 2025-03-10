import React, { useContext, useState } from 'react';

const MenuContext: any = React.createContext(null);
const MenuUpdateContext: any = React.createContext(null);

const FactoryPlantContext: any = React.createContext(null);
const FactoryPlantUpdateContext: any = React.createContext(null);

export function useMenu() {
    return useContext(MenuContext);
}

export function useMenuUpdate() {
    return useContext(MenuUpdateContext);
}

export function useFactoryPlant() {
    return useContext(FactoryPlantContext);
}

export function useFactoryPlantUpdate() {
    return useContext(FactoryPlantUpdateContext);
}

export function MenuProvider({ children }: any) {
    const [menuState, setMenuState]: any = useState([]);
    const [factoryPlant, setFactoryPlant]: any = useState('plantA');

    function toggleMenuState(state: any): any {
        setMenuState(state);
    }

    function togglesetFactoryPlant(state: any): any {
        setFactoryPlant(state);
    }

    return (
        <MenuContext.Provider value={menuState}>
            <MenuUpdateContext.Provider value={toggleMenuState}>
                <FactoryPlantContext.Provider value={factoryPlant}>
                    <FactoryPlantUpdateContext.Provider value={togglesetFactoryPlant}>
                        {children}
                    </FactoryPlantUpdateContext.Provider>
                </FactoryPlantContext.Provider>
            </MenuUpdateContext.Provider>
        </MenuContext.Provider>
    )
}