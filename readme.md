# CubeTrack

CubeTrack is a web application designed for speedcubers to track, analyze, and improve their solving times, hosted by a combination of Netlify and a self-owned Ubuntu Server. As a cuber who loves getting lost for hours in big cubes, I built CubeTrack because existing timers didn't cut it: they keep your stats trapped on one device and record every accidental 0.2s "misfire" as a real solve. I wanted a modern platform that provides a single source of truth for my stats.

## Core Features

* **Precise Timing Engine:** A custom-built timer hook with support for inspection phases and hold-to-start mechanics.
* **Secure Session Management:** A dual-token (Access/Refresh) system that enables a "Stay Logged In" feature for 7 days without compromising security.
* **Performance Analytics:** Automatic calculation of personal bests (PB), Average of 5 (Ao5), and Average of 12 (Ao12).
* **Dynamic Scramble Generation:** Algorithmic scramble generation for the 3x3 puzzle type.
* **User Discovery:** Real-time search functionality to view other cubers' profiles and statistics.

## Tech Stack

### Frontend

* **React 18 (TypeScript):** For a type-safe, component-driven UI.
* **Tailwind CSS:** For a high-performance, utility-first design system.
* **Framer Motion:** Used to handle smooth UI transitions and timer state visualizations.
* **Lucide React:** Consistent iconography across the dashboard.

### Backend & Infrastructure

* **Spring Boot 3.x:** Providing a RESTful API layer.
* **Spring Security:** Configured with a stateless filter chain for JWT-based authentication.
* **PostgreSQL:** Relational database for structured solve data.
* **Docker:** The database is containerized for environment consistency and ease of deployment.
* **Docker Volumes:** Implemented persistent volume mapping to ensure solve data and user profiles survive container restarts or updates on the Ubuntu server.

---

## Security Implementation

* **Argon2id Hashing:** Instead of standard BCrypt, this project uses the Argon2id algorithm (via BouncyCastle) for password storage. Argon2id is the winner of the Password Hashing Competition and provides superior resistance against GPU-based cracking attacks.
* **JWT Architecture:** * **Access Tokens:** Short-lived tokens (15m) stored in application memory to mitigate XSS risks.
* **Refresh Tokens:** Long-lived tokens (7 days) stored in `HttpOnly`, `Secure`, and `SameSite=Strict` cookies. This setup prevents JavaScript access to the session, effectively neutralizing XSS-based session hijacking.


* **Rate Limiting:** Integrated **Bucket4j** on authentication endpoints (`/login`, `/register`). This prevents brute-force attacks by limiting the number of requests per IP address using a token-bucket algorithm.
* **CORS Policy:** Strict Cross-Origin Resource Sharing (CORS) configuration to ensure only the authorized frontend domain can interact with the API.
