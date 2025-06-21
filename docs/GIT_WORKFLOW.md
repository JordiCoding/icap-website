# Git Workflow & Branch Management

## Overview

This project uses a **feature branch workflow** to keep the main branch stable while allowing experimental development. This ensures that experimental features don't affect the production-ready code.

## Branch Structure

### Current Branches

```
main (stable)
├── feature/market-ticker-exploration (experimental)
└── (future feature branches)
```

### Branch Purposes

| Branch | Purpose | Status | Description |
|--------|---------|--------|-------------|
| `main` | Production | ✅ Stable | Clean, production-ready code |
| `feature/market-ticker-exploration` | Experimental | 🔬 Active | Market ticker feature development |

## Branch Management Commands

### Viewing Branches

```bash
# List all branches (current branch marked with *)
git branch

# List all branches with more details
git branch -v

# List remote branches
git branch -r

# List all branches (local and remote)
git branch -a
```

### Switching Between Branches

```bash
# Switch to main branch
git checkout main

# Switch to market ticker exploration branch
git checkout feature/market-ticker-exploration

# Create and switch to a new branch
git checkout -b feature/new-feature-name

# Switch using newer Git syntax (Git 2.23+)
git switch main
git switch feature/market-ticker-exploration
```

### Creating New Feature Branches

```bash
# Method 1: Create and switch in one command
git checkout -b feature/your-feature-name

# Method 2: Create first, then switch
git branch feature/your-feature-name
git checkout feature/your-feature-name

# Method 3: Using newer Git syntax
git switch -c feature/your-feature-name
```

### Merging Branches

```bash
# Switch to target branch (usually main)
git checkout main

# Merge feature branch into main
git merge feature/market-ticker-exploration

# Delete feature branch after successful merge
git branch -d feature/market-ticker-exploration
```

## Development Workflow

### 1. Starting New Work

```bash
# Always start from main branch
git checkout main

# Pull latest changes
git pull origin main

# Create new feature branch
git checkout -b feature/your-feature-name
```

### 2. During Development

```bash
# Make your changes
# ... edit files ...

# Stage changes
git add .

# Commit changes
git commit -m "feat: Add new feature description"

# Push to remote (first time)
git push -u origin feature/your-feature-name

# Push subsequent changes
git push
```

### 3. Completing Work

```bash
# Switch back to main
git checkout main

# Pull latest changes
git pull origin main

# Merge your feature
git merge feature/your-feature-name

# Delete feature branch
git branch -d feature/your-feature-name

# Push updated main
git push origin main
```

## Current Project State

### Main Branch (`main`)
- ✅ **Stable and clean**
- ✅ **Production-ready**
- ✅ **No experimental features**
- ✅ **Ready for deployment**

### Market Ticker Branch (`feature/market-ticker-exploration`)
- 🔬 **Experimental market data feature**
- 🔬 **Live API integration**
- 🔬 **Real-time data display**
- 🔬 **Not ready for production**

## Branch Naming Convention

### Feature Branches
```
feature/description-of-feature
feature/market-ticker-exploration
feature/user-authentication
feature/payment-integration
```

### Bug Fix Branches
```
fix/description-of-bug
fix/navigation-issue
fix/typo-in-header
```

### Hotfix Branches
```
hotfix/critical-security-issue
hotfix/urgent-production-bug
```

## Best Practices

### 1. Always Start from Main
```bash
git checkout main
git pull origin main
git checkout -b feature/new-feature
```

### 2. Keep Branches Focused
- One feature per branch
- Clear, descriptive branch names
- Small, frequent commits

### 3. Regular Updates
```bash
# Update your feature branch with main
git checkout main
git pull origin main
git checkout feature/your-feature
git merge main
```

### 4. Clean Up After Merging
```bash
# Delete local feature branch
git branch -d feature/your-feature

# Delete remote feature branch
git push origin --delete feature/your-feature
```

## Common Scenarios

### Scenario 1: Working on Market Ticker
```bash
# Switch to exploration branch
git checkout feature/market-ticker-exploration

# Make changes and commit
git add .
git commit -m "feat: Add new market data source"

# Push changes
git push
```

### Scenario 2: Returning to Stable Code
```bash
# Switch back to main
git checkout main

# Verify you're on clean branch
git status
```

### Scenario 3: Creating New Feature
```bash
# Start from main
git checkout main
git pull origin main

# Create new feature branch
git checkout -b feature/new-feature-name

# Begin development
```

### Scenario 4: Merging Feature to Main
```bash
# Switch to main
git checkout main

# Merge feature
git merge feature/your-feature-name

# Push to remote
git push origin main

# Clean up
git branch -d feature/your-feature-name
```

## Troubleshooting

### Stash Changes
```bash
# Save current work without committing
git stash

# Switch branches
git checkout main

# Return to feature branch
git checkout feature/your-feature

# Restore stashed changes
git stash pop
```

### Reset Branch
```bash
# Reset to match main branch
git checkout feature/your-feature
git reset --hard main
```

### View Branch History
```bash
# See commit history
git log --oneline

# See branch graph
git log --graph --oneline --all
```

### Check Branch Status
```bash
# See current branch and status
git status

# See which files are different
git diff main
```

## Remote Repository Management

### View Remote Branches
```bash
# List remote branches
git branch -r

# Fetch latest remote information
git fetch origin
```

### Push New Branch
```bash
# First time pushing a new branch
git push -u origin feature/your-feature-name

# Subsequent pushes
git push
```

### Delete Remote Branch
```bash
# Delete remote feature branch
git push origin --delete feature/your-feature-name
```

## Quick Reference Commands

### Essential Commands
```bash
git branch                    # List branches
git checkout <branch>         # Switch branch
git checkout -b <branch>      # Create and switch
git merge <branch>            # Merge branch
git branch -d <branch>        # Delete branch
git status                    # Check status
git log --oneline            # View history
```

### Current Project Commands
```bash
git checkout main                                    # Go to stable code
git checkout feature/market-ticker-exploration      # Go to experimental
git branch -a                                        # See all branches
```

## Visual Branch Diagram

```
main (stable)
│
├── feature/market-ticker-exploration (experimental)
│   ├── commit: "feat: Add market ticker component"
│   ├── commit: "feat: Add API integration"
│   └── commit: "feat: Add CSS animations"
│
└── (future branches)
    ├── feature/user-authentication
    ├── feature/payment-integration
    └── feature/admin-dashboard
```

## Summary

This workflow ensures:
- ✅ **Main branch stays stable**
- ✅ **Experimental features are isolated**
- ✅ **Easy to switch between stable and experimental code**
- ✅ **Clean merge process when features are ready**
- ✅ **No risk of breaking production code**

Remember: Always start new work from `main` and keep experimental features in separate branches! 