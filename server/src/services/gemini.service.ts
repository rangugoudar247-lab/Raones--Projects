import { GoogleGenAI } from '@google/genai';
import { config } from '../config';
import {
  AdvisoryInput,
  AIAdvisoryResponse,
  AIAdvisoryResponseSchema,
  EmergencyInput,
  AIEmergencyResponse,
  AIEmergencyResponseSchema
} from '../schemas';

const SYSTEM_INSTRUCTION = `You are Rural Emergency & Livelihood Assistant, an AI support system designed to help rural workers and small farmers understand everyday agricultural, livestock, livelihood, weather, and emergency-related problems.

Your primary responsibilities are:
1. Understand the user's situation.
2. Identify the general category of the problem.
3. Estimate urgency conservatively.
4. Provide practical, understandable next steps.
5. Prioritize immediate safety when danger may exist.
6. Clearly explain when the user should contact a qualified professional or emergency service.
7. Respond in the user's selected language.
8. Avoid unsupported claims.
9. Never pretend to have contacted authorities, veterinarians, doctors, government offices, or emergency services.
10. Never claim certainty when the available information is insufficient.

For emergencies, safety must take priority over detailed explanations.
For agricultural questions, provide general evidence-informed guidance while acknowledging that local conditions, soil, climate, crop variety, and professional agricultural advice can change the appropriate recommendation.
For livestock questions, do not provide definitive diagnosis. Identify concerning signs and recommend veterinary assistance when appropriate.
For medical, chemical, electrical, fire, disaster, or other dangerous situations, prioritize immediate safety and qualified emergency assistance.
Never fabricate government schemes, phone numbers, prices, weather data, market prices, medical diagnoses, veterinary diagnoses, or local services.
If current information is required and the application has no verified live data source, explicitly state that the information should be verified through an official local source.
Keep instructions simple and actionable.`;

// Clean raw JSON response from markdown tags
function cleanJsonOutput(rawText: string): string {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  return cleaned.trim();
}

