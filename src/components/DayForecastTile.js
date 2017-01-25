import React, { PropTypes, Component } from 'react'
import './tile.css';

export default class DayForecastTile extends Component {
    render() {
        return (
            <div className="tile">
                <div className="date">
                    {this.props.forecast.dt_txt}
                </div>
                <div className="temperature">
                    {this.props.forecast.main.temp}
                </div>
            </div>
        )
    }
}

DayForecastTile.propTypes = {
    forecast: PropTypes.object.isRequired
};