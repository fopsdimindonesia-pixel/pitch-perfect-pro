# Business Rules Reference Guide - Quick Lookup

## User Management Rules

### Registration & KYC
- ✅ KYC verification mandatory for all users
- ✅ Email verification required (24-hour window)
- ✅ Phone optional but recommended
- ✅ Password: min 8 chars, uppercase, lowercase, digit, special char
- ✅ Password history: Last 5 passwords cannot be reused
- ✅ MFA mandatory for Owner/Admin roles
- ✅ One email = One account (uniqueness enforced)

### User Roles & Permissions
- **Owner:** Full system access, all organizations
- **Admin:** Same as Owner (inherited)
- **EO Admin:** Only own organization, competition management
- **Club Admin:** Only own club, squad management
- **Coach:** Assigned team only, no hierarchy changes
- **Player:** Personal profile + team activities

### Suspension & Deactivation
- ✅ Auto-suspend: Failed KYC, multiple failed logins (>5 in 12hrs), chargeback
- ✅ Manual suspend: Owner/Admin decision with documentation
- ✅ Reactivation: User requests → Owner approval → Reactivated
- ✅ Inactive threshold: 180+ days → Auto-deactivation
- ✅ Login audit: All attempts logged (success/failure)

### Session Management
- ✅ Session timeout: 30 minutes of inactivity
- ✅ Multi-device login: No device limit
- ✅ Suspicious logins flagged: Impossible travel, new location
- ✅ Geographic anomaly detection enabled
- ✅ Backup codes: Generated for MFA

---

## Organization Management Rules

### Organization Types & Requirements

#### Club Requirements
- ✅ Unique registration ID required
- ✅ Head coach on staff (mandatory)
- ✅ Minimum 14 players registered
- ✅ Insurance certificate provided
- ✅ Bank account details registered
- ✅ Stadium/venue must be registered
- ✅ Annual KYC renewal required
- ✅ Foreign player quota may apply

#### Event Organizer (EO) Requirements
- ✅ Valid license from governing body
- ✅ Track record: Min 2 years experience OR references
- ✅ Insurance coverage (minimum amount required)
- ✅ Professional staff: Min 2 persons
- ✅ Can manage multiple competitions

#### League Requirements
- ✅ Minimum 4 teams to create
- ✅ Season must be unique per league
- ✅ Venue capacity documented
- ✅ Participation agreements signed
- ✅ Fixture schedule submitted

#### Federation Requirements
- ✅ Governing body status verified
- ✅ Regional structure maintained
- ✅ Regulation authority established
- ✅ Member approval processes defined

### Organization Status Workflow
```
PENDING → VERIFIED → ACTIVE ↔ INACTIVE → SUSPENDED ↔ REJECTED
```

### Suspension Grounds
- Non-compliance with regulations
- Fraud or financial misconduct
- Violent conduct or discrimination
- License expiration/revocation
- Governance failures

---

## Competition Rules

### Competition Creation
- ✅ Competition wizard: 5-step process
- ✅ Formats: League, Knockout, Group+KO
- ✅ Categories: All age groups and gender divisions
- ✅ Minimum teams: 4 required
- ✅ Season dates: Must be in future
- ✅ No overlapping seasons for same league
- ✅ Automatic fee calculation based on parameters

### Competition Lifecycle
```
Draft → Registration → Fixture Gen → Live → Completed
```

**Status Rules:**
- ✅ Cannot modify teams after first match
- ✅ Cannot change competition format after registration closes
- ✅ Cannot reverse to Draft once Live
- ✅ Historic data retained after completion

### Fixture Generation

#### League Format
- ✅ Round-robin or double round-robin
- ✅ Home/away matches scheduled
- ✅ Even distribution of weekends
- ✅ Geographic proximity considered

#### Knockout Format
- ✅ Single or double elimination bracket
- ✅ Bye rounds if odd number of teams
- ✅ Replay matches allowed on draw (if specified)

#### Group+KO Format
- ✅ Group stage: Round-robin within groups
- ✅ Knockout stage: Top teams advance
- ✅ Advancement criteria: Points, GD, GF

### Fixture Rules
- ✅ Generated after team registration closes
- ✅ Locked after first match played
- ✅ Cannot edit without admin override
- ✅ Automatic rescheduling on conflict
- ✅ Venue reservation checked

