import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux'
import {
    Typography,
} from 'antd'
import {
} from '../../store/actionCreater'
import {
} from '@ant-design/icons'
import ReactDOM from 'react-dom';
import { DualAxes } from '@ant-design/plots';

const { Title } = Typography

const numberData = [
    {
        time: '2022-07',
        value: 350,
        type: '1',
    },
    {
        time: '2022-08',
        value: 900,
        type: '1',
    },
    {
        time: '2022-09',
        value: 300,
        type: '1',
    },
    {
        time: '2022-10',
        value: 450,
        type: '1',
    },
    {
        time: '2022-11',
        value: 470,
        type: '1',
    },
    {
        time: '2022-07',
        value: 220,
        type: '2',
    },
    {
        time: '2022-08',
        value: 300,
        type: '2',
    },
    {
        time: '2022-09',
        value: 250,
        type: '2',
    },
    {
        time: '2022-10',
        value: 220,
        type: '2',
    },
    {
        time: '2022-11',
        value: 362,
        type: '2',
    },
];
const transformData = [
    {
        time: '2022-07',
        count: 800,
        name: 'a',
    },
    {
        time: '2022-08',
        count: 600,
        name: 'a',
    },
    {
        time: '2022-09',
        count: 400,
        name: 'a',
    },
    {
        time: '2022-10',
        count: 380,
        name: 'a',
    },
    {
        time: '2022-11',
        count: 220,
        name: 'a',
    },
    {
        time: '2022-07',
        count: 750,
        name: 'b',
    },
    {
        time: '2022-08',
        count: 650,
        name: 'b',
    },
    {
        time: '2022-09',
        count: 450,
        name: 'b',
    },
    {
        time: '2022-10',
        count: 400,
        name: 'b',
    },
    {
        time: '2022-11',
        count: 320,
        name: 'b',
    },
    {
        time: '2022-07',
        count: 900,
        name: 'c',
    },
    {
        time: '2022-08',
        count: 600,
        name: 'c',
    },
    {
        time: '2022-09',
        count: 450,
        name: 'c',
    },
    {
        time: '2022-10',
        count: 300,
        name: 'c',
    },
    {
        time: '2022-11',
        count: 200,
        name: 'c',
    },
];

const config = {
    data: [numberData, transformData],
    xField: 'time',
    yField: ['value', 'count'],
    geometryOptions: [
        {
            geometry: 'line',
            seriesField: 'type',
            lineStyle: {
                lineWidth: 3,
                lineDash: [5, 5],
            },
            smooth: true,
        },
        {
            geometry: 'line',
            seriesField: 'name',
            point: {},
        },
    ],
};

const TrendChart = (props) => {
    const {
    } = props;

    useEffect(() => {
    }, []);

    return (
        <Fragment>
            <span>
                <Title level={2} style={{ margin: 8 }}>資料分析趨勢圖</Title>
            </span>
            <div style={{ margin: 8 }}>
                <DualAxes {...config} />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TrendChart)