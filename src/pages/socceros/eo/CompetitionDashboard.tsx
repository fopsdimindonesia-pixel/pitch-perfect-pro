import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SoccerosDashboardLayout, PageHeader, StatCard, StatusBadgeFootball } from '@/components/socceros/DashboardLayout';
import { mockCompetitions, mockStandings, type Standing } from '@/lib/socceros/mockData';
import { Trophy, Users, Calendar, Zap, Plus } from 'lucide-react';

export default function CompetitionDashboard() {
  const competition = mockCompetitions[0]; // Indonesian Super League

  return (
    <SoccerosDashboardLayout role="EO">
      <PageHeader
        title="Competition Dashboard"
        subtitle={`${competition.name} - Season ${competition.season}`}
        icon="🏆"
        action={
          <div className="flex gap-2">
            <Button variant="outline">Settings</Button>
            <Button><Plus className="w-4 h-4 mr-2" /> New Match</Button>
          </div>
        }
      />

      {/* Competition Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Participating Clubs"
          value={competition.clubs}
          icon={<Trophy className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Total Matches"
          value={competition.matches}
          icon={<Calendar className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          title="Matches Played"
          value={competition.matchesPlayed}
          icon={<Zap className="w-6 h-6" />}
          color="orange"
        />
        <StatCard
          title="Progress"
          value={`${Math.round((competition.matchesPlayed / competition.matches) * 100)}%`}
          icon={<Users className="w-6 h-6" />}
          color="purple"
        />
      </div>

      {/* Standings Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Current Standings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-semibold">Pos</th>
                  <th className="px-4 py-3 text-left font-semibold">Club</th>
                  <th className="px-4 py-3 text-center font-semibold">P</th>
                  <th className="px-4 py-3 text-center font-semibold">W</th>
                  <th className="px-4 py-3 text-center font-semibold">D</th>
                  <th className="px-4 py-3 text-center font-semibold">L</th>
                  <th className="px-4 py-3 text-center font-semibold">GF</th>
                  <th className="px-4 py-3 text-center font-semibold">GA</th>
                  <th className="px-4 py-3 text-center font-semibold">GD</th>
                  <th className="px-4 py-3 text-center font-semibold">Pts</th>
                </tr>
              </thead>
              <tbody>
                {mockStandings.map((row: Standing, idx: number) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-center">{row.rank}</td>
                    <td className="px-4 py-3 font-medium">{row.club}</td>
                    <td className="px-4 py-3 text-center">{row.played}</td>
                    <td className="px-4 py-3 text-center text-green-600 font-semibold">{row.won}</td>
                    <td className="px-4 py-3 text-center text-yellow-600">{row.drawn}</td>
                    <td className="px-4 py-3 text-center text-red-600">{row.lost}</td>
                    <td className="px-4 py-3 text-center">{row.goalsFor}</td>
                    <td className="px-4 py-3 text-center">{row.goalsAgainst}</td>
                    <td className="px-4 py-3 text-center font-semibold">{row.goalDifference}</td>
                    <td className="px-4 py-3 text-center font-bold text-lg">{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Fixtures & Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Matches */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Matches (Week 1)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { id: 1, home: 'PSM Makassar', away: 'Persija Jakarta', date: '2025-03-20', time: '19:30' },
              { id: 2, home: 'Arema FC', away: 'Persebaya', date: '2025-03-20', time: '20:00' },
              { id: 3, home: 'Bali United', away: 'Kaya FC', date: '2025-03-21', time: '19:00' },
            ].map((match) => (
              <div key={match.id} className="p-3 border rounded-lg hover:bg-gray-50">
                <p className="text-xs text-muted-foreground mb-2">
                  {match.date} @ {match.time}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{match.home}</span>
                  <span className="text-gray-400">vs</span>
                  <span className="font-medium">{match.away}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Lineup
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Competition Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Management Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              🎮 Tournament Engine
            </Button>
            <Button className="w-full justify-start" variant="outline">
              📋 Team Registration
            </Button>
            <Button className="w-full justify-start" variant="outline">
              🏅 Award Management
            </Button>
            <Button className="w-full justify-start" variant="outline">
              📊 Competition Analytics
            </Button>
            <Button className="w-full justify-start" variant="outline">
              📢 Public Competition Page
            </Button>
          </CardContent>
        </Card>
      </div>
    </SoccerosDashboardLayout>
  );
}
