import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let prompt = ''

export default async function (req, res) {
  // prompt += `\n提问:` + req.query.animal + `\nAI:`
  prompt += `\n提问:` + req.body.animal + `\nAI:`
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" 提问:", " AI:"],
    stream: true
  }, { responseType: 'stream' });
  // console.log(typeof completion.data)
  res.setHeader("content-type", "text/event-stream")
  completion.data.pipe(res)
  // completion.on("data", (e) => {
  //   console.log(e)
  // })
  // // prompt += completion.data.choices[0].text
  // res.status(200);
  // res.write("some thing")
}
