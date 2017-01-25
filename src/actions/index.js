import fetch from 'isomorphic-fetch'
import * as constants from './constants/index';

const API_KEY = 'd2cb6dd7431854026e1a444ec4d58a73';
const WEATHER_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&units=metric`;


export function invalidateForecast() {
    return {
        type: constants.INVALIDATE_FORECAST
    }
}

export function requestForecast() {
    return {
        type: constants.REQUEST_FORECAST,
    }
}


export function receiveForecast(json) {
    return {
        type: constants.RECEIVE_FORECAST,
        forecasts: json.list,
        receivedAt: Date.now()
    }
}

export function fetchForecast() {
    const url = `${WEATHER_URL}&q=london,gb`;
    return dispatch => {
        dispatch(requestForecast());
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveForecast(json)))
    }
}
