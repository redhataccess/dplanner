import connect                  from 'react-redux/lib/components/connect'
import { editPlan, deletePlan } from '../flux/actions/PlanCacheActions'
import EditPlan                 from '../components/EditPlan'

const mapStateToProps = (state, ownProps) => {
    return {
        answers: state.default.answers,
        error: state.default.error,
        uuid: ownProps.params.uuid
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateState: (fieldValueObj, answers) => {
            dispatch(editPlan(fieldValueObj, answers));
        },
        deletePlan: (id) => {
            dispatch(deletePlan(id));
        }
    }
};

const EditPlanContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPlan);

export default EditPlanContainer;