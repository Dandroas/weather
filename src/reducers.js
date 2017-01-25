import { combineReducers } from 'redux'
import * as constants from './actions/constants/index';

function forecasts(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case constants.INVALIDATE_FORECAST:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case constants.REQUEST_FORECAST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case constants.RECEIVE_FORECAST:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.forecasts,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

function forecast(state = { }, action) {
    switch (action.type) {
        case constants.INVALIDATE_FORECAST:
        case constants.RECEIVE_FORECAST:
        case constants.REQUEST_FORECAST:
            return Object.assign({}, state, {
                'city': forecasts(state['city'], action)
            });
        default:
            return state
    }
}

const rootReducer = combineReducers({
    forecast
});

export default rootReducer