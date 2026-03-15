import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SoccerosDashboardLayout, PageHeader, DataTableHeader, StatCard } from '@/components/socceros/DashboardLayout';
import { mockAuditLogs, mockNotifications, type AuditLog, type Notification } from '@/lib/socceros/mockData';
import { Lock, Mail, Phone, Calendar, Shield, LogOut } from 'lucide-react';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'security' | 'sessions' | 'audit'>('overview');

  return (
    <SoccerosDashboardLayout role="PLAYER">
      <PageHeader title="My Account" subtitle="Manage your profile and security settings" icon="👤" />

      {/* Profile Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-1">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">👤</div>
            <h2 className="text-xl font-bold">Ahmad Rizki</h2>
            <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
            <p className="text-sm text-muted-foreground mt-2">Member since Jan 15, 2024</p>
            <div className="mt-4 space-y-2 text-sm text-left">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>ahmad@socceros.io</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+62 812 345 6789</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Role: Platform Owner</span>
              </div>
            </div>
            <Button className="w-full mt-6">Edit Profile</Button>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          {/* Security Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Security Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert className="bg-green-50 border-green-200">
                <Shield className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Two-factor authentication is enabled
                </AlertDescription>
              </Alert>
              <Alert className="bg-yellow-50 border-yellow-200">
                <Shield className="w-4 h-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  Password last changed 90 days ago
                </AlertDescription>
              </Alert>
              <Button variant="outline" className="w-full">
                <Lock className="w-4 h-4 mr-2" /> Change Password
              </Button>
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Active Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Windows Desktop</p>
                    <p className="text-sm text-muted-foreground">Last active: 5 minutes ago</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Current</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">iPhone Safari</p>
                    <p className="text-sm text-muted-foreground">Last active: 2 hours ago</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        {(['overview', 'security', 'sessions', 'audit'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'security' && (
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Two-Factor Authentication</label>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <span className="text-green-800 font-medium">✓ Enabled</span>
                <Button variant="outline">Configure</Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Login Alerts</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm">Email me on new device login</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm">Email me on unusual activity</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">API Keys</label>
              <Button variant="outline" className="w-full">
                Manage API Keys
              </Button>
            </div>

            <Button className="w-full">Save Changes</Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'audit' && (
        <Card>
          <CardHeader>
            <CardTitle>Audit Log</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Recent account activity</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAuditLogs.map((log: AuditLog) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">{log.action}</p>
                    <p className="text-sm text-muted-foreground">{log.timestamp}</p>
                  </div>
                  <Badge className={log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {log.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockNotifications.map((notif: Notification) => (
                  <div key={notif.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{notif.title}</p>
                        <p className="text-sm text-muted-foreground">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{notif.timestamp}</p>
                      </div>
                      {notif.read === false && <Badge className="bg-blue-100 text-blue-800">New</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </SoccerosDashboardLayout>
  );
}
