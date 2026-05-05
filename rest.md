# Fiberstar OSS — Spesifikasi Ruang Lingkup Aplikasi

## Overview

Fiberstar OSS adalah tools simulasi Network Management System (NMS) untuk infrastruktur DWDM (Dense Wavelength Division Multiplexing) fiber optik Indonesia. Dibangun tanpa network element fisik — semua data adalah hasil seeding/simulasi untuk keperluan demo dan proof-of-concept.

**Stack**: Next.js 15, React 19, Prisma ORM, PostgreSQL, Socket.IO, Material-UI, Tailwind CSS, Leaflet

---

## Ruang Lingkup Ideal

Ruang lingkup yang ideal mencakup seluruh siklus operasional NOS (Network Operations Center) untuk jaringan DWDM:

### 1. Network Discovery & Inventory

- [ ] Auto-discovery network elements via SNMP/NETCONF/REST southbound
- [ ] Network element inventory management (rack/shelf/slot/port)
- [ ] Equipment lifecycle tracking (purchase → deploy → decommission)
- [ ] Spare parts / warehouse inventory management
- [ ] Software/firmware version management

### 2. Real-Time Monitoring

- [ ] Performance metrics monitoring (BER, CD, PMD, Q-Factor, OSNR)
- [ ] Optical power monitoring per channel/span
- [ ] Traffic capacity & utilization monitoring (10G/40G/100G/400G)
- [ ] Fiber span health monitoring (ORL, attenuation, temperature)
- [ ] Environmental monitoring (temperature, humidity, power)
- [ ] Spectrum analyzer visualization (C-band, L-band)
- [ ] Optical amplifier monitoring (EDFA, ROADM, Raman)

### 3. Alarm Management

- [ ] Alarm collection & normalization (multi-vendor)
- [ ] Alarm deduplication (exact + similar within time window)
- [ ] Alarm suppression rules (severity-based, maintenance window, custom)
- [ ] Alarm lifecycle management (ACTIVE → ACK → ESCALATE → CLEAR → CLOSE)
- [ ] Alarm correlation & grouping (topology-aware, temporal, causal)
- [ ] Root cause analysis (cascade alarm identification)
- [ ] Alarm history & audit trail

### 4. Fault Management

- [ ] Incident management (creation, assignment, resolution)
- [ ] SLA tracking & breach alerting (per severity)
- [ ] MTTR/MTBF calculation & trending
- [ ] Network availability monitoring (99.999% target)
- [ ] Impact analysis (affected services, customers, regions)
- [ ] Escalation chain management (level 1 → 2 → 3)

### 5. Service & Customer Management

- [ ] Service catalog (EPL, EVPL, IP Transit, DIA)
- [ ] Service provisioning workflow (order → provision → activate)
- [ ] End-to-end path visualization (A-end → Z-end)
- [ ] Service impact analysis during faults
- [ ] Customer management (enterprise, wholesale, residential)
- [ ] SLA compliance per customer tier (GOLD/SILVER/BRONZE)
- [ ] Bandwidth on-demand / dynamic provisioning

### 6. Workforce Management

- [ ] Technician management (skills, region, workload, rating)
- [ ] Work order management (create, assign, track, complete)
- [ ] Auto-dispatch (region match + skill match + workload balance)
- [ ] Maintenance scheduling (routine, emergency, upgrade)
- [ ] Maintenance window management (suppress alarms, impact analysis)
- [ ] Time tracking (estimated vs actual hours)

### 7. Network Topology

- [ ] Geographic topology map (interactive, zoom, filter)
- [ ] Logical topology view (OTN layers: DWDM → IP/MPLS → GPON)
- [ ] Service path trace (hop-by-hop visualization)
- [ ] Protection path visualization (primary + backup, 1+1, 1:1)
- [ ] Fiber route visualization (physical fiber paths)
- [ ] Topology-aware alarm correlation

### 8. Reporting & Analytics

- [ ] Alarm trend analysis (volume, severity, region, time)
- [ ] MTTR/MTBF trend reporting
- [ ] SLA compliance reporting (per customer, per service)
- [ ] Network availability reporting
- [ ] Top problematic NE reporting
- [ ] Technician performance reporting
- [ ] Capacity planning & forecasting
- [ ] Export to PDF/Excel

### 9. Notification & Escalation

