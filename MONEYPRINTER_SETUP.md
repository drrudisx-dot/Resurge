# MoneyPrinterV2 — Setup Guide for Boss

## What it needs to run fully:

| Component | What For | Get It |
|---|---|---|
| **Gemini API Key** | Generates images for Shorts | Free at aistudio.google.com |
| **AssemblyAI API Key** | Transcribes audio for subtitles | Free tier at assemblyai.com |
| **Ollama (local AI)** | Writes the video scripts | Free, runs on your PC |
| **Firefox + Profile** | Uploads to YouTube automatically | Already on your PC |

## Quickest path — run it on YOUR PC:

1. Install Ollama: https://ollama.com → then run: `ollama pull llama3`
2. Get Gemini API key free: https://aistudio.google.com/app/apikey
3. Get AssemblyAI free key: https://www.assemblyai.com
4. Fill in config.json with those keys
5. Run: `python src/main.py` → choose option 1 (YouTube Shorts)

## config.json keys to fill:
```json
{
  "nanobanana2_api_key": "YOUR_GEMINI_KEY_HERE",
  "assembly_ai_api_key": "YOUR_ASSEMBLYAI_KEY_HERE",
  "niche": "sleep improvement deep sleep weight loss natural supplements",
  "imagemagick_path": "/usr/bin/convert"
}
```

## Niche to use (aligns with Resurge funnel):
`sleep improvement deep sleep weight loss natural supplements`

This matches your affiliate offer perfectly. Every Short drives
traffic that is already warm for the Resurge funnel.
