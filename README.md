![CI](https://github.com/ubc-cpsc455-2024S/assignment-jacksonliiii/actions/workflows/ci.yml/badge.svg)

# Pirate Rush
Idle-clicker game in the theme of One Piece! Do you want to become the pirate king? Recruit and upgrade your pirate crew, fight dangerous foes, and conquer the seas!

Play now on: https://pirate-rush.onrender.com/

## Notes
### Challenges
The core gameplay involves players clicking rapidly on a boss character to inflict damage. Managing this interaction in a React-Redux setup presents unique challenges, especially due to the high frequency of actions and the necessity to maintain responsive and accurate game state updates. A key concern is the efficiency of updating the boss's health; making an API call to update the health with every click would be impractical and inefficient.

To address this, we have introduced a caching mechanism that batches these health updates, thereby reducing the number of API calls. This system ensures that the game's performance remains optimal, even as players interact with the game rapidly.

## Progress
### Milestone 5
v3.1
- Add more UI improvements and upgrade the character level-up feature to increase stats and max level.

v3.0
- Updated UI and revamped the pirate input form to fetch from an existing pool of pirates to be unlocked.

### Milestone 4
v2.2
- Connect the backend to MongoDB. Use Mongoose schema and add more member fields. Add functionality to upgrade crew with monetary resources (Berries)

### Milestone 3
v2.1
- Implement backend via Node.js and express. Added member upgrade feature.

### Milestone 2
v2.0
- Recreate assignment 1 using React and Redux. Add a new feature to select a member to show a detailed view.

### Milestone 1
v1.0
- Using only HTML, CSS, and JavaScript, build a website to create teams via 
filling forms and displaying them as a list

## References

The project uses image URLs from: https://optc-db.github.io/
