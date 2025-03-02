import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { regionEU } from "../config/constants";


export interface StackProps extends cdk.StackProps {
  env: cdk.Environment;
  crossRegionReferences?: boolean;
  crArn?: cdk.Reference;
}

export class CrossRegionParamStack extends cdk.Stack {
  readonly queue: sqs.Queue;
  readonly customResource: cdk.CfnResource;

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    if (props.env.region === regionEU) {
      const queueId = `CrossRegionParamQueue-${props.env.region}`;
      // example resource
      this.queue = new sqs.Queue(this, queueId, {
        visibilityTimeout: cdk.Duration.seconds(300)
      });

      this.customResource = new cdk.CfnResource(this, `MyResource-${props.env.region}`, {
        type: 'Custom::MyResource',
      });
    } else {
      this.customResource = new cdk.CfnResource(this, `MyResource-${props.env.region}`, {
        type: 'Custom::MyResource',
        properties: {
          Prop: props.crArn,
        },
      });
    }
  }
}
