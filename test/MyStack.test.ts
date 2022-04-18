import { Template } from "aws-cdk-lib/assertions";
import * as sst from "@serverless-stack/resources";
import IkTestStack from "../stacks/IkTestStack";

test("Test Stack", () => {
  const app = new sst.App();
  // WHEN
  const stack = new IkTestStack(app, "test-stack");
  // THEN
  const template = Template.fromStack(stack);
  template.resourceCountIs("AWS::Lambda::Function", {});
});
