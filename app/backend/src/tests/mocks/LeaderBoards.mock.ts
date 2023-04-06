const MatcherMock = [
    {
      "id": 1,
      "homeTeamId": 1,
      "homeTeamGoals": 4,
      "awayTeamId": 2,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": 1,
      "awayTeam": 2
    },
    {
      "id": 2,
      "homeTeamId": 2,
      "homeTeamGoals": 1,
      "awayTeamId": 1,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": 2,
      "awayTeam": 1
    },
];


const getAllResultMock = [
      {
        name: 'Bahia',
        efficiency: '66.67',
        goalsBalance: 3,
        goalsFavor: 5,
        goalsOwn: 2,
        totalDraws: 1,
        totalGames: 2,
        totalLosses: 0,
        totalPoints: 4,
        totalVictories: 1
      },
      {
        name: 'Fluminense',
        totalPoints: 1,
        totalGames: 2,
        totalVictories: 0,
        totalDraws: 1,
        totalLosses: 1,
        goalsFavor: 2,
        goalsOwn: 5,
        goalsBalance: -3,
        efficiency: '16.67'
      },
]
const teamsMock = [
    {
        id: 1,
        teamName: 'Bahia',
    },
    {
        id: 2,
        teamName: 'Fluminense',
    },
]
export {getAllResultMock, teamsMock, MatcherMock};