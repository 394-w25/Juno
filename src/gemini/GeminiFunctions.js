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
        ${JSON.stringify(business_config.business_details)}. Please use it to create your recommendations.

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
            "hashtags": hashtags for a social media post (only for social media mode)
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
    `

    const textModel = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: system_instructions
    })
    return textModel.startChat()
}

/**
 * sends a chat to Gemini and returns the response
 * @param {ChatSession} chat 
 * @param {string} prompt 
 * @param {string} mediaMode
 * @returns {obj} - JSON object version of Gemini's response
 */
export async function sendChat(chat, prompt, mediaMode) {
    
    const result = await chat.sendMessage(prompt + " for " + mediaMode + " mode.") // prompts Gemini
    const textResponse = result.response.text() // get the response in string format

    // Remove ```json and ``` from the string
    const cleanedString = textResponse.slice(7, -3)

    // Turn JSON string into an object
    const responseObj = JSON.parse(cleanedString)

    return responseObj
}