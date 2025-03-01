import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class MyResource extends cdk.Resource {
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
        this.arn = this.getResourceArnAttribute(res.getAtt('Arn').toString(), {
            region: '',
            account: '',
            resource: 'my-resource',
            resourceName: this.physicalName,
            service: 'myservice',
        });
    }
}
