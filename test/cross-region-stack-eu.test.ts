import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CrossRegionParamStack } from "../lib/cross-region-param-stack";
import { regionEU } from "../config/constants";


describe("CrossRegionStack EU", () => {
    let stack: CrossRegionParamStack;
    let template: Template;

    beforeAll(() => {
        const app = new cdk.App();
        stack = new CrossRegionParamStack(app, `param-stack-${regionEU}`, {
            env: {
                account: process.env.CDK_DEFAULT_ACCOUNT,
                region: regionEU,
            },
            crossRegionReferences: true,
        });
        template = Template.fromStack(stack);
    });

    // test("Creates a SQS Queue", () => {
    //     template.resourceCountIs("AWS::SQS::Queue", 1);
    // });

    test("Expect match snapshot", () => {
        expect(template.toJSON()).toMatchSnapshot();
    });
});
