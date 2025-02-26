import { ChatSession, GenerativeModel } from "@google/generative-ai";
import { genAI } from "./GeminiConfig";

/**
 * Creates a new chat with the campaign text model
 * @param {object} business_config
 * @returns {ChatSession}
 */
export function createNewChat(business_config) {
  // context instructions to generate campaign text for Gemini
  const now = new Date();
  const year = now.getFullYear();
  const monthNumber = now.getMonth();
  const additional_social_media_instructions = `If the user asks for a social media post, incorportate text from the details to write a social media post caption.`;

  const system_instructions = `
    You are an AI marketing agent for small business owners. Your job is to help create recommendations for marketing campaigns tailored to the details of their business. This config JSON represents the data for the business you're working with: 
        ${JSON.stringify(
          business_config.business_details
        )}. Please use it to create your recommendations.

    You will only return JSON data with this schema:
    {
        "your_conversation_response": conversational text you would respond to the prompt
        "campaign_details": {
            "campaign_title": 3-5 word title for the campaign,
            "slogan": a catchy slogan like "Biggest Discounts of the Season!,
            "discount": "50% off",
            "campaign_detail": small length text describing the campaign,
            "campaign_period": {
            "start_date": Date object,
            "end_date": Date object
            },
            "call_to_action": a great, creative, and catchy call to action,
            "theme": "a theme for the campaign",
            "caption": caption for a social media post (only for social media mode),
            "hashtags": [hashtag, hashtag, hashtag] // hashtags for a social media post (only for social media mode)
            "colorTheme": [hex string, hex string, hex string] // try to do minimalistic colors with a max of 3
        }
    }

    Do not include any promo codes

    Incorporate details from the business config when you can. 
    If you need additional information for the campaign, set the campaign_details field to null and in the conversation_response field, generate the details yourself and ask the user if they like your recommendations. 
    If they don't like your recommendations, but don't specify which details to change, then generate all new details. If they specify that they don't like specific details, ONLY modify the specified details to the user's request.
    If you don't need additional info for the campaign and the user approves of your recommendations, set the campaign_details field to the recommendation you gave the user according schema.
    Keep campaign_details equal to null otherwise.
    Make sure that the campaign_period is in the future, but within the same year unless told otherwise. The current year is ${year}. If they don't specify a time for the campaign, have it be during this month: ${monthNumber}.
    Always give a conversational response in the your_conversation_response field even if the campaign_details are complete. Include one exclamation mark at the end of your call to action.
    If campaign_details is not null, always include it in a readable format in your_conversation_response.
    `;

  const textModel = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: system_instructions,
  });
  return textModel.startChat();
}

/**
 * sends a chat to Gemini and returns the response
 * @param {ChatSession} chat
 * @param {string} prompt
 * @param {string} mediaMode
 * @returns {obj} - JSON object version of Gemini's response
 */
export async function sendChat(chat, prompt, mediaMode) {
    const result = await chat.sendMessage(
      prompt + " for " + mediaMode + " mode."
    ); // prompts Gemini
    const textResponse = result.response.text(); // get the response in string format

    if (textResponse.startsWith("```json")) {
      // Remove ```json and ``` from the string
      const cleanedString = textResponse.slice(7, -3);

      // Turn JSON string into an object
      const responseObj = JSON.parse(cleanedString);

      return responseObj;
    }

    return textResponse;
}

/**
 * Creates a new chat for generating marketing campaign recommendations based on upcoming events in the next month.
 * @param {object} business_config
 * @returns {ChatSession}
 */
export function createDateBasedCampaignChat(business_config) {
  const today = new Date();
  const year = today.getFullYear();
  const monthNumber = today.getMonth() + 1;
  const nextMonthNumber = monthNumber === 12 ? 1 : monthNumber + 1;

  const system_instructions = `
  You are an AI marketing agent for small business owners. Your job is to create marketing campaigns based on upcoming holidays or seasonal trends in the next month (${nextMonthNumber}/${year}).
  Identify major shopping events, holidays, or seasonal trends relevant to the user's business. If no major event is found, suggest a seasonal promotion.
  
  This business config represents the user's business details: ${JSON.stringify(business_config.business_details)}. Use it to tailor the campaign recommendations.

  You will return JSON data in this format:
  {
      "your_conversation_response": "Introduction to campaign options",
      "campaign_options": [
          {
              "campaign_title": "First campaign title",
              "slogan": "First catchy slogan",
              "discount": "First discount offer",
              "campaign_detail": "First campaign description",
              "campaign_period": {
                  "start_date": "YYYY-MM-DD",
                  "end_date": "YYYY-MM-DD"
              },
              "call_to_action": "First call to action!",
              "theme": "First campaign theme",
              "caption": "First social media caption",
              "hashtags": ["#firstHashtag1", "#firstHashtag2"],
              "colorTheme": ["#firstHex1", "#firstHex2"]
          },
          {
              "campaign_title": "Second campaign title",
              "slogan": "Second catchy slogan",
              "discount": "Second discount offer",
              "campaign_detail": "Second campaign description",
              "campaign_period": {
                  "start_date": "YYYY-MM-DD",
                  "end_date": "YYYY-MM-DD"
              },
              "call_to_action": "Second call to action!",
              "theme": "Second campaign theme",
              "caption": "Second social media caption",
              "hashtags": ["#secondHashtag1", "#secondHashtag2"],
              "colorTheme": ["#secondHex1", "#secondHex2"]
          },
          {
              "campaign_title": "Third campaign title",
              "slogan": "Third catchy slogan",
              "discount": "Third discount offer",
              "campaign_detail": "Third campaign description",
              "campaign_period": {
                  "start_date": "YYYY-MM-DD",
                  "end_date": "YYYY-MM-DD"
              },
              "call_to_action": "Third call to action!",
              "theme": "Third campaign theme",
              "caption": "Third social media caption",
              "hashtags": ["#thirdHashtag1", "#thirdHashtag2"],
              "colorTheme": ["#thirdHex1", "#thirdHex2"]
          }
      ]
  }

  Always ensure the campaigns are future-dated within ${year}. Provide engaging and customized recommendations based on the business details provided. Make sure to keep the text pretty short, such as the title and discount
  `;

  const textModel = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: system_instructions,
  });

  return textModel.startChat();
}