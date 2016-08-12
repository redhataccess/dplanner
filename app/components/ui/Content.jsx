import React, { PropTypes } from 'react'

import Link         from 'react-router/lib/Link'
import Row          from 'react-bootstrap/lib/Row'
import Col          from 'react-bootstrap/lib/Col'
import AppBlock     from './AppBlock'
import Utils        from '../../utils'
import messages     from '../../messages/messages_en'


const renderPrevStep = (props) => {
    if (!props.prevStep || props.prevStep.link == null) return null;
    return <Link className="btn btn-prev pull-left" to={`${Utils.browserPath}/${props.uuid}/${props.prevStep.link}`}>{messages.BUTTON_BACK.display}</Link>

};

const renderNextStep = (props) => {
    if (!props.nextStep || props.nextStep.link == null) return null;
    return <Link className="btn btn-next pull-right" to={`${Utils.browserPath}/${props.uuid}/${props.nextStep.link}`}>{messages.BUTTON_NEXT.display}</Link>
};

const renderFooter = (props) => {
    if (!props.showFooter) return null;
    return (
        <Row>
            <Col xs={12} className='app-block app-block-guided'>
                {renderPrevStep(props)}
                {renderNextStep(props)}
            </Col>
        </Row>
    )
};

const Content = (props) => (
    <div>
        <Row>
            <Col xs={12}>
                <AppBlock title={props.title}>
                    <div className="content">
                        {props.children}
                    </div>
                </AppBlock>
            </Col>
        </Row>
        {renderFooter(props)}
    </div>
);

Content.propTypes = {
    title: PropTypes.string.isRequired,
    uuid: PropTypes.string,
    nextStep: PropTypes.object,
    prevStep: PropTypes.object,
    showFooter: PropTypes.bool
};

Content.defaultProps = {
    showFooter: true
};

export default Content;
