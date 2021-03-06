import React, {Component} from 'react';
import {setCommand} from '../actions/commands';
import {connect} from "react-redux";

const category = [
    {id:1, title:'NHL'},
    {id:2, title:'CHL'},
    {id:3, title:'KHL'},
];
const item = [
    {id:1, command:'Boston Bruins', category: [{id:1, title:'NHL'}]},
    {id:2, command:'St. Louis Blues', category: [{id:1, title:'NHL'}]},
    {id:3, command:'Red Bull München', category: [{id:2, title:'CHL'}]},
    {id:4, command:'Frölunda HC', category: [{id:2, title:'CHL'}]},
    {id:5, command:'Avangard Omsk', category: [{id:3, title:'KHL'}]},
    {id:6, command:'CSKA Moscow', category: [{id:3, title:'KHL'}]},
    {id:7, command:'Medveščak Zagreb', category: [{id:2, title:'CHL'}, {id:3, title:'KHL'}]},
];

class Sport extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: category,
            item: item,
            filter: null
        }
    }

    setFilter = (e) => {
        this.setState({
            filter: e
        });
    };

    commandList = (arr) => {
        const {filter} = this.state;
        const filterArr = filter ? arr.filter(i => i.category.find(i => i.title  === filter)) : arr;

        return filterArr.map(i => (
            <li key={i.id}>
                <button className={`btn btn-sm btn-outline-dark mt-1`} onClick={() => this.props.setCommand(i)}>{i.command}</button>
            </li>
        ))
    };

    render() {
        const {category, item} = this.state;
        const filterItems = item ? this.commandList(item) : null;

        return (
            <section>
                <div className="btn-group">
                    <button className="btn btn-primary" onClick={() => this.setFilter()}>
                        ALL
                    </button>
                    {category.map(i => (
                        <button key={i.id} className="btn btn-primary" onClick={(e) => this.setFilter(i.title, e)}>
                            {i.title}
                        </button>
                    ))}
                </div>
                <ul>
                    {filterItems}
                </ul>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        commands: state.commands,
    }
};
const mapDispatchToProps = {
    setCommand,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sport);