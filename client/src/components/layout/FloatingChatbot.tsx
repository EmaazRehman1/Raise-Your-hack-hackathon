// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { MessageCircle, Send, X, Bot } from 'lucide-react';
// import { ChatMessage } from '@/types';
// import { chatbot } from '@/Api/chatbot';
// import { set } from 'react-hook-form';

// const mockResponses = [
//   "Booth 42 is located in the AI Innovation Hub section, on the second floor near the main entrance.",
//   "There are 3 AI sessions happening now: 'The Future of AI in Product Development' at Main Stage, 'AI Ethics Panel' at Room B, and 'Hands-on ML Workshop' at Lab 1.",
//   "Based on your interests, I recommend visiting the Climate Solutions Showcase and attending the Web3 Product Strategy Workshop at 2:00 PM.",
//   "Your next recommended meeting is with Alex Rodriguez at 3:30 PM in the Networking Lounge. Would you like me to set a reminder?",
//   "The most trending sessions right now are related to AI and Climate Tech. The AI Innovation Hub booth has 23 current visitors.",
// ];

// export default function FloatingChatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [messages, setMessages] = useState<ChatMessage[]>()
//   // const [messages, setMessages] = useState<ChatMessage[]>([
//   //   {
//   //     id: '1',
//   //     text: "Hi! I'm your AI event assistant. I can help you find booths, sessions, or answer questions about the event. What can I help you with?",
//   //     isUser: false,
//   //     timestamp: new Date(),
//   //   },
//   // ]);
//   const [inputValue, setInputValue] = useState('');

//   const handleSendMessage = async() => {
//     if (!inputValue.trim()) return;
//     setLoading(true);

//     try{
//       const response = await chatbot(inputValue);
//       setMessages(response.answer)


//     }catch(error){
//       console.error('Error sending message:', error);
//       return;
//     }finally{
//       setLoading(false);
//     }

//   };

//   return (
//     <>
//       {/* Chat Window */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.8, y: 20 }}
//             transition={{ type: "spring", damping: 20 }}
//             className="fixed bottom-24 right-4 z-50 lg:bottom-6 lg:right-6 mb-14"
//           >
//             <Card className="w-80 h-96 shadow-xl">
//               <CardHeader className="pb-3">
//                 <div className="flex items-center justify-between">
//                   <CardTitle className="text-lg flex items-center gap-2">
//                     <Bot className="w-5 h-5 text-blue-600" />
//                     AI Assistant
//                   </CardTitle>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <X className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </CardHeader>
//               <CardContent className="p-0 flex flex-col h-full">
//                 <ScrollArea className="flex-1 p-4">
//                   <div className="space-y-3">
//                     {messages.map((message) => (
//                       <div
//                         key={message.id}
//                         className={`flex gap-2 ${
//                           message.isUser ? 'justify-end' : 'justify-start'
//                         }`}
//                       >
//                         {!message.isUser && (
//                           <Avatar className="w-6 h-6">
//                             <AvatarFallback className="bg-blue-100 text-blue-600">
//                               <Bot className="w-3 h-3" />
//                             </AvatarFallback>
//                           </Avatar>
//                         )}
//                         <div
//                           className={`max-w-[70%] rounded-lg p-3 text-sm ${
//                             message.isUser
//                               ? 'bg-blue-600 text-white'
//                               : 'bg-muted text-muted-foreground'
//                           }`}
//                         >
//                           {message.text}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </ScrollArea>
//                 <div className="p-4 border-t border-border">
//                   <div className="flex gap-2">
//                     <Input
//                       value={inputValue}
//                       onChange={(e) => setInputValue(e.target.value)}
//                       placeholder="Ask me anything..."
//                       onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                       className="flex-1"
//                     />
//                     <Button size="sm" onClick={handleSendMessage}>
//                       <Send className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Floating Button */}
//       {!isOpen && (

//         <motion.div
//         className="fixed bottom-20 right-4 z-50 lg:bottom-6 lg:right-6"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         >
//         <Button
//           onClick={() => setIsOpen(!isOpen)}
//           className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
//           >
//           <MessageCircle className="w-6 h-6 text-white" />
//         </Button>
//       </motion.div>
//   )}
//     </>
//   );
// }
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Send, X, Bot } from 'lucide-react';
import { ChatMessage } from '@/types';
import { chatbot } from '@/Api/chatbot';

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm your AI event assistant for RAISE 2025. I can help answer your questions about the event, sessions, logistics, and more. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await chatbot(inputValue);
      
      // Add bot response to chat
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.answer,
        isUser: false,
        timestamp: new Date(),
      };
      console.log('response', response);
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, Can you be more clear? I didn't understand that.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-24 right-4 z-50 lg:bottom-6 lg:right-6 mb-14"
          >
            <Card className="w-80 h-96 shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bot className="w-5 h-5 text-blue-600" />
                    RAISE 2025 Assistant
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-full">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-2 ${
                          message.isUser ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {!message.isUser && (
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              <Bot className="w-3 h-3" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[70%] rounded-lg p-3 text-sm ${
                            message.isUser
                              ? 'bg-blue-600 text-white'
                              : 'bg-muted text-muted-foreground'
                          }`}
                          dangerouslySetInnerHTML={{ 
                            __html: message.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                          }}
                        />
                      </div>
                    ))}
                    
                    {loading && (
                      <div className="flex justify-start gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            <Bot className="w-3 h-3" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="max-w-[70%] rounded-lg p-3 text-sm bg-muted text-muted-foreground">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask about RAISE 2025..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                      disabled={loading}
                    />
                    <Button 
                      size="sm" 
                      onClick={handleSendMessage}
                      disabled={loading}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      {!isOpen && (
        <motion.div
          className="fixed bottom-20 right-4 z-50 lg:bottom-6 lg:right-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </Button>
        </motion.div>
      )}
    </>
  );
}