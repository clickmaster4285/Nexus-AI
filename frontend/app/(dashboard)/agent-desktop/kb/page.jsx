"use client";

import { useState } from "react";
import { 
  Search, 
  ThumbsUp,
  Copy, 
  ExternalLink,
  BookOpen,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { kbArticles } from "@/lib/mock-data/scripts";
import { toast } from "sonner";

export default function KBSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredArticles = kbArticles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Article snippet copied to clipboard");
  };

  const handleFeedback = (type) => {
    toast.success(`Feedback submitted: ${type}`);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] gap-6">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search knowledge base... (e.g. 'password reset', 'refund')" 
            className="pl-10 h-12 text-lg shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {["Account Management", "Billing", "Technical", "Compliance"].map(cat => (
            <Badge 
              key={cat} 
              variant="outline" 
              className="cursor-pointer hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-colors"
              onClick={() => setSearchTerm(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
        {/* Search Results */}
        <div className="lg:col-span-2 flex flex-col h-full overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              {filteredArticles.length > 0 ? (
                filteredArticles.map(article => (
                  <Card key={article.id} className="hover:border-primary/30 transition-all group">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="secondary" className="mb-2">{article.category}</Badge>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                            {article.title}
                            <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </CardTitle>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs bg-muted/30 px-2 py-1 rounded">
                          <ThumbsUp className="h-3 w-3" /> {article.rating}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {article.preview}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-8" onClick={() => handleCopy(article.preview)}>
                            <Copy className="h-3 w-3 mr-2" /> Copy Snippet
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8" onClick={() => handleFeedback('helpful')}>
                            <ThumbsUp className="h-3 w-3 mr-2" /> Helpful
                          </Button>
                        </div>
                        <span className="text-xs text-muted-foreground">{article.views} views</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p className="font-medium">No articles found</p>
                  <p className="text-sm">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* AI Suggested */}
        <Card className="h-full flex flex-col bg-primary/5 border-primary/10">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> AI Suggestions
            </CardTitle>
            <CardDescription className="text-xs">Based on live conversation context</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-3">
              {[
                { title: "Handling Price Objections", reason: "Customer mentioned 'expensive'" },
                { title: "Competitor Comparison: X vs Y", reason: "Competitor X mentioned" }
              ].map((item, i) => (
                <div key={i} className="p-3 bg-background rounded-lg border shadow-sm cursor-pointer hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-bold text-sm">{item.title}</p>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <p className="text-[10px] text-muted-foreground italic flex items-center gap-1">
                    <Sparkles className="h-2 w-2 text-primary" /> {item.reason}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
