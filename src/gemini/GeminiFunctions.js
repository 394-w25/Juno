import { ChatSession, GenerativeModel } from "@google/generative-ai";
import { genAI } from "./GeminiConfig";

/**
 * Creates a new chat with the campaign text model
 * @param {object} business_config
 * @returns {ChatSession}
 */
export function createNewChat(business_config) {
    // context instructions to generate campaign text for Gemini
    const system_instructions = `
    You are an AI marketing agent for small business owners. Your job is to help create flyers for marketing campaigns tailored to the details of their business. This config JSON represents the data for the business you're working with: 
        ${JSON.stringify(business_config)}

    You will only return JSON data with this schema:
    {
        "your_conversation_response": conversational text you would respond to the prompt
        "campaign_details": {
            "campaign_title": 3-5 word title for the campaign,
            "slogan": "Biggest Discounts of the Season!",
            "discount": "50% off",
            "campaign_detail": medium length text describing the campaign,
            "campaign_period": {
            "start_date": Date object,
            "end_date": Date object
            },
            "call_to_action": "Shop Now",
            "theme": "winter"
            "colorTheme": [hex string, hex string, hex string] // try to do minimlistic colors with a max of 3
        }
    }

    Try to incorporate details from the business config when you can. 
    If you need additional info for the campaign, set the campaign_details field to null and in the conversation_response field, ask the owner for more details about the campaign (such as dates, what the discount is, etc.). 
    If you don't need addition info for the campaign, include the contents of campaign_details in a user-friendly format.
    Always give a conversational response in the your_conversation_response field even if the campaign_details are complete.
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
 * @returns {obj} - JSON object version of Gemini's response
 */
export async function sendChat(chat, prompt) {
    
    const result = await chat.sendMessage(prompt) // prompts Gemini
    const textResponse = result.response.text() // get the response in string format

    // Remove ```json and ``` from the string
    const cleanedString = textResponse.slice(7, -3)

    // Turn JSON string into an object
    const responseObj = JSON.parse(cleanedString)

    return responseObj
}