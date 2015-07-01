"use strict";
let React = require("react/addons");
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let ManufacturerStore = require("../../stores/manufacturer_store");
let Loader = require("../common/loader");
let Bluebird = require("bluebird");

let manufacturerStore = new ManufacturerStore();

let ManufacturerDetail = React.createClass({

    propTypes: {
        noTransition: React.PropTypes.bool,
        params: React.PropTypes.object
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
    getStateFromStore(name) {
        this.setState({loading: true});
        Bluebird.all([
            manufacturerStore.get(name)
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
    getClassNameForGrade(grade) {
        grade = grade ? Math.round(grade) : 100;
        let className = "badge--f";
        if (grade >= 90) {
            className = "badge--a";
        } else if (grade >= 80) {
            className = "badge--b";
        } else if (grade >= 70) {
            className = "badge--c";
        } else if (grade >= 60) {
            className = "badge--d";
        }
        return className;
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
        let detailId = this.props.params.detailId;
        if (detailId && this.state && this.state.detailId !== detailId) {
            this.setState({ detailId: detailId });
            this.getStateFromStore(detailId);
        }
    },

    buildDetailsPane() {
        let data = this.state.data || {};
        let name = data.name || "";
        let stats = data.stats || {};
        return (<div>
            { !this.state.loading && name ?
            <div key="manufacturer-details" className={"manufacturer-details"}>
                <h1>{decodeURIComponent(name)}</h1>
                <div className="row manufacturer-details__info">
                    <div className="col-3">
                        <div className="badge badge--drugs">
                            <div className="badge__circle">
                                <div className="badge__circle__number">
                                    { stats.totalDrugs }
                                </div>
                            </div>
                            <div className="badge__label">
                                Drugs
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className={"badge badge--grade badge--large " + this.getClassNameForGrade(stats.grade)}>
                            <div className="badge__circle">
                                <div className="badge__circle__number">
                                    { this.getLetterGradeForNumberGrade(stats.grade) }
                                </div>
                            </div>
                            <div className="badge__label">
                                DrugFax Rating<span className="asterisk">*</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="badge badge--incidents">
                            <div className="badge__circle">
                                <div className="badge__circle__number">
                                    { stats.totalIncidents }
                                </div>
                            </div>
                            <div className="badge__label">
                                Enforcements
                            </div>
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
