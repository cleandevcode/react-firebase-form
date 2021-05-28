import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import {FaQuestionCircle} from 'react-icons/fa';

const renderTooltip = (props) => {
    return (
        <Tooltip id="button-booltip" {...props}>
            Help
        </Tooltip>
    )
    
}

const CustomToolTip = () => {
    return (
        <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
            <FaQuestionCircle color="blue" size={20} />
        </OverlayTrigger>
    )
}

export default CustomToolTip;