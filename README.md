# FIFA World Cup 2026 AI Content Generator

An automated Node.js application that fetches FIFA World Cup 2026 fixtures, generates AI-powered YouTube Shorts scripts, saves them to a text file, and emails the generated scripts for review.

---

## Features

- Fetch FIFA World Cup 2026 fixtures from RapidAPI
- Filter upcoming matches
- Generate match preview scripts using Google Gemini AI
- Save generated scripts to a timestamped text file
- Email generated scripts as an attachment
- Automatically clean up generated files after successful email delivery

---

## Architecture

```text
RapidAPI FIFA World Cup
          ↓
Fetch Upcoming Matches
          ↓
Google Gemini AI
          ↓
Generate Scripts
          ↓
Save To File
          ↓
Email Attachment
          ↓
Delete Local File
```

---

## Tech Stack

### Backend

- Node.js
- Axios

### AI

- Google Gemini API
- Google AI Studio

### Email

- Nodemailer
- Gmail App Password

### Data Source

- RapidAPI Football API

---

## Project Structure

```text
project-root/

├── apps/
│   ├── scheduler/
│   │   └── index.js
│   │
│   └── script-generator/
│       └── index.js
│
├── shared/
│   ├── football-api/
│   │   └── index.js
│   │
│   ├── email/
│   │   └── email-service.js
│   │
│   └── utils/
│       └── file-writer.js
│
├── output/
│
├── .env
├── .env.example
├── .gitignore
└── package.json
```

---

## Environment Variables

Create a `.env` file:

```env
FOOTBALL_API_KEY=

GEMINI_API_KEY=

EMAIL=

APP_PASSWORD=
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>

cd fifa-ai-content-generator
```

Install dependencies:

```bash
npm install
```

---

## Running the Application

Generate scripts for upcoming matches:

```bash
node apps/scheduler/index.js
```

---

## Script Generation Workflow

1. Fetch FIFA World Cup matches
2. Filter upcoming matches
3. Generate YouTube Shorts scripts
4. Save scripts to a timestamped file

Example output file:

```text
output/scripts-2026-06-13T15-30-00-000Z.txt
```

---

## Email Delivery

Generated scripts are emailed automatically using Gmail SMTP.

### Gmail Setup

1. Enable Two-Factor Authentication
2. Create a Google App Password
3. Add credentials to `.env`

```env
EMAIL=your-email@gmail.com

APP_PASSWORD=your-app-password
```

---

## Example Script Output

```text
==================================================
MATCH: Brazil vs Morocco
DATE : 2026-06-13 22:00:00
VENUE: MetLife Stadium
==================================================

🔥 Brazil takes on Morocco in a blockbuster World Cup clash.

Can Morocco pull off another World Cup upset?

Prediction:
Brazil 2-1 Morocco

Who are you backing?

==================================================
END OF SCRIPT
==================================================
```

---

## Future Enhancements

### Phase 2

- Generate AI voiceovers
- Convert scripts to audio files

### Phase 3

- Generate AI thumbnails
- Generate AI images

### Phase 4

- Generate YouTube Shorts videos using FFmpeg

### Phase 5

- Automatic YouTube upload

### Phase 6

- Scheduled daily execution
- Docker deployment
- Cloud hosting

---

## Security

Never commit:

```text
.env
```

Ensure `.gitignore` contains:

```gitignore
.env
node_modules/
output/
```

If secrets are accidentally committed:

- Revoke RapidAPI keys
- Revoke Gemini API keys
- Regenerate Gmail App Passwords

---

## License

MIT License
