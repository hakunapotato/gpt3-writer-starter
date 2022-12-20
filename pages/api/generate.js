import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`
Assume I already have kitchen essentials such as spices, salt, oil, vinegar and baking supplies.

Give me a list of 5 dishes I can make based on those kitchen essentials and the following ingredients I have, you don't have to use all the ingredients:
`;
const basePromptSuffix = `

Recipes:
`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}${basePromptSuffix}\n`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}${basePromptSuffix}\n`,
    temperature: 0.2,
    max_tokens: 400,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;