export class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    if (config.gemini.apiKey) {
      try {
        this.ai = new GoogleGenAI({
          apiKey: config.gemini.apiKey,
        });
      } catch (err) {
        console.error('Failed to initialize GoogleGenAI client:', err);
      }
    } else {
      console.warn('⚠️ GEMINI_API_KEY is not set. GeminiService will provide structured evidence-based fallback responses.');
    }
  }

  /**
   * Generate structured advisory for Agriculture, Livestock, Weather, or Livelihood
   */
  async generateAdvisory(input: AdvisoryInput): Promise<AIAdvisoryResponse> {
    const isKannada = input.language === 'kn';

    if (this.ai && config.gemini.apiKey) {
      try {
        const prompt = `Analyze the following rural user's situation.

Category:
${input.category}

Subcategory:
${input.subcategory || 'General'}

Problem:
${input.problem_description}

Location:
${input.location || 'Rural / Farm'}

Crop:
${input.crop_type || 'N/A'}

Crop Stage:
${input.crop_stage || 'N/A'}

Livestock:
${input.livestock_type || 'N/A'}

Livestock Age:
${input.livestock_age || 'N/A'}

Duration:
${input.duration || 'Not specified'}

Reported Severity:
${input.user_severity || 'medium'}

Additional Information:
${input.additional_information || 'None'}

Preferred Language:
${isKannada ? 'Kannada (ಕನ್ನಡ) - Respond completely in Kannada for all text fields!' : 'English'}

You MUST output ONLY a valid JSON object matching the following structure exactly without extra commentary:
{
  "summary": "Clear summary of the problem and key findings in ${isKannada ? 'Kannada' : 'English'}",
  "urgency": "low" | "medium" | "high" | "critical",
  "immediate_actions": ["immediate action step 1", "step 2"],
  "recommended_next_steps": ["practical next step 1", "step 2"],
  "things_to_avoid": ["critical thing to avoid 1", "thing 2"],
  "professional_help": {
    "recommended": true or false,
    "reason": "When and why to contact an agricultural officer / veterinarian / authority in ${isKannada ? 'Kannada' : 'English'}"
  },
  "follow_up_questions": ["clarifying question 1", "clarifying question 2"],
  "disclaimer": "Safety & advisory disclaimer in ${isKannada ? 'Kannada' : 'English'}"
}`;

        const response = await this.ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });

        const text = response.text || '';
        const cleaned = cleanJsonOutput(text);
        const parsed = JSON.parse(cleaned);

        // Validate via Zod Schema
        return AIAdvisoryResponseSchema.parse(parsed);
      } catch (error) {
        console.error('Gemini API call failed, using safe fallback generator:', error);
      }
    }

    // High quality deterministic fallback generator when API key is missing or network failed
    return this.generateFallbackAdvisory(input);
  }

  /**
   * Generate structured immediate guidance for Emergencies
   */
  async generateEmergencyGuidance(input: EmergencyInput): Promise<AIEmergencyResponse> {
    const isKannada = input.language === 'kn';

    if (this.ai && config.gemini.apiKey) {
      try {
        const prompt = `You are handling a potentially dangerous rural emergency.

Emergency Type:
${input.emergency_type}

Description:
${input.description}

Location:
${input.location || 'Rural / Unspecified'}

Reported Urgency:
${input.urgency}

Provide immediate safety-oriented guidance.
Do not provide dangerous technical instructions.
Do not delay emergency assistance.
If there is immediate danger to life, instruct the user to contact the appropriate local emergency service immediately (112, 108, 101, 1962).

Preferred Language:
${isKannada ? 'Kannada (ಕನ್ನಡ) - Respond completely in Kannada for all text fields!' : 'English'}

You MUST output ONLY a valid JSON object matching this schema:
{
  "emergency_level": "low" | "medium" | "high" | "critical",
  "immediate_safety_actions": ["immediate life safety step 1", "step 2"],
  "call_emergency_services": true or false,
  "professional_assistance": ["which service to call e.g. Fire 101, Ambulance 108, Police 112, Animal Ambulance 1962"],
  "things_to_avoid": ["hazardous practice to avoid 1", "avoid 2"],
  "next_steps": ["containment or safe shelter step 1", "step 2"],
  "warning": "Urgent life safety caution in ${isKannada ? 'Kannada' : 'English'}"
}`;

        const response = await this.ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            temperature: 0.1,
          },
        });

        const text = response.text || '';
        const cleaned = cleanJsonOutput(text);
        const parsed = JSON.parse(cleaned);

        return AIEmergencyResponseSchema.parse(parsed);
      } catch (error) {
        console.error('Gemini Emergency API call failed, using safe fallback:', error);
      }
    }

    return this.generateFallbackEmergency(input);
  }

  /**
   * Deterministic safety-first fallback advisory
   */
  private generateFallbackAdvisory(input: AdvisoryInput): AIAdvisoryResponse {
    const isKn = input.language === 'kn';
    const isAgri = input.category.toLowerCase().includes('agri') || input.category.toLowerCase().includes('crop');
    const isLivestock = input.category.toLowerCase().includes('live') || input.category.toLowerCase().includes('anim');

    if (isKn) {
      if (isLivestock) {
        return {
          summary: `ಪ್ರಾಣಿ ಆರೋಗ್ಯ ಪರಿಸ್ಥಿತಿ ವರದಿ: ${input.livestock_type || 'ಜಾನುವಾರು'} - ${input.problem_description.slice(0, 100)}. ಪ್ರಾಥಮಿಕ ಅವಲೋಕನದಲ್ಲಿ ತಕ್ಷಣ ಜಾಗರೂಕತೆ ಅಗತ್ಯವಿದೆ.`,
          urgency: input.user_severity || 'high',
          immediate_actions: [
            'ಅಸ್ವಸ್ಥ ಪ್ರಾಣಿಯನ್ನು ತಕ್ಷಣವೇ ಉಳಿದ ಆರೋಗ್ಯವಂತ ಮಂದೆಯಿಂದ ಪ್ರತ್ಯೇಕಿಸಿ.',
            'ಸ್ವಚ್ಛವಾದ ಕುಡಿಯುವ ನೀರು ಮತ್ತು ನೆರಳಿನ ಸ್ಥಳವನ್ನು ಒದಗಿಸಿ.',
            'ಪ್ರಾಣಿಯ ದೇಹದ ತಾಪಮಾನ ಮತ್ತು ಉಸಿರಾಟದ ಗತಿಯನ್ನು ಗಮನಿಸಿ ದಾಖಲಿಸಿ.',
            'ಪಶು ಸಂಜೀವಿನಿ ತುರ್ತು ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆ 1962 ಗೆ ಕರೆ ಮಾಡಿ.'
          ],
          recommended_next_steps: [
            'ಹತ್ತಿರದ ಸರ್ಕಾರಿ ಪಶು ಚಿಕಿತ್ಸಾಲಯಕ್ಕೆ ಭೇಟಿ ನೀಡಿ ವೈದ್ಯರ ನೆರವು ಪಡೆಯಿರಿ.',
            'ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದ ಸಮಯ ಮತ್ತು ಸೇವಿಸಿದ ಆಹಾರದ ಮಾಹಿತಿಯನ್ನು ಸಿದ್ಧವಾಗಿಟ್ಟುಕೊಳ್ಳಿ.',
            'ಪಶು ವೈದ್ಯರ ಲಿಖಿತ ಸಲಹೆಯಿಲ್ಲದೆ ಯಾವುದೇ ರೋಗನಿರೋಧಕ ಔಷಧ ಅಥವಾ ಚುಚ್ಚುಮದ್ದು ನೀಡಬೇಡಿ.'
          ],
          things_to_avoid: [
            'ಯಾವುದೇ ಅಜ್ಞಾತ ಸಾಂಪ್ರದಾಯಿಕ ರಾಸಾಯನಿಕ ಲೇಪನ ಅಥವಾ ಔಷಧಿ ಹಾಕಬೇಡಿ.',
            'ಅಸ್ವಸ್ಥ ಪ್ರಾಣಿಗೆ ಬಲವಂತವಾಗಿ ನೀರು ಅಥವಾ ಗಟ್ಟಿ ಆಹಾರ ನುಂಗಿಸಬೇಡಿ.',
            'ಪ್ರಾಣಿಯ ಸಗಣಿ ಅಥವಾ ಸ್ರಾವಗಳನ್ನು ಇತರ ಜಾನುವಾರುಗಳ ಸಂಪರ್ಕಕ್ಕೆ ತರಬೇಡಿ.'
          ],
          professional_help: {
            recommended: true,
            reason: 'ಜಾನುವಾರುಗಳ ಕಾಯಿಲೆಗಳನ್ನು ಸ್ವತಃ ನಿರ್ಣಯಿಸುವುದು ಅಪಾಯಕಾರಿ. ಪಶು ವೈದ್ಯರಿಂದ ತಕ್ಷಣ ತಪಾಸಣೆ ಮಾಡಿಸುವುದು ಅತ್ಯಗತ್ಯ.'
          },
          follow_up_questions: [
            'ಪ್ರಾಣಿಯು ಆಹಾರ ಮತ್ತು ನೀರು ಸೇವಿಸುವುದನ್ನು ಸಂಪೂರ್ಣ ನಿಲ್ಲಿಸಿದೆಯೇ?',
            'ಬಾಯಿ ಅಥವಾ ಕಾಲಿನಲ್ಲಿ ಹುಣ್ಣು ಅಥವಾ ಜೊಲ್ಲು ಸುರಿಯುವಿಕೆ ಕಂಡುಬರುತ್ತಿದೆಯೇ?'
          ],
          disclaimer: 'ಗಮನಿಸಿ: ಈ ಸಲಹೆಯು ಪ್ರಾಥಮಿಕ ಮಾಹಿತಿಯಾಗಿದ್ದು, ಪ್ರಮಾಣೀಕೃತ ಪಶು ವೈದ್ಯರ ಅಧಿಕೃತ ಪರೀಕ್ಷೆಗೆ ಪರ್ಯಾಯವಲ್ಲ.'
        };
      }

      if (isAgri) {
        return {
          summary: `ಬೆಳೆ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನ: ${input.crop_type || 'ಬೆಳೆ'} (${input.crop_stage || 'ಹಂತ'}) - ${input.problem_description.slice(0, 100)}. ಲಕ್ಷಣಗಳ ಪರಿಶೀಲನೆ ಮತ್ತು ನಿಯಂತ್ರಣ ಕ್ರಮಗಳು.`,
          urgency: input.user_severity || 'medium',
          immediate_actions: [
            'ಕೀಟ ಅಥವಾ ರೋಗಬಾಧಿತ ಎಲೆ ಅಥವಾ ಗಿಡಗಳನ್ನು ತಕ್ಷಣ ಕಿತ್ತು ಪ್ರತ್ಯೇಕಿಸಿ ನಾಶಪಡಿಸಿ.',
            'ಬೆಳೆಯ ಹಾನಿಯ ಪ್ರಮಾಣವನ್ನು (ಶೇಕಡಾವಾರು) ನಿಖರವಾಗಿ ಅಂದಾಜಿಸಿ.',
            'ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್ 1800-180-1551 ಗೆ ಉಚಿತ ಕರೆ ಮಾಡಿ ತಜ್ಞರ ಸಲಹೆ ಪಡೆಯಿರಿ.'
          ],
          recommended_next_steps: [
            'ಸ್ಥಳೀಯ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರದ (RSK) ಕೃಷಿ ಅಧಿಕಾರಿಗೆ ಬೆಳೆಯ ಫೋಟೋ ತೋರಿಸಿ ಶಿಫಾರಸು ಪಡೆಯಿರಿ.',
            'ಮಣ್ಣಿನ ತೇವಾಂಶ ಮತ್ತು ನೀರಾವರಿ ನಿರ್ವಹಣೆಯನ್ನು ಅಗತ್ಯಕ್ಕೆ ತಕ್ಕಂತೆ ಸರಿಹೊಂದಿಸಿ.',
            'ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರಮಾಣದಲ್ಲಿ ಮಾತ್ರ ಜೈವಿಕ ಅಥವಾ ರಸಾಯನಿಕ ನಿಯಂತ್ರಕಗಳನ್ನು ಬಳಸಿ.'
          ],
          things_to_avoid: [
            'ರೋಗದ ನಿಖರ ಕಾರಣ ತಿಳಿಯದೆ ಅನಗತ್ಯವಾಗಿ ಅತಿಯಾದ ರಾಸಾಯನಿಕ ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸಬೇಡಿ.',
            'ಬಿಸಿಲಿನ ತೀವ್ರತೆ ಇರುವ ಮಧ್ಯಾಹ್ನದ ಸಮಯದಲ್ಲಿ ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸಬೇಡಿ.',
            'ರಾಸಾಯನಿಕ ಸಿಂಪಡಿಸುವಾಗ ಮುಖಗವಸು ಮತ್ತು ಕೈಗವಸು ಧರಿಸದೆ ಇರಬೇಡಿ.'
          ],
          professional_help: {
            recommended: true,
            reason: 'ರೋಗಲಕ್ಷಣಗಳು ಹೆಚ್ಚು ಹರಡಿದರೆ ಹತ್ತಿರದ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರ (KVK) ಅಥವಾ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರವನ್ನು ಸಂಪರ್ಕಿಸಿ.'
          },
          follow_up_questions: [
            'ಎಲೆಗಳ ಕೆಳಭಾಗದಲ್ಲಿ ನುಸಿ ಅಥವಾ ಕೀಟಗಳ ಮೊಟ್ಟೆಗಳು ಕಂಡುಬರುತ್ತಿವೆಯೇ?',
            'ಹಿಂದಿನ 3 ದಿನಗಳಲ್ಲಿ ಮಳೆ ಅಥವಾ ಹವಾಮಾನದಲ್ಲಿ ತೀವ್ರ ಬದಲಾವಣೆ ಆಗಿದೆಯೇ?'
          ],
          disclaimer: 'ಗಮನಿಸಿ: ಈ ಮಾರ್ಗದರ್ಶನವು ಪ್ರಾಥಮಿಕ ಮಾಹಿತಿಯಾಗಿದೆ. ಸ್ಥಳೀಯ ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನಕ್ಕೆ ತಕ್ಕಂತೆ ಕೃಷಿ ಅಧಿಕಾರಿಯ ಸಲಹೆ ಪಡೆಯುವುದು ಸೂಕ್ತ.'
        };
      }

      return {
        summary: `ಗ್ರಾಮೀಣ ನೆರವು ಮಾರ್ಗದರ್ಶನ: ${input.category} - ${input.problem_description.slice(0, 100)}.`,
        urgency: input.user_severity || 'medium',
        immediate_actions: [
          'ಸಮಸ್ಯೆಯ ವಿವರ ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ಸಿದ್ಧವಾಗಿಟ್ಟುಕೊಳ್ಳಿ.',
          'ಸ್ಥಳೀಯ ಗ್ರಾಮ ಪಂಚಾಯತಿ ಅಥವಾ ಸಂಬಂಧಪಟ್ಟ ಇಲಾಖೆಯ ಹೆಲ್ಪ್‌ಲೈನ್‌ಗೆ ಕರೆ ಮಾಡಿ.',
          'ಅನಗತ್ಯ ಆತಂಕಕ್ಕೆ ಒಳಗಾಗದೆ ಸುರಕ್ಷಿತ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳನ್ನು ಪಾಲಿಸಿ.'
        ],
        recommended_next_steps: [
          'ಸಂಬಂಧಿತ ಸರ್ಕಾರಿ ಯೋಜನೆ ಅಥವಾ ಪರಿಹಾರ ಸೌಲಭ್ಯಗಳ ಪರಿಶೀಲನೆ ನಡೆಸಿ.',
          'ಗ್ರಾಮ ಲೆಕ್ಕಾಧಿಕಾರಿ ಅಥವಾ ತೋಟಗಾರಿಕೆ / ಕೃಷಿ ಸಹಾಯಕರನ್ನು ಸಂಪರ್ಕಿಸಿ.'
        ],
        things_to_avoid: [
          'ದೃಢೀಕರಿಸದ ಮಧ್ಯವರ್ತಿಗಳ ಮಾತು ಕೇಳಿ ಹಣ ಪಾವತಿಸಬೇಡಿ.',
          'ಅಧಿಕೃತವಲ್ಲದ ಮೂಲಗಳಿಂದ ಬರುವ ಮಾಹಿತಿಯನ್ನು ನಂಬಬೇಡಿ.'
        ],
        professional_help: {
          recommended: true,
          reason: 'ಸಮಸ್ಯೆ ಬಗೆಹರಿಯದಿದ್ದಲ್ಲಿ ಸ್ಥಳೀಯ ತಾಲೂಕು ಆಡಳಿತ ಅಥವಾ ಅಧಿಕೃತ ಸಹಾಯವಾಣಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.'
        },
        follow_up_questions: [
          'ನೀವು ಈಗಾಗಲೇ ಗ್ರಾಮ ಪಂಚಾಯತಿ ಅಥವಾ ಸ್ಥಳೀಯ ಕೇಂದ್ರದಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ್ದೀರಾ?'
        ],
        disclaimer: 'ಈ ಮಾಹಿತಿಯು ಸಾರ್ವಜನಿಕ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿದ್ದು, ಅಧಿಕೃತ ಕಚೇರಿಯ ನಿಯಮಾವಳಿಗಳಿಗೆ ಒಳಪಟ್ಟಿರುತ್ತದೆ.'
      };
    }

    // English Fallback
    if (isLivestock) {
      return {
        summary: `Livestock Health Observation: ${input.livestock_type || 'Livestock'} - ${input.problem_description.slice(0, 100)}. Initial assessment highlights precautionary care.`,
        urgency: input.user_severity || 'high',
        immediate_actions: [
          'Isolate the sick animal immediately from the rest of the herd or flock.',
          'Ensure continuous access to fresh clean water and well-ventilated shade.',
          'Record rectal temperature, respiratory rate, and appetite changes.',
          'Call Pashu Sanjeevani Veterinary Helpline 1962 immediately.'
        ],
        recommended_next_steps: [
          'Contact your local government veterinary dispensary officer for on-site inspection.',
          'Keep feed history and any recent pasture changes documented for the doctor.',
          'Follow biosafety protocols: wash boots and hands after handling the isolated animal.'
        ],
        things_to_avoid: [
          'Do NOT administer antibiotics or prescription injections without a qualified veterinarian.',
          'Do NOT force-drench liquids into an animal that has difficulty swallowing.',
          'Do NOT dispose of bodily secretions near communal grazing grounds or water tanks.'
        ],
        professional_help: {
          recommended: true,
          reason: 'Veterinary conditions can deteriorate rapidly in farm animals. Professional clinical examination is required.'
        },
        follow_up_questions: [
          'Is the animal ruminating (chewing the cud) normally?',
          'Are there any lesions on the mouth, tongue, or hooves?'
        ],
        disclaimer: 'Notice: This advisory is for general informational purposes only and does not constitute a definitive veterinary diagnosis or treatment plan.'
      };
    }

    if (isAgri) {
      return {
        summary: `Crop Advisory & Action Plan: ${input.crop_type || 'Crop'} (${input.crop_stage || 'Stage'}) - ${input.problem_description.slice(0, 100)}.`,
        urgency: input.user_severity || 'medium',
        immediate_actions: [
          'Inspect the field systematically (zig-zag pattern) to measure affected percentage.',
          'Remove and safely destroy heavily infested leaves or plants away from the plot.',
          'Call Kisan Call Center toll-free at 1800-180-1551 for expert agronomist guidance.'
        ],
        recommended_next_steps: [
          'Visit your local Raitha Samparka Kendra (RSK) or KVK with high-resolution photos.',
          'Adjust irrigation schedule to avoid waterlogging and fungal pathogen proliferation.',
          'Apply only university/ICAR-recommended biocontrol or crop protection products.'
        ],
        things_to_avoid: [
          'Do NOT apply excessive uncalibrated chemical pesticides without knowing the exact pest/fungus.',
          'Do NOT spray during midday heat or windy weather to avoid chemical drift and burns.',
          'Do NOT handle agricultural chemicals without personal protective equipment (mask, gloves).'
        ],
        professional_help: {
          recommended: true,
          reason: 'Local microclimate, soil pH, and specific pest resistance patterns require validation by an Agricultural Extension Officer.'
        },
        follow_up_questions: [
          'Are yellowing patterns uniform across old leaves or emerging on young shoots?',
          'What previous crop was cultivated in this field during the last season?'
        ],
        disclaimer: 'Notice: Agricultural recommendations are evidence-informed general guidance. Always cross-check with your local agricultural officer and read label directions.'
      };
    }

    return {
      summary: `Rural Advisory: ${input.category} - ${input.problem_description.slice(0, 100)}.`,
      urgency: input.user_severity || 'medium',
      immediate_actions: [
        'Collect relevant receipts, records, or photographs of the situation.',
        'Review eligible government schemes or local relief helplines.',
        'Prioritize family safety and resource conservation.'
      ],
      recommended_next_steps: [
        'Visit your local Gram Panchayat or relevant department office.',
        'Check official portals (e-NAM, PM-KISAN, or State Agriculture portals).'
      ],
      things_to_avoid: [
        'Avoid unverified middlemen or unauthorized fee demands.',
        'Do not share OTPs or bank account details with unverified phone callers.'
      ],
      professional_help: {
        recommended: true,
        reason: 'Complex administrative, legal, or financial issues require official department verification.'
      },
      follow_up_questions: [
        'Have you registered your land records (RTC/Pahani) on the state portal?'
      ],
      disclaimer: 'This advice provides general orientation. Official government criteria and notifications supersede all platform summaries.'
    };
  }

  /**
   * Deterministic safety-first fallback emergency guidance
   */
  private generateFallbackEmergency(input: EmergencyInput): AIEmergencyResponse {
    const isKn = input.language === 'kn';

    if (isKn) {
      return {
        emergency_level: input.urgency || 'critical',
        immediate_safety_actions: [
          'ಪ್ರಾಣಾಪಾಯದ ಸ್ಥಳದಿಂದ ತಕ್ಷಣವೇ ಸುರಕ್ಷಿತ ದೂರಕ್ಕೆ ತೆರಳಿ.',
          'ರಾಷ್ಟ್ರೀಯ ತುರ್ತು ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆ 112 ಅಥವಾ ಅಗ್ನಿಶಾಮಕ 101 ಕ್ಕೆ ಕರೆ ಮಾಡಿ.',
          'ವಿದ್ಯುತ್ ತಂತಿ ತುಂಡಾಗಿದ್ದರೆ ಕನಿಷ್ಠ 20 ಅಡಿ ದೂರವಿರಿ ಮತ್ತು ವಿದ್ಯುತ್ ಕಂಬ ಮುಟ್ಟಬೇಡಿ (ಬೆಸ್ಕಾಂ 1912 ಗೆ ಕರೆ ಮಾಡಿ).',
          'ಜಾನುವಾರುಗಳಿಗೆ ಅಪಾಯವಿದ್ದರೆ ಪಶು ಸಂಜೀವಿನಿ ಆಂಬ್ಯುಲೆನ್ಸ್ ಸಂಖ್ಯೆ 1962 ಗೆ ಕರೆ ಮಾಡಿ.'
        ],
        call_emergency_services: true,
        professional_assistance: [
          'ರಾಷ್ಟ್ರೀಯ ತುರ್ತು ಸೇವೆ (ಪೊಲೀಸ್/ಅಗ್ನಿ/ಆಂಬ್ಯುಲೆನ್ಸ್): 112',
          'ತುರ್ತು ವೈದ್ಯಕೀಯ ಆಂಬ್ಯುಲೆನ್ಸ್: 108',
          'ಅಗ್ನಿಶಾಮಕ ದಳ: 101',
          'ಪಶು ಸಂಜೀವಿನಿ (ಜಾನುವಾರು ಆಂಬ್ಯುಲೆನ್ಸ್): 1962',
          'ಜಿಲ್ಲಾ ವಿಪತ್ತು ನಿರ್ವಹಣಾ ಕೋಶ: 1077'
        ],
        things_to_avoid: [
          'ಸೂಕ್ತ ರಕ್ಷಣಾ ಸಾಧನಗಳಿಲ್ಲದೆ ಬೆಂಕಿ, ರಾಸಾಯನಿಕ ಸೋರಿಕೆ ಅಥವಾ ಪ್ರವಾಹದ ನೀರಿಗೆ ಇಳಿಯಬೇಡಿ.',
          'ವಿದ್ಯುತ್ ಪ್ರವಹಿಸುತ್ತಿರುವ ನೀರಿನಲ್ಲಿ ಅಥವಾ ಕಂಬಗಳ ಬಳಿ ನಿಲ್ಲಬೇಡಿ.',
          'ತುರ್ತು ಸೇವೆಗಳ ಬರುವಿಕೆಯನ್ನು ವಿಳಂಬ ಮಾಡಬೇಡಿ.'
        ],
        next_steps: [
          'ಸಮೀಪದ ಗ್ರಾಮಸ್ಥರಿಗೆ ಎಚ್ಚರಿಕೆ ನೀಡಿ, ಮಹಿಳೆಯರು ಮತ್ತು ಮಕ್ಕಳನ್ನು ಸುರಕ್ಷಿತ ಕಟ್ಟಡಕ್ಕೆ ಸ್ಥಳಾಂತರಿಸಿ.',
          'ಗ್ರಾಮ ಲೆಕ್ಕಾಧಿಕಾರಿ ಅಥವಾ ಪಂಚಾಯತ್ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿಗೆ ತಕ್ಷಣ ಮಾಹಿತಿ ರವಾನಿಸಿ.'
        ],
        warning: 'ಎಚ್ಚರಿಕೆ: ಇದು ತುರ್ತು ಪರಿಸ್ಥಿತಿಯಾಗಿದೆ. ಈ ಆ್ಯಪ್‌ನ ಸಂದೇಶಕ್ಕಾಗಿ ಕಾಯದೆ ತಕ್ಷಣ 112 ಅಥವಾ 108 ತುರ್ತು ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ!'
      };
    }

    return {
      emergency_level: input.urgency || 'critical',
      immediate_safety_actions: [
        'Evacuate people and animals to a safe, elevated, clear zone immediately.',
        'Call National Emergency Services at 112 or Medical Ambulance at 108.',
        'If fallen live electrical wires or broken poles are involved, stay at least 30 feet away and dial 1912.',
        'For animal accidents or poison exposure, dial Veterinary Helpline 1962 immediately.'
      ],
      call_emergency_services: true,
      professional_assistance: [
        'National Emergency Helpline: 112',
        'Ambulance Emergency: 108',
        'Fire and Rescue Services: 101',
        'Livestock Emergency (Pashu Sanjeevani): 1962',
        'Disaster Management Helpline: 1077'
      ],
      things_to_avoid: [
        'Do NOT attempt dangerous technical rescue without professional gear and assistance.',
        'Do NOT touch metal gates, puddles, or wires suspected of carrying electrical current.',
        'Do NOT delay calling 112 or qualified rescue operators.'
      ],
      next_steps: [
        'Warn neighboring farmers and keep bystanders at a safe perimeter.',
        'Notify your Gram Panchayat representative and keep emergency phone lines open.'
      ],
      warning: 'CRITICAL WARNING: This is an emergency situation. Do NOT rely solely on this app. Call 112 or local emergency rescue immediately!'
    };
  }
}

export const geminiService = new GeminiService();
