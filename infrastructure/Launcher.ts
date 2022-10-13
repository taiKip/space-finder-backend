//contain logic for launching project
import { App } from 'aws-cdk-lib'
import {SpaceStack} from './SpaceStack'

const app = new App();
new SpaceStack(app,'space-finder',{
    stackName:'spaceFinder'
});