### Team Registration
- ✅ Registration deadline enforced
- ✅ Duplicate teams prevented (same club per division)
- ✅ Team fee payment required
- ✅ Minimum squad: 14 players confirmed
- ✅ Refund policy: 80% if cancelled > 7 days before
- ✅ Late registration: Hold slots available

---

## Standing Calculation Rules

### Point System
- ✅ Win: 3 points
- ✅ Draw: 1 point
- ✅ Loss: 0 points

### Ranking Criteria (Priority Order)
1. **Total Points** (descending)
2. **Goal Difference** (descending)
3. **Goals For** (descending)
4. **Head-to-Head Record** (if applicable)
5. **Fair Play Rating** (discipline score)

### Real-Time Updates
- ✅ Recalculate after each match conclusion
- ✅ Automatic history snapshots per matchday
- ✅ Automatic promotion/relegation determination
- ✅ Automatic suspension eligibility calculation
- ✅ Archive all calculations for disputes

### Manual Adjustments
- ✅ Points deduction: For misconduct (documented)
- ✅ Reversal capability: With full audit trail
- ✅ Override requires: Owner/Admin + reason + evidence

---

## Match Rules

### Match Scheduling

#### Scheduling Constraints
- ✅ Team availability verified
- ✅ Referee availability confirmed
- ✅ Venue capacity adequate
- ✅ Min 5 day gap between consecutive matches
- ✅ Max 3 matches per team in 10 days
- ✅ Evening slots preferred (1900 hours)
- ✅ Minimum 48-hour notice required

#### Conflict Resolution
- ✅ Auto-detect scheduling conflicts
- ✅ Check venue double-booking
- ✅ Prevent team double-booking
- ✅ Flag capacity issues
- ✅ Allow manual override with reason

### Referee Assignment

#### Qualification Matching
- ✅ AFC Pro: International/professional matches
- ✅ AFC A: National/regional matches
- ✅ AFC B: Regional/local matches
- ✅ Local: Youth/amateur matches

