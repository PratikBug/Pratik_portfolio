/**
 * Reads README.md and writes data/portfolio.json.
 * Expected README sections (## headers): Name, Role, Tagline, Location, Bio,
 * Skills, Projects, Experience, Contact.
 * Skills use ### Category then bullet lists (- item).
 * Projects use ### Title blocks with Description:, Tech:, Live:, Repo: lines.
 * Experience uses ### Role — Company | Period then bullet achievements.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const readmePath = path.join(root, 'README.md')
const outPath = path.join(root, 'data', 'portfolio.json')

function splitSections(markdown) {
  const lines = markdown.split(/\r?\n/)
  const sections = {}
  let current = null
  let buf = []

  const flush = () => {
    if (current) sections[current] = buf.join('\n').trim()
    buf = []
  }

  for (const line of lines) {
    const m = /^## ([^\n#]+)$/.exec(line)
    if (m) {
      flush()
      current = m[1].trim().toLowerCase().replace(/\s+/g, '_')
    } else if (current) {
      buf.push(line)
    }
  }
  flush()
  return sections
}

function parseSkillsBlock(text) {
  const skills = []
  const blocks = text.split(/^### /m).filter(Boolean)
  for (const block of blocks) {
    const [firstLine, ...rest] = block.split('\n')
    const category = firstLine.trim()
    const items = rest
      .map((l) => l.trim())
      .filter((l) => l.startsWith('-'))
      .map((l) => l.replace(/^-\s*/, '').trim())
      .filter(Boolean)
    if (category && items.length) skills.push({ category, items })
  }
  return skills
}

function parseProjectsBlock(text) {
  const projects = []
  const blocks = text.split(/^### /m).filter(Boolean)
  for (const block of blocks) {
    const lines = block.split('\n')
    const title = lines[0].trim()
    const body = lines.slice(1).join('\n')
    const descMatch = /\*\*Description:\*\*\s*(.+?)(?=\n\*\*|$)/s.exec(body)
    const techMatch = /\*\*Tech:\*\*\s*(.+)/.exec(body)
    const liveMatch = /\*\*Live:\*\*\s*(\S+)/.exec(body)
    const repoMatch = /\*\*Repo:\*\*\s*(\S+)/.exec(body)
    const description = descMatch ? descMatch[1].trim().replace(/\s+/g, ' ') : ''
    const tech = techMatch
      ? techMatch[1].split(/[,|]/).map((t) => t.trim()).filter(Boolean)
      : []
    const links = {}
    if (liveMatch) links.live = liveMatch[1]
    if (repoMatch) links.repo = repoMatch[1]
    if (title && description) projects.push({ title, description, tech, links })
  }
  return projects
}

function parseExperienceBlock(text) {
  const items = []
  const blocks = text.split(/^### /m).filter(Boolean)
  for (const block of blocks) {
    const lines = block.split('\n')
    const header = lines[0].trim()
    const part = header.split('|').map((s) => s.trim())
    const left = part[0] || ''
    const period = part[1] || ''
    const roleCompany = left.split('—').map((s) => s.trim())
    const title = roleCompany[0] || left
    const company = roleCompany[1] || ''
    const bullets = lines
      .slice(1)
      .map((l) => l.trim())
      .filter((l) => l.startsWith('-'))
      .map((l) => l.replace(/^-\s*/, '').trim())
      .filter(Boolean)
    if (title) items.push({ title, company, period, bullets })
  }
  return items
}

function parseContactBlock(text) {
  const contact = { email: '', linkedin: '', github: '', twitter: '' }
  const lines = text.split('\n').map((l) => l.replace(/\*\*/g, '').trim())
  for (const line of lines) {
    if (!line.startsWith('-')) continue
    const rest = line.replace(/^-\s*/, '')
    const emailM = /^Email\s*:\s*<?([^>\s]+@[^>\s]+)>?/i.exec(rest)
    const liM = /^LinkedIn\s*:\s*(\S+)/i.exec(rest)
    const ghM = /^GitHub\s*:\s*(\S+)/i.exec(rest)
    const twM = /^(Twitter|X)\s*:\s*(\S+)/i.exec(rest)
    if (emailM) contact.email = emailM[1]
    if (liM) contact.linkedin = liM[1]
    if (ghM) contact.github = ghM[1]
    if (twM) contact.twitter = twM[2]
  }
  return contact
}

function buildPortfolio(sections) {
  return {
    name: sections.name || 'Your Name',
    role: sections.role || 'Engineer',
    tagline: sections.tagline || '',
    location: sections.location || '',
    bio: sections.bio || '',
    skills: parseSkillsBlock(sections.skills || ''),
    projects: parseProjectsBlock(sections.projects || ''),
    experience: parseExperienceBlock(sections.experience || ''),
    contact: parseContactBlock(sections.contact || ''),
  }
}

function main() {
  if (!fs.existsSync(readmePath)) {
    console.error('README.md not found at', readmePath)
    process.exit(1)
  }
  const md = fs.readFileSync(readmePath, 'utf8')
  const sections = splitSections(md)
  const portfolio = buildPortfolio(sections)
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, JSON.stringify(portfolio, null, 2), 'utf8')
  console.log('Wrote', outPath)
}

main()
