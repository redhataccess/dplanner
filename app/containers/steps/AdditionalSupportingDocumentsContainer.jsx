import connect                              from 'react-redux/lib/components/connect'
import Utils                                from '../../utils'
import { updateState }                      from '../../flux/actions/AnswerActions'
import { modifyStep }                       from '../../flux/actions/StepActions'
import AdditionalSupportingDocuments        from '../../components/steps/AdditionalSupportingDocuments'

const mapStateToProps = (state, ownProps) => {
    return {
        step: state.default.step,
        answers: state.default.answers,
        error: state.default.error,
        uuid: ownProps.params.uuid,
        prevStep: Utils.navigationLookup.WORKLOAD_SCALING,
        nextStep: Utils.navigationLookup.PREVIEW
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateState: (fieldValueObj, answers) => {
            dispatch(updateState({additionalSupportingDocuments: fieldValueObj}, answers));
        },
        modifyStep: (answers) => {
            dispatch(modifyStep(Utils.navigationLookup.ADDITIONAL_SUPPORTING_DOCUMENTS, answers));
        }
    }
};

const AdditionalSupportingDocumentsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdditionalSupportingDocuments);

export default AdditionalSupportingDocumentsContainer;