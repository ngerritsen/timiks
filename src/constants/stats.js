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
    color: 'blue'
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
    color: 'green'
  },
  {
    name: 'ao12',
    type: AVERAGE,
    size: 12,
    showInGraph: true,
    color: 'yellow'
  },
  {
    name: 'ao25',
    type: AVERAGE,
    size: 25,
    showInGraph: true,
    color: 'orange'
  },
  {
    name: 'ao50',
    type: AVERAGE,
    size: 50,
    showInGraph: true,
    color: 'red'
  },
  {
    name: 'ao100',
    type: AVERAGE,
    size: 100,
    showInGraph: true,
    color: 'purple'
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
