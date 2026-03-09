"use client";

import { useState } from "react";
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Pause, 
  Play, 
  Users, 
  CornerUpRight,
  Voicemail,
  Delete,
  Hash
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function SoftphonePage() {
  const [dialString, setDialString] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);

  const handleDial = (digit) => {
    setDialString((prev) => prev + digit);
  };

  const handleCall = () => {
    if (!dialString) return;
    setIsCallActive(true);
    toast.success(`Calling ${dialString}...`);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setIsMuted(false);
    setIsOnHold(false);
    toast.info("Call ended");
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast.info(isMuted ? "Microphone unmuted" : "Microphone muted");
  };

  const toggleHold = () => {
    setIsOnHold(!isOnHold);
    toast.info(isOnHold ? "Call resumed" : "Call placed on hold");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Dial Pad & Controls */}
      <div className="lg:col-span-1">
        <Card className="h-full flex flex-col shadow-md">
          <CardHeader className="bg-muted/20 pb-4">
            <CardTitle className="flex justify-between items-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
              <span>Keypad</span>
              {isCallActive && <Badge className="bg-green-500 animate-pulse">Live Call</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between p-6">
            <div className="mb-6">
              <Input 
                value={dialString}
                onChange={(e) => setDialString(e.target.value)}
                className="text-2xl font-mono text-center h-16 border-2 border-primary/20 focus-visible:border-primary tracking-widest bg-background"
                placeholder="Enter Number"
                readOnly={isCallActive}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((key) => (
                <Button
                  key={key}
                  variant="outline"
                  className="h-14 w-full text-xl font-bold rounded-xl hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all active:scale-95"
                  onClick={() => handleDial(key)}
                  disabled={isCallActive}
                >
                  {key}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {isCallActive ? (
                <>
                  <Button 
                    variant={isMuted ? "secondary" : "outline"}
                    className={`h-14 w-full rounded-full flex flex-col gap-1 ${isMuted ? "bg-orange-100 text-orange-600 border-orange-200" : ""}`}
                    onClick={toggleMute}
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    <span className="text-[10px] uppercase font-bold">Mute</span>
                  </Button>
                  <Button 
                    variant="destructive"
                    className="h-14 w-full rounded-full shadow-lg shadow-red-200"
                    onClick={handleEndCall}
                  >
                    <PhoneOff className="h-6 w-6" />
                  </Button>
                  <Button 
                    variant={isOnHold ? "secondary" : "outline"}
                    className={`h-14 w-full rounded-full flex flex-col gap-1 ${isOnHold ? "bg-blue-100 text-blue-600 border-blue-200" : ""}`}
                    onClick={toggleHold}
                  >
                    {isOnHold ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                    <span className="text-[10px] uppercase font-bold">Hold</span>
                  </Button>
                </>
              ) : (
                <>
                  <div />
                  <Button 
                    className="h-14 w-full rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-200"
                    onClick={handleCall}
                    disabled={!dialString}
                  >
                    <Phone className="h-6 w-6" />
                  </Button>
                  <Button 
                    variant="ghost"
                    className="h-14 w-full rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => setDialString(prev => prev.slice(0, -1))}
                    disabled={!dialString}
                  >
                    <Delete className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Calls */}
      <div className="lg:col-span-2 space-y-6">
        {/* Quick Actions Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 border-dashed border-2 hover:border-primary hover:bg-primary/5">
            <Users className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase">Conference</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 border-dashed border-2 hover:border-primary hover:bg-primary/5">
            <CornerUpRight className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase">Transfer</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 border-dashed border-2 hover:border-primary hover:bg-primary/5">
            <Voicemail className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase">Voicemail</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 border-dashed border-2 hover:border-primary hover:bg-primary/5">
            <Hash className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase">DTMF Pad</span>
          </Button>
        </div>

        {/* Active Call Information or Recent History */}
        <Card className="flex-1 bg-muted/10 border-none shadow-none">
          <CardContent className="flex items-center justify-center h-64 text-muted-foreground">
            {isCallActive ? (
              <div className="text-center space-y-4">
                <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto animate-pulse">
                  <Phone className="h-10 w-10 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Active Call</h3>
                  <p className="font-mono text-lg mt-1">{dialString}</p>
                  <p className="text-sm mt-2 text-green-600 font-medium">00:45</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p>Ready to make calls</p>
                <p className="text-xs mt-1 opacity-70">Enter a number or select a contact</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
