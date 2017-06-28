import { Component, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { nvD3 } from '../lib/ng2-nvd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css',
    '../../node_modules/nvd3/build/nv.d3.css'
  ]
})
export class AppComponent implements AfterViewInit {
  title = 'app';

  @ViewChild('widget6PieChart') _widget6PieChart: nvD3;
  @ViewChild('widget9Remaining') _widget9Remaining: nvD3;

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

  public widget9 = {
    weeklySpent: {
      count: {
        "2W": "2,682.85",
        "LW": "1,445.34",
        "TW": "3,630.15"
      },
      chartData: []
    },
    totalSpent: {
      count: {
        "2W": "29,682.85",
        "LW": "31,128.19",
        "TW": "34,758.34"
      },
      chartData: []
    },
    remaining: {
      count: {
        "2W": "94.317,15",
        "LW": "92.871,81",
        "TW": "89.241,66"
      },
      chartData: []
    },
    totalBudget: {
      "title": "TOTAL BUDGET",
      "count": "124.000,00"
    },
    chart: {
      config: {
        refreshDataOnly: true,
        deepWatchData: true
      },
      options: {
        chart: {
          type: 'lineChart',
          color: ['#00BCD4'],
          height: 50,
          margin: {
            top: 8,
            right: 0,
            bottom: 0,
            left: 0
          },
          isArea: true,
          interpolate: 'cardinal',
          clipEdge: true,
          duration: 500,
          showXAxis: false,
          showYAxis: false,
          showLegend: false,
          useInteractiveGuideline: true,
          x: (d) => {
            return d.x;
          },
          y: (d) => {
            return d.y;
          },
          yDomain: [0, 9],
          xAxis: {
            tickFormat: (d) => {
              return this.widget9.days[d];
            }
          },
          interactiveLayer: {
            tooltip: {
              gravity: 'e',
              classes: 'gravity-e'
            }
          }
        }
      }
    },
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    ranges: {
      "TW": "This Week",
      "LW": "Last Week",
      "2W": "2 Weeks Ago"
    },
    currentRange: '',
    onRangeChange: (newRange) => {
      this.widget9.changeRange(newRange);
    },
    changeRange: (range) => {
      this.widget9.currentRange = range;

      /**
       * Update mini charts. They only have 1 dataset
       * so we can do [0] without needing to iterate
       * through in their data arrays
       */
      let weeklyChartData = {
        "label": "Weekly Spent",
        "values": {
          "2W": [
            {"x": 0, "y": 6},
            {"x": 1, "y": 1},
            {"x": 2, "y": 3},
            {"x": 3, "y": 4},
            {"x": 4, "y": 5},
            {"x": 5, "y": 5},
            {"x": 6, "y": 2}
          ],
          "LW": [
            {"x": 0, "y": 4},
            {"x": 1, "y": 6},
            {"x": 2, "y": 2},
            {"x": 3, "y": 2},
            {"x": 4, "y": 1},
            {"x": 5, "y": 3},
            {"x": 6, "y": 4}
          ],
          "TW": [
            {"x": 0, "y": 2},
            {"x": 1, "y": 6},
            {"x": 2, "y": 5},
            {"x": 3, "y": 4},
            {"x": 4, "y": 5},
            {"x": 5, "y": 3},
            {"x": 6, "y": 6}
          ]
        }
      };

      this.widget9.weeklySpent.chartData[0] = {
        key: weeklyChartData.label,
        values: weeklyChartData.values[range]
      };

      let spentChartData = {
        "label": "Spent",
        "values": {
          "2W": [
            {"x": 0, "y": 3},
            {"x": 1, "y": 2},
            {"x": 2, "y": 2},
            {"x": 3, "y": 4},
            {"x": 4, "y": 7},
            {"x": 5, "y": 7},
            {"x": 6, "y": 4}
          ],
          "LW": [
            {"x": 0, "y": 5},
            {"x": 1, "y": 7},
            {"x": 2, "y": 8},
            {"x": 3, "y": 8},
            {"x": 4, "y": 6},
            {"x": 5, "y": 4},
            {"x": 6, "y": 1}
          ],
          "TW": [
            {"x": 0, "y": 6},
            {"x": 1, "y": 3},
            {"x": 2, "y": 7},
            {"x": 3, "y": 5},
            {"x": 4, "y": 5},
            {"x": 5, "y": 4},
            {"x": 6, "y": 7}
          ]
        }
      };

      this.widget9.totalSpent.chartData[0] = {
        key: spentChartData.label,
        values: spentChartData.values[range]
      };

      let remainingChartData = {
        "label": "Remaining",
        "values": {
          "2W": [
            {"x": 0, "y": 1},
            {"x": 1, "y": 4},
            {"x": 2, "y": 5},
            {"x": 3, "y": 7},
            {"x": 4, "y": 8},
            {"x": 5, "y": 2},
            {"x": 6, "y": 4}
          ],
          "LW": [
            {"x": 0, "y": 3},
            {"x": 1, "y": 2},
            {"x": 2, "y": 1},
            {"x": 3, "y": 4},
            {"x": 4, "y": 8},
            {"x": 5, "y": 8},
            {"x": 6, "y": 4}
          ],
          "TW": [
            {"x": 0, "y": 2},
            {"x": 1, "y": 4},
            {"x": 2, "y": 8},
            {"x": 3, "y": 6},
            {"x": 4, "y": 2},
            {"x": 5, "y": 5},
            {"x": 6, "y": 1}
          ]
        }
      };

      this.widget9.remaining.chartData[0] = {
        key: remainingChartData.label,
        values: remainingChartData.values[range]
      };

      // this._widget9WeeklySpent.update();
      // this._widget9TotalSpent.update();
      this._widget9Remaining.update();
    },
    init: () => {
      // Run this function once to initialize widget

      /**
       * Update the range for the first time
       */
      this.widget9.changeRange('TW');
    }
  };

  ngAfterViewInit() {
    this.widget6.init();
    this.widget9.init();
  }
}
