import { supabase, USE_MOCK_DATA } from './supabase.js';

/*=============================================
=            Mock Database                    =
=============================================*/
export const DUMMY_MOVIES = [
    {
        id: 1,
        title: "Inception",
        genre: "Sci-Fi",
        language: "English",
        duration: "2h 28m",
        rating: 4.8,
        release_date: "2026-02-15",
        poster_url: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkYSBNoE3HCEBCCy.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkYSBNoE3HCEBCCy.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 2,
        title: "The Dark Knight",
        genre: "Action",
        language: "English",
        duration: "2h 32m",
        rating: 4.9,
        release_date: "2025-09-15",
        poster_url: "https://image.tmdb.org/t/p/w500/qJ2R1w25s1F6bC2V1qZ4L8G6U.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/qJ2R1w25s1F6bC2V1qZ4L8G6U.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 3,
        title: "Interstellar",
        genre: "Sci-Fi",
        language: "English",
        duration: "2h 49m",
        rating: 4.7,
        release_date: "2026-02-15",
        poster_url: "https://image.tmdb.org/t/p/w500/gEU2QlsUUHXcmpb2pG35nZvxu0.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/gEU2QlsUUHXcmpb2pG35nZvxu0.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 4,
        title: "Avatar: The Way of Water",
        genre: "Action",
        language: "English",
        duration: "3h 12m",
        rating: 4.5,
        release_date: "2025-12-15",
        poster_url: "https://image.tmdb.org/t/p/w500/t6HIqrBUCPCcq6x7QyHIcZ4U1H.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/t6HIqrBUCPCcq6x7QyHIcZ4U1H.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 5,
        title: "Avengers: Endgame",
        genre: "Action",
        language: "English",
        duration: "3h 01m",
        rating: 4.6,
        release_date: "2026-07-15",
        poster_url: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl5t5HqG.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl5t5HqG.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 6,
        title: "Spider-Man: No Way Home",
        genre: "Action",
        language: "English",
        duration: "2h 28m",
        rating: 4.7,
        release_date: "2026-09-15",
        poster_url: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1R80vEMd5bFmZ3.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1R80vEMd5bFmZ3.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 7,
        title: "Dune",
        genre: "Sci-Fi",
        language: "English",
        duration: "2h 35m",
        rating: 4.6,
        release_date: "2024-02-15",
        poster_url: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 8,
        title: "Oppenheimer",
        genre: "Drama",
        language: "English",
        duration: "3h 00m",
        rating: 4.8,
        release_date: "2026-09-15",
        poster_url: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 9,
        title: "Dangal",
        genre: "Drama",
        language: "Hindi",
        duration: "2h 41m",
        rating: 4.8,
        release_date: "2026-09-15",
        poster_url: "https://image.tmdb.org/t/p/w500/2LFsJbV2vJ9u5Ew3H1T0x1M21dK.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/2LFsJbV2vJ9u5Ew3H1T0x1M21dK.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 10,
        title: "Pathaan",
        genre: "Action",
        language: "Hindi",
        duration: "2h 26m",
        rating: 4.4,
        release_date: "2024-07-15",
        poster_url: "https://image.tmdb.org/t/p/w500/m1bOtoEIfT2nQ9mI97KxO03rUDB.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/m1bOtoEIfT2nQ9mI97KxO03rUDB.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 11,
        title: "3 Idiots",
        genre: "Comedy",
        language: "Hindi",
        duration: "2h 50m",
        rating: 4.9,
        release_date: "2025-08-15",
        poster_url: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79zHn53.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79zHn53.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 12,
        title: "Jawan",
        genre: "Action",
        language: "Hindi",
        duration: "2h 49m",
        rating: 4.5,
        release_date: "2024-02-15",
        poster_url: "https://image.tmdb.org/t/p/w500/jILeVkOBZq2wL1pM0Eis5Q48WNJ.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/jILeVkOBZq2wL1pM0Eis5Q48WNJ.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 13,
        title: "Sholay",
        genre: "Action",
        language: "Hindi",
        duration: "3h 24m",
        rating: 4.9,
        release_date: "2024-11-15",
        poster_url: "https://image.tmdb.org/t/p/w500/5lyA4S0fM2b8wL4QYx1wIqY4U9T.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/5lyA4S0fM2b8wL4QYx1wIqY4U9T.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 14,
        title: "Animal",
        genre: "Action",
        language: "Hindi",
        duration: "3h 21m",
        rating: 4.3,
        release_date: "2026-01-15",
        poster_url: "https://image.tmdb.org/t/p/w500/kZ1hQExxRtv4Xwio1JvF06J6AAn.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/kZ1hQExxRtv4Xwio1JvF06J6AAn.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 15,
        title: "PK",
        genre: "Comedy",
        language: "Hindi",
        duration: "2h 33m",
        rating: 4.7,
        release_date: "2024-03-15",
        poster_url: "https://image.tmdb.org/t/p/w500/9kOkjHlBcbKjX21eE8P2vCgJ6bU.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/9kOkjHlBcbKjX21eE8P2vCgJ6bU.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 16,
        title: "KGF: Chapter 2",
        genre: "Action",
        language: "Hindi",
        duration: "2h 48m",
        rating: 4.6,
        release_date: "2024-02-15",
        poster_url: "https://image.tmdb.org/t/p/w500/gS65i33l8zEDzHnsG9CqAvXb0Yf.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/gS65i33l8zEDzHnsG9CqAvXb0Yf.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 17,
        title: "Sairat",
        genre: "Romance",
        language: "Marathi",
        duration: "2h 54m",
        rating: 4.9,
        release_date: "2024-06-15",
        poster_url: "https://image.tmdb.org/t/p/w500/81g73r9r2gLzBvG062R1gQ2tWJ7.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/81g73r9r2gLzBvG062R1gQ2tWJ7.jpg",
        description: "An amazing Marathi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 18,
        title: "Natsamrat",
        genre: "Drama",
        language: "Marathi",
        duration: "2h 45m",
        rating: 4.8,
        release_date: "2026-02-15",
        poster_url: "https://image.tmdb.org/t/p/w500/vH1N92qBf4K4Q8yH0sT51X1d2V5.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/vH1N92qBf4K4Q8yH0sT51X1d2V5.jpg",
        description: "An amazing Marathi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 19,
        title: "Lai Bhaari",
        genre: "Action",
        language: "Marathi",
        duration: "2h 30m",
        rating: 4.5,
        release_date: "2026-11-15",
        poster_url: "https://image.tmdb.org/t/p/w500/r23X4rY6pW9S7c9E8y2I1H5D6fM.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/r23X4rY6pW9S7c9E8y2I1H5D6fM.jpg",
        description: "An amazing Marathi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 20,
        title: "Katyar Kaljat Ghusali",
        genre: "Drama",
        language: "Marathi",
        duration: "2h 42m",
        rating: 4.7,
        release_date: "2026-05-15",
        poster_url: "https://image.tmdb.org/t/p/w500/u3T6R1eD8b1u0i8M9hD0tE2k4C6.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/u3T6R1eD8b1u0i8M9hD0tE2k4C6.jpg",
        description: "An amazing Marathi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 21,
        title: "Timepass",
        genre: "Comedy",
        language: "Marathi",
        duration: "2h 20m",
        rating: 4.6,
        release_date: "2026-05-15",
        poster_url: "https://image.tmdb.org/t/p/w500/f8s5l6wR4k1U9rM7P2u8E7u4T2W.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/f8s5l6wR4k1U9rM7P2u8E7u4T2W.jpg",
        description: "An amazing Marathi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 22,
        title: "Fandry",
        genre: "Drama",
        language: "Marathi",
        duration: "1h 43m",
        rating: 4.9,
        release_date: "2024-02-15",
        poster_url: "https://image.tmdb.org/t/p/w500/e3W2d5U7H9S9P2E9hD0tE2k4C6.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/e3W2d5U7H9S9P2E9hD0tE2k4C6.jpg",
        description: "An amazing Marathi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 23,
        title: "Duniyadari",
        genre: "Comedy",
        language: "Marathi",
        duration: "2h 15m",
        rating: 4.7,
        release_date: "2025-05-15",
        poster_url: "https://image.tmdb.org/t/p/w500/d7F8l1U5S6u8S9P2E9hD0tE2C.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/d7F8l1U5S6u8S9P2E9hD0tE2C.jpg",
        description: "An amazing Marathi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 24,
        title: "Ved",
        genre: "Romance",
        language: "Marathi",
        duration: "2h 28m",
        rating: 4.5,
        release_date: "2024-03-15",
        poster_url: "https://image.tmdb.org/t/p/w500/j69S8B6vD2G7Z8qM9hD0tE2k4C6.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/j69S8B6vD2G7Z8qM9hD0tE2k4C6.jpg",
        description: "An amazing Marathi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 25,
        title: "Inception 2",
        genre: "Sci-Fi",
        language: "English",
        duration: "2h 28m",
        rating: 4.6,
        release_date: "2024-09-15",
        poster_url: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkYSBNoE3HCEBCCy.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkYSBNoE3HCEBCCy.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 26,
        title: "The Dark Knight 2",
        genre: "Action",
        language: "English",
        duration: "2h 32m",
        rating: 4.7,
        release_date: "2026-12-15",
        poster_url: "https://image.tmdb.org/t/p/w500/qJ2R1w25s1F6bC2V1qZ4L8G6U.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/qJ2R1w25s1F6bC2V1qZ4L8G6U.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 27,
        title: "Interstellar 2",
        genre: "Sci-Fi",
        language: "English",
        duration: "2h 49m",
        rating: 4.5,
        release_date: "2025-06-15",
        poster_url: "https://image.tmdb.org/t/p/w500/gEU2QlsUUHXcmpb2pG35nZvxu0.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/gEU2QlsUUHXcmpb2pG35nZvxu0.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 28,
        title: "Avatar: The Way of Water 2",
        genre: "Action",
        language: "English",
        duration: "3h 12m",
        rating: 4.3,
        release_date: "2025-04-15",
        poster_url: "https://image.tmdb.org/t/p/w500/t6HIqrBUCPCcq6x7QyHIcZ4U1H.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/t6HIqrBUCPCcq6x7QyHIcZ4U1H.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 29,
        title: "Avengers: Endgame 2",
        genre: "Action",
        language: "English",
        duration: "3h 01m",
        rating: 4.4,
        release_date: "2026-07-15",
        poster_url: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl5t5HqG.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl5t5HqG.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 30,
        title: "Spider-Man: No Way Home 2",
        genre: "Action",
        language: "English",
        duration: "2h 28m",
        rating: 4.5,
        release_date: "2026-05-15",
        poster_url: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1R80vEMd5bFmZ3.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1R80vEMd5bFmZ3.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 31,
        title: "Dune 2",
        genre: "Sci-Fi",
        language: "English",
        duration: "2h 35m",
        rating: 4.4,
        release_date: "2026-05-15",
        poster_url: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 32,
        title: "Oppenheimer 2",
        genre: "Drama",
        language: "English",
        duration: "3h 00m",
        rating: 4.6,
        release_date: "2025-10-15",
        poster_url: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 33,
        title: "Dangal 2",
        genre: "Drama",
        language: "Hindi",
        duration: "2h 41m",
        rating: 4.6,
        release_date: "2025-09-15",
        poster_url: "https://image.tmdb.org/t/p/w500/2LFsJbV2vJ9u5Ew3H1T0x1M21dK.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/2LFsJbV2vJ9u5Ew3H1T0x1M21dK.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 34,
        title: "Pathaan 2",
        genre: "Action",
        language: "Hindi",
        duration: "2h 26m",
        rating: 4.2,
        release_date: "2024-05-15",
        poster_url: "https://image.tmdb.org/t/p/w500/m1bOtoEIfT2nQ9mI97KxO03rUDB.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/m1bOtoEIfT2nQ9mI97KxO03rUDB.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 35,
        title: "3 Idiots 2",
        genre: "Comedy",
        language: "Hindi",
        duration: "2h 50m",
        rating: 4.7,
        release_date: "2024-05-15",
        poster_url: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79zHn53.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79zHn53.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 36,
        title: "Jawan 2",
        genre: "Action",
        language: "Hindi",
        duration: "2h 49m",
        rating: 4.3,
        release_date: "2024-05-15",
        poster_url: "https://image.tmdb.org/t/p/w500/jILeVkOBZq2wL1pM0Eis5Q48WNJ.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/jILeVkOBZq2wL1pM0Eis5Q48WNJ.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 37,
        title: "Sholay 2",
        genre: "Action",
        language: "Hindi",
        duration: "3h 24m",
        rating: 4.7,
        release_date: "2026-04-15",
        poster_url: "https://image.tmdb.org/t/p/w500/5lyA4S0fM2b8wL4QYx1wIqY4U9T.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/5lyA4S0fM2b8wL4QYx1wIqY4U9T.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 38,
        title: "Animal 2",
        genre: "Action",
        language: "Hindi",
        duration: "3h 21m",
        rating: 4.1,
        release_date: "2025-11-15",
        poster_url: "https://image.tmdb.org/t/p/w500/kZ1hQExxRtv4Xwio1JvF06J6AAn.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/kZ1hQExxRtv4Xwio1JvF06J6AAn.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 39,
        title: "PK 2",
        genre: "Comedy",
        language: "Hindi",
        duration: "2h 33m",
        rating: 4.5,
        release_date: "2024-05-15",
        poster_url: "https://image.tmdb.org/t/p/w500/9kOkjHlBcbKjX21eE8P2vCgJ6bU.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/9kOkjHlBcbKjX21eE8P2vCgJ6bU.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 40,
        title: "KGF: Chapter 2 2",
        genre: "Action",
        language: "Hindi",
        duration: "2h 48m",
        rating: 4.4,
        release_date: "2025-04-15",
        poster_url: "https://image.tmdb.org/t/p/w500/gS65i33l8zEDzHnsG9CqAvXb0Yf.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/gS65i33l8zEDzHnsG9CqAvXb0Yf.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 41,
        title: "Sairat 2",
        genre: "Romance",
        language: "Marathi",
        duration: "2h 54m",
        rating: 4.7,
        release_date: "2026-07-15",
        poster_url: "https://image.tmdb.org/t/p/w500/81g73r9r2gLzBvG062R1gQ2tWJ7.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/81g73r9r2gLzBvG062R1gQ2tWJ7.jpg",
        description: "An amazing Marathi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 42,
        title: "Natsamrat 2",
        genre: "Drama",
        language: "Marathi",
        duration: "2h 45m",
        rating: 4.6,
        release_date: "2024-10-15",
        poster_url: "https://image.tmdb.org/t/p/w500/vH1N92qBf4K4Q8yH0sT51X1d2V5.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/vH1N92qBf4K4Q8yH0sT51X1d2V5.jpg",
        description: "An amazing Marathi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 43,
        title: "Lai Bhaari 2",
        genre: "Action",
        language: "Marathi",
        duration: "2h 30m",
        rating: 4.3,
        release_date: "2025-10-15",
        poster_url: "https://image.tmdb.org/t/p/w500/r23X4rY6pW9S7c9E8y2I1H5D6fM.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/r23X4rY6pW9S7c9E8y2I1H5D6fM.jpg",
        description: "An amazing Marathi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 44,
        title: "Katyar Kaljat Ghusali 2",
        genre: "Drama",
        language: "Marathi",
        duration: "2h 42m",
        rating: 4.5,
        release_date: "2025-12-15",
        poster_url: "https://image.tmdb.org/t/p/w500/u3T6R1eD8b1u0i8M9hD0tE2k4C6.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/u3T6R1eD8b1u0i8M9hD0tE2k4C6.jpg",
        description: "An amazing Marathi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 45,
        title: "Timepass 2",
        genre: "Comedy",
        language: "Marathi",
        duration: "2h 20m",
        rating: 4.4,
        release_date: "2026-08-15",
        poster_url: "https://image.tmdb.org/t/p/w500/f8s5l6wR4k1U9rM7P2u8E7u4T2W.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/f8s5l6wR4k1U9rM7P2u8E7u4T2W.jpg",
        description: "An amazing Marathi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 46,
        title: "Fandry 2",
        genre: "Drama",
        language: "Marathi",
        duration: "1h 43m",
        rating: 4.7,
        release_date: "2025-02-15",
        poster_url: "https://image.tmdb.org/t/p/w500/e3W2d5U7H9S9P2E9hD0tE2k4C6.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/e3W2d5U7H9S9P2E9hD0tE2k4C6.jpg",
        description: "An amazing Marathi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 47,
        title: "Duniyadari 2",
        genre: "Comedy",
        language: "Marathi",
        duration: "2h 15m",
        rating: 4.5,
        release_date: "2026-04-15",
        poster_url: "https://image.tmdb.org/t/p/w500/d7F8l1U5S6u8S9P2E9hD0tE2C.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/d7F8l1U5S6u8S9P2E9hD0tE2C.jpg",
        description: "An amazing Marathi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 48,
        title: "Ved 2",
        genre: "Romance",
        language: "Marathi",
        duration: "2h 28m",
        rating: 4.3,
        release_date: "2026-08-15",
        poster_url: "https://image.tmdb.org/t/p/w500/j69S8B6vD2G7Z8qM9hD0tE2k4C6.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/j69S8B6vD2G7Z8qM9hD0tE2k4C6.jpg",
        description: "An amazing Marathi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 49,
        title: "Inception 3",
        genre: "Sci-Fi",
        language: "English",
        duration: "2h 28m",
        rating: 4.6,
        release_date: "2025-02-15",
        poster_url: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkYSBNoE3HCEBCCy.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkYSBNoE3HCEBCCy.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 50,
        title: "The Dark Knight 3",
        genre: "Action",
        language: "English",
        duration: "2h 32m",
        rating: 4.7,
        release_date: "2024-06-15",
        poster_url: "https://image.tmdb.org/t/p/w500/qJ2R1w25s1F6bC2V1qZ4L8G6U.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/qJ2R1w25s1F6bC2V1qZ4L8G6U.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 51,
        title: "Interstellar 3",
        genre: "Sci-Fi",
        language: "English",
        duration: "2h 49m",
        rating: 4.5,
        release_date: "2026-08-15",
        poster_url: "https://image.tmdb.org/t/p/w500/gEU2QlsUUHXcmpb2pG35nZvxu0.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/gEU2QlsUUHXcmpb2pG35nZvxu0.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 52,
        title: "Avatar: The Way of Water 3",
        genre: "Action",
        language: "English",
        duration: "3h 12m",
        rating: 4.3,
        release_date: "2025-01-15",
        poster_url: "https://image.tmdb.org/t/p/w500/t6HIqrBUCPCcq6x7QyHIcZ4U1H.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/t6HIqrBUCPCcq6x7QyHIcZ4U1H.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 53,
        title: "Avengers: Endgame 3",
        genre: "Action",
        language: "English",
        duration: "3h 01m",
        rating: 4.4,
        release_date: "2026-12-15",
        poster_url: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl5t5HqG.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl5t5HqG.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 54,
        title: "Spider-Man: No Way Home 3",
        genre: "Action",
        language: "English",
        duration: "2h 28m",
        rating: 4.5,
        release_date: "2025-10-15",
        poster_url: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1R80vEMd5bFmZ3.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1R80vEMd5bFmZ3.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 55,
        title: "Dune 3",
        genre: "Sci-Fi",
        language: "English",
        duration: "2h 35m",
        rating: 4.4,
        release_date: "2026-11-15",
        poster_url: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 56,
        title: "Oppenheimer 3",
        genre: "Drama",
        language: "English",
        duration: "3h 00m",
        rating: 4.6,
        release_date: "2024-05-15",
        poster_url: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        description: "An amazing English cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 57,
        title: "Dangal 3",
        genre: "Drama",
        language: "Hindi",
        duration: "2h 41m",
        rating: 4.6,
        release_date: "2025-01-15",
        poster_url: "https://image.tmdb.org/t/p/w500/2LFsJbV2vJ9u5Ew3H1T0x1M21dK.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/2LFsJbV2vJ9u5Ew3H1T0x1M21dK.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 58,
        title: "Pathaan 3",
        genre: "Action",
        language: "Hindi",
        duration: "2h 26m",
        rating: 4.2,
        release_date: "2025-07-15",
        poster_url: "https://image.tmdb.org/t/p/w500/m1bOtoEIfT2nQ9mI97KxO03rUDB.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/m1bOtoEIfT2nQ9mI97KxO03rUDB.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 59,
        title: "3 Idiots 3",
        genre: "Comedy",
        language: "Hindi",
        duration: "2h 50m",
        rating: 4.7,
        release_date: "2025-11-15",
        poster_url: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79zHn53.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79zHn53.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    },
    {
        id: 60,
        title: "Jawan 3",
        genre: "Action",
        language: "Hindi",
        duration: "2h 49m",
        rating: 4.3,
        release_date: "2026-08-15",
        poster_url: "https://image.tmdb.org/t/p/w500/jILeVkOBZq2wL1pM0Eis5Q48WNJ.jpg",
        banner_url: "https://image.tmdb.org/t/p/w500/jILeVkOBZq2wL1pM0Eis5Q48WNJ.jpg",
        description: "An amazing Hindi cinematic experience featuring stunning performances.",
        trailer: "#"
    }
];

