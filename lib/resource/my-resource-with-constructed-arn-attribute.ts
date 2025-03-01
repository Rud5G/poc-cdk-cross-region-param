import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * Some resources build their own Arn attribute by constructing strings
 *
 * This will be because the L1 doesn't expose a `{ Fn::GetAtt: ['Arn'] }`.
 *
 * They won't be able to `exportValue()` it, but it shouldn't crash.
 */
export class MyResourceWithConstructedArnAttribute extends cdk.Resource {
    public readonly arn: string;
    public readonly name: string;

    constructor(scope: Construct, id: string, physicalName?: string) {
        super(scope, id, { physicalName });

        const res = new cdk.CfnResource(this, 'Resource', {
            type: 'My::Resource',
            properties: {
                resourceName: this.physicalName,
            },
        });

        this.name = this.getResourceNameAttribute(res.ref.toString());
        this.arn = this.getResourceArnAttribute(cdk.Stack.of(this).formatArn({
            resource: 'my-resource',
            resourceName: res.ref.toString(),
            service: 'myservice',
        }), {
            resource: 'my-resource',
            resourceName: this.physicalName,
            service: 'myservice',
        });
    }
}