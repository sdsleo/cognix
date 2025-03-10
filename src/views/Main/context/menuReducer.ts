import { ACTIONS } from './menuActions';

const menuReducer = (state: any, action: any) => {
    switch (action.type) {
        case ACTIONS.SET_MENU_TAB_STATE:
            return {
                ...state,
                tabsState: action.payload
            }
        case ACTIONS.SET_FACTORY_PLANT:
            return {
                ...state,
                factoryPlant: action.payload
            }
        case ACTIONS.SET_THEME:
            return {
                ...state,
                theme: action.payload
            }
        case ACTIONS.SET_TAB_SESSION:
            return {
                ...state,
                tabSessionOn: action.payload
            }
        default:
            return state
    }
}

export default menuReducer;