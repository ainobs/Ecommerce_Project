// src/components/SupportChat.js
import React, { useState, useEffect, useRef } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { FaComment } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { BiSupport } from 'react-icons/bi';
import { OpenAIClient, AzureKeyCredential } from '@azure/openai';

const SupportChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState([
    {
      role: 'system',
      content:
        'You are an intelligent assistant helping users with their inquiries.',
    },
    {
      role: 'system',
      content:
        'Always give relative link, do not link to external link. for products use /search?query=product_name, for auth use /auth/auth_name',
    },
    { role: 'user', content: 'What products do you offer?' },
    {
      role: 'assistant',
      content:
        "Welcome to our online store! We have a diverse range of products, including <a href='/search?query=electronics'>electronics</a>, clothing, accessories, and more. How can I assist you today?",
    },
    { role: 'user', content: 'Tell me about your electronics.' },
    {
      role: 'assistant',
      content:
        "Our electronics department includes cutting-edge smartphones, smart home devices, <a href='/search?query=laptops'>laptops</a>, and audio gadgets. If you have a specific category or product in mind, feel free to let me know.",
    },
    { role: 'user', content: 'What are the latest smartphones you have?' },
    {
      role: 'assistant',
      content:
        'We have the latest smartphones from top brands, featuring advanced technology, impressive cameras, and powerful performance. Would you like information about a particular brand or model?',
    },
    { role: 'user', content: 'How can I track my order?' },
    {
      role: 'assistant',
      content:
        "To track your order, please visit our <a href='/track-order'>order tracking</a> page and enter your order details. If you encounter any issues, feel free to let me know.",
    },
    { role: 'user', content: 'I need help with my account.' },
    {
      role: 'assistant',
      content:
        "Sure, I can help you with account management. You can access your account <a href='/account'>here</a> to update information, change your password, or view order history. What specific assistance do you need?",
    },
    { role: 'user', content: 'Can you recommend a laptop for graphic design?' },
    {
      role: 'assistant',
      content:
        "Certainly! For graphic design, I recommend checking out our <a href='/search?query=graphic%20design%20laptops'>graphic design laptops</a>. These devices offer high performance and vibrant displays. Let me know if you'd like more details on any specific model.",
    },
  ]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  const getSupportMessage = async (msg, msgs) => {
    setLoading(true);

    const newPrompt = [
      ...prompt,
      {
        role: 'user',
        content: msg,
      },
    ];

    try {
      const client = new OpenAIClient(
        'https://azure-openai-konectin.openai.azure.com/',
        new AzureKeyCredential('0be0c97374ae48a9b9a4fb483db27d96')
      );
      const deploymentId = '35Turbo';
      const { choices } = await client.getChatCompletions(
        deploymentId,
        newPrompt
      );
      const answer = choices[0].message.content;
      setMessages([
        ...msgs,
        {
          text: answer,
          sender: 'support',
          time: getCurrentTime(),
        },
      ]);
      setPrompt((prev) => [
        ...prev,
        {
          role: 'user',
          content: msg,
        },
        {
          role: 'assistant',
          content: answer,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessages = [
        ...messages,
        { text: newMessage, sender: 'user', time: getCurrentTime() },
      ];
      setMessages(newMessages);
      getSupportMessage(newMessage, newMessages);
      setNewMessage('');
    }
  };

  useEffect(() => {
    // Scroll to the bottom when messages are updated
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isChatOpen]);

  const renderMessageContent = (text, sender) => {
    // const sanitizedText = sanitizeHTML(text); // Implement a function to sanitize HTML content
    const sanitizedText = text.replace(/\n/g, '<br />');

    const styledHTML = sanitizedText.replace(
      /<a\b([^>]*)>(.*?)<\/a>/g,
      '<a $1 class="text-orange-500 hover:underline">$2</a>'
    );

    return (
      <span
        className={`${
          sender === 'user' ? 'bg-orange-500 text-white' : 'bg-gray-200'
        } p-2 rounded-md inline-block`}
        dangerouslySetInnerHTML={{ __html: styledHTML }}
      />
    );
  };

  // const sanitizeHTML = (html) => {
  //   // Implement a safe HTML sanitizer library or custom function here
  //   // to prevent potential security vulnerabilities
  //   // Example using DOMParser (not recommended for production use, consider using a library):
  //   const doc = new DOMParser().parseFromString(html, 'text/html');
  //   return doc.body.textContent || '';
  // };

  return (
    <div
      className={`fixed ${
        isChatOpen ? 'bottom-0 right-0 md:right-4' : 'bottom-4 right-4'
      } `}
    >
      <div className="animate-bounce">
        <button
          className={`${
            isChatOpen ? 'hidden' : 'block'
          } bg-orange-500 text-white py-3 px-3 rounded-full`}
          onClick={toggleChat}
        >
          <FaComment size={24} />
        </button>
      </div>

      {isChatOpen && (
        <div
          className={`bg-white p-4 flex flex-col shadow-md rounded-lg w-full h-screen md:h-[600px] md:w-[400px]`}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="font-medium text-lg">Support Chat</div>
            <button className="py-2 px-2" onClick={toggleChat}>
              <BsChevronDown className="font-bold text-lg" />
            </button>
          </div>

          <div className="chat-container overflow-y-auto flex-1 no-scrollbar">
            {messages.map((message, index) => (
              <div
                key={index}
                className="mb-2"
                style={{
                  animation: 'fadeIn 0.5s ease',
                  animationFillMode: 'both',
                }}
              >
                <div
                  className={`flex items-center gap-2 ${
                    message.sender === 'user'
                      ? 'justify-end ml-10'
                      : 'justify-start mr-10'
                  }`}
                >
                  <div className="flex items-end gap-2">
                    {message.sender === 'support' && (
                      <div className="w-8 h-8 bg-orange-500 rounded-full mb-5 p-2 flex justify-center items-center ">
                        <BiSupport className="text-lg  text-white" />
                      </div>
                    )}
                    <div>
                      <span
                        className={`${
                          message.sender === 'user'
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-200'
                        } p-2 rounded-md inline-block`}
                      >
                        {message.sender === 'support'
                          ? renderMessageContent(message.text)
                          : message.text}
                      </span>

                      <div
                        className={`text-xs text-gray-500 ml-2 ${
                          message.sender === 'user' ? 'text-right' : 'text-left'
                        }`}
                      >
                        {`${message.time}`}
                      </div>
                    </div>
                    {message.sender === 'user' && (
                      <img
                        src="/images/profile.webp"
                        alt="User"
                        className="w-8 h-8 rounded-full mr-2 mb-5"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
            {loading && <div className="animate-bounce">typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex mt-2 border p-2 rounded">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow focus:outline-none h-full"
            />
            <button className="" onClick={handleSendMessage}>
              <FiSend className="text-orange-500 text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChat;
