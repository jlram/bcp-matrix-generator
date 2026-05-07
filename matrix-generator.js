const fs = require("fs");
const XLSX = require("xlsx");

function loadData() {
  const playersRaw = JSON.parse(fs.readFileSync("players.json", "utf8"));
  const teamsRaw = JSON.parse(fs.readFileSync("teamplayers.json", "utf8"));

  const players = playersRaw.active || [];
  const teams = teamsRaw.active || [];

  return { players, teams };
}

function processData(players, teams) {
  const teamMap = {};
  teams.forEach(team => {
    teamMap[team.id] = team.name;
  });

  const factionsByTeam = {};

  players.forEach(player => {
    if (!player.teamPlayerId) return;

    const teamName = teamMap[player.teamPlayerId] || "No team";
    const factionName = player.faction?.name || "No faction";

    if (!factionsByTeam[teamName]) {
      factionsByTeam[teamName] = [];
    }

    factionsByTeam[teamName].push(factionName);
  });

  return factionsByTeam;
}

function exportToExcel(factionsByTeam) {
  const wb = XLSX.utils.book_new();

  const rows = [];

  Object.entries(factionsByTeam).forEach(([teamName, factions]) => {
    rows.push([teamName]);

    factions.forEach(factionName => {
      rows.push([factionName]);
    });

    rows.push([]);
  });

  const range = XLSX.utils.aoa_to_sheet(rows);

  Object.keys(range).forEach(cell => {
    if (cell.startsWith("A")) {
      const value = range[cell].v;

      if (value && factionsByTeam[value]) {
        range[cell].s = {
          fill: {
            fgColor: { rgb: "C6EFCE" }
          },
          font: {
            bold: true
          }
        };
      }
    }
  });

  XLSX.utils.book_append_sheet(wb, range, "Teams");

  XLSX.writeFile(wb, "matrix.xlsx");
}

function main() {
  const { players, teams } = loadData();
  const factionsByTeam = processData(players, teams);

  exportToExcel(factionsByTeam);
}

main();