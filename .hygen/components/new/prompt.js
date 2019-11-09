module.exports = [
  {
    type: 'select',
    name: 'category',
    message: 'Select a component category',
    choices: ['atoms', 'molecules', 'organisms']
  },

  {
    type: 'input',
    name: 'componentName',
    message: 'Enter the component name',
    hint: '"VSample", "TheSample", ...etc'
  }
]
