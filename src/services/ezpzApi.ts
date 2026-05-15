const BLAND_API_ENDPOINT = "https://api.bland.ai/v1/calls";

interface BlandCallParams {
  phoneNumber: string;
  task: string;
  orgId?: string;
  request_data?: {
    name: string;
  };
}

export const initiateBlandCall = async ({
  phoneNumber,
  task,
  request_data,
}: BlandCallParams) => {
  try {
    const apiKey = process.env.BLAND_API_KEY;
    if (!apiKey) {
      throw new Error("API key is not set in the environment variables");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    const data = {
      phone_number: phoneNumber,
      from: "+14155322237",
      task: task,
      model: "turbo",
      language: "en",
      voice: "0d13d946-b558-4b0d-8160-ce71c2a18c21",
      voice_settings: {},
      pathway_id: "910b8c10-57fc-4f3c-bafc-c4a7ea3bbcdc",
      local_dialing: false,
      max_duration: 12,
      answered_by_enabled: false,
      wait_for_greeting: false,
      noise_cancellation: false,
      record: false,
      amd: false,
      interruption_threshold: 100,
      voicemail_message: null,
      temperature: null,
      transfer_phone_number: null,
      transfer_list: {},
      metadata: {},
      pronunciation_guide: [],
      start_time: null,
      background_track: "office",
      request_data: request_data,
      dynamic_data: [],
      analysis_preset: null,
      analysis_schema: {},
      webhook: null,
      calendly: {},
      timezone: null,
    };

    const response = await fetch(BLAND_API_ENDPOINT, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to initiate call");
    }

    return await response.json();
  } catch (error) {
    console.error("Error initiating Bland call:", error);
    throw error;
  }
};
