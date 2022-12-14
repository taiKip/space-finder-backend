import { GenericTable } from './GenericTable';
//contain all logic
import {Stack, StackProps} from 'aws-cdk-lib'
import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import {join} from 'path'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';

export class SpaceStack extends Stack{
private api = new RestApi(this,'SpaceApi');
private spacesTable = new GenericTable(
    "SpacesTable",
    "spaceId",
    this
)
    constructor(scope:Construct,id:string,props?:StackProps){
        super(scope,id,props)

        const helloLambda = new LambdaFunction(this,'helloLambda',{
            runtime:Runtime.NODEJS_16_X,
            code:Code.fromAsset(join(__dirname,'..','services','hello')),
            handler:'hello.main'
        })

// Hello Api lambda integration :Linking together api gateway and lambda
const helloLambdaIntegration = new LambdaIntegration(helloLambda);
const helloLambdaResource = this.api.root.addResource('hello');
helloLambdaResource.addMethod('GET',helloLambdaIntegration);



    }

}