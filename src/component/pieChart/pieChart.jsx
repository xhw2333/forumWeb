import React, { Component } from "react";
import { Chart, Util } from "@antv/g2";
import "./pieChart.scss";

export default class pieChart extends Component {
  state = {};

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    const { noteTotal, classify } = nextProps;
    if (nextProps.noteTotal !== this.props.noteTotal) {
      this.pieRender(classify, noteTotal);
    }
  }

  componentDidMount() {
  }

  pieRender = (classify, noteTotal) => {
    const data = classify.map((item) => {
      return {
        type: item.tag,
        value: item.count,
      };
    });
    const chart = new Chart({
      container: "container",
      autoFit: true,
      height: 300,
      // padding: [20, 10, 20, 10],
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
      .color(
        "type",
        // ["#063d8a", "#1770d6", "#47abfc", "#38c060"]
        classify.map((item) => {
          return item.color;
        })
      )
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
            return (
              obj.type + "\n" + Math.floor((obj.value / noteTotal) * 100) + "%"
            );
          },
        };
      });

    // 可选择的样式
    chart.interaction("element-single-selected");
    // 渲染
    chart.render();
  };

  render() {
    return <div id="container"></div>;
  }
}