- [ ] In-app notification center (bell icon, history, mark read)
- [ ] Email notification (SMTP)
- [ ] Push notification (Telegram/WhatsApp)
- [ ] SMS gateway integration
- [ ] Auto-escalation timer (unacknowledged alarm → escalate)
- [ ] Escalation chain visualization

### 10. Security & Access Control

- [ ] User authentication (email/password, SSO)
- [ ] Multi-role RBAC (ADMIN, NOC_OPERATOR, FIELD_TECH, READ_ONLY, CUSTOMER)
- [ ] Row-level permissions (technician sees own work orders)
- [ ] Audit trail (all user actions logged)
- [ ] Session management (timeout, concurrent login control)

### 11. Simulation & Training

- [ ] Scenario-based fault simulation (fiber cut, power outage, degradation)
- [ ] Alarm propagation simulation (cascade downstream alarms)
- [ ] Dynamic optical data simulation (time-series variation)
- [ ] Traffic pattern simulation (diurnal, event-driven)
- [ ] Protection switching simulation
- [ ] End-to-end operational workflow simulation

### 12. System & Integration

- [ ] Northbound REST API (external system integration)
- [ ] ITSM integration (ServiceNow, Jira) for ticket sync
- [ ] Webhook for event notification
- [ ] CRM integration for customer data sync
- [ ] Multi-language support (i18n)
- [ ] Dark mode / theme switching
- [ ] Mobile-responsive design

---

## Checklist Ketersediaan

### ✅ Sudah Tersedia

#### Network Discovery & Inventory
- [x] Network element inventory (Prisma model: `NetworkElement`)
- [x] Network link inventory (Prisma model: `NetworkLink`)
- [x] OSS system inventory (Prisma model: `OSS`)
- [x] Equipment metadata (vendor, model, serial, rack/shelf/slot, firmware)
- [x] JSON-based seeding (1,108 NEs, 2,734 links, 6 OSS)
- [x] Geographic data (26 Indonesian cities with real coordinates)
- [ ] ~~Spare parts inventory~~ — Model `Inventory` ada tapi tidak ada halaman UI
- [ ] ~~Equipment lifecycle tracking~~ — Field `installDate`/`warrantyExpiry` ada tapi tidak dimanfaatkan

#### Real-Time Monitoring
- [x] Dashboard KPI (total NE, DWDM, IP/MPLS, GPON, links, availability)
- [x] Geographic topology map (Leaflet interactive)
- [x] Performance metrics data (Prisma model: `PerformanceMetrics` — BER, CD, PMD, Q-Factor)
- [x] Optical power monitoring (Prisma model: `OpticalPower`)
- [x] OSNR monitoring (Prisma model: `OSNRMonitoring`)
- [x] Wavelength/channel utilization (Prisma model: `WavelengthStatus`)
- [x] Spectrum analyzer data (Prisma model: `OpticalSpectrum`)
- [x] Optical amplifier monitoring (Prisma model: `OpticalAmplifier` — EDFA, ROADM, Raman)
- [x] Traffic capacity monitoring (Prisma model: `TrafficCapacity`)
- [x] Fiber span health monitoring (Prisma model: `FiberSpanHealth`)
- [x] Socket.IO real-time connection (alarm live updates)
- [ ] ~~Semua data monitoring statis~~ — Tidak ada time-series variation setelah seeding

#### Alarm Management
- [x] Alarm lifecycle state machine (`alarm-lifecycle.ts`)
  - ACTIVE → ACKNOWLEDGED → ESCALATED → CLEARED → CLOSED
- [x] Alarm deduplication (`alarm-dedup.ts`)
  - Exact match (vendor + vendorAlarmId)
  - Similar match (NE + severity + category + text, 5-min window)
  - Occurrence counting
- [x] Alarm suppression rules engine (`alarm-suppression.ts`)
  - Rule evaluation (vendor, NE, severity, category, NE status)
  - Auto-suppress on alarm creation
  - Manual unsuppress
- [x] Alarm history & audit trail (`AlarmHistory` model)
- [x] Alarm filtering, sorting, search (Zustand store + UI)
- [x] Socket.IO alarm generator (configurable rate/duration)
- [x] Alarm constants (severity colors, valid transitions, categories)
- [x] Alarm suppression rule manager UI (`SuppressionRuleManager.tsx`)
- [ ] ~~Alarm correlation~~ — Engine ada tapi basic, tidak topology-aware
- [ ] ~~Root cause analysis~~ — Tidak ada
- [ ] ~~Multi-vendor normalization~~ — `normalized` field ada tapi tidak ada vendor-specific mapping

