import * as actions from '../actions/index'
import * as constants from '../actions/constants/index'

describe('actions', () => {
    it('should create an action to receive forecasts', () => {
        let json = {};
        json.list = [];
        const expectedAction = {
            type: constants.RECEIVE_FORECAST,
            forecasts: json.list,
            receivedAt: Date.now()
        };
        expect(actions.receiveForecast(json)).toEqual(expectedAction)
    })
});