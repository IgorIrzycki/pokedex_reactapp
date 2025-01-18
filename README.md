# Pokedex App

A full-stack Pokémon application that allows users to view Pokémon, create custom teams, and manage their data. This app is built with **React** on the frontend and communicates with a backend API.

---

## Features

- **Authentication**:
  - Login and Registration functionality.
  - Protected routes for authenticated users.
- **Pokedex**:
  - View the list of the first 151 Pokémon.
  - Filter Pokémon by type.
  - Search for Pokémon by name.
  - View detailed stats and descriptions of individual Pokémon.
- **Team Management**:
  - Create custom Pokémon teams (up to 6 Pokémon per team).
  - Edit and delete existing teams.
  - Save teams to the backend with associated Pokémon and user details.
- **Responsive Design**:
  - Fully responsive and functional on desktop and mobile devices.

---

## Technologies Used

### Frontend
- **React**: Framework for building the user interface.
- **React Router**: For client-side routing.
- **Axios**: For handling HTTP requests.
- **CSS**: Custom styles with responsiveness in mind.

### Backend
This app integrates with a custom backend built using:
- **Java Spring Boot**
- **MongoDB**

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── Team.js
├── pages/
│   ├── AuthPage.js
│   ├── Home.js
│   ├── Pokedex.js
│   ├── CreateTeam.js
│   ├── MyTeams.js
├── styles/
│   ├── App.css
│   ├── Navbar.css
│   ├── Footer.css
│   ├── AuthPage.css
│   ├── Home.css
│   ├── Pokedex.css
│   ├── CreateTeam.css
│   ├── MyTeams.css
├── App.js
└── index.js
```

---

## Installation

### Prerequisites
1. [Node.js](https://nodejs.org/) (Recommended version: `16.x` or higher)
2. [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   ```
2. Navigate to the project folder:
   ```bash
   cd <repo-name>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

The app will run on `http://localhost:3000`.

---

## Backend API

The application depends on the backend API for authentication, team management, and data storage. The backend is hosted on `http://localhost:8080`. Below are the key API endpoints:

### Authentication
- `POST /api/v1/users/login`: Log in with username and password.
- `POST /api/v1/users/register`: Register a new user.

### Teams
- `GET /api/v1/users/{username}`: Fetch user data, including teams.
- `POST /api/v1/teams/createTeam`: Create a new team.
- `PUT /api/v1/teams/{teamId}`: Update an existing team.
- `DELETE /api/v1/teams/{teamId}`: Delete a team.

---

## How to Use

1. **Authentication**:
   - Register a new account or log in with an existing account.
2. **Pokedex**:
   - Browse Pokémon, filter by type, or search by name.
   - Click on a Pokémon for detailed stats and descriptions.
3. **Team Management**:
   - Create a new team by selecting Pokémon and naming your team.
   - Edit or delete your existing teams in the "My Teams" section.

---

## Customization

To change the backend API URL, update the `baseURL` in the `axios` calls in the respective components.

---

## Screenshots

### Home Page
![image](https://github.com/user-attachments/assets/98bf2bdc-f92f-4463-834b-173fa124252e)


### Pokedex
![image](https://github.com/user-attachments/assets/9840ddc9-9b52-4364-9379-d69fa412e7a6)


### Create Team
![image](https://github.com/user-attachments/assets/8f4994ba-0357-4cb7-af12-4485906edc55)


### My Teams
![image](https://github.com/user-attachments/assets/cba7dc01-e786-43bc-a941-af7401f7b3a7)


---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Author

**Igor Irzycki**  
Feel free to contact me at [Your Email] for any questions or collaboration opportunities.

