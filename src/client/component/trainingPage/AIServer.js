import React, { useState, useEffect, Fragment } from "react";
import { connect } from 'react-redux'
import {
} from 'antd'
import {
} from '../../store/actionCreater'
import {
} from '@ant-design/icons'


const AIServer = (props) => {
    const {
    } = props

  return (
    <Fragment>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
    //state指的是store裡的數據
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
//dispatch指store.dispatch這個方法
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AIServer)