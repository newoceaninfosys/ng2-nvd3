/// <reference path="../../typings/globals/d3/index.d.ts" />
/// <reference path="../../typings/globals/nvd3/index.d.ts" />
import { OnChanges, ElementRef } from '@angular/core';
export declare class nvD3 implements OnChanges {
    private elementRef;
    options: any;
    data: any;
    private el;
    private chart;
    private svg;
    constructor(elementRef: ElementRef);
    ngOnChanges(): void;
    updateWithOptions(options: any): void;
    update(): void;
    updateWithData(data: any): void;
    configure(chart: any, options: any, chartType: any): void;
    static configureEvents(dispatch: any, options: any): void;
    clearElement(): void;
}
export declare class NvD3Module {
}
