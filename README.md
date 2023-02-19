# Patient Chat Bot made with OpenAI API

This app provides a way for patients to easily access details from their medical records. They can simply ask a question about their medical records and receive a response generated with OpenAI's API for GPT-3. This app uses [Next.js](https://nextjs.org/) framework with [React](https://reactjs.org/). The code and instructions below were inspired by OpenAI's Node.js tutorial here [https://github.com/openai/openai-quickstart-node].

## Setup

1. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/) (Node.js version >= 14.6.0 required)

2. Navigate to the directory on your computer where you want to save the project, and clone this repository
   ```bash
   git clone https://github.com/hitagu/patient-chat
   ```

3. Navigate into the project directory

   ```bash
   cd patient-chat
   ```

4. Install the requirements

   ```bash
   npm install
   ```

5. Make a copy of the example environment variables file and save in .env

   On Linux systems: 
   ```bash
   cp .env.example .env
   ```
   On Windows:
   ```powershell
   copy .env.example .env
   ```
6. Add your [API key](https://beta.openai.com/account/api-keys) to the newly created `.env` file. Your .env file should look like this: 
   ```
   OPENAI_API_KEY='YOUR KEY HERE'
   ```

7. Run the app

   ```bash
   npm run dev
   ```

8. You should now be able to access the app at [http://localhost:3000](http://localhost:3000). This version of the program uses the medical records stored in pages/records.json. You can ask questions such as:
* When was my colonoscopy?
* Who administered my flu vaccine?
* What steps did I have to take after receiving my COVID-19 test results?
* When was my most recent appointment?