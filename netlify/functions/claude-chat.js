const fetch = require('node-fetch');

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { projectContext, message, apiKey } = JSON.parse(event.body);
    
    // Use provided API key or environment variable
    const claudeApiKey = apiKey || process.env.CLAUDE_API_KEY;
    
    if (!claudeApiKey) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'No API key provided. Add your Claude API key in settings.' 
        })
      };
    }

    // Prepare the message for Claude
    const systemPrompt = `You are helping with a kanban board project. Here's the current project context:

Project: ${projectContext.title} (${projectContext.id})
Description: ${projectContext.description || 'No description'}
Priority: ${projectContext.priority}
Current Status: ${projectContext.column}
Subtasks:
${projectContext.subtasks.map(t => `- [${t.done ? 'x' : ' '}] ${t.text}`).join('\n')}

Provide helpful, concise responses about this project. If the user asks about implementation, provide code examples. If they ask about next steps, look at incomplete subtasks.`;

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': claudeApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `${systemPrompt}\n\nUser message: ${message}`
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Claude API error:', error);
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: 'Failed to get response from Claude. Check your API key.' 
        })
      };
    }

    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        response: data.content[0].text,
        usage: data.usage
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Server error. Please try again.' 
      })
    };
  }
};