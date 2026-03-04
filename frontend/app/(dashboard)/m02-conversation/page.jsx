export default function ConversationAIPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">AI Conversation Intelligence</h1>
      <p className="text-muted-foreground">Transcription, NLU, summarization, and entity extraction</p>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Transcription Management</h2>
          <p className="text-muted-foreground">Transcript viewer and search will be displayed here...</p>
        </div>

        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">NLP Insights Panel</h2>
          <p className="text-muted-foreground">Intent, topic classification, and entity recognition will be displayed here...</p>
        </div>
      </div>
    </div>
  );
}
