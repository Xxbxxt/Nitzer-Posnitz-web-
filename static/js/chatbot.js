const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const typingIndicator = document.getElementById('typingIndicator');

// Sample responses for demonstration
const botResponses = [
    "I understand. Could you tell me more about that?",
    "That's interesting! Let me help you with that.",
    "I see what you mean. Here's what I think...",
    "Thanks for sharing. Have you considered...",
    "I can help you with that. First, let's..."
];

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    typingIndicator.style.display = 'block';
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    typingIndicator.style.display = 'none';
}

function simulateBotResponse() {
    const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
    showTypingIndicator();
    
    // Simulate thinking time
    setTimeout(() => {
        hideTypingIndicator();
        addMessage(randomResponse, false);
        enableInput();
    }, 1500);
}

function disableInput() {
    userInput.disabled = true;
    sendButton.disabled = true;
}

function enableInput() {
    userInput.disabled = false;
    sendButton.disabled = false;
    userInput.focus();
}

function handleUserInput() {
    const message = userInput.value.trim();
    if (message === '') return;

    addMessage(message, true);
    userInput.value = '';
    disableInput();
    simulateBotResponse();
}

sendButton.addEventListener('click', handleUserInput);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});

// Enable input initially
enableInput();