import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CampaignConfig() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription>
          Temporary component for CampaignConfig in the robocall-engine module.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg m-6">
        <p className="text-muted-foreground">Component logic and UI for CampaignConfig will be implemented here.</p>
      </CardContent>
    </Card>
  );
}
