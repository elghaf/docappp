import React, { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Send,
  Sparkles,
  FileText,
  Copy,
  Check,
  Download,
  User,
  Bot,
  Wand2,
  Clipboard,
  Lightbulb,
  Stethoscope,
  Pill,
} from "lucide-react";
import AISummaryModal from "@/components/ai/AISummaryModal";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Suggestion {
  id: string;
  text: string;
  icon: React.ReactNode;
}

const AIAssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isAISummaryOpen, setIsAISummaryOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Mock response generator
  const generateMockResponse = (query: string): string => {
    if (query.toLowerCase().includes("diagnosis")) {
      return "Based on the symptoms described (persistent cough, fatigue, and mild fever), the most likely diagnosis is acute bronchitis. I recommend prescribing an antibiotic such as Amoxicillin 500mg three times daily for 7 days, along with a cough suppressant. The patient should rest and increase fluid intake. If symptoms worsen or don't improve within 3-5 days, a follow-up appointment would be advisable to rule out pneumonia.";
    } else if (query.toLowerCase().includes("treatment")) {
      return "For the treatment of Type 2 Diabetes with HbA1c of 7.8%, I would recommend the following approach:\n\n1. Medication: Continue Metformin 500mg twice daily, consider adding an SGLT2 inhibitor like Empagliflozin 10mg daily\n2. Lifestyle modifications: Mediterranean diet, 150 minutes of moderate exercise weekly\n3. Blood glucose monitoring: Before breakfast and 2 hours after dinner\n4. Follow-up: Schedule lab work in 3 months to reassess HbA1c\n5. Referral: Consider nephrology consultation due to early signs of kidney function decline";
    } else if (query.toLowerCase().includes("interpret")) {
      return "The lab results show elevated liver enzymes (ALT: 65 U/L, AST: 72 U/L) which may indicate liver inflammation. The patient's lipid panel shows borderline high LDL (145 mg/dL) and low HDL (38 mg/dL), suggesting dyslipidemia. The slightly elevated fasting glucose (118 mg/dL) indicates prediabetes. I recommend lifestyle modifications including reduced alcohol consumption, regular exercise, and a low-fat diet. Consider starting atorvastatin 10mg for cholesterol management and schedule a follow-up liver function test in 6 weeks.";
    } else {
      return "I'm here to help with medical questions, diagnostic assistance, treatment recommendations, and interpreting test results. Could you provide more specific information about the patient's condition or what medical guidance you're looking for?";
    }
  };

  // Suggested prompts
  const suggestions: Suggestion[] = [];

  return (
    <DashboardLayout>
      <div className="w-full h-full bg-gray-50 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">AI Assistant</h1>
              <p className="text-gray-500">
                Get AI-powered clinical insights and assistance
              </p>
            </div>
            <Button
              onClick={() => setIsAISummaryOpen(true)}
              className="flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              Generate Patient Summary
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left sidebar with tools */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI Tools</CardTitle>
                  <CardDescription>
                    Specialized medical AI assistants
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setIsAISummaryOpen(true)}
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    Patient Summary Generator
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Wand2 className="h-4 w-4 mr-2" />
                    Treatment Recommender
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clipboard className="h-4 w-4 mr-2" />
                    Lab Results Analyzer
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Medical Documentation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Differential Diagnosis
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Model Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">AI Model</label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="gpt-4">GPT-4 (Recommended)</option>
                      <option value="gpt-3.5">GPT-3.5 Turbo</option>
                      <option value="claude">Claude 2</option>
                      <option value="med-llama">MedLLaMA</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Response Style
                    </label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="comprehensive">Comprehensive</option>
                      <option value="concise">Concise</option>
                      <option value="evidence-based">Evidence-based</option>
                      <option value="educational">Educational</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main content area */}
            <div className="lg:col-span-3">
              <Card className="h-[calc(100vh-12rem)]">
                <CardHeader className="pb-2 border-b">
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList>
                      <TabsTrigger
                        value="chat"
                        className="flex items-center gap-1"
                      >
                        <Bot className="h-4 w-4" />
                        Chat Assistant
                      </TabsTrigger>
                      <TabsTrigger
                        value="summary"
                        className="flex items-center gap-1"
                      >
                        <FileText className="h-4 w-4" />
                        Saved Summaries
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>

                <CardContent className="p-0 flex flex-col h-[calc(100%-8rem)]">
                  <TabsContent
                    value="chat"
                    className="flex-1 flex flex-col h-full m-0"
                  >
                    {/* Chat messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-4">
                          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <Brain className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">
                            Medical AI Assistant
                          </h3>
                          <p className="text-gray-500 max-w-md mb-6">
                            Ask medical questions, get diagnostic assistance,
                            treatment recommendations, or help interpreting test
                            results.
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-2xl">
                            {suggestions.map((suggestion) => (
                              <Button
                                key={suggestion.id}
                                variant="outline"
                                className="justify-start text-left h-auto py-3"
                                onClick={() =>
                                  handleSuggestionClick(suggestion.text)
                                }
                              >
                                <div className="mr-2">{suggestion.icon}</div>
                                <span className="truncate">
                                  {suggestion.text}
                                </span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                              <Avatar className="h-8 w-8 mt-1">
                                {message.role === "user" ? (
                                  <>
                                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=doctor" />
                                    <AvatarFallback>DR</AvatarFallback>
                                  </>
                                ) : (
                                  <>
                                    <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=ai" />
                                    <AvatarFallback>AI</AvatarFallback>
                                  </>
                                )}
                              </Avatar>
                              <div
                                className={`mx-2 p-4 rounded-lg ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                              >
                                <div className="whitespace-pre-line">
                                  {message.content}
                                </div>
                                <div
                                  className={`text-xs mt-2 flex justify-between items-center ${message.role === "user" ? "text-primary-foreground/70" : "text-gray-500"}`}
                                >
                                  <span>
                                    {message.timestamp.toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                  {message.role === "assistant" && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() =>
                                        handleCopyText(message.content)
                                      }
                                    >
                                      {copiedText === message.content ? (
                                        <Check className="h-3 w-3" />
                                      ) : (
                                        <Copy className="h-3 w-3" />
                                      )}
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="flex max-w-[80%]">
                            <Avatar className="h-8 w-8 mt-1">
                              <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=ai" />
                              <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <div className="mx-2 p-4 rounded-lg bg-muted">
                              <div className="flex items-center space-x-2">
                                <div className="h-2 w-2 bg-primary rounded-full animate-bounce" />
                                <div
                                  className="h-2 w-2 bg-primary rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                />
                                <div
                                  className="h-2 w-2 bg-primary rounded-full animate-bounce"
                                  style={{ animationDelay: "0.4s" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input area */}
                    <div className="p-4 border-t">
                      <form
                        onSubmit={handleSendMessage}
                        className="flex space-x-2"
                      >
                        <Textarea
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Ask a medical question..."
                          className="flex-1 resize-none"
                          rows={2}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage(e);
                            }
                          }}
                        />
                        <Button
                          type="submit"
                          disabled={!inputValue.trim() || isLoading}
                          className="self-end"
                        >
                          {isLoading ? (
                            <Sparkles className="h-4 w-4 animate-pulse" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </form>
                      <p className="text-xs text-gray-500 mt-2">
                        AI responses are generated based on medical knowledge
                        but should be verified by healthcare professionals.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="summary" className="m-0 h-full">
                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                      <FileText className="h-16 w-16 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        No Saved Summaries
                      </h3>
                      <p className="text-gray-500 max-w-md mb-6">
                        Generate a patient summary to see it here. Summaries
                        help you quickly understand patient conditions and
                        treatment recommendations.
                      </p>
                      <Button
                        onClick={() => setIsAISummaryOpen(true)}
                        className="flex items-center gap-2"
                      >
                        <Brain className="h-4 w-4" />
                        Generate Patient Summary
                      </Button>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <AISummaryModal
        isOpen={isAISummaryOpen}
        onOpenChange={setIsAISummaryOpen}
        onSaveSummary={(summary) => {
          console.log("Summary saved:", summary);
          setIsAISummaryOpen(false);
        }}
      />
    </DashboardLayout>
  );
};

export default AIAssistantPage;
