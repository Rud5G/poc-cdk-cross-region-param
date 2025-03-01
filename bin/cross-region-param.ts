#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CrossRegionParamStack } from '../lib/cross-region-param-stack';
import { MyResource } from "../lib/resource/my-resource";
import { regionEU, regionUS } from "../config/constants";



const app = new cdk.App();
const stackEU = new CrossRegionParamStack(app, `param-stack-${regionEU}`, {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: regionEU,
    },
    crossRegionReferences: true,
});



const stackUS = new CrossRegionParamStack(app, `param-stack-${regionUS}`, {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: regionUS,
    },
    crossRegionReferences: true,
});



// const myResource = new MyResource(stackEU, 'MyResource');
// new cdk.CfnOutput(stackUS, 'Output', {
//     value: myResource.name,
// });