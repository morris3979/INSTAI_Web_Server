import React, { lazy, useState, Fragment } from "react";
import { Button, Space } from "antd";


const TfSsdInstant = lazy(() => import('./tfSsdInstant'))
const TfSsdDetector = lazy(() => import('./tfSsdDetector'))

const btnstyle = {
    margin: 2,
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
    backgroundColor: '#68a0cf',
    color: '#ffffff',
}

const blockstyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: 'auto 0'
}

const SsdDetect = () => {

    const [instantState, setInstantState] = useState(0)
    const [objectState, setObjectState] = useState(0)
    
    const InstantClick = () => {
        if(instantState == 0){
            setInstantState(1)
            setObjectState(0)
        }else{
            setInstantState(0)
        }
    }

    const ObjectClick = () => {
        if(objectState == 0){
            setInstantState(0)
            setObjectState(1)
        }else{
            setObjectState(0)
        }
    }

    return(
        <Fragment>
            {
                instantState == 1?
                <div>
                    <div>
                        <TfSsdInstant/>
                    </div>
                    <div
                     style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <span>      
                            <Space
                                size='large'>
                                <Button
                                onClick={InstantClick}
                                style={btnstyle}>
                                    Instant(SSD)
                                </Button>
                                <Button
                                onClick={ObjectClick}
                                style={btnstyle}>
                                    Object(SSD)
                                </Button>
                            </Space>
                        </span>
                    </div>
                </div>:
                objectState == 1?
                <div>
                    <div>
                        <TfSsdDetector/>
                    </div>:
                    <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <span>      
                            <Space
                                size='large'>
                                <Button
                                onClick={InstantClick}
                                style={btnstyle}>
                                    Instant(SSD)
                                </Button>
                                <Button
                                onClick={ObjectClick}
                                style={btnstyle}>
                                    Object(SSD)
                                </Button>
                            </Space>
                        </span>
                    </div>
                </div>:
                <div
                style={blockstyle}>
                   <span>      
                       <Space
                           size='large'>
                           <Button
                           onClick={InstantClick}
                           style={btnstyle}>
                               Instant(SSD)
                           </Button>
                           <Button
                           onClick={ObjectClick}
                           style={btnstyle}>
                               Object(SSD)
                           </Button>
                       </Space>
                   </span>
                </div>
            }
        </Fragment>
    )
};

export default SsdDetect;
