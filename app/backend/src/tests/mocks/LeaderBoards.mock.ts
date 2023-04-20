const MatcherMock = [
  {
    id: 1,
    teamName: 'Avaí',
    homeMatches: [
      {
        homeTeamId: 1,
        homeTeamGoals: 0,
        awayTeamId: 4,
        awayTeamGoals: 1,
        inProgress: false,
      }
    ],
    awayMatches: [
      {
        homeTeamId: 4,
        homeTeamGoals: 0,
        awayTeamId: 1,
        awayTeamGoals: 0,
        inProgress: false,
      }
    ]
  },
    {
      id: 2,
      teamName: 'Bahia',
      homeMatches: [
        {
          homeTeamId: 2,
          homeTeamGoals: 4,
          awayTeamId: 3,
          awayTeamGoals: 1,
          inProgress: false,
        }
      ],
      awayMatches: [
        {
          homeTeamId: 3,
          homeTeamGoals: 1,
          awayTeamId: 2,
          awayTeamGoals: 1,
          inProgress: false,
        }
      ]
    },
    {
      id: 3,
      teamName: 'Flamengo',
      homeMatches: [
        {
          homeTeamId: 3,
          homeTeamGoals: 1,
          awayTeamId: 2,
          awayTeamGoals: 1,
          inProgress: false,
        }
      ],
      awayMatches: [
        {
          homeTeamId: 2,
          homeTeamGoals: 4,
          awayTeamId: 3,
          awayTeamGoals: 1,
          inProgress: false,
        }
      ],
    },
    {
      id: 4,
      teamName: 'Grêmio',
      homeMatches: [
        {
          homeTeamId: 4,
          homeTeamGoals: 0,
          awayTeamId: 1,
          awayTeamGoals: 0,
          inProgress: false,
        }
      ],
      awayMatches: [
        {
          homeTeamId: 1,
          homeTeamGoals: 0,
          awayTeamId: 4,
          awayTeamGoals: 1,
          inProgress: false,
        }
      ]
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
        efficiency: '66.67',
        goalsBalance: 1,
        goalsFavor: 1,
        goalsOwn: 0,
        name: 'Grêmio',
        totalDraws: 1,
        totalGames: 2,
        totalLosses: 0,
        totalPoints: 4,
        totalVictories: 1,
      },
      {
        goalsBalance: -1,
        goalsFavor: 0,
        goalsOwn: 1,
        name: 'Avaí',
        totalDraws: 1,
        totalGames: 2,
        totalLosses: 1,
        totalPoints: 1,
        totalVictories: 0,
        efficiency: '16.67'
      },
      {
        name: 'Flamengo',
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

const getHomeResultMock = [
  {
    name: 'Bahia',
    efficiency: '100.00',
    goalsBalance: 3,
    goalsFavor: 4,
    goalsOwn: 1,
    totalDraws: 0,
    totalGames: 1,
    totalLosses: 0,
    totalPoints: 3,
    totalVictories: 1
  },
  {
    name: 'Flamengo',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    goalsBalance: 0,
    efficiency: '33.33'
  },
  {
        efficiency: '33.33',
        goalsBalance: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        name: "Grêmio",
        totalDraws: 1,
        totalGames: 1,
        totalLosses: 0,
        totalPoints: 1,
        totalVictories: 0,
      },
      {
        efficiency: "0.00",
        goalsBalance: -1,
        goalsFavor: 0,
        goalsOwn: 1,
        name: "Avaí",
        totalDraws: 0,
        totalGames: 1,
        totalLosses: 1,
        totalPoints: 0,
        totalVictories: 0
      },
]
const getAwayResultMock = [
  {
    efficiency: '100.00',
    goalsBalance: 1,
    goalsFavor: 1,
    goalsOwn: 0,
    name: 'Grêmio',
    totalDraws: 0,
    totalGames: 1,
    totalLosses: 0,
    totalPoints: 3,
    totalVictories: 1,
  }, 
  {
    name: 'Bahia',
    efficiency: '33.33',
    goalsBalance: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    totalDraws: 1,
    totalGames: 1,
    totalLosses: 0,
    totalPoints: 1,
    totalVictories: 0
  },
  {
    efficiency: '33.33',
    goalsBalance: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    name: 'Avaí',
    totalDraws: 1,
    totalGames: 1,
    totalLosses: 0,
    totalPoints: 1,
    totalVictories: 0,
  },
  {
    name: 'Flamengo',
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 1,
    goalsOwn: 4,
    goalsBalance: -3,
    efficiency: '0.00'
  },
]

export {getAllResultMock, MatcherMock, getHomeResultMock, getAwayResultMock};