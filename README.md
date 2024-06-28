### README

## Project Setup and Testing

This project displays a list of Star Wars heroes using the `sw-api.starnavi.io` API. The list is paginated with infinite scroll and clicking on a hero shows detailed information in a graph format.

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/ByHorix/star-wars-heroes.git
cd star-wars-heroes
```

2. Install dependencies:

```sh
npm install
```

### Running the Project

To start the development server, run:

```sh
npm run dev
```

The project will be available at `http://localhost:3000`.

### Running Tests

To run the tests, use the following command:

```sh
npm run test
```

### Project Structure

- `src/app/page.tsx`: The home page component that navigates to the heroes list.
- `src/app/heroes`: The heroes page component that displays list of StarWars Heroes.
- `src/app/axios`: Axios api instance configuration.
- `src/components/pages`: Contains components related to the app composition.
- `src/components/ui`: UI components.
- `src/config/flow.config.ts`: Nodes placement configuration for ReactFlow component.
- `src/hooks`: Custom hooks.
- `src/services/swapi.ts`: Service for fetching data from the API.
- `src/types`: Type definitions for the data structures used in the project.
- `src/utills`: Utilities functions/helpers for project.

### Test Files

- `./src/app/__test__/HomePage.test.tsx`: Tests for the home page.
- `./src/components/pages/heroes/HeroesList/__test__/HeroesList.test.tsx`: Tests for the heroes list.
- `./src/components/pages/heroes/HeroesList/HeroCard/__test__/HeroCard.test.tsx`: Tests for the hero card component.

### Test Scenarios

#### HomePage.test.tsx

##### Navigate to Heroes Page on Button Click
- Setup: Render the HomePage component.
- Action: Simulate a click on the navigation button.
- Expected Result: After a short delay (to allow for an animation), the router should navigate to the /heroes page, confirmed by checking that router.push is called with the correct argument.

#### HeroesList.test.tsx

##### Show Skeleton and Load More Heroes on Scroll to the Bottom
- Setup:
    - Mock the fetchHeroes function to return a predefined list of heroes.
    - Mock the useInView hook to control the inView state.
    - Render the HeroesList component with an initial list of heroes.
- Action:
    - Verify that the initial heroes are displayed correctly.
    - Check that the skeleton loader is present initially (should be hidden).
    - Simulate the skeleton becoming in view by changing the inView state.
    - Manually trigger a re-render of the component to apply the new inView state.
- Expected Result:
    - The fetchHeroes function should be called once, indicating that new heroes are being loaded.
    - The newly fetched heroes should be added to the list and displayed correctly.
    - Verify that the function to fetch hero details (getFilmsAndStarshipsForHero) has not been called during this process.

#### HeroCard.test.tsx

##### Render HeroCard and Verify Initial State

- Setup: Render the HeroCard component with mocked hero data.
- Expected Result: Verify that the HeroCard contains the preview card for the hero.

##### Expand HeroCard on Click

- Setup: Render the HeroCard component and simulate a click on it.
- Action: Click on the HeroCard.
- Expected Result: The preview card should disappear, indicating that the HeroCard has expanded to show detailed information. This is confirmed by checking that the preview card is no longer in the document.

##### Collapse HeroCard on Close Icon Click

- Setup: Render the HeroCard component, simulate a click to expand it, and then click on the close icon.
- Action: Click on the close icon.
- Expected Result: The preview card should become visible again, indicating that the HeroCard has collapsed. This is confirmed by checking that the preview card is back in the HeroCard.

##### Fetch Hero Details Only Once

- Setup: Render the HeroCard component with mocked hero data and simulate expanding and collapsing the HeroCard.
- Action: Click on the HeroCard to expand it, then click on the close icon to collapse it, and click again to expand it.
- Expected Result: The function to fetch hero details (getFilmsAndStarshipsForHero) should be called only once, ensuring that the data is fetched only on the first expansion and not on subsequent expansions. This is confirmed by checking the call count of the mocked function.

### Additional Information

- The `HeroCard` component displays hero information and expands to show detailed information including films and starships associated with the hero.
- The tests ensure that the navigation and data fetching work as expected and the UI updates correctly on user interactions.