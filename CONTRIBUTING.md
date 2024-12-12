# Contributing to Trakap 🛠️

Thank you for considering contributing to Trakap! We welcome contributions, whether it's a bug fix 🐛, new feature ✨, or documentation improvement 📚. Please follow the guidelines below to make the process smooth and efficient.

---

## Git Branching Strategy 🌳

We follow a simple Git branching model:

- `master`: The main branch containing the stable production-ready code.
- `develop`: The development branch where new features and fixes are merged before being released.
- `feature` branches: Used for new features, created from `develop`. These branches should be named in a way that describes the feature being worked on.
- `fix` branches: Used for fixing bugs, created from `develop`. These branches should be named in a way that describes the fix.

---

## Branch Naming Convention 📝

- Features: `feature/[short-description]`
- Fixes: `fix/[short-description]`

Example:

- `feature/add-login-page`
- `fix/fix-signup-bug`

---

## Workflow 🚀

- Clone the repository 💻

    ```bash
    git clone https://github.com/MarinSH/trakap.git
    ```
- Create a new branch 🌱: When starting a new task (feature, fix), create a new branch from develop.

    ```bash
    git checkout -b feature/[short-description] develop
    ```

- Make changes ✍️: Implement your changes in the new branch.

- Commit your changes ✅: Use meaningful commit messages and Gitmoji to describe your changes. For example:

    - :sparkles: feat: add login page
    - :bug: fix: resolve issue with user authentication
    - :memo: docs: update README with setup instructions

    You can find the full list of Gitmoji [here](https://gitmoji.dev/https://gitmoji.dev/).

- Push your changes ⬆️: Once your changes are ready, push your branch.

    ```bash
    git push origin feature/[short-description]
    ```

- Open a Pull Request 🔄: Create a pull request (PR) from your branch to develop.

    - Add a clear title and description for the PR.
    - Request a reviewer 👨‍💻 (preferably someone who is familiar with the code you're modifying).
    - Wait for approval ✅ and address any feedback if necessary.


---

## Creating Issues 📝
If you encounter any bugs 🐞, or if you'd like to suggest a new feature ✨, feel free to create an issue in the repository.

### Issue Template 📝
When creating an issue, please follow this format:

- Title: Brief and descriptive.
- Description: Provide a detailed explanation of the problem or suggestion.
- Steps to reproduce (if it's a bug): Include the steps to reproduce the issue.
- Expected behavior: Describe what should happen.
- Actual behavior: Describe what happens instead.

---

## Code Reviews 🧐
- Review Process: Once a PR is opened, one or more maintainers will review your code.
- Changes requested 🔄: If any changes are required, the reviewer will leave comments on the PR. Please address these requests and update the PR accordingly.

---

Thank you for contributing! 🙏