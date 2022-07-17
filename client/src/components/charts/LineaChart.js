// import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';


function LineaChart() {
    const data = [
      {
        year: '2013',
        value: 3,
      },
        {
          year: '2014',
          value: 3,
        },
        {
          year: '2015',
          value: 4,
        },
        {
          year: '2016',
          value: 3.5,
        },
        {
          year: '2017',
          value: 5,
        },
        {
          year: '2018',
          value: 4.9,
        },
        {
          year: '2019',
          value: 6,
        },
        {
          year: '2020',
          value: 7,
        },
        {
          year: '2021',
          value: 9,
        },
        {
          year: '2022',
          value: 13,
        },
      ];
      const config = {
        data,
        height:256,
        width:700,
        xField: 'year',
        yField: 'value',
        label: {},
        point: {
          size: 5,
          shape: 'diamond',
          style: {
            fill: 'white',
            stroke: '#5B8FF9',
            lineWidth: 2,
          },
        },
        tooltip: {
          showMarkers: false,
        },
        state: {
          active: {
            style: {
              shadowBlur: 4,
              stroke: '#000',
              fill: 'red',
            },
          },
        },
        interactions: [
          {
            type: 'marker-active',
          },
        ],
      };
    return (
        <Line {...config} />
    );
}

export default LineaChart