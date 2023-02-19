import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const question = req.body.question || '';
  const context = req.body.currentContext || '';
  if (question.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid question",
      }
    });
    return;
  }

  // use the API to generate future text from the provided input
  try {
    const prompt = generatePrompt(question, context);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 100,
    });
    const answer = completion.data.choices[0].text;
    res.status(200).json({ result: answer, newContext: prompt + answer});
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

// create the prompt that will be given to the text generator
function generatePrompt(question, context) {
  const prompt = context + '\nPlease concisely answer the following question based on the information that I have provided to you, and do not answer the question if it is unrelated to my medical records: ' + question;
  return prompt;
}
