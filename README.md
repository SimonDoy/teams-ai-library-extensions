# Introduction

Welcome to a Teams AI Library Extension project by Simon Doy (iThink 365).
This library is provided to you as seen and to help you get more from the Teams AI Library.

# Components
Currently the components that are available are:
- Teams AI Search Data Source.

## Teams AI Azure AI Search Data Source

This component implements the Teams AI Library Data Source interface and provides an implementation to be able to use Azure AI Search with Teams AI Library.

### Usage

To use the component, instantiate the data source options and then use that with the AzureAISearchDataSource in your Teams AI Library project.

An example is shown below.

```
import {AzureAISearchDataSource, AzureAISearchDataSourceOptions} from 'teams-ai-azure-ai-search-datasource';

// Create AI components
const model = new OpenAIModel({
    // OpenAI Support
    apiKey: process.env.OPENAI_KEY!,
    defaultModel: process.env.AZURE_OPENAI_DEPLOYMENTMODEL,

    // Azure OpenAI Support
    azureApiKey: process.env.AZURE_OPENAI_KEY!,
    azureDefaultDeployment: process.env.AZURE_OPENAI_DEPLOYMENTMODEL!,
    azureEndpoint: process.env.AZURE_OPENAI_ENDPOINT!,
    azureApiVersion: '2023-12-01-preview',

    // Request logging
    logRequests: true
});

const prompts = new PromptManager({
    promptsFolder: path.join(__dirname, '../src/prompts')
});

const planner = new ActionPlanner({
    model,
    prompts,
    defaultPrompt: 'chat'
});


const dataSourceOptions: AzureAISearchDataSourceOptions = {
    azureOpenAiEndpoint: process.env.AZURE_OPENAI_ENDPOINT!,
    azureOpenAiKey: process.env.AZURE_OPENAI_KEY!,
    azureOpenAiDeploymentId: process.env.AZURE_OPENAI_DEPLOYMENTMODEL!,
    azureSearchEndpoint: process.env.AZURE_SEARCH_ENDPOINT!,
    azureSearchKey: process.env.AZURE_SEARCH_KEY!,
    azureSearchIndexName: process.env.AZURE_SEARCH_INDEXNAME!,   
};

let dataSource:AzureAISearchDataSource = new AzureAISearchDataSource('teams-ai', dataSourceOptions);

planner.prompts.addDataSource(
    dataSource
);

```
