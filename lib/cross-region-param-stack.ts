import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { regionEU } from "../config/constants";


export interface StackProps extends cdk.StackProps {
  env: cdk.Environment;
  crossRegionReferences?: boolean;
}

export class CrossRegionParamStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    if (props.env.region === regionEU) {
      const queueId = `CrossRegionParamQueue-${props.env.region}`;
      // example resource
      const queue = new sqs.Queue(this, queueId, {
        visibilityTimeout: cdk.Duration.seconds(300)
      });
    }
  }
}
