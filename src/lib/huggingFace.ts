import { HfInference } from "@huggingface/inference";

export const hf = new HfInference(process.env.HUGGINGFACE_API_KEY!);
