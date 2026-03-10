"use client";

import { useState } from "react";
import { BarChart3, Phone, Users, CheckCircle, XCircle, AlertCircle, Download, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Mock delivery analytics data
const deliveryMetrics = {
  totalCalls: 125430,
  delivered: 118500,
  answered: 89250,
  completed: 76500,
  busy: 12340,
  noAnswer: 18750,
  disconnected: 8920,
  fax: 2340,
  optOuts: 1250,
};

// Mock campaign performance
const campaignPerformance = [
  { id: 1, name: "Payment Reminder - Week 1", contacts: 5000, delivered: 4250, answered: 3187, completed: 2890, optOuts: 45, avgDuration: "0:28", deliveryRate: 85.0, answerRate: 75.0 },
  { id: 2, name: "Appointment Confirmation", contacts: 2500, delivered: 2100, answered: 1800, completed: 1650, optOuts: 12, avgDuration: "0:42", deliveryRate: 84.0, answerRate: 85.7 },
  { id: 3, name: "Service Notification", contacts: 8000, delivered: 0, answered: 0, completed: 0, optOuts: 0, avgDuration: "-", deliveryRate: 0, answerRate: 0 },
  { id: 4, name: "Survey - Customer Feedback", contacts: 3000, delivered: 2850, answered: 1200, completed: 980, optOuts: 25, avgDuration: "1:15", deliveryRate: 95.0, answerRate: 42.1 },
  { id: 5, name: "Promotional Offer - Weekend", contacts: 15000, delivered: 0, answered: 0, completed: 0, optOuts: 0, avgDuration: "-", deliveryRate: 0, answerRate: 0 },
];

// Mock hourly distribution
const hourlyDistribution = [
  { hour: "6am", calls: 120 },
  { hour: "7am", calls: 450 },
  { hour: "8am", calls: 1250 },
  { hour: "9am", calls: 2340 },
  { hour: "10am", calls: 2890 },
  { hour: "11am", calls: 2650 },
  { hour: "12pm", calls: 2100 },
  { hour: "1pm", calls: 2450 },
  { hour: "2pm", calls: 2780 },
  { hour: "3pm", calls: 2920 },
  { hour: "4pm", calls: 2340 },
  { hour: "5pm", calls: 1890 },
  { hour: "6pm", calls: 1200 },
  { hour: "7pm", calls: 650 },
  { hour: "8pm", calls: 280 },
];

// Mock failure reasons
const failureReasons = [
  { reason: "Busy", count: 12340, percentage: 17.8 },
  { reason: "No Answer", count: 18750, percentage: 27.1 },
  { reason: "Disconnected", count: 8920, percentage: 12.9 },
  { reason: "Fax Machine", count: 2340, percentage: 3.4 },
  { reason: "Network Error", count: 4560, percentage: 6.6 },
  { reason: "Invalid Number", count: 3210, percentage: 4.6 },
];

export default function DeliveryAnalyticsPage() {
  const [dateRange, setDateRange] = useState("today");
  const [campaignFilter, setCampaignFilter] = useState("all");

  const totalContacts = campaignPerformance.reduce((sum, c) => sum + c.contacts, 0);
  const totalDelivered = campaignPerformance.reduce((sum, c) => sum + c.delivered, 0);
  const totalAnswered = campaignPerformance.reduce((sum, c) => sum + c.answered, 0);
  const totalCompleted = campaignPerformance.reduce((sum, c) => sum + c.completed, 0);
  const totalOptOuts = campaignPerformance.reduce((sum, c) => sum + c.optOuts, 0);

  const overallDeliveryRate = totalContacts > 0 ? ((totalDelivered / totalContacts) * 100).toFixed(1) : 0;
  const overallAnswerRate = totalDelivered > 0 ? ((totalAnswered / totalDelivered) * 100).toFixed(1) : 0;
  const overallCompletionRate = totalAnswered > 0 ? ((totalCompleted / totalAnswered) * 100).toFixed(1) : 0;

  const maxHourlyCalls = Math.max(...hourlyDistribution.map(h => h.calls));

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="last7">Last 7 Days              <SelectItem value="last30">Last 30</SelectItem>
 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Select value={campaignFilter} onValueChange={setCampaignFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Campaigns" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              {campaignPerformance.map((campaign) => (
                <SelectItem key={campaign.id} value={campaign.id.toString()}>
                  {campaign.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Contacts</p>
                <p className="text-2xl font-bold">{totalContacts.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Delivered</p>
                <p className="text-2xl font-bold text-green-500">{totalDelivered.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{overallDeliveryRate}%</p>
              </div>
              <Phone className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Answered</p>
                <p className="text-2xl font-bold text-blue-500">{totalAnswered.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{overallAnswerRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{totalCompleted.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{overallCompletionRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Opt-Outs</p>
                <p className="text-2xl font-bold text-red-500">{totalOptOuts.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">
                  {totalAnswered > 0 ? ((totalOptOuts / totalAnswered) * 100).toFixed(2) : 0}%
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Hourly Call Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-1 h-48">
            {hourlyDistribution.map((hour) => (
              <div key={hour.hour} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-primary rounded-t-md transition-all"
                  style={{ height: `${(hour.calls / maxHourlyCalls) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground mt-1">{hour.hour}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Campaign Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead className="text-right">Contacts</TableHead>
                <TableHead className="text-right">Delivered</TableHead>
                <TableHead className="text-right">Answered</TableHead>
                <TableHead className="text-right">Completed</TableHead>
                <TableHead className="text-right">Opt-Outs</TableHead>
                <TableHead className="text-right">Avg Duration</TableHead>
                <TableHead className="text-right">Delivery Rate</TableHead>
                <TableHead className="text-right">Answer Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaignPerformance.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell className="text-right">{campaign.contacts.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{campaign.delivered.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{campaign.answered.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{campaign.completed.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-red-500">{campaign.optOuts}</TableCell>
                  <TableCell className="text-right">{campaign.avgDuration}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Progress value={campaign.deliveryRate} className="w-16 h-2" />
                      <span className="text-sm">{campaign.deliveryRate.toFixed(1)}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Progress value={campaign.answerRate} className="w-16 h-2" />
                      <span className="text-sm">{campaign.answerRate.toFixed(1)}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Failure Analysis */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Call Failure Reasons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {failureReasons.map((reason) => (
                <div key={reason.reason} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <span>{reason.reason}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={reason.percentage} className="w-24 h-2" />
                    <span className="text-sm font-medium">{reason.count.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground w-12 text-right">{reason.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Answered</span>
                </div>
                <span className="font-medium">{deliveryMetrics.answered.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span>Busy</span>
                </div>
                <span className="font-medium">{deliveryMetrics.busy.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span>No Answer</span>
                </div>
                <span className="font-medium">{deliveryMetrics.noAnswer.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>Disconnected</span>
                </div>
                <span className="font-medium">{deliveryMetrics.disconnected.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span>Fax Machine</span>
                </div>
                <span className="font-medium">{deliveryMetrics.fax.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-700" />
                  <span>Opt-Outs</span>
                </div>
                <span className="font-medium">{deliveryMetrics.optOuts.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
