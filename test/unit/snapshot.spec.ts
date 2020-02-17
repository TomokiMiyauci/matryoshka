import path from 'path'
import initStoryshots, {
  multiSnapshotWithOptions
} from '@storybook/addon-storyshots'
initStoryshots({
  configPath: path.resolve(__dirname, '../../.storybook/config.js'),
  test: multiSnapshotWithOptions()
})
