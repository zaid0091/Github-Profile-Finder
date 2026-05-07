# GitHub Profile Finder

A sleek web app to search and explore GitHub user profiles. Enter a username to view profile details, stats, and top repositories.

## Features

- **Profile Overview** – avatar, name, bio, location, company, followers/following counts
- **Top Repositories** – latest 8 repos displayed in a grid with descriptions and languages
- **Dark / Light Theme** – toggle between dark and light mode
- **Loading Indicator** – spinner while fetching data
- **Copy Profile Link** – one-click copy of the profile URL

## How to Use

1. Open `index.html` in a browser (or serve via any static server).
2. Type a GitHub username in the search bar and press **Enter** or click the search button.
3. View the profile card and repo list. Click **View Profile** to open the GitHub page. Click **Copy Link** to copy the profile URL.

## Tech Stack

- Vanilla JavaScript (ES6+)
- CSS3 with custom properties, backdrop-filter, and responsive grid
- [GitHub REST API](https://docs.github.com/en/rest) — `users/:username` and `users/:username/repos`
- Font Awesome 6 for icons
- Google Fonts (Poppins)

## Project Structure

```
├── index.html
├── style.css
├── script.js
└── README.md
```

No build tools or bundlers required.
