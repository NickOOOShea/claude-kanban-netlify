# ☁️ Claude Kanban - Cloud Edition

A beautiful, real-time kanban board with Claude AI integration, deployable to Netlify in minutes!

![Claude Kanban Demo](https://via.placeholder.com/800x400?text=Claude+Kanban+Board)

## ✨ Features

- 🎯 **Drag & Drop** - Visual project management
- ✏️ **Full Editing** - Edit everything: title, description, priority, subtasks
- 📱 **Mobile Friendly** - Works perfectly on phones and tablets
- ☁️ **Cloud Sync** - Optional Supabase integration for cross-device sync
- 💬 **Claude Chat** - AI assistance for every project
- 🔒 **Secure** - Your data, your control
- 🚀 **Fast Deploy** - Live in 5 minutes on Netlify

## 🚀 Quick Start

### Deploy to Netlify (Recommended)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/claude-kanban-netlify)

### Local Development
```bash
npm install
npm run dev
# Opens at http://localhost:8888
```

## 📖 Documentation

- [Deploy to Netlify Guide](./DEPLOY-TO-NETLIFY.md)
- [Supabase Setup (Optional)](./DEPLOY-TO-NETLIFY.md#optional-enable-cloud-sync-supabase)
- [Environment Variables](./.env.example)

## 🎯 How It Works

### Without Supabase (Default)
- Uses browser local storage
- Works offline
- No setup required
- Perfect for personal use

### With Supabase (Optional)
- Real-time sync across devices
- User authentication
- Cloud backup
- Team collaboration (coming soon)

## 💬 Claude Integration

### Basic Mode
1. Click chat on any project
2. Ask your question
3. Copy the generated context
4. Paste to Claude for AI assistance

### API Mode (Coming Soon)
- Add your Claude API key
- Get direct responses in the chat
- Automatic project updates

## 🛠 Tech Stack

- **Frontend**: Vanilla JavaScript (no build step!)
- **Hosting**: Netlify
- **Database**: Supabase (optional)
- **AI**: Claude API (optional)
- **Styling**: Custom CSS with dark theme

## 📱 Mobile Access

Once deployed to Netlify:
1. Visit your site on mobile: `https://your-site.netlify.app`
2. Add to home screen for app-like experience
3. Full functionality on the go!

## 🔐 Privacy & Security

- **Local Mode**: All data stays in your browser
- **Cloud Mode**: Data encrypted at rest in Supabase
- **API Keys**: Stored locally, never sent to our servers
- **Open Source**: Audit the code yourself

## 🤝 Contributing

Feel free to submit issues and PRs! This is a community project.

## 📄 License

MIT - Use it however you like!

---

Built with ❤️ for the Claude community