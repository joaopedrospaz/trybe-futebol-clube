 const getALlMock = [
    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 1,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "id": 16,
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "id": 8,
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeamId": 9,
      "homeTeamGoals": 1,
      "awayTeamId": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "id": 9,
        "teamName": "Internacional"
      },
      "awayTeam": {
        "id": 14,
        "teamName": "Santos"
      }
    },
    {
      "id": 3,
      "homeTeamId": 11,
      "homeTeamGoals": 1,
      "awayTeamId": 14,
      "awayTeamGoals": 1,
      "inProgress": true,
      "homeTeam": {
        "id": 9,
        "teamName": "Internacional"
      },
      "awayTeam": {
        "id": 14,
        "teamName": "Santos"
      }
    },
];
 const inProgressFalseMock = [
    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 1,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "id": 16,
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "id": 8,
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeamId": 9,
      "homeTeamGoals": 1,
      "awayTeamId": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "id": 9,
        "teamName": "Internacional"
      },
      "awayTeam": {
        "id": 14,
        "teamName": "Santos"
      }
    },
];
 const inProgressTrueMock = [
  {
    "id": 3,
    "homeTeamId": 11,
    "homeTeamGoals": 1,
    "awayTeamId": 14,
    "awayTeamGoals": 1,
    "inProgress": true,
    "homeTeam": {
      "id": 9,
      "teamName": "Internacional"
    },
    "awayTeam": {
      "id": 14,
      "teamName": "Santos"
    }
  },
];

const updateScoreMock = {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
};

const invalidPostoMatcherMock = {
    "homeTeamId": 6, 
    "awayTeamId": 6, 
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
};

const invalidPostHome = {
    "homeTeamId": 6, 
    "awayTeamId": 10, 
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
}
const invalidPostAway = {
    "homeTeamId": 9, 
    "awayTeamId": 14, 
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
}
const validPost = {
    "homeTeamId": 9, 
    "awayTeamId": 10, 
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
}
const findHomeTeam = {
    id: 9,
    teamName: 'Bahia'
}
const findAwayTeam = {
    id: 10,
    teamName: 'Real Madrid'
}

const PostResult = {
    id: 99,
    homeTeamId: 9, 
    awayTeamId: 10, 
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true
}
export { inProgressFalseMock, 
  updateScoreMock,
  invalidPostoMatcherMock,
  invalidPostHome,
  findHomeTeam,
  findAwayTeam,
  invalidPostAway,
  validPost, 
  PostResult,
  inProgressTrueMock };
export default getALlMock;