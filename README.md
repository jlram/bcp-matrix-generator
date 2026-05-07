# Team matrix generator

A Node.js script that reads JSON exports of players and teams, groups factions by team, and writes a formatted Excel file (`matrix.xlsx`).

## Requirements

- [Node.js](https://nodejs.org/) (LTS recommended)

## Setup

From the project directory:

```bash
npm install
```

## Data source

The JSON in `players.json` and `teamplayers.json` matches the payloads from **Best Coast Pairings** (BCP): the **`players`** and **`teamplayers`** endpoints (same names as the files). Fetch or export those responses for your event, then save them next to the script with the filenames above.

## Usage

Place the data files next to the script:

- `players.json` — must include an `active` array of players; each player may have `teamPlayerId` and `faction.name`. Same structure as the BCP **players** response.
- `teamplayers.json` — must include an `active` array of teams (`id`, `name`). Same structure as the BCP **teamplayers** response.

Run:

```bash
node matrix-generator.js
```

This creates (or overwrites) `matrix.xlsx` in the same folder. The workbook has one worksheet named **Teams**: each section starts with the team name on the first row (styled as a header), followed by that team’s player factions.

## Code overview

| Function        | Description |
|-----------------|-------------|
| `loadData`      | Loads and parses `players.json` and `teamplayers.json`. |
| `processData`   | Builds a map from team name to list of faction names. |
| `exportToExcel` | Writes the Excel workbook to `matrix.xlsx`. |

Players without `teamPlayerId` are skipped. Missing team or faction labels fall back to `No team` and `No faction` (defaults in the script).

## Dependencies

- **xlsx** — read/write Excel files.

## License

Internal / personal project use.
