### 📝 Beobachtungs-Protokoll: TanStack Query Caching Behavior

#### 1. Test: `staleTime: 0s` (Sofort veraltet)

- **Aktion:** Liste ausblenden (`Hide List`) und sofort wieder einblenden (`Show List`).
- **Beobachtung:** Die Posts werden sofort aus dem Cache gerufen (kein sichtbarer Lade-Zustand). Gleichzeitig erscheint im Network-Tab ein neuer Request (`Status 304 - Not Modified`).
- **Erklärung:** Da die Daten sofort als veraltet (_stale_) gelten, zeigt TanStack Query zwar den Cache, triggert aber im Hintergrund ein _Silent Refetch_, um die Aktualität zu prüfen.

#### 2. Test: `staleTime: 30s` (Frisches Zeitfenster)

- **Aktion:** `staleTime` auf 30 Sekunden stellen, Liste aus- und wieder einblenden.
- **Beobachtung:** Die Liste erscheint sofort, und es wird **kein** neuer Netzwerk-Request im Hintergrund gefeuert.
- **Erklärung:** Innerhalb dieses Zeitfensters gelten die Cache-Daten als absolut frisch (_fresh_). TanStack Query spart Netzwerkressourcen und verzichtet auf ein Update.

#### 3. Test: API Error Simulation

- **Aktion:** `Simulate API Error` aktivieren.
- **Beobachtung:** Die UI wechselt sofort in den Fehlerzustand (`Error: Fehler beim Laden der Posts`). Beim Deaktivieren kehren die Daten dank des Cache-Keys fehlerfrei zurück.
