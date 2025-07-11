# 🚀 Push to GitHub - Quick Commands

## Option 1: If you have GitHub CLI (Recommended)

```bash
# Install GitHub CLI first if needed:
# Windows: winget install GitHub.cli
# Mac: brew install gh
# Linux: https://cli.github.com

# Then run:
cd /mnt/n/kanban-board/netlify-kanban
gh auth login  # First time only
gh repo create claude-kanban-netlify --public --source=. --remote=origin --push
```

## Option 2: Manual Push (Works Always)

### 1. First, prepare your local repo:
```bash
cd /mnt/n/kanban-board/netlify-kanban

# Initialize git
git init

# Configure git (if needed)
git config user.name "Your Name"
git config user.email "your-email@example.com"

# Add all files
git add .
git commit -m "Initial commit: Claude Kanban Board"
```

### 2. Create repo on GitHub:
1. Go to https://github.com/new
2. Name: `claude-kanban-netlify`
3. ✅ Public (for Netlify free tier)
4. ❌ Don't add README (we have one)
5. Click "Create repository"

### 3. Push your code:
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/claude-kanban-netlify.git
git branch -M main
git push -u origin main
```

## Option 3: Let Me Do It! (Automated)

```bash
cd /mnt/n/kanban-board/netlify-kanban
./deploy-to-github.sh
```

This script will:
- Check your git setup
- Initialize the repository
- Guide you through the process
- Give you exact commands to run

## 🎯 After GitHub Push

1. Your repo will be at: `https://github.com/YOUR_USERNAME/claude-kanban-netlify`
2. Go to [netlify.com](https://netlify.com)
3. "Add new site" → "Import an existing project"
4. Connect GitHub → Select your repo
5. Click "Deploy site"
6. Done! Your board is live! 🎉

## 🔐 Authentication Issues?

If you get authentication errors:

### For HTTPS (easier):
```bash
# Use personal access token
# 1. Go to GitHub → Settings → Developer settings → Personal access tokens
# 2. Generate new token (classic) with 'repo' scope
# 3. Use token as password when pushing
```

### For SSH (more secure):
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"

# Add to GitHub
cat ~/.ssh/id_ed25519.pub
# Copy and add to GitHub → Settings → SSH keys

# Use SSH URL instead
git remote set-url origin git@github.com:YOUR_USERNAME/claude-kanban-netlify.git
```

---

**Need help?** Just ask! I can guide you through any step. 🤝