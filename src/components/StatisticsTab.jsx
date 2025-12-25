import React from 'react'

function StatisticsTab({ teams }) {
  // Collect all players with their stats
  const allPlayers = []
  teams.forEach(team => {
    if (team.players) {
      team.players.forEach(player => {
        if (!player.stats) {
          player.stats = { goals: 0, yellowCards: 0, redCards: 0, saves: 0 }
        }
        allPlayers.push({
          ...player,
          teamName: team.name
        })
      })
    }
  })

  // Top Scorer
  const topScorer = allPlayers
    .filter(p => p.stats.goals > 0)
    .sort((a, b) => b.stats.goals - a.stats.goals)[0]

  // Most Yellow Cards
  const mostYellow = allPlayers
    .filter(p => p.stats.yellowCards > 0)
    .sort((a, b) => b.stats.yellowCards - a.stats.yellowCards)[0]

  // Most Red Cards
  const mostRed = allPlayers
    .filter(p => p.stats.redCards > 0)
    .sort((a, b) => b.stats.redCards - a.stats.redCards)[0]

  // Most Saves (only goalkeepers)
  const goalkeepers = allPlayers.filter(p => p.position === 'Goalkeeper')
  const mostSaves = goalkeepers
    .filter(p => p.stats.saves > 0)
    .sort((a, b) => b.stats.saves - a.stats.saves)[0]

  return (
    <div className="tab-content active">
      <section className="stats-section">
        <h2>Player Statistics</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>🏆 Top Scorer</h3>
            <div className="stat-content">
              {topScorer ? (
                <div className="stat-item">
                  <div className="stat-name">{topScorer.name} ({topScorer.teamName})</div>
                  <div className="stat-value">{topScorer.stats.goals} goals</div>
                </div>
              ) : (
                <p className="empty-message">No goals scored yet</p>
              )}
            </div>
          </div>

          <div className="stat-card">
            <h3>🟨 Most Yellow Cards</h3>
            <div className="stat-content">
              {mostYellow ? (
                <div className="stat-item">
                  <div className="stat-name">{mostYellow.name} ({mostYellow.teamName})</div>
                  <div className="stat-value">{mostYellow.stats.yellowCards} cards</div>
                </div>
              ) : (
                <p className="empty-message">No yellow cards yet</p>
              )}
            </div>
          </div>

          <div className="stat-card">
            <h3>🟥 Most Red Cards</h3>
            <div className="stat-content">
              {mostRed ? (
                <div className="stat-item">
                  <div className="stat-name">{mostRed.name} ({mostRed.teamName})</div>
                  <div className="stat-value">{mostRed.stats.redCards} cards</div>
                </div>
              ) : (
                <p className="empty-message">No red cards yet</p>
              )}
            </div>
          </div>

          <div className="stat-card">
            <h3>🧤 Most Saves</h3>
            <div className="stat-content">
              {mostSaves ? (
                <div className="stat-item">
                  <div className="stat-name">{mostSaves.name} ({mostSaves.teamName})</div>
                  <div className="stat-value">{mostSaves.stats.saves} saves</div>
                </div>
              ) : (
                <p className="empty-message">No saves recorded yet</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StatisticsTab

