import { useState, useRef, useEffect } from "react";
import "../index.css";
import axios from "axios";
// import ReactMarkdown from "react-markdown";
import { Box, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, IconButton, Input, Button, VStack, Text } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion(""); // Clear input immediately after sending

    // Add user question to chat history
    setChatHistory(prev => [...prev, { type: 'question', content: currentQuestion, user: 'You' }]);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      const aiResponse = response["data"]["candidates"][0]["content"]["parts"][0]["text"];
      setChatHistory(prev => [...prev, { type: 'answer', content: aiResponse, user: 'AI' }]);
    } catch (error) {
      console.log(error);
      setChatHistory(prev => [...prev, { type: 'answer', content: "Sorry - Something went wrong. Please try again!", user: 'AI' }]);
    }
    setGeneratingAnswer(false);
  }

  return (
    <Box position="fixed" bottom="20px" left="20px">
      <Popover>
        <PopoverTrigger>
          <IconButton
            aria-label="Chat"
            icon={<ChatIcon />}
            size="lg"
            colorScheme="teal"
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Chat with GEMINI</PopoverHeader>
          <PopoverBody>
            <VStack spacing={4} align="stretch">
              <Box
                maxH="300px"
                overflowY="auto"
                borderWidth="1px"
                borderRadius="md"
                p={2}
                ref={chatContainerRef}
              >
                {chatHistory.map((chat, index) => (
                  <Text key={index} color={chat.user === "You" ? "blue.500" : "gray.500"}>
                    <strong>{chat.user}:</strong> {chat.content}
                  </Text>
                ))}
              </Box>
              <Input
                placeholder="Type your question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                isDisabled={generatingAnswer}
              />
              <Button
                colorScheme="teal"
                onClick={generateAnswer}
                isLoading={generatingAnswer}
                isDisabled={!question.trim()}
              >
                Send
              </Button>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}

export default Chatbot;
