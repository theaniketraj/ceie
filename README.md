# **CEIE (Controlled Environment Integration Engine)**

Welcome to **CEIE 2.0** – a comprehensive toolchain designed to automate Git repository setup, streamline branch management, and enhance your development workflow. With CEIE, you can easily set up repositories, automate deployment processes, and manage environments using GitHub Actions, all in a scalable, efficient, and reusable package.

---

## **Table of Contents**

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Getting Started](#getting-started)
6. [Project Structure](#project-structure)
7. [CI/CD Integration](#cicd-integration)
8. [Contributing](#contributing)
9. [License](#license)

---

## **Introduction**

CEIE is designed to help developers manage complex environments with ease. Whether you are a solo developer or part of a larger team, CEIE offers a robust solution to automate the setup of Git repositories, improve your branching strategy, and streamline deployment with CI/CD pipelines.

---

## **Features**

- **Automatic Repository Setup:** Create and manage repositories with three default branches:
  - **Main:** For production-ready code.
  - **Controlled Environment:** For team review and testing.
  - **Isolated Environment:** For individual offline work.
  
- **Custom Git Command:** `git setup-ceie` – A command that automates the creation of the default branching structure.

- **CI/CD Automation:** Seamlessly integrates GitHub Actions to automate deployment processes based on branch merges.

- **Reusable Scripts:** Create workflows that can be used across multiple repositories.

- **Scalable:** Easily extendable and customizable to fit your needs, whether for small teams or large organizations.

- **Documentation:** In-depth documentation detailing the entire CEIE roadmap, from setup to deployment.

---

## **Installation**

To get started with **CEIE**, follow these simple installation steps.

### Prerequisites

- **Node.js** and **npm** installed.
- **Git** installed and configured.

### Install CEIE Globally

To install `ceie` globally, run the following command in your terminal:

```bash
npx ceie
```

This will automatically install and configure CEIE in your project.

---

## **Usage**

Once you've installed CEIE, you can set up and manage your Git repositories using the `git setup-ceie` command.

Step 1: Setup CEIE

To initialize your project repository with CEIE, simply run:

```bash
git setup-ceie
```

This will create the three default branches in your repository and configure the environment automatically.

Step 2: Automate CI/CD

CEIE also integrates GitHub Actions for CI/CD pipelines. After setting up CEIE, the workflows will be automatically added to your Github repository.

---

## **Getting Started**

1. Clone the repository into your local machine.

```bash
git clone https://github.com/theaniketraj/ceie.git
cd ceie
```

2. Install dependencies and build the project.

```bash
npm install
```

3. Use the `git setup-ceie` command to set up the repository structure.

---

## **Project Structure**

```bash
CEIE/ 
├── src/ # Source code for CEIE tools and functionality 
├── workflows/ # GitHub Actions workflows 
│   ├── main.yml # Main CI/CD pipeline 
│   ├── controlled.yml # CI pipeline for Controlled Environment branch 
│   └── isolated.yml # CI pipeline for Isolated Environment branch 
├── scripts/ # Reusable scripts for setting up repositories and environments 
├── docs/ # Documentation files and roadmap 
├── README.md # Project README 
└── LICENSE # License information
```

---

## **CI/CD Integration**

CEIE comes with pre-configured GitHub Actions workflows for seamless CI/CD integration.

1. Main Workflow: Automatically deploy code when changes are merged into the Main branch.
2. Controlled Workflow: Build and test code before merging into Main.
3. Isolated Workflow: Isolated environment workflow for individual development work.

For more information on GitHub Actions, check out the documentation on [GitHub Actions](https://docs.github.com/en/actions).

---

## **Contributing**

We welcome contributions to improve CEIE. If you have suggestions, bug fixes, or feature requests, feel free to fork the repository and submit a pull request.

1. Steps to Contribute
2. Fork the repository.
3. Create a new branch for your changes.
4. Make your changes and commit them.
5. Push your changes to your fork.
6. Create a pull request describing your changes.

---

## **License**

CEIE is open-source software licensed under the MIT License. See [LICENSE](https://github.com/theaniketraj/ceie?tab=MIT-1-ov-file) for more details.

---

We hope CEIE helps streamline your workflow and boosts productivity. Feel free to explore, contribute, and reach out with any questions or suggestions. Happy pipelining. 😉

