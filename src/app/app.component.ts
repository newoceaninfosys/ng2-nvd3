import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { nvD3 } from '../lib/ng2-nvd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app';

  @ViewChild('widget6PieChart') _widget6PieChart: nvD3;

  public widget6 = {
    onRangeChange: (newRange) => {
      this.widget6.changeRange(newRange);
    },
    mainChart: {
      config: {
        refreshDataOnly: true,
        deepWatchData: true
      },
      options: {
        chart: {
          type: 'pieChart',
          color: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63'],
          height: 400,
          margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          donut: true,
          clipEdge: true,
          cornerRadius: 0,
          labelType: 'percent',
          padAngle: 0.02,
          x: (d) => {
            return d.label;
          },
          y: (d) => {
            return d.value;
          },
          tooltip: {
            gravity: 's',
            classes: 'gravity-s'
          }
        }
      },
      data: []
    },
    ranges: {},
    currentRange: 'TW',
    changeRange: (range) => {
      this.widget6.currentRange = range;

      /**
       * Update main chart data by iterating through the
       * chart dataset and separately adding every single
       * dataset by hand.
       *
       * You MUST NOT swap the entire data object by doing
       * something similar to this:
       * vm.widget.mainChart.data = chartData
       *
       * It would be easier but it won't work with the
       * live updating / animated charts due to how d3
       * works.
       *
       * If you don't need animated / live updating charts,
       * you can simplify these greatly.
       */
      let mainChartData = [
        {
          "label": "Frontend",
          "values": {
            "2W": 18,
            "LW": 19,
            "TW": 15
          }
        },
        {
          "label": "Backend",
          "values": {
            "2W": 17,
            "LW": 16,
            "TW": 20
          }
        },
        {
          "label": "API",
          "values": {
            "2W": 40,
            "LW": 42,
            "TW": 38
          }
        },
        {
          "label": "Issues",
          "values": {
            "2W": 25,
            "LW": 23,
            "TW": 27
          }
        }
      ];
      mainChartData.forEach((data, index) => {
        this.widget6.mainChart.data[index] = {
          label: data.label,
          value: data.values[range]
        };
      });

      this._widget6PieChart.update();
    },
    init: () => {
      // Run this function once to initialize widget

      /**
       * Update the range for the first time
       */
      this.widget6.changeRange('TW');
    }
  };

  ngAfterViewInit() {
    this.widget6.init();
  }
}
