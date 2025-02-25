#!/usr/bin/env node

const { execSync } = require("child_process");
const readline = require("readline-sync");
const https = require("https");
const path = require("path");

// Helper function to create a GitHub repository via API
function createGitHubRepo(repoName, token) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      name: repoName,
      private: false,
    });
    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: '/user/repos',
      method: 'POST',
      headers: {
        'User-Agent': 'ceie-2.0',
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const repoInfo = JSON.parse(data);
          resolve(repoInfo.clone_url);
        } else {
          reject(new Error(`GitHub API returned status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on("error", (e) => reject(e));
    req.write(postData);
    req.end();
  });
}

(async () => {
  try {
    console.log("🚀 CEIE 2.0: Automating your Git repository setup...");

    // Step 1: Initialize Git repository
    console.log("🔧 Initializing Git repository...");
    execSync("git init", { stdio: "inherit" });

    // Step 2: Check if remote origin exists
    let remoteExists = false;
    try {
      execSync("git remote get-url origin", { stdio: "ignore" });
      remoteExists = true;
      console.log("✅ Remote origin already exists.");
    } catch {
      remoteExists = false;
    }

    // If remote doesn't exist, attempt auto-creation
    if (!remoteExists) {
      const folderName = path.basename(process.cwd());
      console.log(`ℹ️ No remote origin found. Your repository will be named "${folderName}".`);
      const autoCreate = readline.question("Do you want to auto-create a GitHub repository with this name? (Y/n): ");
      let repoUrl = "";
      if (autoCreate.toLowerCase() === "y" || autoCreate === "") {
        const token = readline.question("Enter your GitHub Personal Access Token: ", { hideEchoBack: true });
        console.log("🔄 Creating repository on GitHub...");
        try {
          repoUrl = await createGitHubRepo(folderName, token);
          console.log(`✅ Repository created: ${repoUrl}`);
          execSync(`git remote add origin ${repoUrl}`, { stdio: "inherit" });
        } catch (err) {
          console.error("❌ Failed to auto-create repository:", err.message);
          repoUrl = readline.question("Please enter your GitHub repository URL manually: ");
          execSync(`git remote add origin ${repoUrl}`, { stdio: "inherit" });
        }
      } else {
        repoUrl = readline.question("Please enter your GitHub repository URL: ");
        execSync(`git remote add origin ${repoUrl}`, { stdio: "inherit" });
      }
    }

    // Step 3: Create an initial commit
    console.log("📄 Creating an initial commit...");
    execSync("echo '# CEIE 2.0' > README.md", { stdio: "inherit" });
    execSync("git add README.md", { stdio: "inherit" });
    try {
      execSync('git commit -m "Initial commit"', { stdio: "inherit" });
      console.log("✅ Initial commit created.");
    } catch {
      console.log("⚠ Initial commit already exists, skipping...");
    }

    // Step 4: Create and switch branches
    console.log("✅ Creating and switching branches...");
    const branches = ["main", "controlled-environment", "isolated-environment"];
    // Ensure main branch is created first
    execSync("git checkout -B main", { stdio: "inherit" });
    // Create other branches
    branches.slice(1).forEach((branch) => {
      execSync(`git checkout -B ${branch}`, { stdio: "inherit" });
    });
    console.log("🔀 Switching back to 'main' branch...");
    execSync("git checkout main", { stdio: "inherit" });

    // Step 5: Push branches to GitHub
    console.log("📤 Pushing branches to GitHub...");
    branches.forEach((branch) => {
      try {
        execSync(`git push -u origin ${branch}`, { stdio: "inherit" });
      } catch {
        console.log(`⚠ Failed to push branch '${branch}'.`);
      }
    });

    console.log("🎉 CEIE 2.0 setup is complete!");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
})();
