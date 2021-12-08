import React, { Component } from "react";
import { Chart, Util } from "@antv/g2";
import "./pieChart.scss";

export default class pieChart extends Component {
  componentDidMount() {
    const data = [
      { type: "学习", value: 5 },
      { type: "生活", value: 1 },
      { type: "美食", value: 2 },
      { type: "其他", value: 3 },
    ];
    const chart = new Chart({
      container: "container",
      autoFit: true,
      height: 300,
      padding:[20,10,20,10]
    });
    chart.data(data);

    chart.coordinate("theta", {
      radius: 0.8,
    });
    chart.tooltip({
      showMarkers: false,
    });

    chart
      .interval()
      .adjust("stack")
      .position("value")
      .color("type", ["#063d8a", "#1770d6", "#47abfc", "#38c060"])
      .style({ opacity: 1 })
      .state({
        active: {
          style: (element) => {
            const shape = element.shape;
            return {
              matrix: Util.zoom(shape, 1.1),
            };
          },
        },
      })
      .label("type", (val) => {
        return {
          offset: -30,
          style: {
            opacity: 1,
            fill: "white",
            fontSize: 12,
            shadowBlur: 2,
            shadowColor: "rgba(0, 0, 0, .45)",
          },
          content: (obj) => {
            return obj.type + "\n" + obj.value + "%";
          },
        };
      });

      // 可选择的样式
    chart.interaction("element-single-selected");
      // 渲染
    chart.render();
  }

  render() {
    return <div id="container"></div>;
  }
}
