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

```
const dataSourceOptions: AzureAISearchDataSourceOptions = {
    azureOpenAiEndpoint: process.env.AZURE_OPENAI_ENDPOINT!,
    azureOpenAiKey: process.env.AZURE_OPENAI_KEY!,
    azureOpenAiDeploymentId: process.env.AZURE_OPENAI_DEPLOYMENTMODEL!,
    azureSearchEndpoint: process.env.AZURE_SEARCH_ENDPOINT!,
    azureSearchKey: process.env.AZURE_SEARCH_KEY!,
    azureSearchIndexName: process.env.AZURE_SEARCH_INDEXNAME!,   
};

let dataSource:AzureAISearchDataSource = new AzureAISearchDataSource('teams-ai', dataSourceOptions);

```