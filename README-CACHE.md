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

### 🔄 Beobachtungs-Protokoll: TanStack Query Mutations

#### 1. Test: Mutation Pending State (`isPending`)

- **Aktion:** Neuen Post-Titel und Inhalt eingeben und auf `Post Absenden` klicken.
- **Beobachtung:** Der Button wechselt sofort auf `Wird gespeichert...` und die Eingabefelder werden kurzzeitig deaktiviert (_disabled_).
- **Erklärung:** `mutation.isPending` liefert während des asynchronen Netzwerk-Requests den Wert `true`. Dies verhindert mehrfaches Absenden und verbessert die User Experience.

#### 2. Test: Cache Invalidation nach Erfolg (`onSuccess`)

- **Aktion:** Erfolgreiches Absenden im Network-Tab beobachten.
- **Beobachtung:** Es werden zwei Requests hintereinander gefeuert:
  1. Ein `POST`-Request mit dem HTTP-Status `201` (Erfolgreich erstellt).
  2. Sofort danach ein automatischer `GET`-Request für `posts`. Die Formulardaten werden gelöscht.
- **Erklärung:** Im `onSuccess`-Callback der Mutation wird `queryClient.invalidateQueries({ queryKey: ['posts'] })` aufgerufen. Dadurch wird der bestehende Cache als veraltet markiert und TanStack Query stößt sofort ein automatisches Refetch an, um die UI mit dem Server-State zu synchronisieren.

### 🚀 Erweiterungsaufgabe: Optimistic UI Updates beim Löschen

#### Beobachtungs-Protokoll

- **Aktion:** Klick auf den roten `Löschen`-Button eines Posts.
- **Beobachtung:** Der ausgewählte Post verschwindet **sofort** (in Millisekunden) aus der Benutzeroberfläche, noch bevor der HTTP-`DELETE`-Request im Network-Tab als abgeschlossen (Status 200) angezeigt wird.
- **Erklärung & Logik:**
  1. **`onMutate`**: Sobald der Klick erfolgt, brechen wir ausgehende Refetches ab und machen ein Backup des aktuellen Caches (`previousPosts`). Danach manipulieren wir den Cache direkt mit `queryClient.setQueryData`, um den Post sofort herauszufiltern.
  2. **`onError`**: Sollte der Server-Request fehlschlagen, sorgt dieser Callback dafür, dass das Backup automatisch zurückgerollt wird, sodass der gelöschte Post wieder im UI erscheint (Rollback-Strategie).
  3. **`onSettled`**: Am Ende wird `invalidateQueries` ausgeführt, um sicherzustellen, dass unser lokaler Zustand absolut synchron mit dem echten Server-State bleibt.