#### Assignment Criteria
- ✅ Certification level matches competition tier
- ✅ Referee availability confirmed
- ✅ No conflict of interest (referee's team not playing)
- ✅ Balanced workload distribution
- ✅ Geographic proximity preferred
- ✅ Fair Play history reviewed

#### Auto-Assignment
- ✅ System suggests qualified referees
- ✅ Manual override available
- ✅ Special case handling
- ✅ Assignment logged with timestamp

### Lineup Rules

#### Submission Requirements
- ✅ Submitted minimum 24 hours before match
- ✅ 11 starting players + up to 12 substitutes
- ✅ Maximum 23 players total
- ✅ Formation must match team's registered formations
- ✅ Valid formations: 4-3-3, 4-2-3-1, 3-5-2, etc.

#### Eligibility Validation
- ✅ Players must be registered with club
- ✅ Suspended players cannot be included
- ✅ Injured players flagged (coach decision to include)
- ✅ Contract must be active
- ✅ Age requirements verified
- ✅ Roster limits checked

#### Modification Rules
- ✅ Cannot modify < 1 hour before match
- ✅ Automatic locking 1 hour before kickoff
- ✅ Emergency replacements: Coach + Ref approval
- ✅ Injury postponement: Valid medical certificate

### Match Execution

#### Live Event Recording
- **Goal:** Scorer, assist (if any), minute, type (open play/penalty)
- **Card:** Type (yellow/red), minute, reason
- **Substitution:** Player out, player in, minute
- **Injury:** Player, type, minute

#### Event Validation
- ✅ Events must occur in chronological order
- ✅ Cannot exceed 90+ minutes (plus injury time)
- ✅ Card sequence: 2 yellows = 1 red (auto-generated)
- ✅ Goals entered real-time
- ✅ Official changes allowed until match end

#### Suspension Calculation
- ✅ Red card: Automatic 1-match suspension
- ✅ 2nd yellow in season: Escalated discipline
- ✅ Serious offense: 3+ match suspension
- ✅ Appeals process available within 48 hours
- ✅ Suspension tracked across season

### Match Statistics

#### Team Statistics
- Possession %, Shots, Shots on Target
- Pass attempts, Pass accuracy %
- Tackles, Tackles won, Fouls committed
- Corners, Offsides, Clearances
- Yellow/Red cards

#### Player Statistics
- Minutes played, Rating (0-10)
- Goals, Assists, Shots
- Passes, Pass accuracy %
- Tackles, Interceptions, Clearances
- Dribbles, Fouls, Yellow/Red cards

#### Calculation
- ✅ Automated after match conclusion
- ✅ Verified by official reviewer
- ✅ Aggregated into season totals
- ✅ Fed into advanced analytics
- ✅ Available for dispute within 48 hours

---

## Financial Rules

### Subscription Model

#### Plan Tiers
- **Basic:** Rp 50K/month - 5 players, basic reports, email support
- **Professional:** Rp 150K/month - 20 players, advanced reports, API, priority
- **Enterprise:** Custom - unlimited players, custom features, dedicated support

#### Billing Rules
- ✅ Auto-renewal enabled by default
- ✅ Cancellation cancels future renewals (not current period)
- ✅ Upgrade effective immediately with daily proration
- ✅ Downgrade effective at period end
- ✅ Free trial: 7 days for new organizations
- ✅ Grace period: 5 days after due date

#### Fee Waiver
- ✅ Service outage: Full credit
- ✅ Billing error: Correction + interest (if relevant)
- ✅ Data loss: Month credit + investigation

### Payment Processing

#### Accepted Methods
- Bank Transfer (BCA, Mandiri, BNI Virtual Accounts)
- Credit Cards (Visa, Mastercard via Stripe)
- E-Wallets (GCash, OVO, DANA)
- Online Banking

#### Transaction Fees
- Bank Transfer: 0.5% fee
- Credit Card: 2.9% fee
- E-Wallet: 1.5% fee
- Platform commission: 2.5%

#### Payment Rules
- ✅ Minimum payment: 50K
- ✅ Auto-retry: Failed payments (3 attempts over 10 days)
- ✅ Reconciliation: Daily from payment gateway
- ✅ Timeout: Payment expires if unpaid 30 days
- ✅ Chargeback: Account review + possible suspension

### Payout Management

#### Request Limits
- ✅ Minimum amount: 100K
- ✅ Maximum amount: 100M
- ✅ Maximum frequency: 2 per week per organization
- ✅ Minimum account balance: 100K to prevent negative balance

#### Payout Workflow
```
Request → AML Check → Approval → Settlement (5 days)
```

#### Processing Rules
- ✅ Compliance verification: Mandatory
- ✅ Wire transfer fee: Charged to organization
- ✅ Settlement: Within 5 business days
- ✅ Hold period: 48 hours review
- ✅ Cancellation: Allowed within 24 hours
- ✅ Failed transfer: Returned to account with notification

### Financial Compliance

#### Compliance Requirements
- ✅ KYC verification: All users before first transaction
- ✅ AML screening: Mandatory for transactions > 50M
- ✅ PCI DSS: Payment card security standard
- ✅ GDPR: EU data protection (if applicable)
- ✅ CCPA: California privacy (if applicable)
- ✅ Fatca: Foreign account tax compliance

#### Monitoring Rules
- ✅ Transaction monitoring: Real-time
- ✅ Risk scoring: Automated
- ✅ High-risk flag: > 15% risk score
- ✅ Manual review: 50%+ risk score
- ✅ Auto-block: > 90% risk score
- ✅ Velocity checks: Max per time period

#### Audit Trail
- ✅ All transactions logged
- ✅ Timestamp recorded
- ✅ User tracked
- ✅ Retained 7 years
- ✅ Accessible for audits
- ✅ Immutable after transaction

---

## Player Rules

### Player Registration

#### Player Information Required
- Name, date of birth, nationality
- Height, weight, playing position
- Jersey number (1-99, unique per team)
- Contract dates (start/end)
- Medical clearance (if required)

#### Eligibility Rules
- ✅ Age category restrictions enforced
- ✅ Foreign player quota applied
- ✅ Work permit verified (if international)
- ✅ Contract must be active
- ✅ Medical clearance current
- ✅ Insurance coverage verified

### Player Status & Suspension

#### Suspension Reasons
- Red card: 1-match automatic
- Violent conduct: 3+ matches
- Abusive language: 2+ matches
- Fantasy card: Appeal process available
- Equipment violations: Match ban

#### Suspension Tracking
- ✅ Automatically calculated
- ✅ Displayed on player profile
- ✅ Prevents participation while suspended
- ✅ Alerts when suspension lifted
- ✅ Appeals processed within 48 hours

### Player Eligibility

#### Ineligibility Factors
- ✅ Suspended (any pending ban)
- ✅ Contract inactive
- ✅ Age below category minimum
- ✅ Work permit expired
- ✅ Medical clearance expired
- ✅ Not registered with club

#### Eligibility Check Timing
- ✅ Run at lineup submission
- ✅ Final check 1 hour before match
- ✅ Re-checked on appeal
- ✅ Documented in match report

---

## Coach & Staff Rules

### Coach Requirements

#### Head Coach (Mandatory)
- ✅ Valid coaching license (minimum level)
- ✅ Background check completed
- ✅ Insurance coverage
- ✅ First aid certification recommended
- ✅ Contract must be active

#### Assistant Coaches
- ✅ Valid coaching license
- ✅ Required for professional divisions
- ✅ Minimum experience threshold
- ✅ Training record maintained

### Staff Licensing

#### License Types
- UEFA Pro: International competition
- UEFA A: Professional/semi-professional
- UEFA B: Amateur/youth
- Local: Youth/grassroots

#### License Verification
- ✅ Current license required before employment
- ✅ Expiration tracked automatically
- ✅ Renewal reminders sent
- ✅ Expired licenses flagged
- ✅ Service suspension if license expired

---

## Infrastructure & Compliance Rules

### System Uptime Targets

| Metric | Target | Alert |
|--------|--------|-------|
| Uptime | 99.99% | < 99.9% |
| API Latency | 100ms | > 500ms |
| DB Latency | 50ms | > 100ms |
| Error Rate | < 1% | > 1% |

### Incident Response SLA

| Priority | Impact | Response | Resolution |
|----------|--------|----------|------------|
| P1 | Critical | 15 min | 1 hr |
| P2 | High | 1 hr | 4 hrs |
| P3 | Medium | 4 hrs | 24 hrs |
| P4 | Low | 24 hrs | 72 hrs |

### Backup & Disaster Recovery
- ✅ RTO (Recovery Time Objective): 4 hours
- ✅ RPO (Recovery Point Objective): 1 hour
- ✅ Backup frequency: Hourly
- ✅ Backup location: Different geographic region
- ✅ Backup testing: Quarterly
- ✅ Documentation maintained

### Compliance Audit Frequency
- ✅ Monthly: Financial compliance review
- ✅ Quarterly: Security assessment
- ✅ Annually: Third-party audit
- ✅ On-demand: Incident investigation

---

## API & Authentication Rules

### API Key Management
- ✅ Keys expire after 90 days (rotation cycle)
- ✅ Rate limiting per key (default: 1M requests/month)
- ✅ Scopes: Least privilege principle
- ✅ Usage tracking: Real-time
- ✅ Revocation: Immediate on security concern

### Authentication Scopes
- `read:own` - Personal data only
- `read:organization` - Org data only
- `read:*` - All readable data
- `write:own` - Personal data only
- `write:organization` - Org data only
- `write:*` - All writable data

### Rate Limiting
- ✅ Per-key limits enforced
- ✅ Throttling: 429 Too Many Requests
- ✅ Burst allowance: 20% of limit
- ✅ Reset: Hourly or daily (configurable)
- ✅ Alerts: Sent when 80% of limit

---

## Summary Statistics

### Total Business Rules: 200+

**By Category:**
- User Management: 25 rules
- Organization: 20 rules
- Competition: 35 rules
- Match: 50 rules
- Financial: 30 rules
- Compliance: 20 rules
- Technical: 20 rules

**Critical Rules to Remember:**
1. KYC mandatory for all users
2. Min 4 teams for competition
3. Points: W=3, D=1, L=0
4. Standing ranking: Points → GD → GF → H2H
5. 2 yellows = 1 red card
6. Lineup submitted 24hrs minimum
7. Fixture locked after first match
8. Transaction fee: 2.5%
9. Payout min: 100K, hold: 48hrs
10. Uptime target: 99.99%

---

*Last Updated: March 16, 2026*  
*Version: 1.0*  
*Application: Pitch Perfect Pro*
