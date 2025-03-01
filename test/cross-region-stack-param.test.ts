import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CrossRegionParamStack } from "../lib/cross-region-param-stack";
import { regionEU, regionUS } from "../config/constants";
import { MyResource } from "../lib/resource/my-resource";


describe("CrossRegionStack param", () => {
    let stackEU: CrossRegionParamStack;
    let stackUS: CrossRegionParamStack;
    let templateEU: Template;
    let templateUS: Template;

    beforeAll(() => {
        const app = new cdk.App();
        stackEU = new CrossRegionParamStack(app, `param-stack-${regionEU}`, {
            env: {
                account: process.env.CDK_DEFAULT_ACCOUNT,
                region: regionEU,
            },
            crossRegionReferences: true,
        });

        stackUS = new CrossRegionParamStack(app, `param-stack-${regionUS}`, {
            env: {
                account: process.env.CDK_DEFAULT_ACCOUNT,
                region: regionUS,
            },
            crossRegionReferences: true,
        });

        const myResource = new MyResource(stackEU, 'MyResource');
        new cdk.CfnOutput(stackUS, 'Output', {
            value: myResource.name,
        });

        templateEU = Template.fromStack(stackEU);
        templateUS = Template.fromStack(stackUS);
        // const assembly = app.synth();
        // templateEU = assembly.getStackByName(stackEU.stackName).template;
        // templateUS = assembly.getStackByName(stackUS.stackName).template;
    });

    test("Expect match snapshot for templateEU", () => {
        expect(templateEU.toJSON()).toMatchSnapshot('templateEU');
    });

    test("Expect match snapshot for templateUS", () => {
        expect(templateUS.toJSON()).toMatchSnapshot('templateUS');
    });
});
