import connect                  from 'react-redux/lib/components/connect'
import { newPlan }              from '../flux/actions/PlanCacheActions'
import NewPlan                  from '../components/NewPlan'

const mapStateToProps = (state, ownProps) => {
    return {
        error: state.default.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createPlan: (name) => {
            dispatch(newPlan(name));
        }
    }
};

const NewPlanContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewPlan);

export default NewPlanContainer;