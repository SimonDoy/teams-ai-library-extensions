import { AzureKeyCredential, ChatCompletions, ChatRequestMessage, OpenAIClient } from "@azure/openai";
import { DataSource, Memory, RenderedPromptSection, Tokenizer } from "@microsoft/teams-ai";
import { Activity, ActivityEx, ActivityTypes, TurnContext } from "botbuilder";

export interface AzureAISearchDataSourceOptions {
    azureOpenAiEndpoint: string;
    azureOpenAiKey: string;
    azureOpenAiDeploymentId: string;
    azureSearchEndpoint: string;
    azureSearchKey: string;
    azureSearchIndexName: string;
}

export class AzureAISearchDataSource implements DataSource {
    readonly name: string;
    readonly options: AzureAISearchDataSourceOptions
    

    public constructor(name: string, options: AzureAISearchDataSourceOptions) {
        this.name = name;
        this.options = options;
    }

    public async renderData(context: TurnContext, memory: Memory, tokenizer: Tokenizer, maxTokens: number): Promise<RenderedPromptSection<string>> {
        
        let resultContent = await this.getCompletions(context, memory,tokenizer,maxTokens);

        let length = tokenizer.encode(resultContent).length;

        let result: RenderedPromptSection<string> = {output: resultContent, length: length, tooLong: length > maxTokens};
        return result;
    }


    public async getCompletions(context: TurnContext, memory: Memory, tokenizer: Tokenizer, maxTokens: number): Promise<string> {
        const endpoint = this.options.azureOpenAiEndpoint;
        const credentials = new AzureKeyCredential(this.options.azureOpenAiKey);
        const client = new OpenAIClient(endpoint, credentials);
        const deploymentId = this.options.azureOpenAiDeploymentId;

        context.activity.text

        let messages:ChatRequestMessage[] = [
            {role: "user", content: context.activity.text }
        ];
        
        console.log(`Messages: ${messages.map((m) => m.content).join("\n")}`);

        const response:ChatCompletions = await client.getChatCompletions(deploymentId, messages, { 
            maxTokens: maxTokens,
            azureExtensionOptions: {
                extensions: [
                {
                    type: "AzureCognitiveSearch",
                    endpoint: this.options.azureSearchEndpoint,
                    key: this.options.azureSearchKey,
                    indexName: this.options.azureSearchIndexName,
                },
            ],
            },
        });

        let completionResult: string = "";

        /*
        for await (const event of events) {
            for (const choice of event.choices) {
                const delta = choice.delta?.content;
                if (delta !== undefined) {
                    console.log(`Chatbot: ${delta}`);
                    completionResult += delta;
                }
            }
        }
        */

        console.log(`Choices: ${response.choices.map((m) => m.message?.content).join("\n")}`);
        console.log(`response:`, response);

        response.choices.forEach((choice) => {
            if(choice.message?.content) {
                completionResult += choice.message?.content;
            }
            if(choice.message?.context && choice.message?.context.messages) {
                choice.message?.context.messages.forEach(element => {
                    console.log(`Azure Extension Context Content: ${element.content}`);
                });
            }
       });

       return completionResult;
    }

}
