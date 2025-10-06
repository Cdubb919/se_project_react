# Copilot Instructions for AI Agents

## Project Overview
- This is a React project bootstrapped with Vite, using HMR (Hot Module Replacement) and ESLint.
- The main app logic is in `src/components/`, with modular subfolders for each UI section (e.g., `Header`, `Footer`, `Main`, `Profile`).
- State and context are managed via React Context (see `src/contexts/CurrentTemperatureUnit.jsx`).
- API and utility logic is in `src/utils/` (notably `api.js`, `weatherApi.js`).
- Static assets are in `src/assets/` and subfolders.

## Key Workflows
- **Start Dev Server:** `npm run dev` (uses Vite for fast refresh)
- **Build for Production:** `npm run build`
- **Preview Production Build:** `npm run preview`
- **No explicit test scripts** are present; add tests as needed.

## Project-Specific Patterns
- **Component Structure:** Each major UI section is a folder in `src/components/` with its own `.jsx` and `.css` files.
- **Modals:** Modal components (e.g., `AddItemModal`, `DeleteConfirmationModal`) are in their own folders and follow a pattern of local state + props for control.
- **API Calls:** Centralized in `src/utils/api.js` and `src/utils/weatherApi.js`. Use these utilities for all network requests.
- **Context:** Use `CurrentTemperatureUnit.jsx` for temperature unit state; wrap components that need access.
- **Constants:** Shared constants are in `src/utils/constants.js`.
- **Custom Hooks:** Place reusable hooks in `src/hooks/` (e.g., `useForm.js`).

## Integration & Conventions
- **No backend server is included**; `db.json` may be used for mock data.
- **Vite config:** See `vite.config.js` for build and alias settings.
- **CSS:** Use component-scoped CSS in each component folder. Global styles in `src/index.css` and `src/vendor/`.
- **Assets:** Reference images and SVGs from `src/assets/` and subfolders.

## Examples
- To add a new modal, follow the structure in `src/components/AddItemModal/`.
- For new API endpoints, extend `src/utils/api.js` and import functions where needed.
- For new context, follow the pattern in `src/contexts/CurrentTemperatureUnit.jsx`.

## References
- Main entry: `src/main.jsx`
- App root: `src/components/App.jsx`
- Routing is not present; all logic is in single-page components.

---

Update this file if you introduce new workflows, major dependencies, or architectural changes.
