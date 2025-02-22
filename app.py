import google.generativeai as genai
from flask import Flask, render_template, request, session, jsonify

app = Flask(__name__)
app.secret_key = "secret_key"

# 🔹 Initialize Gemini API
GENAI_API_KEY = ""  # Replace with your actual API key
genai.configure(api_key=GENAI_API_KEY)


def get_gemini_response(mood, conversation_history=None, user_message=None, initial=False):
    """
    Fetch response from Gemini API based on mood and conversation history.
    If initial=True, generate a mood-based greeting without user input.
    """
    system_prompt = (
        f"You are a friendly, supportive AI assistant whose goal is to uplift and improve the user's mood. "
        f"The user feels {mood}. Provide warm, encouraging, and conversational responses like a close friend."
        "Keep responses short and engaging. Try to ask the user questions to continue the conversation."
    )

    if initial:
        # Generate an initial uplifting response without user input
        conversation = f"{system_prompt}\nAssistant:"
    else:
        conversation = system_prompt + "\n"
        for entry in conversation_history or []:
            conversation += f"User: {entry['user']}\nAssistant: {entry['bot']}\n"
        conversation += f"User: {user_message}\nAssistant:"

    try:
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(conversation)
        print("✅ Gemini API Raw Response:", response)

        if hasattr(response, 'text') and response.text:
            return response.text.strip()
        elif hasattr(response, 'candidates') and response.candidates:
            candidate = response.candidates[0]
            if hasattr(candidate, 'content') and candidate.content:
                return candidate.content.strip()
            else:
                print("❌ Gemini API: Candidate content is missing.")
                return "I'm having a little trouble right now."
        else:
            print("❌ Gemini API: No text or candidates found in response.")
            return "I'm having a little trouble right now."

    except Exception as e:
        print(f"❌ Error connecting to Gemini API: {e}")
        return "I'm having trouble connecting right now. Please try again later."


@app.route('/')
def home():
    return render_template('home.html', user="Kartik")


@app.route('/profile')
def profile():
    return render_template('profile.html', user="Kartik")

@app.route('/exercise')
def exercise():
    return render_template('exercise.html', user="Kartik")


@app.route('/set_mood', methods=['POST'])
def set_mood():
    """
    Store mood, reset conversation, and generate an initial Gemini response.
    """
    mood = request.json.get('mood', '😊')
    session['mood'] = mood
    session['conversation'] = []

    # Get initial response from Gemini
    initial_response = get_gemini_response(mood, initial=True)
    session['conversation'].append({"user": "", "bot": initial_response})
    print("✅ Mood Set:", mood)
    print("✅ Initial Gemini Response:", initial_response)

    return jsonify({"initial_response": initial_response})


@app.route('/chatbot')
def chatbot():
    """
    Load chatbot page with initial Gemini response.
    """
    mood = session.get('mood', '😊')
    conversation_history = session.get('conversation', [])
    initial_response = conversation_history[0]['bot'] if conversation_history else "Hi there! 😊"

    return render_template('chatbot.html', mood=mood, initial_response=initial_response)


@app.route('/get_response', methods=['POST'])
def get_response():
    """
    Handle user message and return chatbot response.
    """
    user_message = request.json.get('message', '').strip()
    mood = session.get('mood', '😊')
    conversation_history = session.get('conversation', [])

    if not user_message:
        return jsonify({"response": "Please enter a valid message."})

    print("✅ Received user message:", user_message)

    bot_response = get_gemini_response(mood, conversation_history, user_message)
    print("✅ Gemini API Response:", bot_response)

    # Update conversation history and truncate if needed
    conversation_history.append({"user": user_message, "bot": bot_response})
    if len(conversation_history) > 10:  # Keep the last 10 messages.
        conversation_history = conversation_history[-10:]

    session['conversation'] = conversation_history

    return jsonify({"response": bot_response})


if __name__ == "__main__":
    app.run(debug=True)