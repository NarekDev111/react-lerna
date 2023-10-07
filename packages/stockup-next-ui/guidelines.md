# Guidelines

## Formatting and organizing

- Use Prettier extension for Visual Studio Code (it should be also available for other IDEs). The extension should pick-up the configuration automatically from the `.prettierrc` file
- Enable "Format on Save" or make sure to auto-format code periodically
- Enable "Organize Imports on Save"

All the settings are available in the `.vscode` directory and should be applied automatically when you open the project

## Conventions

- Each TypeScript file containing a TSX component should be named exactly like the component starting with capital later. Example:

  `MyComponent.tsx`:
  ```tsx
  export default function MyComponent() {
    return <div>This is my component</div>
  }
  ```

### Source code file structure

- `components` contains common components used in different parts of the app. Each component here must be self sufficient so it can be used in another application without changing.
- `pages` contains TSX components used for routes and components used only be these pages