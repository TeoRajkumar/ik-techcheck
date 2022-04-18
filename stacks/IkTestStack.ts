import * as sst from "@serverless-stack/resources";
import {Api, Bucket, Cron, Function} from "@serverless-stack/resources";


export default class IkTestStack extends sst.Stack {
  api;
  bucket;
  function;
  cron;

  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    //Create an S3 bucket
    this.bucket = new Bucket(this, "ik-techcheck");
    this.bucket.attachPermissions([this.bucket]);


    this.function = new Function(this, "Function",{
      handler: "src/lambda.main",
      environment: {
        BUCKET_NAME: this.bucket.bucketName,
      },
      permissions: [this.bucket],
    });

    // Create a HTTP API
    this.api = new Api(this, "Api", {
      customDomain:
          scope.stage === "prod" ? "api.aws-cloud-lab.com" : "api-"+scope.stage+".aws-cloud-lab.com",
      routes: {
        "GET /ik-techcheck/hello": "src/lambda.handler",
      },
    });

    //Run the Cron Job
    this.cron = new Cron(this, "Cron", {
      schedule: { minute: "0", hour: "10", weekDay: "Monday" },
      job: "src/lambda.main",
    });

    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: this.api.customDomainUrl || this.api.url,
      BucketName: this.bucket.s3Bucket.bucketName,
    });

  }
}
