import * as sst from "@serverless-stack/resources";
import {Bucket, Cron} from "@serverless-stack/resources";


export default class IkTestStack extends sst.Stack {
  api;
  bucket;
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // Create a HTTP API
    this.api = new sst.Api(this, "Api", {
      customDomain:
          scope.stage === "prod" ? "api.aws-cloud-lab.com" : scope.stage+".aws-cloud-lab.com",
      routes: {
        "GET /ik-techcheck/hello": "src/lambda.handler",
      },
    });


    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: this.api.customDomainUrl || this.api.url,
    });

    this.bucket = new Bucket(this, "ik-techcheck");
    this.bucket.attachPermissions(["s3"]);

    const cron = new Cron(this, "Cron", {
      schedule: { minute: "0", hour: "10", weekDay: "Monday" },
      job: "src/lambda.main",
    });
 }
}