#### Fault Management
- [x] Incident management (`Incident` model + `incident-lifecycle.ts`)
  - OPEN → ACKED → IN_PROGRESS → MONITORING → RESOLVED → CLOSED
- [x] SLA tracking per severity (`incident-sla.ts`)
  - CRITICAL: 30m, MAJOR: 2h, MINOR: 8h, WARNING: 24h
- [x] SLA timer UI (`IncidentSLATimer.tsx`)
- [x] Incident timeline UI (`IncidentTimeline.tsx`)
- [x] Alarm ↔ Incident linking/unlinking
- [x] Incident assignment & comment system
- [x] SLA breach detection & notification
- [x] Fault management UI (`FaultManagement.tsx`) — MTTR, MTBF, availability
- [x] Dashboard metrics model (`DashboardMetrics`)
- [ ] ~~Impact analysis~~ — `affectedServices` field ada tapi tidak dipopulate
- [ ] ~~Escalation chain~~ — `escalationLevel` field ada tapi tidak ada chain management

#### Service & Customer Management
- [x] Customer model (`Customer`) — enterprise, wholesale, residential
- [x] Customer CRUD UI (`crm/page.tsx`)
- [x] Customer tier management (PLATINUM, GOLD, SILVER, BRONZE)
- [x] Service model (`Service`) — EPL, EVPL, IP Transit, DIA
- [x] Network path model (`NetworkPath`) — primary, backup, diverse
- [x] SLA monitoring model (`SLAMonitoring`)
- [ ] ~~Service provisioning UI~~ — Model ada tapi tidak ada halaman
- [ ] ~~End-to-end path visualization~~ — Model `pathElements` ada tapi tidak ada UI
- [ ] ~~Service impact analysis~~ — Tidak ada

#### Workforce Management
- [x] Technician model (`Technician`) — skills, region, workload, rating
- [x] Technician CRUD UI (`crm/page.tsx` — tab Technicians)
- [x] Work order model (`WorkOrder`)
- [x] Work order CRUD UI (`work-orders/page.tsx`) — create, edit, delete, status tabs
- [x] Work order filtering, search, pagination
- [x] Maintenance schedule model (`MaintenanceSchedule`)
- [ ] ~~Maintenance schedule UI~~ — Model ada tapi tidak ada halaman
- [ ] ~~Auto-dispatch~~ — Tidak ada
- [ ] ~~Time tracking~~ — Field `estimatedHours`/`actualHours` ada tapi tidak ada tracking UI

#### Network Topology
- [x] Geographic topology map (Leaflet, interactive)
- [x] Network element markers (custom icons per type: DWDM, IP/MPLS, GPON)
- [x] Network link visualization (polylines with color by type/status)
- [x] Element status color coding (UP=green, DEGRADED=orange, DOWN=red)
- [x] Topology legend (element types, link types, status)
- [x] Physical topology map component (`PhysicalTopologyMap.tsx`)
- [ ] ~~Logical topology view~~ — `LogicalTopology.tsx` ada tapi perlu dicek kelengkapan
- [ ] ~~Service path trace~~ — Tidak ada
- [ ] ~~Protection path visualization~~ — Tidak ada

#### Reporting & Analytics
- [x] Dashboard metrics (counts, percentages)
- [x] Alarm chart components (`src/components/alarm-charts/`)
- [ ] ~~Trend analysis~~ — Tidak ada (hanya snapshot saat ini)
- [ ] ~~Export to PDF/Excel~~ — Tidak ada

#### Notification & Escalation
- [x] Socket.IO real-time alarm events
- [x] In-app alarm toast notification (Snackbar)
- [x] Connection status indicator
- [ ] ~~Notification center~~ — Tidak ada (bell icon, history, persistence)
- [ ] ~~Email/SMS/push notification~~ — Tidak ada
- [ ] ~~Auto-escalation timer~~ — Tidak ada

#### Security & Access Control
- [x] Authentication (`better-auth` + Prisma adapter + username plugin)
- [x] Login page (`src/app/login/page.tsx`)
- [x] Session management (7-day expiry, 1-day update)
- [x] Middleware route protection (`src/middleware.ts`)
- [x] API route protection (auth + role check)
- [ ] ~~Multi-role RBAC~~ — Hanya ADMIN yang diizinkan, USER diblokir middleware
- [ ] ~~Audit trail~~ — `AlarmHistory`/`IncidentHistory` ada tapi tidak ada general audit log
- [ ] ~~Row-level permissions~~ — Tidak ada