/*=============================================
=            Movies Page Logic                =
=============================================*/
const moviesContainer = document.getElementById('moviesContainer');
const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');
const languageFilter = document.getElementById('languageFilter');
const sortFilter = document.getElementById('sortFilter');
const loading = document.getElementById('loading');

let allMovies = [];

// Initialize if on movies page
if (moviesContainer) {
    document.addEventListener('DOMContentLoaded', fetchMovies);
    
    // Event Listeners for filters
    searchInput.addEventListener('input', applyFilters);
    genreFilter.addEventListener('change', applyFilters);
    languageFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
}

async function fetchMovies() {
    showLoading(true);
    try {
        if (USE_MOCK_DATA) {
            // Simulate network delay for premium feel
            await new Promise(r => setTimeout(r, 800));
            allMovies = [...DUMMY_MOVIES];
        } else {
            const { data, error } = await supabase.from('movies').select('*');
            if (error) throw error;
            allMovies = data || [];
            
            // Fallback to dummy if empty DB just for presentation
            if(allMovies.length === 0) {
                allMovies = [...DUMMY_MOVIES];
            }
        }
        
        applyFilters(); // Renders the movies initially based on default filters
    } catch (error) {
        console.error("Error fetching movies:", error);
        if(window.showToast) window.showToast("Failed to load movies. Showing offline catalog.", "error");
        allMovies = [...DUMMY_MOVIES];
        applyFilters();
    } finally {
        showLoading(false);
    }
}

