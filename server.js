const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware


const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

app.post('/generate-response', async (req, res) => {
  const userInput = req.body.input;

  try {
    // Call OpenAI GPT-3 API (replace YOUR_API_KEY with your actual OpenAI API key)
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: userInput }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
        },
      }
    );

    const generatedResponse = response.data.choices[0].message.content;

    // Send the generated response to the UI
    res.json({ response: generatedResponse });
  } catch (error) {
    console.error('Error generating response:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
