import { ChatSession, GenerativeModel } from "@google/generative-ai";
import { genAI } from "./GeminiConfig";

export class CampaignDetail {
    constructor (campaign_title, slogan, discount, campaign_detail, start_date, end_date, call_to_action, theme, caption, hashtags, color_theme) {
        this.campaign_title = campaign_title
        this.slogan = slogan
        this.discount = discount
        this.campaign_detail = campaign_detail
        this.start_date = start_date
        this.end_date = end_date
        this.call_to_action = call_to_action
        this.theme = theme
        this.caption = caption
        this.hashtags = hashtags
        this.color_theme = color_theme
    }
}

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
  const dayOfMonth = now.getDate();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthName = monthNames[monthNumber];

  console.log("config:", business_config)

  const system_instructions = `
    You are an AI marketing agent for small business owners. Your job is to help create recommendations for marketing campaigns tailored to the details of their business. This config JSON represents the data for the business you're working with: 
        ${JSON.stringify(
          business_config
        )}. Please use it to create your recommendations.

    You will only return JSON data with this schema:
    {
        "your_conversation_response": conversational text you would respond to the prompt
        "campaign_details": {
            "campaign_title": 3-5 word title for the campaign,
            "slogan": a catchy slogan like "Biggest Discounts of the Season!,
            "discount": "50% off" (if in social media mode, make this only a percentage),
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
    Make sure that the campaign_period starts some time after today's date, but within the same year unless told otherwise. The current date is ${monthName} ${dayOfMonth} ${year}.If they don't specify a time for the campaign, use the current month and day for to guide your campaign creation. 
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
 * @typedef ChatResponse
 * @property {string} conversation_response
 * @property {CampaignDetail} campaign_details
 */

/**
 * sends a chat to Gemini and returns the response
 * @param {ChatSession} chat
 * @param {string} prompt
 * @param {string} mediaMode
 * @returns {ChatResponse} - JSON object version of Gemini's response
 */
export async function sendChat(chat, prompt, mediaMode, campaignDetails = null) {
    let finalPrompt = prompt + ` for ${mediaMode} mode.`;

    if (campaignDetails) {
        finalPrompt = `
        Modify the existing campaign based on this update:
        - Current campaign: ${JSON.stringify(campaignDetails)}
        - User request: ${prompt}

            You will **ONLY** return JSON data with this schema:
        {
            "your_conversation_response": "Chat-friendly response",
            "campaign_details": {
                "campaign_title": "Updated campaign title",
                "slogan": "Updated slogan",
                "discount": "Updated discount",
                "campaign_detail": "Updated campaign description",
                "campaign_period": {
                    "start_date": "YYYY-MM-DD",
                    "end_date": "YYYY-MM-DD"
                },
                "call_to_action": "Updated CTA",
                "theme": "Updated theme",
                "caption": "Updated social media caption",
                "hashtags": ["#updatedHashtag1", "#updatedHashtag2"],
                "colorTheme": ["#updatedHex1", "#updatedHex2"]
            }
        }

        Do NOT generate new campaigns. Only return ONE modified version of the existing campaign in JSON format.
        `;
    }

    const result = await chat.sendMessage(finalPrompt); // prompts Gemini
    const textResponse = result.response.text(); // get the response in string format

    if (textResponse.startsWith("```json")) {
      // Remove ```json and ``` from the string
      const cleanedString = textResponse.slice(7, -3);

      // Turn JSON string into an object
      const responseObj = JSON.parse(cleanedString);
      const campaign_details = new CampaignDetail(
        responseObj.campaign_details.campaign_title,
        responseObj.campaign_details.slogan,
        responseObj.campaign_details.discount,
        responseObj.campaign_details.campaign_detail,
        responseObj.campaign_details.campaign_period.start_date,
        responseObj.campaign_details.campaign_period.end_date,
        responseObj.campaign_details.call_to_action,
        responseObj.campaign_details.theme,
        responseObj.campaign_details.caption,
        responseObj.campaign_details.hashtags,
        responseObj.campaign_details.color_theme,
      )

      const res = {
        "conversation_response": responseObj.your_conversation_response,
        "campaign_details": campaign_details
      }

      console.log("res:", res)

      return res;
    }

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
  
  This business config represents the user's business details: ${JSON.stringify(business_config)}. Use it to tailor the campaign recommendations.

  You will return JSON data in this format:
  {
      "your_conversation_response": "Introduction to campaign options",
      "campaign_options": [
          {
              "campaign_title": 3-5 word title for the campaign,
              "slogan": a catchy slogan like "Biggest Discounts of the Season!,
              "discount": "50% off" (if in social media mode, make this only a percentage),
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
          },
          {
              "campaign_title": 3-5 word title for the campaign,
              "slogan": a catchy slogan like "Biggest Discounts of the Season!,
              "discount": "50% off" (if in social media mode, make this only a percentage),
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
          },
          {
              "campaign_title": 3-5 word title for the campaign,
              "slogan": a catchy slogan like "Biggest Discounts of the Season!,
              "discount": "50% off" (if in social media mode, make this only a percentage),
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
          },
          {
              "campaign_title": 3-5 word title for the campaign,
              "slogan": a catchy slogan like "Biggest Discounts of the Season!,
              "discount": "50% off" (if in social media mode, make this only a percentage),
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
          },
          {
            "campaign_title": 3-5 word title for the campaign,
              "slogan": a catchy slogan like "Biggest Discounts of the Season!,
              "discount": "50% off" (if in social media mode, make this only a percentage),
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
          
      ]
  }

  Always ensure the campaigns are future-dated within ${year}. Provide engaging and customized recommendations based on the business details provided. Make sure to keep the text pretty short, such as the title and discount. if it is a 
  `;

  const textModel = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: system_instructions,
  });

  return textModel.startChat();
}

/**
 * @typedef ChatResponseOptions
 * @property {string} conversation_response
 * @property {[CampaignDetail]} campaign_options
 */

/**
 * sends a chat to Gemini and returns the response
 * @param {ChatSession} chat
 * @param {string} prompt
 * @param {string} mediaMode
 * @returns {ChatResponseOptions} - JSON object version of Gemini's response
 */
export async function sendChatOptions(chat, prompt, mediaMode, campaignDetails = null) {
  let finalPrompt = prompt + ` for ${mediaMode} mode.`;

  if (campaignDetails) {
      finalPrompt = `
      Modify the existing campaign based on this update:
      - Current campaign: ${JSON.stringify(campaignDetails)}
      - User request: ${prompt}

          You will **ONLY** return JSON data with this schema:
      {
          "your_conversation_response": "Chat-friendly response",
          "campaign_details": {
              "campaign_title": "Updated campaign title",
              "slogan": "Updated slogan",
              "discount": "Updated discount",
              "campaign_detail": "Updated campaign description",
              "campaign_period": {
                  "start_date": "YYYY-MM-DD",
                  "end_date": "YYYY-MM-DD"
              },
              "call_to_action": "Updated CTA",
              "theme": "Updated theme",
              "caption": "Updated social media caption",
              "hashtags": ["#updatedHashtag1", "#updatedHashtag2"],
              "colorTheme": ["#updatedHex1", "#updatedHex2"]
          }
      }

      Do NOT generate new campaigns. Only return ONE modified version of the existing campaign in JSON format.
      `;
  }

  const result = await chat.sendMessage(finalPrompt); // prompts Gemini
  const textResponse = result.response.text(); // get the response in string format

  if (textResponse.startsWith("```json")) {
    // Remove ```json and ``` from the string
    const cleanedString = textResponse.slice(7, -3);

    // Turn JSON string into an object
    const responseObj = JSON.parse(cleanedString);

    console.log("response options", responseObj)

    if (responseObj.campaign_options === undefined) {
      const res = {
        "conversation_response": responseObj.your_conversation_response,
        "campaign_options": []
      }

      return res
    }

    let options = []

    for (let i = 0; i < responseObj.campaign_options.length; i++) {
      const details = responseObj.campaign_options[i]
      const campaign_details = new CampaignDetail(
        details.campaign_title,
        details.slogan,
        details.discount,
        details.campaign_detail,
        details.campaign_period.start_date,
        details.campaign_period.end_date,
        details.call_to_action,
        details.theme,
        details.caption,
        details.hashtags,
        details.color_theme,
      )
      options.push(campaign_details)
    }

    const res = {
      "conversation_response": responseObj.your_conversation_response,
      "campaign_options": options
    }

    return res;
  }

}