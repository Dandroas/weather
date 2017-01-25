import React, { PropTypes, Component } from 'react'
import DayForecastTile from './DayForecastTile';
import './panel.css';

export default class ForecastPanel extends Component {

    createDaily() {
        let count = 0;
        return this.props.forecasts.map((forecast) => {
            count++;
            return <DayForecastTile key={count} forecast={forecast}/>
        });
    };

    render() {
        return (
            <body>
                <h1>London</h1>
                <div className="panel">{this.createDaily()}</div>
            </body>
        )
    }
}

ForecastPanel.propTypes = {
    forecasts: PropTypes.array.isRequired
};