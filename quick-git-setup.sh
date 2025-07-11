#!/bin/bash

echo "🚀 Quick Git Setup for Claude Kanban"
echo "===================================="
echo

cd /mnt/n/kanban-board/netlify-kanban

# Initialize git
echo "📁 Initializing git repository..."
git init

# Create .gitignore
echo "📝 Creating .gitignore..."
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

# Add all files
echo "📦 Adding all files..."
git add .

# Initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Claude Kanban Board - Cloud Edition

Features:
- Drag and drop kanban board
- Full edit functionality for all fields
- Optional Supabase integration for cloud sync
- Mobile responsive design
- Claude AI chat integration
- Deploy to Netlify in minutes"

echo
echo "✅ Git repository ready!"
echo
echo "📋 Next steps:"
echo "1. Create a new repository on GitHub: https://github.com/new"
echo "   - Name: claude-kanban-netlify"
echo "   - Public repository (for free Netlify hosting)"
echo "   - DON'T initialize with README"
echo
echo "2. After creating, copy these commands:"
echo
echo "   git remote add origin https://github.com/YOUR_USERNAME/claude-kanban-netlify.git"
echo "   git branch -M main" 
echo "   git push -u origin main"
echo
echo "3. Then deploy to Netlify!"
echo
echo "📚 Full guide: GITHUB-PUSH-COMMANDS.md"