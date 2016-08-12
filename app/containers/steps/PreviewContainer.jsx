import connect                  from 'react-redux/lib/components/connect'
import Utils                    from '../../utils'
import { modifyStep }           from '../../flux/actions/StepActions'
import { sendEmail }            from '../../flux/actions/EmailActions'
import Preview                  from '../../components/steps/Preview.jsx'

const mapStateToProps = (state, ownProps) => {
    return {
        step: state.default.step,
        answers: state.default.answers,
        error: state.default.error,
        uuid: ownProps.params.uuid,
        prevStep: Utils.navigationLookup.ADDITIONAL_SUPPORTING_DOCUMENTS
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        modifyStep: (answers) => {
            dispatch(modifyStep(Utils.navigationLookup.PREVIEW, answers));
        },
        sendEmail: (doc) => {
            dispatch(sendEmail(doc));
        }
    }
};

const PreviewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Preview);

export default PreviewContainer;