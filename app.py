import google.generativeai as genai
from flask import Flask, render_template, request, session, jsonify

app = Flask(__name__)
app.secret_key = "secret_key"  

# 🔹 Replace this with your actual API key
GENAI_API_KEY = "AIzaSyCs3pqbiyA8rzrGXHOLYuWi3HHoxhzHwno"

# 🔹 Initialize Gemini API
genai.configure(api_key="AIzaSyCs3pqbiyA8rzrGXHOLYuWi3HHoxhzHwno")

def get_gemini_response(mood, user_message):
    system_prompt = (
        f"You are a supportive assistant whose goal is to uplift and refresh the user's mood. "
        f"The user is currently feeling {mood}. Offer comforting, encouraging, and positive responses."
    )

    try:
        model = genai.GenerativeModel("gemini-pro")  # Choose model: "gemini-pro" or "gemini-pro-vision"
        response = model.generate_content([system_prompt, user_message])
        
        # Debugging: Print the full response
        print("Gemini API Response:", response)

        return response.text if response.text else "I'm here for you! 💙"

    except Exception as e:
        print("Error connecting to Gemini API:", e)
        return "I'm having trouble connecting right now. Please try again later."

@app.route('/')
def home():
    return render_template('home.html', user="Kartik")

@app.route('/profile')
def profile():
    return render_template('profile.html', user="Kartik")

@app.route('/set_mood', methods=['POST'])
def set_mood():
    session['mood'] = request.json.get('mood', '😊')
    return '', 204  

@app.route('/chatbot')
def chatbot():
    mood = session.get('mood', '😊')
    return render_template('chatbot.html', mood=mood)

@app.route('/get_response', methods=['POST'])
def get_response():
    user_message = request.json.get('message', '')
    mood = session.get('mood', '😊')
    bot_response = get_gemini_response(mood, user_message)
    return jsonify({"response": bot_response})

if __name__ == "__main__":
    app.run(debug=True)
def get_gemini_response(mood, user_message):
    system_prompt = (
        f"You are a supportive assistant whose goal is to uplift and refresh the user's mood. "
        f"The user is currently feeling {mood}. Offer comforting, encouraging, and positive responses."
    )

    try:
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content([system_prompt, user_message])

        # 🔍 Debugging: Print the full response
        print("Gemini API Raw Response:", response)

        # Extract the actual text from the response
        if hasattr(response, 'text'):
            return response.text.strip()
        elif hasattr(response, 'candidates') and response.candidates:
            return response.candidates[0].content.strip()
        else:
            return "I'm here for you! 💙"

    except Exception as e:
        print("Error connecting to Gemini API:", e)
        return "I'm having trouble connecting right now. Please try again later."
system_prompt = (
    "You are an empathetic AI assistant that provides meaningful and thoughtful answers. "
    "The user is currently feeling {mood}. "
    "They may ask about mental health, emotional well-being, and general queries. "
    "Your answers should be informative, comforting, and relevant to their question."
)
