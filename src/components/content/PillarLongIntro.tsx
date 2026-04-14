type Beruf = 'polizei' | 'feuerwehr' | 'sanitaet';

const TEXTS: Record<Beruf, { h2: string; paragraphs: string[] }> = {
  polizei: {
    h2: 'Polizei-Singles in der Schweiz — zwischen Schichtdienst und Beziehung',
    paragraphs: [
      'Wer bei der Kantonspolizei, einer Stadtpolizei oder beim Grenzwachtkorps arbeitet, kennt das Problem: Der Job frisst Zeit, das Privatleben bleibt oft liegen. Schichtdienst, kurzfristige Einsätze, emotional heikle Lagen — und am Ende des Tages steht die Frage im Raum, wo man Menschen kennenlernt, die das nicht nur aushalten, sondern verstehen.',
      'Blaulichtsingles.ch ist für genau diese Zielgruppe gebaut. Die Plattform richtet sich an Polizistinnen und Polizisten aus allen 26 Kantonen und den 300+ Gemeinde-Korps der Schweiz. Anders als bei generischen Dating-Apps musst du hier nicht erklären, warum du am Samstagabend arbeitest oder weshalb dein Telefon im Hintergrund permanent piept.',
      'Die Beziehungen, die hier entstehen, profitieren von zwei Dingen: einem gemeinsamen Grundverständnis für Belastungen und einem Netzwerk aus Gleichgesinnten. Viele Paare im Blaulicht-Umfeld berichten, dass sie sich über die Arbeit nicht erklären müssen — das allein reduziert Reibung im Alltag enorm. Schichtpläne abgleichen wird nicht zum Drama, sondern zur Routine.',
      'Die Regional-Übersicht unten sortiert dich direkt zu deinem Kanton. Ob Kapo Zürich, Kapo Waadt, Kapo Bern oder eine kleinere Einheit wie die Kantonspolizei Uri — für jede Region gibt es eigene Tipps, Treffpunkte und eine Liste verfügbarer Profile in deiner Nähe.',
    ],
  },
  feuerwehr: {
    h2: 'Feuerwehr-Singles in der Schweiz — Milizsystem und Liebe unter einem Dach',
    paragraphs: [
      'Die Schweizer Feuerwehr ist anders als in den meisten Ländern — etwa 85 % der Einsatzkräfte sind Milizfeuerwehrleute, also Freiwillige neben dem Hauptberuf. Dazu kommen die Berufsfeuerwehren in Zürich, Bern, Basel, Genf und weiteren grösseren Städten. Beide Welten eint ein Ding: wenn der Piepser geht, ist Schluss mit Planung.',
      'Das macht Partnersuche anspruchsvoll. Wer als Feuerwehrfrau oder Feuerwehrmann Dating-Apps ausprobiert, kennt die Reaktionen: „Du musst wieder weg? Jetzt?" — und dann war es das oft schon. Auf Blaulichtsingles.ch begegnest du Menschen, die das Pattern kennen und selber leben.',
      'Was die Milizfeuerwehr besonders macht: die Doppelbelastung. Tagsüber Beruf, abends Übung, nachts ggf. Einsatz. Pärchen, die beide in der Feuerwehr sind, teilen oft sogar denselben Funkkanal. Wer darauf steht, findet hier passende Verbindungen.',
      'Nutz die Kanton-Navigation unten, um Singles in deiner Region zu finden. Zusätzlich haben wir Artikel mit Tipps fürs erste Date nach der Übung, Umgang mit Einsatz-Trauma in der Beziehung und wie man als Feuerwehr-Paar auch ohne Kalender eine Beziehung am Laufen hält.',
    ],
  },
  sanitaet: {
    h2: 'Sanität-Singles in der Schweiz — Rettungsdienst, Pflege und das Liebesleben danach',
    paragraphs: [
      'Im Rettungsdienst, in der Pflege oder als Ärztin in der Notaufnahme: der Beruf verändert dich. Nicht jeder versteht, warum man nach einer 12-Stunden-Schicht keine grosse Lust auf Smalltalk hat — und warum ein ruhiger Abend auf dem Sofa oft mehr wert ist als jedes Ausgeh-Event.',
      'Blaulichtsingles.ch fasst Sanität als Oberbegriff: Rettungssanitäter HF, Notfallpflege, ambulante Pflege, Ärztinnen im Spital, Einsatzkräfte der REGA, Sanitätsdienst der Armee. Alle teilen den Dienstrhythmus und die Art, wie man über Tod, Notlagen und schnelle Entscheidungen spricht — oder eben nicht.',
      'Ein oft übersehenes Thema ist der Berufsausstieg: rund 7,5 Jahre bleiben Rettungssanitäter im Schnitt im Beruf, bevor sie wechseln. Das verändert auch die Beziehungsdynamik. Wer eine Partnerin oder einen Partner mit ähnlichem Hintergrund hat, durchläuft diesen Übergang oft gemeinsam — und nicht einsam.',
      'Die Regional-Liste ist nach Kantonen aufgeteilt, dazu findest du Stadt-Varianten für grössere Zentren wie Zürich, Bern, Basel, Luzern und Genf. Die Tipps-Artikel gehen auf Schichtdienst, PTBS-Umgang, Alleinerziehung im Schichtdienst und Dating trotz Pikett ein.',
    ],
  },
};

export function PillarLongIntro({ beruf }: { beruf: Beruf }) {
  const t = TEXTS[beruf];
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 border-t border-foreground/10 mt-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">{t.h2}</h2>
      <div className="space-y-4 text-foreground/75 leading-relaxed">
        {t.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
