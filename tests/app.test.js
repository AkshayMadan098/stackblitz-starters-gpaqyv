const request = require('supertest');
const http = require('http');
const { getAllMovies } = require('../controllers');
const { app } = require('../index');

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllMovies:jest.fn(),
}));

let server;

beforeAll(async ()=>{
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async ()=>{
  server.close();
});

describe('Controller Function tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all movies', async () => {
    let mockedMovies = [
      {
        'movieId': 1,
        'title': 'Inception',
        'genre': 'Sci-Fi',
        'director': 'Christopher Nolan'
      },
      {
        'movieId': 2,
        'title': 'The Shawshank Redemption',
        'genre': 'Drama',
        'director': 'Frank Darabont'
      },
      {
        'movieId': 3,
        'title': 'The Godfather',
        'genre': 'Crime',
        'director': 'Francis Ford Coppola'
      }
    ];
    getAllMovies.mockReturnValue(mockedMovies);
    let result = getAllMovies();
    expect(result).toEqual(mockedMovies);
    expect(result.length).toBe(3);
  });

  describe('API Endpoint test', () => {

    it('GET /movies should get all employees', async () => {
      const result = await request(server).get('/movies');
      expect(result.status).toBe(200);
      expect(result.body).toEqual({
        movies : [
          {
            'movieId': 1,
            'title': 'Inception',
            'genre': 'Sci-Fi',
            'director': 'Christopher Nolan'
          },
          {
            'movieId': 2,
            'title': 'The Shawshank Redemption',
            'genre': 'Drama',
            'director': 'Frank Darabont'
          },
          {
            'movieId': 3,
            'title': 'The Godfather',
            'genre': 'Crime',
            'director': 'Francis Ford Coppola'
          }
        ]
      });
      expect(result.body.movies.length).toBe(3);
    });

    it('GET /movies/details/:id should get a movie by id', async () => {
      const result = await request(server).get('/movies/details/1');
      expect(result.status).toBe(200);
      expect(result.body).toEqual({
        movie : {
          'movieId': 1,
          'title': 'Inception',
          'genre': 'Sci-Fi',
          'director': 'Christopher Nolan'
        },
      });
    });
  });

});