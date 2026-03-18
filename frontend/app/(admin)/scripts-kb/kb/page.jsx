"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Copy, Search, Eye, ThumbsUp, ThumbsDown, FileText, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock KB articles
const kbArticles = [
  {
    id: 1,
    title: "Password Reset Process",
    category: "Technical Support",
    status: "Published",
    version: "2.3",
    lastUpdated: "2024-01-15",
    views: 4520,
    helpful: 890,
    notHelpful: 45,
    tags: ["password", "reset", "login", "account"],
  },
  {
    id: 2,
    title: "Billing Dispute Resolution",
    category: "Billing",
    status: "Published",
    version: "1.8",
    lastUpdated: "2024-01-14",
    views: 3250,
    helpful: 567,
    notHelpful: 32,
    tags: ["billing", "payment", "dispute", "refund"],
  },
  {
    id: 3,
    title: "Product Feature Comparison",
    category: "Sales",
    status: "Published",
    version: "3.0",
    lastUpdated: "2024-01-12",
    views: 2890,
    helpful: 423,
    notHelpful: 18,
    tags: ["products", "features", "comparison", "pricing"],
  },
  {
    id: 4,
    title: "Shipping Policy Overview",
    category: "Shipping",
    status: "Published",
    version: "1.5",
    lastUpdated: "2024-01-10",
    views: 2150,
    helpful: 345,
    notHelpful: 12,
    tags: ["shipping", "delivery", "tracking", "returns"],
  },
  {
    id: 5,
    title: "Troubleshooting Connection Issues",
    category: "Technical Support",
    status: "Draft",
    version: "1.0",
    lastUpdated: "2024-01-08",
    views: 0,
    helpful: 0,
    notHelpful: 0,
    tags: ["connection", "troubleshooting", "network"],
  },
  {
    id: 6,
    title: "Account Upgrade Options",
    category: "Sales",
    status: "Under Review",
    version: "1.2",
    lastUpdated: "2024-01-05",
    views: 0,
    helpful: 0,
    notHelpful: 0,
    tags: ["upgrade", "account", "premium", "plans"],
  },
];

const categories = ["Technical Support", "Billing", "Sales", "Shipping", "General", "Troubleshooting"];

export default function KbManagerPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [newArticle, setNewArticle] = useState({
    title: "",
    category: "technical support",
    tags: "",
    content: "",
  });

  const filteredArticles = kbArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === "all" || article.category.toLowerCase().replace(" ", "-") === filterCategory;
    const matchesStatus = filterStatus === "all" || article.status.toLowerCase().replace(" ", "-") === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateArticle = () => {
    console.log("Creating article:", newArticle);
    setShowCreateDialog(false);
  };

  const handleEditArticle = (article) => {
    setSelectedArticle(article);
    setShowEditDialog(true);
  };

  const handlePreviewArticle = (article) => {
    setSelectedArticle(article);
    setShowPreviewDialog(true);
  };

  const handleSaveEdit = () => {
    console.log("Saving article:", selectedArticle);
    setShowEditDialog(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Published":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Published</Badge>;
      case "Draft":
        return <Badge variant="outline">Draft</Badge>;
      case "Under Review":
        return <Badge className="bg-yellow-500">Under Review</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getHelpfulPercentage = (helpful, notHelpful) => {
    const total = helpful + notHelpful;
    return total > 0 ? ((helpful / total) * 100).toFixed(0) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Input
              placeholder="Search articles..."
              className="w-64 pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase().replace(" ", "-")}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create KB Article</DialogTitle>
              <DialogDescription>
                Create a new knowledge base article
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Article Title</label>
                <Input
                  placeholder="e.g., Password Reset Process"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select
                    value={newArticle.category}
                    onValueChange={(value) => setNewArticle({ ...newArticle, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase().replace(" ", "-")}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Tags (comma separated)</label>
                  <Input
                    placeholder="e.g., password, login, reset"
                    value={newArticle.tags}
                    onChange={(e) => setNewArticle({ ...newArticle, tags: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Content</label>
                <Textarea
                  placeholder="Write your article content here..."
                  className="min-h-50"
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => toast.success("Draft saved")}>
                  Save as Draft
                </Button>
                <Button className="flex-1" onClick={handleCreateArticle}>
                  Publish
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Articles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Base Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Helpful</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {article.title}
                    </div>
                    <div className="flex gap-1 mt-1">
                      {article.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{article.category}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(article.status)}</TableCell>
                  <TableCell>v{article.version}</TableCell>
                  <TableCell className="text-muted-foreground">{article.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      {article.views.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <ThumbsUp className="h-4 w-4 text-green-500" />
                      {article.helpful}
                      <span className="text-xs text-muted-foreground">
                        ({getHelpfulPercentage(article.helpful, article.notHelpful)}%)
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handlePreviewArticle(article)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditArticle(article)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => toast.success("Article copied")}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500" onClick={() => toast.success("Article deleted")}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{kbArticles.length}</div>
            <p className="text-xs text-muted-foreground">Total Articles</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-500">
              {kbArticles.filter(a => a.status === "Published").length}
            </div>
            <p className="text-xs text-muted-foreground">Published</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">Categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Helpful Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedArticle?.title}</DialogTitle>
            <DialogDescription>
              {selectedArticle?.category} | Version {selectedArticle?.version}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              {selectedArticle?.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <div className="prose prose-sm max-w-none">
              <p>This is a preview of the article content. In a real implementation, this would display the full article text.</p>
              <p className="text-muted-foreground">
                The article has been viewed {selectedArticle?.views} times and rated helpful by {selectedArticle?.helpful} users.
              </p>
            </div>
            <div className="flex justify-between pt-4 border-t">
              <div className="flex gap-4">
                <Button variant="outline" size="sm" onClick={() => toast.success("Marked as helpful")}>
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Helpful ({selectedArticle?.helpful})
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast.success("Marked as not helpful")}>
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  Not Helpful ({selectedArticle?.notHelpful})
                </Button>
              </div>
              <Button size="sm" onClick={() => {
                setShowPreviewDialog(false);
                handleEditArticle(selectedArticle);
              }}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Article
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
            <DialogDescription>
              Modify the knowledge base article
            </DialogDescription>
          </DialogHeader>
          {selectedArticle && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Article Title</label>
                <Input
                  value={selectedArticle.title}
                  onChange={(e) => setSelectedArticle({ ...selectedArticle, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select
                    value={selectedArticle.category.toLowerCase().replace(" ", "-")}
                    onValueChange={(value) => setSelectedArticle({ ...selectedArticle, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase().replace(" ", "-")}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select
                    value={selectedArticle.status.toLowerCase().replace(" ", "-")}
                    onValueChange={(value) => setSelectedArticle({ ...selectedArticle, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="under-review">Under Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Content</label>
                <Textarea
                  className="min-h-50"
                  value="Article content would appear here..."
                  readOnly
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleSaveEdit}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
