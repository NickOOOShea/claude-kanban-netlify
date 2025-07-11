// Claude Max Plan Integration - No API Key Needed!

class ClaudeMaxIntegration {
    constructor() {
        this.baseUrl = window.location.origin;
    }

    // Generate rich context that Claude can understand
    generateProjectContext(project) {
        const subtasks = (project.subtasks || [])
            .map(t => `- [${t.done ? 'x' : ' '}] ${t.text}`)
            .join('\n');

        return `[KANBAN PROJECT UPDATE]
Project: ${project.title} (${project.id})
URL: ${this.baseUrl}/#project=${project.id}
Status: ${project.column || 'backlog'}
Priority: ${project.priority || 'medium'}
Description: ${project.description || 'No description'}

Subtasks:
${subtasks}

Recent Activity:
${this.getRecentActivity(project.id)}

Context: I'm using the Claude Max plan and updating my kanban board.
Please help me with this project and provide any updates I should make.`;
    }

    // Enhanced copy with visual feedback
    async copyProjectContext(project) {
        const context = this.generateProjectContext(project);
        
        try {
            await navigator.clipboard.writeText(context);
            
            // Visual feedback
            this.showToast('📋 Context copied! Paste in Claude', 'success');
            
            // Store for reference
            localStorage.setItem('lastClaudePrompt', JSON.stringify({
                projectId: project.id,
                timestamp: new Date().toISOString(),
                context: context
            }));
            
            return true;
        } catch (err) {
            this.showToast('Failed to copy. Select and copy manually.', 'error');
            this.showContextModal(context);
            return false;
        }
    }

    // Parse Claude's response for updates
    parseClaudeResponse(text) {
        const updates = {};
        
        // Look for structured updates
        const moveMatch = text.match(/MOVE[:\s]+(\w+)/i);
        if (moveMatch) {
            updates.column = moveMatch[1].toLowerCase();
        }
        
        const subtaskMatches = text.match(/SUBTASKS?:([\s\S]*?)(?=\n\n|$)/i);
        if (subtaskMatches) {
            updates.subtasks = this.parseSubtasks(subtaskMatches[1]);
        }
        
        const priorityMatch = text.match(/PRIORITY[:\s]+(high|medium|low)/i);
        if (priorityMatch) {
            updates.priority = priorityMatch[1].toLowerCase();
        }
        
        return updates;
    }

    // Auto-update from clipboard
    async checkClipboardForUpdates() {
        try {
            const text = await navigator.clipboard.readText();
            
            // Check if it looks like a Claude response about our project
            if (text.includes('[KANBAN UPDATE]') || text.includes('kanban board update')) {
                const updates = this.parseClaudeResponse(text);
                
                if (Object.keys(updates).length > 0) {
                    this.showToast('🔄 Found updates from Claude!', 'info');
                    return updates;
                }
            }
        } catch (err) {
            // Clipboard access denied
        }
        
        return null;
    }

    // Show floating toast notification
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 24px;
            background: ${type === 'success' ? '#238636' : type === 'error' ? '#f85149' : '#1f6feb'};
            color: white;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Show context in modal if copy fails
    showContextModal(context) {
        const modal = document.createElement('div');
        modal.className = 'context-modal';
        modal.innerHTML = `
            <div style="background: #161b22; padding: 2rem; border-radius: 8px; max-width: 600px; margin: 5% auto;">
                <h3>Copy this to Claude:</h3>
                <textarea style="width: 100%; height: 300px; background: #0d1117; color: #c9d1d9; border: 1px solid #30363d; padding: 1rem; border-radius: 6px;" readonly>${context}</textarea>
                <button onclick="this.parentElement.parentElement.remove()" style="margin-top: 1rem;">Close</button>
            </div>
        `;
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
        `;
        
        document.body.appendChild(modal);
        modal.querySelector('textarea').select();
    }

    // Get recent activity for context
    getRecentActivity(projectId) {
        const history = JSON.parse(localStorage.getItem(`history_${projectId}`) || '[]');
        return history.slice(-3).map(h => `- ${h.action} at ${new Date(h.timestamp).toLocaleString()}`).join('\n') || '- No recent activity';
    }

    // Smart paste detection
    enableSmartPaste() {
        document.addEventListener('paste', async (e) => {
            const text = e.clipboardData.getData('text');
            
            // Check if this is a Claude response
            if (this.looksLikeClaudeResponse(text)) {
                e.preventDefault();
                
                const updates = this.parseClaudeResponse(text);
                if (Object.keys(updates).length > 0) {
                    this.showToast('🤖 Applying Claude\'s suggestions...', 'success');
                    // Apply updates through your existing update mechanism
                    window.applyProjectUpdates?.(updates);
                }
            }
        });
    }

    looksLikeClaudeResponse(text) {
        const indicators = [
            'kanban update',
            'move to',
            'mark as complete',
            'subtask',
            'priority:',
            'project update'
        ];
        
        const lowerText = text.toLowerCase();
        return indicators.some(indicator => lowerText.includes(indicator));
    }
}

// Initialize on load
window.claudeMax = new ClaudeMaxIntegration();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}

.toast {
    transition: all 0.3s ease;
}

.toast:hover {
    transform: scale(1.05);
}
`;
document.head.appendChild(style);