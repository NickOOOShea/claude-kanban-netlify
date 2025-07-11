#!/bin/bash

echo "🚀 GitHub Deployment Helper"
echo "=========================="
echo

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

# Check git config
USER_NAME=$(git config user.name || echo "")
USER_EMAIL=$(git config user.email || echo "")

if [ -z "$USER_NAME" ] || [ -z "$USER_EMAIL" ]; then
    echo "📝 Setting up Git configuration..."
    echo
    read -p "Enter your GitHub username: " github_username
    read -p "Enter your email: " github_email
    
    git config --global user.name "$github_username"
    git config --global user.email "$github_email"
    echo "✅ Git configured!"
    echo
fi

# Initialize git if needed
if [ ! -d .git ]; then
    echo "🔧 Initializing git repository..."
    git init
    echo "✅ Git initialized!"
    echo
fi

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
.env
.netlify/
*.log
.DS_Store
EOF

echo "📦 Preparing files for GitHub..."

# Add all files
git add .
git commit -m "Initial commit: Claude Kanban Board - Netlify Edition" || echo "No changes to commit"

# Check if gh CLI is available
if command -v gh &> /dev/null; then
    echo
    echo "🎯 GitHub CLI detected! Creating repository..."
    
    read -p "Repository name (claude-kanban-netlify): " repo_name
    repo_name=${repo_name:-claude-kanban-netlify}
    
    read -p "Make it public? (y/n): " is_public
    visibility_flag=""
    if [ "$is_public" = "y" ]; then
        visibility_flag="--public"
    else
        visibility_flag="--private"
    fi
    
    # Create repo and push
    gh repo create "$repo_name" $visibility_flag --source=. --remote=origin --push
    
    echo
    echo "✅ Repository created and pushed!"
    echo "🌐 View at: https://github.com/$(gh api user -q .login)/$repo_name"
    
else
    echo
    echo "📋 Manual GitHub Setup Required:"
    echo "================================"
    echo
    echo "1. Go to https://github.com/new"
    echo "2. Create a new repository named: claude-kanban-netlify"
    echo "3. Don't initialize with README (we have one)"
    echo "4. After creating, run these commands:"
    echo
    echo "   git remote add origin https://github.com/YOUR_USERNAME/claude-kanban-netlify.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo
    echo "Or install GitHub CLI for easier deployment:"
    echo "   Windows: winget install GitHub.cli"
    echo "   Mac: brew install gh"
    echo "   Linux: See https://cli.github.com/manual/installation"
fi

echo
echo "🎯 Next Steps:"
echo "=============="
echo "1. Repository is ready on GitHub"
echo "2. Go to netlify.com"
echo "3. Click 'Import from Git'"
echo "4. Connect your GitHub"
echo "5. Select this repository"
echo "6. Deploy! 🚀"
echo
echo "Your kanban board will be live in minutes!"