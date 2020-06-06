export interface PrintOptions {
    printerTimeCost: number;
    materials: Material[];
    timing: Timing;
    fixedCosts: FixedCosts;
    costAdjustments: CostAdjustments;
}

export interface Material {
    name: string;
    costPerGram: number;
    timeAdjustment: number;
    colors: string[];
}

export interface Timing {
    costPerMin: number;
    modelPrep: number;
    slicing: number;
    printerPrep: number;
    jobStart: number;
    jobEnd: number;
    supportRemoval: number;
    postProcessing: number;
}

export interface FixedCosts {
    consumables: number;
    electricity: number;
    printerDepreciation: number;
}

export interface CostAdjustments {
    failureRate: number;
    markup: number;
}

