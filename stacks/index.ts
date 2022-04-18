import IkTestStack from "./IkTestStack";
import * as sst from "@serverless-stack/resources";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x"
  });

  new IkTestStack(app, "ik-techstack");

  // Add more stacks
}
