# 🚀 Deploy to Netlify - Claude Kanban Board

## Quick Deploy (5 minutes)

### Option 1: Deploy Button (Easiest)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/claude-kanban-netlify)

### Option 2: Manual Deploy

1. **Create GitHub Repository**
   ```bash
   cd /mnt/n/kanban-board/netlify-kanban
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create claude-kanban-netlify --public
   git push -u origin main
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select your repo
   - Deploy settings are automatic (netlify.toml)
   - Click "Deploy site"

3. **Your board is live!** 🎉
   - Access from anywhere: `https://your-site-name.netlify.app`

## Optional: Enable Cloud Sync (Supabase)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project (free tier is fine)
3. Save your project URL and anon key

### 2. Create Database Tables
Run this SQL in Supabase SQL editor:

```sql
-- Projects table
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT,
  column_name TEXT DEFAULT 'backlog',
  subtasks JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Users can only see their own projects
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

-- Chat messages table
CREATE TABLE chat_messages (
  id SERIAL PRIMARY KEY,
  project_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  message TEXT NOT NULL,
  sender TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for chat
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chat messages" ON chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = chat_messages.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own chat messages" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 3. Add Environment Variables to Netlify
1. Go to your Netlify site settings
2. Navigate to "Environment variables"
3. Add these variables:
   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   CLAUDE_API_KEY=your_claude_api_key (optional)
   ```

4. Redeploy your site

## Features by Deployment Type

| Feature | Local Only | With Supabase |
|---------|------------|---------------|
| Drag & drop | ✅ | ✅ |
| Full edit modal | ✅ | ✅ |
| Mobile access | ✅ | ✅ |
| Offline work | ✅ | ✅ |
| Cross-device sync | ❌ | ✅ |
| User accounts | ❌ | ✅ |
| Data backup | ❌ | ✅ |
| Team sharing | ❌ | ✅ (future) |

## Custom Domain (Optional)
1. In Netlify site settings → Domain management
2. Add custom domain
3. Follow DNS instructions

## Usage

### Without Supabase (Local Storage)
- Works immediately
- Data saved in browser
- No login required
- Perfect for personal use

### With Supabase (Cloud Sync)
- Create account or sign in
- Data syncs across devices
- Access from anywhere
- Never lose your data

## Claude Integration

### Option 1: Copy/Paste (Default)
- Click chat on any project
- Copy the context
- Paste to Claude

### Option 2: API Key (Advanced)
- Click "🔑 Claude API" 
- Enter your API key
- Direct integration (coming soon)

## 🎉 You're Done!
Your kanban board is now:
- Accessible from anywhere
- Mobile-friendly
- Always up-to-date
- Free to use!

Visit your site: `https://your-site-name.netlify.app`