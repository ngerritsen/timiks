export const STANDARD_DEVIATION = 'STANDARD_DEVIATION';
export const AVERAGE = 'AVERAGE';
export const SINGLE = 'SINGLE';
export const MEAN = 'MEAN';
export const TRIM_PERCENTAGE = 5;

export default [
  {
    name: 'single',
    type: SINGLE,
    showInGraph: true,
    graphLineColor: 'blue'
  },
  {
    name: 'mo3',
    type: MEAN,
    size: 3
  },
  {
    name: 'ao5',
    type: AVERAGE,
    size: 5,
    showInGraph: true,
    graphLineColor: 'green'
  },
  {
    name: 'ao12',
    type: AVERAGE,
    size: 12,
    showInGraph: true,
    graphLineColor: 'yellow'
  },
  {
    name: 'ao25',
    type: AVERAGE,
    size: 25,
    showInGraph: true,
    graphLineColor: 'orange'
  },
  {
    name: 'ao50',
    type: AVERAGE,
    size: 50,
    showInGraph: true,
    graphLineColor: 'red'
  },
  {
    name: 'ao100',
    type: AVERAGE,
    size: 100,
    showInGraph: true,
    graphLineColor: 'purple'
  },
  {
    name: 'mean',
    type: MEAN
  },
  {
    name: 'σ',
    type: STANDARD_DEVIATION
  }
];
