import connect                  from 'react-redux/lib/components/connect'
import Utils                    from '../../utils'
import { updateState }          from '../../flux/actions/AnswerActions'
import { modifyStep }           from '../../flux/actions/StepActions'
import StorageArchitecture      from '../../components/steps/StorageArchitecture'

const mapStateToProps = (state, ownProps) => {
    return {
        step: state.default.step,
        answers: state.default.answers,
        error: state.default.error,
        uuid: ownProps.params.uuid,
        prevStep: Utils.navigationLookup.NETWORKING_ARCHITECTURE,
        nextStep: Utils.navigationLookup.WORKLOAD_SCALING
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateState: (fieldValueObj, answers) => {
            dispatch(updateState({storageArchitecture: fieldValueObj}, answers));
        },
        modifyStep: (answers) => {
            dispatch(modifyStep(Utils.navigationLookup.STORAGE_ARCHITECTURE, answers));
        }
    }
};

const StorageArchitectureContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(StorageArchitecture);

export default StorageArchitectureContainer;