# Match Management System - Route Reference

## Current File Tree
```
src/pages/match/
├── setup/
│   ├── MatchScheduler.tsx        (Module 301)
│   └── RefereeAssignment.tsx      (Module 304)
├── lineup/
│   └── LineupSubmission.tsx       (Module 306)
├── events/
│   └── MatchEvents.tsx            (Modules 311-315)
├── data/
│   ├── MatchTimeline.tsx          (Module 321)
│   ├── MatchStatistics.tsx        (Module 322)
│   └── PlayerRatings.tsx          (Module 325)
├── analytics/
│   └── TacticalAnalysis.tsx       (Module 336)
└── archive/
    └── MatchArchive.tsx           (Module 346)

src/components/match/
└── PitchVisualization.tsx         (Reusable Component)
```

## Recommended Routes for Integration

```typescript
// In src/App.tsx - Add to your router:

const matchRoutes = [
  // Setup
  { path: '/match/scheduler', element: <MatchScheduler /> },
  { path: '/match/referees', element: <RefereeAssignment /> },
  
  // Lineup
  { path: '/match/lineup', element: <LineupSubmission /> },
  
  // Events
  { path: '/match/events', element: <MatchEvents /> },
  
  // Data
  { path: '/match/timeline', element: <MatchTimeline /> },
  { path: '/match/statistics', element: <MatchStatistics /> },
  { path: '/match/ratings', element: <PlayerRatings /> },
  
  // Analytics
  { path: '/match/tactics', element: <TacticalAnalysis /> },
  
  // Archive
  { path: '/match/archive', element: <MatchArchive /> },
];
```

## Integration in Sidebar

```typescript
// src/components/layout/AppSidebar.tsx

// Add new group under match section:
{
  title: "Match Management",
  items: [
    {
      title: "Setup",
      icon: Settings,
      items: [
        { label: "Match Scheduler", href: "/match/scheduler" },
        { label: "Referee Assignment", href: "/match/referees" },
      ],
    },
    {
      title: "Match Operations",
      icon: Activity,
      items: [
        { label: "Lineup", href: "/match/lineup" },
        { label: "Events", href: "/match/events" },
      ],
    },
    {
      title: "Data & Analysis",
      icon: BarChart3,
      items: [
        { label: "Timeline", href: "/match/timeline" },
        { label: "Statistics", href: "/match/statistics" },
        { label: "Player Ratings", href: "/match/ratings" },
        { label: "Tactical Analysis", href: "/match/tactics" },
      ],
    },
    {
      title: "Records",
      icon: Archive,
      items: [
        { label: "Match Archive", href: "/match/archive" },
      ],
    },
  ],
}
```

## Component Import Reference

```typescript
// To use any match page:
import { MatchScheduler } from '@/pages/match/setup/MatchScheduler';
import { RefereeAssignment } from '@/pages/match/setup/RefereeAssignment';
import { LineupSubmission } from '@/pages/match/lineup/LineupSubmission';
import { MatchEvents } from '@/pages/match/events/MatchEvents';
import { MatchTimeline } from '@/pages/match/data/MatchTimeline';
import { MatchStatistics } from '@/pages/match/data/MatchStatistics';
import { PlayerRatings } from '@/pages/match/data/PlayerRatings';
import { TacticalAnalysis } from '@/pages/match/analytics/TacticalAnalysis';
import { MatchArchive } from '@/pages/match/archive/MatchArchive';

// Reusable component:
import { PitchVisualization } from '@/components/match/PitchVisualization';
```

## Page Details & Mock Data

### 1. MatchScheduler (Module 301)
**Path:** `/match/schedule`
**Mock Data:** 3 matches with dates, venues, referee status
**Features:** Search, filter by date/team, schedule status
**User Role:** Competition Organizer

### 2. RefereeAssignment (Module 304)
**Path:** `/match/referees`
**Mock Data:** 5 referees with AFC license levels, experience
**Features:** Filter by availability, assign referees
**User Role:** Referee Coordinator

### 3. LineupSubmission (Module 306)
**Path:** `/match/lineup/:matchId`
**Mock Data:** 11 starting XI, 4 bench players
**Features:** Formation selector, captain selection, pitch preview
**User Role:** Team Manager

### 4. MatchEvents (Module 311-315)
**Path:** `/match/:matchId/events`
**Mock Data:** 3 goals, 3 cards, 2 substitutions
**Features:** Tabbed events (Goals/Cards/Subs), live recording
**User Role:** Match Operator

### 5. MatchTimeline (Module 321)
**Path:** `/match/:matchId/timeline`
**Mock Data:** 10 chronological events
**Features:** Visual timeline, live score, event icons
**User Role:** Any user (read-only)

### 6. MatchStatistics (Module 322)
**Path:** `/match/:matchId/stats`
**Mock Data:** Possession %, shots, passes, comparative stats
**Features:** Live updating stats, possession bar
**User Role:** Any user (read-only)

### 7. PlayerRatings (Module 325)
**Path:** `/match/:matchId/ratings`
**Mock Data:** 6 players with ratings and detailed stats
**Features:** Rating color coding, performance metrics
**User Role:** Any user (read-only)

### 8. TacticalAnalysis (Module 336)
**Path:** `/match/:matchId/tactics`
**Mock Data:** Formation, possession, pressure analysis
**Features:** 4 analysis tabs, tactical insights
**User Role:** Analyst

### 9. MatchArchive (Module 346)
**Path:** `/match/archive`
**Mock Data:** 3 historical matches
**Features:** Search play history, download records
**User Role:** Researcher/Admin

## Next Steps for Backend Integration

1. **Replace Mock Data:** Connect to real database
2. **Add API Calls:** Use fetch/axios in useEffect
3. **Real-time Updates:** Implement WebSocket for live matches
4. **Form Submission:** Connect forms to backend endpoints
5. **Authentication:** Add role-based access controls
6. **Error Handling:** Add error boundaries and user feedback

## Development Notes

- All pages are stateless UI components (no backend logic)
- Mock data is defined at the top of each component
- All components use TypeScript strict mode
- Responsive design with Tailwind CSS
- Accessibility features (ARIA labels, semantic HTML)
- Ready for Storybook integration
