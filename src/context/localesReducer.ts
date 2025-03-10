import { ACTIONS } from './localesActions';
import { ILocales, IActions } from '../locales/types';

const localesReducer = (state: ILocales, action: IActions) => {
    switch (action.type) {
        case ACTIONS.SET_CURRENT_LAGUANGE:
            return {
                ...state,
                currentLanguage: action.payload
            }
        case ACTIONS.SET_LOCALES_DATA:
            return {
                ...state,
                localesData: action.payload
            }
        default:
            return state
    }
}

export default localesReducer;