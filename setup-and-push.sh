#!/bin/bash

echo "🚀 Complete GitHub Setup & Push"
echo "==============================="
echo

# Function to read user input
get_input() {
    local prompt=$1
    local default=$2
    local input
    
    if [ -n "$default" ]; then
        read -p "$prompt [$default]: " input
        echo "${input:-$default}"
    else
        read -p "$prompt: " input
        echo "$input"
    fi
}

# Check git config
echo "📝 Checking Git configuration..."
USER_NAME=$(git config user.name || echo "")
USER_EMAIL=$(git config user.email || echo "")

if [ -z "$USER_NAME" ] || [ -z "$USER_EMAIL" ]; then
    echo "Let's set up Git first..."
    echo
    
    if [ -z "$USER_NAME" ]; then
        USER_NAME=$(get_input "Enter your name (for Git commits)" "")
        git config --global user.name "$USER_NAME"
    fi
    
    if [ -z "$USER_EMAIL" ]; then
        USER_EMAIL=$(get_input "Enter your email" "")
        git config --global user.email "$USER_EMAIL"
    fi
    
    echo "✅ Git configured!"
    echo
fi

cd /mnt/n/kanban-board/netlify-kanban

# Now set up the repository
echo "📁 Setting up repository..."

# Remove old .git if exists
rm -rf .git

# Initialize fresh
git init
git branch -M main

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
.env
.env.local
.netlify/
*.log
.DS_Store
dist/
build/
EOF

# Add and commit
git add .
git commit -m "Initial commit: Claude Kanban Board - Cloud Edition

Features:
- Drag and drop kanban board
- Full edit functionality for all fields  
- Optional Supabase integration for cloud sync
- Mobile responsive design
- Claude AI chat integration
- Deploy to Netlify in minutes"

echo
echo "✅ Repository prepared!"
echo
echo "🌐 Now let's push to GitHub..."
echo
echo "Choose an option:"
echo "1) I have a GitHub repository ready"
echo "2) I need to create one first"
echo

read -p "Your choice (1 or 2): " choice

if [ "$choice" = "1" ]; then
    echo
    GITHUB_USERNAME=$(get_input "Enter your GitHub username" "")
    REPO_NAME=$(get_input "Enter repository name" "claude-kanban-netlify")
    
    echo
    echo "🔗 Connecting to GitHub..."
    git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
    
    echo "🚀 Pushing to GitHub..."
    echo
    echo "📌 You may be prompted for your GitHub credentials."
    echo "   For password, use a Personal Access Token (not your password)"
    echo "   Create one at: https://github.com/settings/tokens"
    echo
    
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo
        echo "✅ Successfully pushed to GitHub!"
        echo "🌐 View at: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
        echo
        echo "🎯 Next: Deploy to Netlify"
        echo "1. Go to https://netlify.com"
        echo "2. 'Add new site' → 'Import an existing project'"
        echo "3. Connect GitHub and select: $REPO_NAME"
        echo "4. Deploy! Your board will be live in minutes!"
    else
        echo
        echo "❌ Push failed. Common fixes:"
        echo "1. Make sure the repository exists on GitHub"
        echo "2. Use a Personal Access Token as password"
        echo "3. Check your username and repository name"
    fi
    
else
    echo
    echo "📋 Create a GitHub repository:"
    echo "==============================="
    echo
    echo "1. Go to: https://github.com/new"
    echo "2. Repository name: claude-kanban-netlify"
    echo "3. Set as Public (for free Netlify hosting)"
    echo "4. DON'T initialize with README"
    echo "5. Click 'Create repository'"
    echo
    echo "Then run this script again and choose option 1!"
fi

echo
echo "💡 Tip: For easier GitHub operations, install GitHub CLI:"
echo "   https://cli.github.com"