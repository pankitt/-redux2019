import React, {Component} from 'react';
import {getBets} from '../actions/bets';
import {connect} from 'react-redux';
import _ from 'lodash';
import BetsFilter from '../components/BetsFilter';

class Bets extends Component {
    componentDidMount() {
        this.props.getBets()
    }

    betsList = (arr) => {
        // const uniq = _.groupBy(arr, 'eventId');
        // console.log(uniq);

        return(
            _.map(arr, i => (
                <BetsFilter
                    key={i.id}
                    eventId={i.eventId}
                    outcames={i.outcames}
                />
            ))
        )
    };

    render() {
        const { bets } = this.props;
        const showBets = this.betsList(bets.items);

        return (
            <section>
                <h1>Bets</h1>
                <ul className="list-group">
                    {showBets}
                </ul>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bets: state.bets,
    }
};
const mapDispatchToProps = {
    getBets
};

export default connect(mapStateToProps, mapDispatchToProps)(Bets);