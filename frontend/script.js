// Configuration - Animated Avatar URL
const ANALYST_PHOTO_URL = "https://cdn-icons-png.flaticon.com/512/4333/4333609.png";

// DOM Elements
const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const imageUpload = document.getElementById('image-upload');
const previewContainer = document.getElementById('image-preview-container');
const previewImage = document.getElementById('image-preview');
const sendBtn = document.getElementById('send-btn');

let selectedFile = null;

// 1. Handle File Selection
imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            previewContainer.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
});

function clearImage() {
    selectedFile = null;
    imageUpload.value = ""; 
    previewContainer.classList.add('hidden');
    previewImage.src = "";
}

// 2. Handle Form Submission
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = userInput.value.trim();

    if (!text && !selectedFile) return;

    // Display User Message
    addMessage(text, 'user', selectedFile);

    // Prepare data
    const formData = new FormData();
    formData.append('text', text);
    if (selectedFile) {
        formData.append('image', selectedFile);
    }

    // Clear Inputs
    userInput.value = '';
    clearImage(); 
    
    // Disable send button
    sendBtn.disabled = true;
    
    // Show loading
    const loadingId = addLoadingIndicator();

    try {
        // Connect to FastAPI Backend
        const response = await fetch('http://127.0.0.1:8000/chat', {
            method: 'POST',
            body: formData 
        });

        if (!response.ok) throw new Error('Network error');

        const data = await response.json();
        
        // Remove loading and show reply
        removeMessage(loadingId);
        addMessage(data.reply, 'bot');

    } catch (error) {
        console.error("Error:", error);
        removeMessage(loadingId);
        addMessage("Sorry, I couldn't analyze that play. Is the backend running?", 'bot');
    } finally {
        sendBtn.disabled = false;
        userInput.focus();
    }
});

// 3. UI Helper Functions
function addMessage(text, sender, imageFile = null) {
    const div = document.createElement('div');
    div.classList.add('message', `${sender}-message`);

    // Create Avatar
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    
    if (sender === 'bot') {
        avatar.innerHTML = `<img src="${ANALYST_PHOTO_URL}" alt="Analyst">`;
    } else {
        avatar.innerHTML = '<i class="fa-solid fa-user"></i>';
    }

    // Create Bubble
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    if (imageFile) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(imageFile);
        img.className = 'chat-image-display';
        img.onload = () => URL.revokeObjectURL(img.src);
        bubble.appendChild(img);
        
        if(text) bubble.appendChild(document.createElement('br'));
    }

    if(text) {
        const textNode = document.createElement('span');
        textNode.textContent = text;
        bubble.appendChild(textNode);
    }

    if (sender === 'bot') {
        div.appendChild(avatar);
        div.appendChild(bubble);
    } else {
        div.appendChild(bubble);
        div.appendChild(avatar);
    }

    chatWindow.appendChild(div);
    scrollToBottom();
    return div.id = 'msg-' + Date.now();
}

function addLoadingIndicator() {
    const div = document.createElement('div');
    div.classList.add('message', 'bot-message');
    div.id = 'loading-indicator';
    div.innerHTML = `
        <div class="avatar">
             <img src="${ANALYST_PHOTO_URL}" alt="Analyst">
        </div>
        <div class="bubble" style="color: #94a3b8; font-style: italic; display: flex; align-items: center; gap: 10px;">
            <i class="fa-solid fa-circle-notch fa-spin" style="color: var(--accent-color)"></i> Analyzing your message...
        </div>
    `;
    chatWindow.appendChild(div);
    scrollToBottom();
    return div.id;
}

function removeMessage(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function scrollToBottom() {
    const wrapper = document.querySelector('.chat-window-wrapper');
    wrapper.scrollTop = wrapper.scrollHeight;
}