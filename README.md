# Real Estate Agent Website

This is a static website designed to showcase a real estate agent’s personal brand. It includes HTML, CSS, and JavaScript files, and can be run locally in a browser. This guide is intended for beginners with little or no coding experience. It explains how to interact with the Git repository and view the site locally.

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Repository Structure](#repository-structure)
- [Working with Git](#working-with-git)
- [Viewing the Website Locally](#viewing-the-website-locally)
- [Keyboard Shortcuts in VS Code](#keyboard-shortcuts-in-vs-code)
- [Best Practices](#best-practices)

---

## Repository Structure

```
├── index.html
├── resources
│   ├── css
│   │   └── index.css
│   └── images
│       ├── aag-headshot.png
│       ├── background_house.jpg
│       └── BHHSREP logo.png
└── scripts
    ├── app.js
    ├── index.js
    └── particles.js
```

---

## Working with Git

### Checking out the project

To download the repository (only do this once):

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

This creates a folder with all the project files.

### Creating a new branch

Before you make changes, create your own branch to work safely (where `my-feature-branch` is a place-holder for the name of your branch):

```bash
git checkout -b my-feature-branch
```

This lets you experiment or make changes without affecting the main version.

### Saving your changes (add & commit)

After editing files:

1. `git add .` tells Git to stage all your changes.
2. `git commit -m "Clear description of what you changed"` saves a snapshot of your work.

```bash
git add .
```
```bash
git commit -m "Updated homepage text and fixed image path"
```

> "Add" prepares changes, "commit" saves them with a message.

### Uploading changes (push)

Once you've committed, send your changes to the remote repository:

```bash
git push origin my-feature-branch
```

Replace `my-feature-branch` with the name of your current branch.

### Getting the latest version (pull)

Before working, always get the latest changes from the main branch:

```bash
git checkout main
git pull origin main
```

This updates your local copy with any new changes others have made.

---

## Viewing the Website Locally

This is a static site, so there’s no special software required.

#### Using Python (macOS/Linux/Windows with Python installed):
This option is recommended for testing JavaScript and layout issues.

```bash
python -m http.server 8000
```

Then go to: [http://localhost:8000](http://localhost:8000) in your browser. 
*IMPORTANT* Use <kbd>Ctrl</kbd>+<kbd>C</kbd> to stop running the server locally.

#### Using VS Code Live Server:

1. Open the VSCode File Explorer (<kbd>Cmd</kbd> + <kbd>shift</kbd> + <kbd>E</kbd>)
2. Right-click `index.html`.
3. Click **“Show Preview”**

---

## Keyboard Shortcuts in VS Code

| Shortcut         | Action                              |
|------------------|-------------------------------------|
|<kbd>Cmd</kbd> + <kbd>F</kbd>          | Quickly search for text *within* a document|
|<kbd>Cmd</kbd> + <kbd>shift</kbd> + <kbd>O</kbd>   | Jump to a symbol (like a function)  |
|<kbd>Cmd</kbd> + <kbd>shift</kbd> + <kbd>U</kbd>   | Find-It-Faster CODE Search (across entire repo) |
|<kbd>Cmd</kbd> + <kbd>shift</kbd> + <kbd>J</kbd>    | Find-It-Faster FILE-NAME Search (across entire repo) |

---

## Best Practices

- Use meaningful branch names like `feature/navbar-update` or `fix/header-spacing`.
- Commit often with clear messages.
- Always pull the latest changes from `main` before pushing.
- Ask before making changes directly to `main`.
