import React from 'react';

const AlertDiv = props => {
    const { msg, bgColor, color } = props
    //const [open, setOpen] = React.useState(false);

    return (
        <div className='alert' 
            style={ { 
                backgroundColor: bgColor, 
                color: color, 
                textAlign: 'center', 
                fontSize: 'large', 
                marginTop: '20px',
                width: '538px'
            } }
        >
            { msg } 
        </div>
    );
} // AlertDiv

export default AlertDiv;