#### Simulation & Training
- [x] Simulator page (`simulator/page.tsx`) — step-by-step seeding
- [x] Socket.IO alarm generator (rate/duration configurable)
- [x] Element status update simulation (`api/simulate/route.ts`)
- [x] Alarm dedup + suppression in Socket.IO generator
- [ ] ~~Scenario-based simulation~~ — Hanya random alarm, tidak ada skenario
- [ ] ~~Alarm propagation~~ — Alarm tidak mempengaruhi network state
- [ ] ~~Dynamic optical data~~ — Semua data optik statis
- [ ] ~~Traffic pattern simulation~~ — Tidak ada

#### System & Integration
- [x] REST API (52 endpoints)
- [x] API documentation page (`api-docs/`)
- [x] Zustand state management (`alarm-store.ts`)
- [x] React Query (`@tanstack/react-query` in dependencies)
- [x] Socket.IO real-time
- [x] Custom server with Socket.IO integration (`server.ts`)
- [ ] ~~Northbound API / Webhook~~ — Tidak ada
- [ ] ~~ITSM/CRM integration~~ — Tidak ada
- [x] `next-intl` (i18n dependency) — Terinstall tapi tidak dikonfigurasi
- [x] `next-themes` (dark mode dependency) — Terinstall tapi tidak dikonfigurasi
- [ ] ~~Dark mode~~ — Dependency ada tapi tidak diimplementasi
- [ ] ~~Mobile-responsive~~ — Layout dasar responsive tapi belum optimized

---

## Checklist Ketersediaan — Ringkasan

| Area | Model DB | API | UI | Real-Time | Skor |
|---|---|---|---|---|---|
| Network Inventory | ✅ | ✅ | ❌ (no inventory page) | ❌ | 40% |
| Performance Monitoring | ✅ | ✅ | ✅ (dashboard) | ✅ (Socket.IO) | 70% |
| Alarm Management | ✅ | ✅ | ✅ | ✅ | 85% |
| Fault/Incident Management | ✅ | ✅ | ✅ | ✅ | 80% |
| Service & Customer | ✅ | ✅ | ⚠️ (customer only) | ❌ | 50% |
| Workforce Management | ✅ | ✅ | ⚠️ (WO + technician, no maintenance) | ❌ | 55% |
| Network Topology | ✅ | ✅ | ✅ (geographic) | ❌ | 60% |
| Reporting & Analytics | ✅ | ❌ | ⚠️ (charts only) | ❌ | 30% |
| Notification & Escalation | ❌ | ❌ | ⚠️ (toast only) | ⚠️ (Socket.IO) | 25% |
| Security & Access Control | ✅ | ✅ | ✅ (login) | ❌ | 50% |
| Simulation & Training | ❌ | ✅ | ✅ | ✅ | 45% |
| System & Integration | — | ✅ | ✅ (API docs) | ✅ | 60% |

---

## Temuan Teknis

### 🔴 Bug Kritis
- **`api/simulate/route.ts` bypasses alarm pipeline**: Langsung memanggil `db.alarm.create()` tanpa melalui `processIncomingAlarm()` → alarm tidak di-dedup, tidak ada history, tidak di-suppress, tidak emit Socket.IO event

### 🟡 Technical Debt
- **Dual seeding systems**: `network-seeding.ts` (procedural, legacy) dan `json-seeding.ts` (JSON-driven, aktif) — keduanya masih reachable
- **Dead code di `master-seeding.ts`**: `seedOSS()` dan `correlateNetworkElementsWithOSS()` tidak dipanggil oleh `seedAllTables()`
- **Middleware self-call**: `validateSession()` membuat HTTP call ke `localhost:3000` — akan gagal jika port berbeda
- **Hardcode ADMIN role**: Middleware hanya mengizinkan `ADMIN`, field `USER` tidak usable
- **Single Zustand store**: Hanya `alarm-store.ts`, tidak ada store untuk incident/work order/topology
- **No test infrastructure**: Tidak ada test framework, tidak ada test script

### 🟢 Arsitektur yang Sudah Baik
- Alarm lifecycle state machine dengan valid transition enforcement
- Dedup + suppression pipeline dengan transactional history
- Incident SLA tracking dengan breach detection
- Socket.IO event system yang komprehensif (15+ event types)
- JSON seed data yang kaya (1,108 NEs, 2,734 links dengan metadata lengkap)