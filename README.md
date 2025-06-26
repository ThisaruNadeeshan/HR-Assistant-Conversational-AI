# 🤖 Iris AI – Intelligent HR Assistant

Iris AI is an intelligent HR chatbot that automates employee support using conversational AI. It can answer HR queries, retrieve employee data, and generate professional emails in **English and Sinhala**.

---

## 🚀 Live Features

- 24/7 Employee query support
- Bilingual responses (English & Sinhala)
- MongoDB-powered data lookups
- Email generation via SMTP
- Powered by GPT-4o (OpenAI) + Flowise
- React frontend interface

---

## 🧠 Tech Stack

| Layer        | Technology         | Purpose                                |
|--------------|--------------------|----------------------------------------|
| UI           | React              | Chat interface                         |
| AI Engine    | OpenAI GPT-4o      | NLP and intelligent responses          |
| Backend Flow | Flowise + JSON     | Flow-based logic & services            |
| DB           | MongoDB            | Employee data and chat history         |
| Mail         | Nodemailer (SMTP)  | Email generation and delivery          |
| Optional     | Google Gemini API  | Alternative free LLM support           |

---

## 🗃️ Flowise Chatflows Included

📁 Folder: `flowise-flows/`

1. `main_chatflow.json` – Core HR assistant logic  
2. `database_flow.json` – MongoDB integration  
3. `email_service_function.json` – Nodemailer setup  
4. `db_function.json` – Fetch specific employee details

---

## 🖥️ Project Structure

```bash
iris-ai/
│
├── frontend/                  # React Frontend (Chat UI)
│   ├── public/
│   ├── src/
│   ├── .env.example
│   └── package.json
│
├── flowise-flows/             # All exported Flowise JSON flows
│
└── README.md

📦 Prerequisites
Node.js (v18+)
pnpm (recommended for Flowise setup)
MongoDB (Atlas or local)
Gmail account with App Password (for SMTP)
OpenAI API Key (gpt-4o)
(Optional) Gemini API Key (if using Google AI)

🧪 Flowise Backend Setup
1. Clone Flowise (Developer Repo)
bash
git clone https://github.com/FlowiseAI/Flowise.git
cd Flowise
pnpm install

2. Configure .env
bash

cp .env.example to .env ( search how to add node package to flowise)
add
mongodb, nodemailer

3. Add Required Node Packages
pnpm add nodemailer
pnpm add mongodb

4. Start Flowise
pnpm start
Once running, go to http://localhost:3000, import the JSON flows from flowise-flows/.

add flow to 
OPENAI_API_KEY=your_openai_key
MONGO_URI=your_mongodb_connection_string
SMTP_USER=youremail@gmail.com
SMTP_PASS=your_app_password

🌐 Frontend Setup (React Chat App)
1. Clone Frontend

2. Install Dependencies
npm install

3. Run the App
npm start
add your backend Flowise API endpoint.

✨ Optional: Use Gemini API (Free LLM Alternative)
If you want to avoid GPT-4o billing:

Get API key: https://makersuite.google.com/app/apikey
Add Gemini node in Flowise
Connect it to your flow logic

✅ Example Chat Scenarios
vbnet
User: “Show me details for employee ID 104”
AI: “Here are the details for employee 104: Name, Email, Department...”

User: “Tell HR I’m on leave tomorrow”
AI: “Here is a formal email for HR regarding your leave...”
🔐 Security & Privacy
Role-based access in Flowise

Email service secured with app password (SMTP)
MongoDB connection string kept in .env file

No sensitive data exposed on frontend

🧠 Business Impact
⏱️ 70% Reduction in HR workload
📩 3s Average response time
🌍 Dual language support

📈 Ready for enterprise scalability

👥 Contributors
J P T Nadeeshan – LinkedIn
R B Theekshan – LinkedIn

Demo video link: https://www.youtube.com/watch?v=g5nyd4ZjAqg
