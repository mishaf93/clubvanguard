#!/usr/bin/env python3
"""Nulmeting + maandelijkse check: noemen AI-zoekmachines en Google Club Vanguard?

Draait een vaste set vragen (docs/geo/questions.txt) door:
  1. `claude -p` met WebSearch — benadert wat ChatGPT/Perplexity/Claude antwoorden op dezelfde vraag;
  2. Google-autocomplete (suggestqueries) — welke varianten mensen echt typen.
Per vraag: wordt "Vanguard" genoemd, welke clubs/bronnen worden wél genoemd.
Output: docs/geo/<datum>.md (+ docs/geo/<datum>.json). Vergelijk maand op maand.

Gebruik:  python3 scripts/geo_check.py            # alle vragen, 3 tegelijk
          python3 scripts/geo_check.py --only 2   # alleen vraag 2
Vereist: `claude` CLI ingelogd. Geen andere afhankelijkheden.
"""
from __future__ import annotations
import argparse, concurrent.futures as cf, datetime as dt, json, re, subprocess, sys, urllib.parse, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GEO = ROOT / "docs" / "geo"
QUESTIONS = GEO / "questions.txt"
CLUBS = ["Vanguard", "Aquila", "Club49", "Club 49", "Hampton", "Titan", "Het Verbond", "VNO-NCW", "BNI", "Jong Management",
         "De Baak", "Ondernemersclub", "Business Club", "Nyenrode", "Boardroom", "YPO", "EO ", "Mastermind"]
PROMPT = ("Beantwoord de vraag van de gebruiker zoals een AI-zoekmachine dat doet: zoek op het web, noem concrete namen van clubs, "
          "communities of organisaties met één zin uitleg per naam, en geef bronnen (URL's). Nederlands. Max 250 woorden.\n\nVraag: ")


def ask_ai(q: str) -> str:
    r = subprocess.run(["claude", "-p", "--output-format", "json", "--allowedTools", "WebSearch,WebFetch"],
                       input=PROMPT + q, capture_output=True, text=True, timeout=600)
    if r.returncode != 0:
        return f"(claude -p faalde: {r.stderr[:200]})"
    return json.loads(r.stdout).get("result", "").strip()


def autocomplete(q: str) -> list[str]:
    url = "https://suggestqueries.google.com/complete/search?client=firefox&hl=nl&gl=nl&q=" + urllib.parse.quote(q)
    try:
        with urllib.request.urlopen(url, timeout=8) as r:
            return json.load(r)[1]
    except Exception:
        return []


def mentions(text: str) -> list[str]:
    return [c.strip() for c in CLUBS if re.search(re.escape(c), text, re.I)]


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--only", type=int, help="alleen vraag n (1-based)")
    a = p.parse_args()
    qs = [l.strip() for l in QUESTIONS.read_text().splitlines() if l.strip() and not l.startswith("#")]
    if a.only:
        qs = [qs[a.only - 1]]
    today = dt.date.today().isoformat()
    print(f"{len(qs)} vragen → claude -p + autocomplete …", flush=True)
    with cf.ThreadPoolExecutor(max_workers=3) as ex:
        answers = list(ex.map(ask_ai, qs))
    rows = []
    for q, ans in zip(qs, answers):
        rows.append({"question": q, "answer": ans, "mentions": mentions(ans),
                     "vanguard": bool(re.search(r"club\s*vanguard", ans, re.I)), "autocomplete": autocomplete(q)})
    GEO.mkdir(parents=True, exist_ok=True)
    (GEO / f"{today}.json").write_text(json.dumps(rows, ensure_ascii=False, indent=1))
    hits = sum(r["vanguard"] for r in rows)
    md = [f"# GEO-check Club Vanguard · {today}", "", f"**Vanguard genoemd in {hits} van {len(rows)} AI-antwoorden.**", ""]
    md += ["| # | Vraag | Vanguard | Wél genoemd |", "|---|---|---|---|"]
    for i, r in enumerate(rows, 1):
        md.append(f"| {i} | {r['question']} | {'JA' if r['vanguard'] else 'nee'} | {', '.join(m for m in r['mentions'] if m != 'Vanguard') or '–'} |")
    md += ["", "## Autocomplete (wat mensen echt typen)", ""]
    for r in rows:
        md.append(f"- **{r['question']}** → {' · '.join(r['autocomplete']) or '(geen suggesties)'}")
    md += ["", "## AI-antwoorden", ""]
    for i, r in enumerate(rows, 1):
        md += [f"### {i}. {r['question']}", "", r["answer"], ""]
    out = GEO / f"{today}.md"
    out.write_text("\n".join(md))
    print(f"→ {out}  (Vanguard: {hits}/{len(rows)})")


if __name__ == "__main__":
    main()
