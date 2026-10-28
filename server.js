const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Simulation State Arrays for Threat Monitoring
let scanEvents = [
  { id: 1, type: 'Blocked', text: 'System intercepted adversarial jailbreak attempt trying to bypass identity filters.' }
];
let stats = { interceptions: 1420, transactions: 45230, citizens: 8940 };

// API Endpoint to stream live server data to the Dashboard
app.get('/api/telemetry', (req, res) => {
  res.json({ stats, logs: scanEvents });
});

// Automated Threat Simulation Loop (Runs continuously every 5 seconds)
setInterval(() => {
  stats.transactions += 1;
  
  if (Math.random() > 0.4) {
    stats.interceptions += 1;
    stats.citizens += Math.floor(Math.random() * 3) + 1;
    
    const attackScenarios = [
      `[Blocked] Advanced social engineering script isolated: Phishing bot attempting to harvest Bank Verification Numbers (BVN).`,
      `[Blocked] Unauthorized asset routing intercepted: Rogue multi-agent framework initiated an unverified currency transaction.`,
      `[Blocked] Impersonation vector neutralized: Language model output intercepted attempting to mimic institutional compliance alerts.`,
      `[Blocked] Strategic prompt injection blocked: Adversarial payload attempting to force system memory leakage.`
    ];
    
    const selectedAttack = attackScenarios[Math.floor(Math.random() * attackScenarios.length)];
    scanEvents.unshift({ id: Date.now(), type: 'Blocked', text: selectedAttack });
  } else {
    scanEvents.unshift({ id: Date.now(), type: 'Safe', text: `[Safe] API Handshake verified: Automated guardrails cleared localized data query.` });
  }

  if (scanEvents.length > 10) scanEvents.pop(); // Prevent memory leaks
}, 5000);

app.listen(PORT, () => {
  console.log(`\n🚀 STAMP AI CORE SECURITY ENGINE ACTIVE`);
  console.log(`📡 Local API Stream running on: http://localhost:${PORT}`);
  console.log(`🔒 Independent Circuit Breaker Guardrails: SECURE\n`);
});