#!/usr/bin/env bash
# Initialize this folder as a personal repo for github.com/jlram (not work / THN).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

if [[ ! -d .git ]]; then
  if ! git init; then
    echo "git init failed. On macOS, run this script from Terminal.app (full access), not from a restricted IDE environment."
    exit 1
  fi
fi

# Local author only for this repository (overrides global work email if any).
git config user.name "jlram"
git config user.email "jlram@users.noreply.github.com"

git add .gitignore README.md matrix-generator.js package.json package-lock.json init-git.sh
git status

echo ""
echo "Creating initial commit (only tracked files; JSON exports stay ignored)."
git commit -m "Initial commit: BCP team matrix generator" || {
  echo "Nothing to commit or commit failed."
  exit 1
}

echo ""
echo "Done. Push ONLY to your personal GitHub user jlram:"
echo "  1. Create an EMPTY repo: https://github.com/new  (owner: jlram, not an org)"
echo "  2. git remote add origin git@github.com:jlram/<REPO_NAME>.git"
echo "  3. git branch -M main && git push -u origin main"
echo ""
echo "Do not add remotes or deploy keys tied to The Hotels Network or other employers."
