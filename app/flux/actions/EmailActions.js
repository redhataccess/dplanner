import { ERROR, EMAIL_ACTION }   from '../constants/ActionTypes'
import get          from 'lodash/get'
import Uri          from 'jsuri'
import Utils        from '../../utils'
import messages     from '../../messages/messages_en'

export function errorAction(err) {
    return {
        type: ERROR,
        err
    }
}

export function emailAction(emailStatus) {
    return {
        type: EMAIL_ACTION,
        emailStatus
    }
}

export function sendEmail(mailData) {
    return function (dispatch) {
        // Reset the error
        dispatch(errorAction({message: messages.SENDING_MAIL.display, bsStyle: 'info'}));
        const uri = new Uri(`/api/mail/send/`);

        const request = {
            method: 'post',
            url: '/api/mail/send',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mailData)
        };
        return Utils.postThatUriWithParams(uri.toString(), request)
            .then((response) => {
                if (get(response, 'error')) {
                    dispatch(emailAction('DONE'));
                    throw new Error(response.error);
                } else {
                    dispatch(errorAction({message: messages.SENDING_MAIL_SUCCESSFULL.display, bsStyle: 'success'}));
                    dispatch(emailAction('DONE'));
                }
            }).catch( err => {
                console.error(err.stack);
                dispatch(errorAction({message: messages.SENDING_MAIL_FAILED.display}));
                dispatch(emailAction('DONE'));
            });
    }
}

