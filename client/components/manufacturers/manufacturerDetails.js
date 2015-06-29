"use strict";
let React = require("react/addons");
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let ManufacturerStore = require("../../stores/manufacturerStore");
let Loader = require("../common/loader");
let Bluebird = require("bluebird");

let manufacturerStore = new ManufacturerStore();

let ManufacturerDetail = React.createClass({

    propTypes: {
        location: React.PropTypes.object,
        noTransition: React.PropTypes.bool
    },

    getInitialState() {
        return {
            loading: true,
            data: null,
            name: null
        };
    },

    componentDidMount() {
        this.updateDisplayedManufacturer();
    },

    componentDidUpdate () {
        this.updateDisplayedManufacturer();
    },

    /**
     * Loads the state from the store
     */
    getStateFromStore(props) {
        this.setState({loading: true});
        Bluebird.all([
            manufacturerStore.get(props.name)
        ]).spread((manufacturer) => {
            this.setState({ loading: false, data: manufacturer });
        }).catch((err) => {
            console.log("error loading store data", err);
            this.setState({loading: false});
        });
    },

    /**
     * Gets an appropriate color for a percentage grade
     * @param {number} grade The grade to get a color for
     */
    getColorStyleForGrade(grade) {
        grade = grade ? Math.round(grade) : 100;
        let color = "#D32F2F";
        if (grade >= 90) {
            color = "#00B84C";
        } else if (grade >= 80) {
            color = "#8BC34A";
        } else if (grade >= 70) {
            color = "#FFC107";
        } else if (grade >= 60) {
            color = "#F57C00";
        }
        return {
            color: "white",
            backgroundColor: color
        };
    },

    /**
     * Returns an appropriate letter grade for a given percentage grade
     * @param {number} grade The grade to get a letter grade for
     */
    getLetterGradeForNumberGrade(grade) {
        grade = grade ? Math.round(grade) : 100;
        let letterGrade = "F";
        if (grade >= 90) {
            letterGrade = "A";
        } else if (grade >= 80) {
            letterGrade = "B";
        } else if (grade >= 70) {
            letterGrade = "C";
        } else if (grade >= 60) {
            letterGrade = "D";
        }

        if (grade >= 60 && (grade % 10) >= 7) {
            letterGrade += "+";
        }
        return letterGrade;
    },

    /**
     * Updates the manufactuer that is being displayed and loads the data from services
     */
    updateDisplayedManufacturer() {
        let { query } = this.props.location;
        let name = query && query.name;
        if (name && this.state && this.state.name !== name) {
            this.setState({ name: name });
            this.getStateFromStore({
                name: name
            });
        }
    },

    buildDetailsPane() {
        let data = this.state.data || {};
        let name = data.name || "";
        let stats = data.stats || {};
        return (<div>
            { !this.state.loading && name ?
            <div key="manufacturer-details" className={"manufacturer-details"}>
                <h1>{name}</h1>
                <div className="row manufacturer-details__info">
                    <div className="col-3 badge info__drugs">
                        <div className="badge__number">
                            { stats.totalDrugs }
                        </div>
                        <div className="badge__label">
                            Drugs
                        </div>
                    </div>
                    <div className="col-3 badge info__badge" style={this.getColorStyleForGrade(stats.grade)}>
                        <div className="badge__number">
                            { this.getLetterGradeForNumberGrade(stats.grade) }
                        </div>
                        <div className="badge__label" style={this.getColorStyleForGrade(stats.grade)}>
                            DrugFax Rating<span className="asterisk">*</span>
                        </div>
                    </div>
                    <div className="col-3 badge info__events">
                        <div className="badge__number">
                            { stats.totalIncidents }
                        </div>
                        <div className="badge__label">
                            Enforcements
                        </div>
                    </div>
                </div>
            </div> : null
        }
        { this.state.loading ? <Loader/> : null }
        </div>);
    },
    render() {
        return (
            <div>
                { !this.props.noTransition ?
                    <ReactCSSTransitionGroup component="div" transitionName="transition" transitionAppear={true}>
                        { this.buildDetailsPane() }
                    </ReactCSSTransitionGroup>
                    : this.buildDetailsPane()
                }
            </div>
        );
    }
});
module.exports = ManufacturerDetail;
