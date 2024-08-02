import { AssistantResponse } from 'ai';
import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

let confidenceScore: any = null
let vtReport: any = null
let gnReport: any = null
let gnSupReport: any = null
let gnTagMetadata: any = null
let tagSummaries: any = null
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // Parse the request body
  const input: {
    threadId: string | null;
    message: string;
  } = await req.json();

  // Create a thread if needed
  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

  // Add a message to the thread
  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: input.message,
  });

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendDataMessage }) => {
      // Run the assistant on the thread
      const runStream = openai.beta.threads.runs.stream(
        threadId, {
        assistant_id:
          process.env.ASSISTANT_ID ??
          (() => {
            throw new Error('ASSISTANT_ID is not set');
          })(),
      });

      // forward run status would stream message deltas
      let runResult = await forwardStream(runStream);

      // status can be: queued, in_progress, requires_action, cancelling, cancelled, failed, completed, or expired
      while (
        runResult?.status === 'requires_action' &&
        runResult.required_action?.type === 'submit_tool_outputs'
      ) {
        const toolOutputsPromises = runResult.required_action.submit_tool_outputs.tool_calls.map(
          async (toolCall: any) => {
            const parameters = JSON.parse(toolCall.function.arguments);

            switch (toolCall.function.name) {
              case 'getIpReport': {
                const vt = await fetch(`https://www.virustotal.com/api/v3/ip_addresses/${parameters.ip_address}`, {
                  method: 'GET',
                  headers: {
                    'x-apikey': process.env.VIRUSTOTAL_API_KEY || '',
                  },
                });

                vtReport = await vt.json()

                const gn = await fetch(`https://api.greynoise.io/v2/noise/context/${parameters.ip_address}`, {
                  method: 'GET',
                  headers: {
                    'accept': 'application/json',
                    'key': process.env.GREYNOISE_API_KEY || '',
                  },
                });

                gnReport = await gn.json()

                const gnSup = await fetch(`https://api.greynoise.io/v2/noise/quick/${parameters.ip_address}`, {
                  method: 'GET',
                  headers: {
                    'accept': 'application/json',
                    'key': process.env.GREYNOISE_API_KEY || '',
                  },
                });

                gnSupReport = await gnSup.json()

                const gnTags = await fetch(`https://api.greynoise.io/v2/meta/metadata`, {
                  method: 'GET',
                  headers: {
                    'accept': 'application/json',
                    'key': process.env.GREYNOISE_API_KEY || '',
                  },
                });

                gnTagMetadata = await gnTags.json()
                if (gnReport.tags) {
                  tagSummaries = await Promise.all(gnReport.tags.map(async (tag: any) => {
                    const tagData = gnTagMetadata.metadata.find((meta: { name: any; }) => meta.name === tag);
                    if (tagData) {
                      return {
                        tag,
                        summary: await generateTagSummary(tagData),
                      };
                    } else {
                      return { tag, summary: 'No metadata available' };
                    }
                  }));
                }else{
                  tagSummaries = ''
                }
                

                confidenceScore = await generateConfidenceScore(vtReport, gnReport, gnSupReport);

                sendDataMessage({
                  role: 'data',
                  data: {
                    vtReport,
                    gnReport,
                    gnSupReport,
                    tagSummaries,
                    confidenceScore
                  },
                });

                return {
                  tool_call_id: toolCall.id,
                  output: ``
                };
              }

              case 'getRoomTemperature': {
                const tag = parameters.tag_name
                  

                return {
                  tool_call_id: toolCall.id,
                  output: tag.toString(),
                };
              }

              default:
                throw new Error(
                  `Unknown tool call function: ${toolCall.function.name}`,
                );
            }
          },
        );

        const tool_outputs = await Promise.all(toolOutputsPromises);

        runResult = await forwardStream(
          openai.beta.threads.runs.submitToolOutputsStream(
            threadId,
            runResult.id,
            { tool_outputs },

          ),
        );
      }
    },
  );
}

async function generateTagSummary(tagData: any) {
  const prompt = `
    Generate a brief summary of no more than 20 words for the following tag:
    Name: ${tagData.name}
    Category: ${tagData.category}
    Intention: ${tagData.intention}
    Description: ${tagData.description}
    References: ${tagData.references.join(", ")}
    Summary:
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message;
}

async function generateConfidenceScore(vtReport: { data: { attributes: { last_analysis_stats: { malicious: any; suspicious: any; harmless: any; undetected: any; }; }; }; }, gnReport: { classification: any; }, gnSupReport: { noise: any; riot: any; }) {
  const prompt = `
    Based on the following security analysis data, generate a confidence score (between 0 and 1) for the IP address being malicious, so the format must be score_justification:

    VirusTotal Report:
    - Malicious Count: ${vtReport.data.attributes.last_analysis_stats.malicious}
    - Suspicious Count: ${vtReport.data.attributes.last_analysis_stats.suspicious}
    - Harmless Count: ${vtReport.data.attributes.last_analysis_stats.harmless}
    - Undetected Count: ${vtReport.data.attributes.last_analysis_stats.undetected}

    GreyNoise Report:
    - Classification: ${gnReport.classification}
    - Noise: ${gnSupReport.noise}
    - Riot: ${gnSupReport.riot}

    Provide a single confidence score between 0 and 1 and, separated by an underscore why u assigned that score in a maximum of ten words, for the score 0 means completely harmless and 1 means definitely malicious pritorizing Classification from Greynoise and Malicious Count from Virustotal, some exceptions are, if greynoise classification is malicious consider assign the score the value of 1 and dont consider any other thing, if not but there is more than 5 virustotal malicious flags do the same.
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  const confidenceScore = response.choices[0].message.content;
  return confidenceScore;
}
