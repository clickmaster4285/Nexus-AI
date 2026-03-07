import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function KBSearch() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription>
          Temporary component for KBSearch in the agent-desktop module.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg m-6">
        <p className="text-muted-foreground">Component logic and UI for KBSearch will be implemented here.</p>
      </CardContent>
    </Card>
  );
}
