import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'

const app = express()
const PORT = 3847

app.use(cors({ origin: ['https://jarod.info', 'https://www.jarod.info', 'http://localhost:5173'] }))
app.use(express.json({ limit: '16kb' }))

const resend = new Resend(process.env.RESEND_API_KEY || '')

const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT = 5
const RATE_WINDOW = 5 * 60 * 1000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (rateLimitMap.get(ip) || []).filter(t => now - t < RATE_WINDOW)
  rateLimitMap.set(ip, timestamps)
  if (timestamps.length >= RATE_LIMIT) return true
  timestamps.push(now)
  return false
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function sanitizeEmail(s: string): string {
  return s.replace(/[\r\n]/g, '').trim()
}

app.post('/api/contact', async (req, res) => {
  const ip = req.socket.remoteAddress || 'unknown'

  if (isRateLimited(ip)) {
    res.status(429).json({ error: 'Too many requests' })
    return
  }

  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: 'Missing fields' })
    return
  }

  if (req.body.website) {
    res.json({ success: true })
    return
  }

  if (typeof name !== 'string' || typeof email !== 'string' || typeof subject !== 'string' || typeof message !== 'string') {
    res.status(400).json({ error: 'Invalid fields' })
    return
  }

  if (name.length > 200 || email.length > 200 || subject.length > 500) {
    res.status(400).json({ error: 'Field too long' })
    return
  }

  if (message.length < 3 || message.length > 5000) {
    res.status(400).json({ error: 'Invalid message length' })
    return
  }

  const cleanEmail = sanitizeEmail(email)
  if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(cleanEmail)) {
    res.status(400).json({ error: 'Invalid email' })
    return
  }

  try {
    await resend.emails.send({
      from: 'Portfolio Jarod <noreply@jarod.info>',
      to: 'jarodross852@gmail.com',
      replyTo: cleanEmail,
      subject: `[Portfolio] ${escapeHtml(subject)} - ${escapeHtml(name)}`,
      html: `
        <h3>Nouveau message depuis jarod.info</h3>
        <p><strong>Nom:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
        <p><strong>Sujet:</strong> ${escapeHtml(subject)}</p>
        <hr/>
        <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      `,
    })
    res.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`)
})
