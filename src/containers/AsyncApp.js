import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetchForecast, invalidateForecast} from '../actions/index'
import ForecastPanel from '../components/ForecastPanel'

class AsyncApp extends Component {
    constructor(props) {
        super(props);
        this.handleRefreshClick = this.handleRefreshClick.bind(this)

    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchForecast())
    }

    handleRefreshClick(e) {
        e.preventDefault();

        const {dispatch} = this.props;
        dispatch(invalidateForecast());
        dispatch(fetchForecast());
    }

    render() {
        const {forecasts, isFetching, lastUpdated} = this.props;
        return (
            <div>
                <p>
                    {lastUpdated &&
                    <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                        {' '}
            </span>
                    }
                    {!isFetching &&
                    <a href='#'
                       onClick={this.handleRefreshClick}>
                        Refresh
                    </a>
                    }
                </p>
                {isFetching && forecasts.length === 0 &&
                <h2>Loading...</h2>
                }
                {!isFetching && forecasts.length === 0 &&
                <h2>Empty.</h2>
                }
                {forecasts.length > 0 &&
                <div style={{opacity: isFetching ? 0.5 : 1}}>
                    <ForecastPanel forecasts={forecasts}/>
                </div>
                }
            </div>
        )
    }
}

AsyncApp.propTypes = {
    forecasts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {forecast} = state;
    const {
        isFetching,
        lastUpdated,
        items: forecasts
    } = forecast['city'] || {
        isFetching: true,
        items: []
    };

    return {
        forecasts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(AsyncApp)