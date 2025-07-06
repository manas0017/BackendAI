# wimbledon finals api

a production-ready rest api that provides information about wimbledon men's singles finals from 2010 to 2025.

## overview

this express.js api serves detailed information about wimbledon finals including champion, runner-up, score, number of sets, and tiebreak information for any requested year.

## project structure

```
wimbledon-api-express/
├── tests/
│   └── wimbledon.test.js     # test suite for the api
├── config/
│   └── index.js              # centralized configuration
├── data/
│   └── finals.js             # mock database with finals data
├── middleware/
│   ├── errorhandler.js       # centralized error handler
│   ├── logger.js             # request logger (morgan)
│   └── ratelimiter.js        # rate limiting configuration
├── routes/
│   └── wimbledon.js          # api route definitions
├── .env                      # environment variables
├── .gitignore               # files to ignore in git
├── package.json             # dependencies and scripts
└── server.js                # main server entry point
```

the api will be available at `http://localhost:3000`

## api documentation

### get wimbledon final information

**endpoint:** `GET /wimbledon`

**query parameters:**
- `year` (required): year of the wimbledon final (2010-2025)

**example request:**
```bash
curl "http://localhost:3000/wimbledon?year=2021"
```

**example response:**
```json
{
  "year": 2021,
  "champion": "novak djokovic",
  "runner_up": "matteo berrettini",
  "score": "6–7(4–7), 6–4, 6–4, 6–3",
  "sets": 4,
  "tiebreak": true
}
```

### error responses

**400 bad request - missing year:**
```json
{
  "error": "year parameter is required"
}
```

**400 bad request - invalid year:**
```json
{
  "error": "invalid year. please provide a year between 2010 and 2025"
}
```

**404 not found - no data:**
```json
{
  "error": "no data found for the specified year"
}
```

**429 too many requests:**
```json
{
  "error": "too many requests, please try again later"
}
```

## available scripts

- `npm start` - start the production server
- `npm run dev` - start the development server with hot reload
- `npm test` - run the test suite
- `npm run test:watch` - run tests in watch mode

## features

- **rate limiting**: protects against api abuse
- **error handling**: centralized error management
- **request logging**: morgan-based http request logging
- **input validation**: comprehensive parameter validation
- **testing**: complete test coverage
- **environment configuration**: configurable via environment variables

## data coverage

the api contains wimbledon men's singles finals data from **2010 to 2025**, including:
- champion and runner-up names
- match scores
- number of sets played
- tiebreak information

## testing

run the test suite to verify api functionality:

```bash
npm test
```

tests cover:
- valid year requests
- invalid year handling
- missing parameter validation
- error response formats
- rate limiting behavior

## environment variables

create a `.env` file with the following variables:

```env
PORT=3000
NODE_ENV=development
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```
