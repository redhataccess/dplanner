import React, { Component, PropTypes }  from 'react'
import Link                             from 'react-router/lib/Link'
import { browserHistory }               from 'react-router'
import connect                          from 'react-redux/lib/components/connect'
import cx                               from 'classnames'
import filter                           from 'lodash/filter';
import map                              from 'lodash/map';
import moment                           from 'moment'

import Form             from 'react-bootstrap/lib/Form'
import FormGroup        from 'react-bootstrap/lib/FormGroup'
import FormControl      from 'react-bootstrap/lib/FormControl'
import ControlLabel     from 'react-bootstrap/lib/ControlLabel'
import Row              from 'react-bootstrap/lib/Row'
import Col              from 'react-bootstrap/lib/Col'
import Alert            from 'react-bootstrap/lib/Alert'
import Tooltip          from 'react-bootstrap/lib/Tooltip'
import OverlayTrigger   from 'react-bootstrap/lib/OverlayTrigger'

import { loadPlan, loadCachedPlans } from '../flux/actions/PlanCacheActions'
import { PLANS_NOT_LOADED } from '../flux/constants/ActionTypes';
import { clearErrors }      from '../flux/actions/AnswerActions'
import Spacer               from './Spacer.jsx'
import Utils                from '../utils'

require('./Home.css');

const editPlanTooltip = (
    <Tooltip id="tooltip">Edit this plan</Tooltip>
);
const newPlanTooltip = (
    <Tooltip id="tooltip">Start a new plan</Tooltip>
);

class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.changePlans = this.changePlans.bind(this);
    }

    componentWillMount() {
        // If the plansStatus is not 'PLANS_LOADED', then we know this is an initial load and we have to load the
        // cached plans
        if (this.props.plansStatus === PLANS_NOT_LOADED) {
            this.props.loadCachedPlans();
        }

        // If the answers are null (fresh load) but we do have a uuid, then either attempt to load the plan from
        // cache or create a new one
        if (this.props.answers == null && this.props.uuid) {
            this.props.loadPlan(this.props.uuid, true);
        }
    }

    static renderDate(ms) {
        return moment(ms).format('MM/DD/YYYY');
    }

    static renderPlanDisplay(plan) {
        if (plan.name) return plan.name;
        return <span>Created {Home.renderDate(plan.created)}</span>;
    }

    changePlans(e) {
        const id = e.target.value;
        if (id !== this.props.uuid) {
            browserHistory.push(`${Utils.browserPath}/${id}/edit`);
            this.props.loadPlan(id);

        }
    }

    renderSavedOptions(plans) {
        const options = _.map(plans, p => {
            console.debug(`key: ${p.id}`);
            return (
                <option key={p.id} value={p.id}>{Home.renderPlanDisplay(p)}</option>
            )
        });

        // If we are creating a new plan
        if (window.location.pathname.match(/\/labs\/dplanner\/new/)) {
            console.debug(`key: new`);
            options.unshift(<option value="new">Select a Plan</option>);
        }
        return options;
    }

    renderSavedDropdown(plans) {
        if (!plans || plans.length === 0) return null;
        return (
            <Form inline={true}>
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel className="inline-label vertical-align-initial">Saved Plans</ControlLabel>
                    <FormControl componentClass="select" placeholder="select" value={this.props.uuid} onChange={this.changePlans}>
                        {this.renderSavedOptions(plans)}
                    </FormControl>
                    &nbsp;
                    <OverlayTrigger placement="top" overlay={editPlanTooltip}>
                        <Link  to={`${Utils.browserPath}/${this.props.uuid}/edit`}>
                            <i className="fa fa-cog pointer edit-plan" />
                        </Link>
                    </OverlayTrigger>
                    &nbsp;
                    <OverlayTrigger placement="top" overlay={newPlanTooltip}>
                        <Link  to={`${Utils.browserPath}/new`}>
                            <i className="fa fa-plus pointer new-plan" />
                        </Link>
                    </OverlayTrigger>
                    <Spacer />
                </FormGroup>
            </Form>
        );
    }

    renderLis(menuItems) {
        // Only display those items lte the current step
        const filteredMenuItems = filter(menuItems, (item) => (item.step <= this.props.maxStep) || (item.step <= this.props.step.step));
        return map(filteredMenuItems, item => {
            const liClassNames = cx({
                'li': true,
                'current': item.link === this.props.step.link,
                'step-active': item.link === this.props.step.link,
                'step-inactive': item.link !== this.props.step.link
            });

            return (
                <li key={item.step} className={liClassNames}>
                    <Link to={`${Utils.browserPath}/${this.props.uuid}/${item.link}`}>{item.title}</Link>
                </li>
            )
        });
    }

    renderSteps() {
        // If there is no uuid then we are on new, don't show anything
        if (!this.props.uuid) return null;

        return (
            <nav className="subnav subnav-progress">
                <Spacer />
                <ul>
                    {this.renderLis(Utils.menuItems)}
                </ul>
            </nav>
        )
    }

    renderError(error) {
        if (!error) return null;
        return (
            <div>
                <Spacer />
                <Alert bsStyle={error.bsStyle || "warning"} onDismiss={this.props.clearErrors}>{error.message}</Alert>
            </div>
        );
    }

    renderChildren(children) {
        // Don't render if there are not answers and the location isn't new
        if (!window.location.pathname.match(/\/labs\/dplanner\/new/) && !this.props.answers) return null;
        return children;
    }

    render() {
        if (this.props.answers == null && this.props.error) return this.renderError(this.props.error);
        return (
            <Row>
                <Col md={3} xs={12}>
                    {this.renderSavedDropdown(this.props.plans)}
                    {this.renderSteps()}
                </Col>
                <Col md={9} xs={12}>
                    {this.renderError(this.props.error)}
                    {this.renderChildren(this.props.children)}
                </Col>
            </Row>
        );
    }
}

Home.propTypes = {
    step: Utils.navigationShape,
    uuid: PropTypes.string,
    maxStep: PropTypes.number,
    answer: PropTypes.object,
    plans: PropTypes.array,
    plansStatus: PropTypes.string,
    emailAction: PropTypes.string,
    error: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        step: state.default.step,
        maxStep: state.default.maxStep,
        answers: state.default.answers,
        plans: state.default.plans,
        plansStatus: state.default.plansStatus,
        error: state.default.error,
        uuid: ownProps.params.uuid
    };
}

function mapDispatchToProps(dispatch) {
    return {
        clearErrors: () => {
            dispatch(clearErrors());
        },
        loadPlan: (uuid, newOnNull) => {
            dispatch(loadPlan(uuid, newOnNull));
        },
        loadCachedPlans: () => {
            dispatch(loadCachedPlans());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
