import React from 'react';
import FiltersBar from './FiltersBar';
import NavBar from './NavBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getStats, setFilter } from '../store/actions';

class Header extends React.Component {
    static propTypes = {
        getStats: React.PropTypes.func,
        setUsers: React.PropTypes.func,
        setBbox: React.PropTypes.func,
        setDateFrom: React.PropTypes.func,
        setDateTo: React.PropTypes.func,
        setTags: React.PropTypes.func,
        filters: React.PropTypes.object,
        stats: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            showFiltersBar: false,
            selectedFilter: null,
            sticky: false
        }
    }
    componentDidMount() {
        window.addEventListener("scroll",() => {
            const scroll = document.body.scrollTop;
            if (scroll >= 54 && !this.state.sticky) {
                this.setState({
                    sticky : true,
                })
            }
            if (scroll < 54 && this.state.sticky) {
                this.setState({
                    sticky: false,
                });
            }
        });
    }

    toggleTags = () => {
        if (this.state.selectedFilter === 'tags') {
            return this.setState({ selectedFilter: null });
        }
        this.setState({ selectedFilter: 'tags'});
    }

    toggleUsers = () => {
        if (this.state.selectedFilter === 'users') {
            return this.setState({ selectedFilter: null });
        }
        this.setState({ selectedFilter: 'users' });
    }

    toggleDate = () => {
        if (this.state.selectedFilter === 'date') {
            return this.setState({ selectedFilter: null });
        }
        this.setState({ selectedFilter: 'date' });
    }

    toggleBbox = () => {
        if (this.state.selectedFilter === 'bbox') {
            return this.setState({ selectedFilter: null });
        }
        this.setState({ selectedFilter: 'bbox' });
    }

    onChange = (filters, preventGetStats) => {
        this.props.setFilter(filters);
        this.props.getStats(filters);
    }

    render() {
        const topTags = this.props.stats.data && this.props.stats.data.getEdits().topTags;
    
        return (
            <div id="header" className={`${this.state.sticky ? '': 'border-b border--gray-light'}`}>
                <NavBar
                    toggleDate={this.toggleDate}
                    toggleUsers={this.toggleUsers}
                    toggleTags={this.toggleTags}
                    toggleBbox={this.toggleBbox}
                    selectedFilter={this.state.selectedFilter}
                    filters={this.props.filters}
                    sticky={this.state.sticky}
                    loading={this.props.stats.loading}
                    timeOfReceive={this.props.stats.timeOfReceive}
                    />
                <div className="grid flex-parent--row-reverse">
                    {this.state.selectedFilter ?
                        <FiltersBar
                            selectedFilter={this.state.selectedFilter}
                            filterValues={this.props.filters}
                            onChange={this.onChange}
                            onBlur={this.onBlur}
                            sticky={this.state.sticky}
                            topTags={topTags || []}
                        /> : null
                    }
                </div>
            </div>
        );
    }
}

Header = connect(state => state, (dispatch) => ({
    ...bindActionCreators({ getStats, setFilter }, dispatch)
}))(Header);

export default  Header;
