import React from 'react';
import * as _Icons from 'react-feather';

const Tasks: _Icons.Icon = ({ size, color, strokeWidth }) => {
    return React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size || 24,
        height: size || 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color || "currentColor",
        strokeWidth: strokeWidth || "3.5957",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        style: { display: 'inline-flex', alignItems: 'center' },
        children: [
            React.createElement("g", {
                children: [
                    React.createElement("polyline", {
                        points: "15.01 5.59 4.82 13.11 1.8 9"
                    }),
                    React.createElement("line", {
                        x1: "20.16",
                        y1: "1.8",
                        x2: "19.35",
                        y2: "2.4",
                        style: { opacity: 0.31 }
                    })
                ]
            })
        ]
    });
}

let Icons = {
    ..._Icons,
    Tasks
};

export default Icons;