function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;
    const selectedLanguage = languageFilter.value;
    const sortMethod = sortFilter.value;

    let filtered = allMovies.filter(movie => {
        const matchSearch = movie.title.toLowerCase().includes(searchTerm);
        const matchGenre = selectedGenre === 'all' || movie.genre === selectedGenre;
        const matchLang = selectedLanguage === 'all' || movie.language === selectedLanguage;
        return matchSearch && matchGenre && matchLang;
    });

    // Sorting
    if (sortMethod === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortMethod === 'name') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else {
        // latest (by release date)
        filtered.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    }

    renderMovies(filtered);
}

function renderMovies(movies) {
    moviesContainer.innerHTML = '';
    
    if (movies.length === 0) {
        moviesContainer.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fa-solid fa-film empty-icon"></i>
                <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">No movies found</h3>
                <p class="text-secondary">Try adjusting your search or filters.</p>
            </div>
        `;
        return;
    }

    movies.forEach((movie, index) => {
        // Stagger animation classes (1 to 5)
        const staggerClass = `stagger-${(index % 5) + 1}`;
        
        const card = document.createElement('div');
        card.className = `movie-card reveal active ${staggerClass}`;
        // Slight delay logic via DOM
        card.style.animationDelay = `${(index % 10) * 0.05}s`;
        
        card.onclick = () => window.location.href = `movie-details.html?id=${movie.id}`;
        const posterImg = movie.poster || movie.poster_url;
        card.innerHTML = `
            <div class="movie-card-img-wrap">
                <img src="${posterImg}" alt="${movie.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=600&auto=format&fit=crop'">
            </div>
            <div class="movie-info">
                <h3 class="movie-title" title="${movie.title}">${movie.title}</h3>
                <div class="movie-meta">
                    <span>${movie.genre} • ${movie.duration}</span>
                    <span class="rating"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
                </div>
            </div>
        `;
        
        moviesContainer.appendChild(card);
    });
}

function showLoading(show) {
    if (loading) loading.style.display = show ? 'block' : 'none';
    if (moviesContainer) moviesContainer.style.display = show ? 'none' : 'grid';
}

// Helper to get a single movie (used by other pages)
export async function getMovieById(id) {
    if (USE_MOCK_DATA) {
        return DUMMY_MOVIES.find(m => m.id == id);
    } else {
        const { data, error } = await supabase.from('movies').select('*').eq('id', id).single();
        if (error || !data) {
            // Fallback to dummy
            return DUMMY_MOVIES.find(m => m.id == id);
        }
        return data;
    }
}
