import { getApiKeyFromLocalStorage } from "./localStorage";
import { Configuration, OpenAIApi, CreateCompletionResponse } from "openai";


export default async function askQuestionToOpenAI(question: string) : Promise<CreateCompletionResponse | null | undefined> {
  const apiKeyParsed = await getApiKeyFromLocalStorage();

  if (!apiKeyParsed) return null;

  const configuration = new Configuration({
    apiKey: apiKeyParsed,
  });

  try {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      max_tokens: 50,
      temperature: 1,
    });

    const data : CreateCompletionResponse = response?.data

    return data;
  } catch (error) {
    if(JSON.stringify(error).includes("401")){
      alert("Invalid API Key. Please update your API key and try again!")
    }else{
      alert(`An error occured while getting answer!, ${error}`);
  }
}
}
