import React, { Component } from 'react';
import { Icon } from 'antd';

class Icon extends Component{
    constructor(props) {

    }

    render() {
        return (
            <Icon
                type="right"
                style={{
                    fontSize: 12,
                    float: 'right',
                    color: 'rgba(144, 147, 153, 1)',
                    padding: 5
                }}
            />
        )
    }
}

export default Icon;