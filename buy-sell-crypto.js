// Tailwind config
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#10b981'
      }
    }
  }
};

// EmailJS – initialize with your latest Public Key
emailjs.init("BiNc8n2T-ZpP-sCCB");

// Your deposit addresses
const depositAddresses = {
  bitcoin: '18fCR3GBtkfxcVrw7n4523oi3bytWXLUBA',
  'tether-trc20': 'THUFJogqvsAqSw78ffKAKcC9FWfUoBfYbg',
  'tether-erc20': '0x72fd79cea3ad52c54cfb08163dc07aaf172dfe63',
  'tether-bep20': '0x72fd79cea3ad52c54cfb08163dc07aaf172dfe63',
  'tether-sol': '7qqsriSEqvfRiKq7G58BoimwyBiZY2pEXuMtbxBD86w2',
  'tether-polygon': '0x72fd79cea3ad52c54cfb08163dc07aaf172dfe63',
  'tether-avax': '0x72fd79cea3ad52c54cfb08163dc07aaf172dfe63',
  'tether-ton': 'UQDUR6mQvZnDdtyi0e2lgzyQik8V_x0RpRfdVNiKqpUuHmv4'
};

// Bank codes for Paystack resolve (add more if needed)
const bankCodes = {
  access: '044',
  gtbank: '058',
  zenith: '057',
  firstbank: '011',
  uba: '033',
  stanbic: '221',
  fidelity: '070',
  opay: '999992',
  palmpay: '999991',
  kuda: '999988',
  moniepoint: '999999'
};

// ────────────────────────────────────────────────
// Tabs
// ────────────────────────────────────────────────
const buyTab = document.getElementById('buyTab');
const sellTab = document.getElementById('sellTab');
const buySection = document.getElementById('buySection');
const sellSection = document.getElementById('sellSection');

buyTab.onclick = () => {
  buyTab.classList.add('border-primary', 'text-primary');
  sellTab.classList.remove('border-primary', 'text-primary');
  buySection.classList.remove('hidden');
  sellSection.classList.add('hidden');
  toggleBuyNetwork(); // force refresh
};

sellTab.onclick = () => {
  sellTab.classList.add('border-primary', 'text-primary');
  buyTab.classList.remove('border-primary', 'text-primary');
  sellSection.classList.remove('hidden');
  buySection.classList.add('hidden');
  toggleSellNetwork(); // force refresh
  updateSellDepositAddress(); // force address update
};

// ────────────────────────────────────────────────
// Buy Network visibility
// ────────────────────────────────────────────────
const buyCryptoSelect = document.getElementById('buyCrypto');
const buyNetworkGroup = document.getElementById('buyNetworkGroup');

function toggleBuyNetwork() {
  buyNetworkGroup.style.display = buyCryptoSelect.value === 'tether' ? 'block' : 'none';
}
buyCryptoSelect.addEventListener('change', toggleBuyNetwork);
toggleBuyNetwork();

// ────────────────────────────────────────────────
// Sell Network visibility + Deposit Address
// ────────────────────────────────────────────────
const sellCryptoSelect = document.getElementById('sellCrypto');
const sellNetworkGroup = document.getElementById('sellNetworkGroup');

function toggleSellNetwork() {
  sellNetworkGroup.style.display = sellCryptoSelect.value === 'tether' ? 'block' : 'none';
}
sellCryptoSelect.addEventListener('change', toggleSellNetwork);
toggleSellNetwork();

function updateSellDepositAddress() {
  const crypto = sellCryptoSelect.value;
  const network = sellNetworkGroup.style.display === 'block' ? document.getElementById('sellNetwork').value : null;
  const key = crypto === 'bitcoin' ? 'bitcoin' : (network ? `tether-${network}` : null);
  const address = key && depositAddresses[key] ? depositAddresses[key] : 'Select crypto/network above';

  document.getElementById('depositAddress').textContent = address;

  const copyBtn = document.getElementById('copyAddressBtn');
  if (address !== 'Select crypto/network above') {
    copyBtn.classList.remove('hidden');
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(address).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy', 2000);
      });
    };
  } else {
    copyBtn.classList.add('hidden');
  }
}

// Call on every change
sellCryptoSelect.addEventListener('change', updateSellDepositAddress);
document.getElementById('sellNetwork').addEventListener('change', updateSellDepositAddress);
document.getElementById('sellCryptoAmount').addEventListener('input', updateSellDepositAddress); // extra trigger

// Initial
updateSellDepositAddress();

// ────────────────────────────────────────────────
// Live Rates – FIXED (explicit params + fallback + debug)
// ────────────────────────────────────────────────
let rates = { bitcoin: 95000000, tether: 1650 };

async function fetchRates() {
  try {
    const params = new URLSearchParams();
    params.append('ids', 'bitcoin,tether');
    params.append('vs_currencies', 'ngn');

    const url = `https://api.coingecko.com/api/v3/simple/price?${params.toString()}`;
    console.log('Fetching rates from:', url);

    const res = await fetch(url);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    console.log('CoinGecko response:', data); // debug

    rates.bitcoin = data.bitcoin?.ngn || rates.bitcoin;
    rates.tether  = data.tether?.ngn  || rates.tether;

    const rateText = `Live: 1 BTC ≈ ₦${rates.bitcoin.toLocaleString()} | 1 USDT ≈ ₦${rates.tether.toLocaleString()}`;
    document.getElementById('liveRate').textContent = rateText;
    document.getElementById('liveRateSell').textContent = rateText;

    updateBuyPreview();
    updateSellPreview();
  } catch (err) {
    console.error('CoinGecko fetch error:', err.message);
    document.getElementById('liveRate').textContent = 'Rates offline – using approx values';
    document.getElementById('liveRateSell').textContent = 'Rates offline – using approx values';
  }
}

fetchRates();
setInterval(fetchRates, 20000);

// ────────────────────────────────────────────────
// BUY Logic
// ────────────────────────────────────────────────
const PLATFORM_FEE_PERCENT = 10;

function updateBuyPreview() {
  const cryptoAmt = parseFloat(document.getElementById('buyCryptoAmount').value) || 0;
  const crypto = buyCryptoSelect.value;
  const rate = crypto === 'bitcoin' ? rates.bitcoin : rates.tether;

  if (cryptoAmt <= 0 || rate <= 0) {
    document.getElementById('feeInfoBuy').innerHTML = 'Enter amount above';
    return;
  }

  const baseNgn = cryptoAmt * rate;
  const fee = baseNgn * (PLATFORM_FEE_PERCENT / 100);
  const totalNgn = baseNgn + fee;

  document.getElementById('feeInfoBuy').innerHTML = `
    You will pay (incl. 10% fee): ₦${totalNgn.toLocaleString(undefined, {minimumFractionDigits: 2})}<br>
    You buy: ${cryptoAmt.toFixed(6)} ${crypto.toUpperCase()}
  `;
}

document.getElementById('buyCryptoAmount').oninput = updateBuyPreview;
buyCryptoSelect.addEventListener('change', updateBuyPreview);

// Paystack buy
document.getElementById('buyPay').onclick = () => {
  const email = document.getElementById('buyEmail').value.trim();
  if (!email || !email.includes('@')) return alert('Please enter a valid email');

  const cryptoAmt = parseFloat(document.getElementById('buyCryptoAmount').value) || 0;
  if (cryptoAmt <= 0) return alert('Enter amount of crypto to buy');

  const crypto = buyCryptoSelect.value;
  const network = document.getElementById('buyNetwork').value;
  const address = document.getElementById('buyAddress').value.trim();

  if (crypto === 'tether') {
    if (!network) return alert('Select a USDT network');
    if (!isValidAddress(address, network)) return alert(`Invalid address for ${network.toUpperCase()} network!`);
  }

  const rate = crypto === 'bitcoin' ? rates.bitcoin : rates.tether;
  const baseNgn = cryptoAmt * rate;
  const fee = baseNgn * (PLATFORM_FEE_PERCENT / 100);
  const total = baseNgn + fee;

  if (total < 5000) return alert('Amount too small – minimum equivalent to ₦5,000');

  PaystackPop.setup({
    key: 'pk_live_d78b8fd463798d9e7ad954066b5c8fa41867d569',
    email: email,
    amount: Math.round(total * 100),
    currency: 'NGN',
    ref: 'BUY-' + Date.now(),
    callback: response => {
      document.getElementById('buyStatus').innerHTML = 
        `<span class="text-green-500">Success! Ref: ${response.reference}</span><br>` +
        `We'll send ${cryptoAmt.toFixed(6)} ${crypto.toUpperCase()} shortly.`;
    },
    onClose: () => alert('Payment cancelled')
  }).openIframe();
};

// ────────────────────────────────────────────────
// SELL Logic with EmailJS – FIXED recipient handling
// ────────────────────────────────────────────────
function updateSellPreview() {
  const cryptoAmt = parseFloat(document.getElementById('sellCryptoAmount').value) || 0;
  const crypto = sellCryptoSelect.value;
  const rate = crypto === 'bitcoin' ? rates.bitcoin : rates.tether;

  if (cryptoAmt <= 0 || rate <= 0) {
    document.getElementById('feeInfoSell').innerHTML = 'Enter amount above';
    return;
  }

  const gross = cryptoAmt * rate;
  const fee = gross * (PLATFORM_FEE_PERCENT / 100);
  const net = gross - fee;

  document.getElementById('feeInfoSell').innerHTML = `
    Estimated NGN you will receive: ₦${net.toLocaleString(undefined, {minimumFractionDigits: 2})}<br>
    You sell: ${cryptoAmt.toFixed(6)} ${crypto.toUpperCase()}
  `;
}

document.getElementById('sellCryptoAmount').oninput = updateSellPreview;
sellCryptoSelect.addEventListener('change', updateSellPreview);

// Sell submit with EmailJS – FIXED
document.getElementById('sellSubmit').onclick = () => {
  // Validation
  const sellEmail = document.getElementById('sellEmail').value.trim();
  if (!sellEmail || !sellEmail.includes('@')) {
    alert('Please enter a valid email for confirmation');
    return;
  }

  const cryptoAmt = document.getElementById('sellCryptoAmount').value;
  if (!cryptoAmt || cryptoAmt <= 0) return alert('Enter amount of crypto to sell');

  const bankName = document.getElementById('sellBankName').value;
  if (!bankName) return alert('Select a bank');

  const accountNumber = document.getElementById('sellBankAccount').value.trim();
  if (accountNumber.length !== 10 || !/^\d{10}$/.test(accountNumber)) return alert('Account number must be exactly 10 digits');

  const accountName = document.getElementById('sellAccountName').value.trim();
  if (!accountName) return alert('Enter account name');

  // Collect data for both emails
  const sellData = {
    to_name: accountName,              // for personalization in template
    to_email: sellEmail,               // FIXED: matches {{to_email}} in your template
    crypto: document.getElementById('sellCrypto').value.toUpperCase(),
    network: document.getElementById('sellNetwork')?.value?.toUpperCase() || 'Native',
    amount: cryptoAmt,
    deposit_address: document.getElementById('depositAddress').textContent,
    bank_name: document.getElementById('sellBankName').options[document.getElementById('sellBankName').selectedIndex]?.text || 'Not selected',
    account_number: accountNumber,
    account_name: accountName,
    estimated_ngn: document.getElementById('feeInfoSell').textContent.match(/₦[\d,]+\.?\d*/)?.[0] || 'Calculating',
    timestamp: new Date().toLocaleString()
  };

  console.log('Sending emails with data:', sellData); // debug – look for to_email here

  // Send admin email (to you)
  emailjs.send('service_jfyow68', 'template_w1u450g', sellData)
    .then(() => console.log('Admin email sent successfully'))
    .catch(err => console.error('Admin email failed:', err));

  // Send confirmation email to user
  emailjs.send('service_jfyow68', 'template_1c4fvth', sellData)
    .then(() => {
      document.getElementById('sellStatus').innerHTML = 
        '<div class="text-green-600 font-bold text-xl">Sell request sent successfully!</div>' +
        '<div class="mt-2 text-sm">Confirmation sent to your email. We will process soon.</div>';
    })
    .catch(err => {
      console.error('User confirmation email failed:', err);
      document.getElementById('sellStatus').innerHTML = 
        '<div class="text-red-600">Request submitted, but confirmation email failed. Contact support via WhatsApp.</div>';
    });
};

// Initial calls
updateBuyPreview();
updateSellPreview();
updateSellDepositAddress();

// Address validator (for buy)
function isValidAddress(addr, network) {
  if (!addr || addr.length < 10) return false;
  const validators = {
    trc20: addr.startsWith('T'),
    erc20: addr.startsWith('0x') && addr.length === 42,
    bep20: addr.startsWith('0x') && addr.length === 42,
    sol: addr.length >= 32 && /^[1-9A-HJ-NP-Za-km-z]+$/.test(addr),
    polygon: addr.startsWith('0x') && addr.length === 42,
    avax: addr.startsWith('0x') && addr.length === 42,
    ton: addr.startsWith('EQ') || addr.startsWith('UQ') || addr.startsWith('kQ')
  };
  return validators[network] || false;
}

// Load all Nigerian banks from Paystack API (no auth needed)
async function loadBanks() {
  const select = document.getElementById('sellBankName');
  select.innerHTML = '<option value="">Loading banks...</option>';

  try {
    const res = await fetch('https://api.paystack.co/bank');
    const data = await res.json();

    if (data.status) {
      select.innerHTML = '<option value="">Select Bank</option>';

      data.data.forEach(bank => {
        const option = document.createElement('option');
        option.value = bank.code;           // use code for future account resolution
        option.textContent = bank.name;
        select.appendChild(option);
      });

      // Add "Other" at the end
      const other = document.createElement('option');
      other.value = 'other';
      other.textContent = 'Other (type bank name)';
      select.appendChild(other);
    } else {
      throw new Error('Failed to load banks');
    }
  } catch (err) {
    console.error('Failed to load banks:', err);
    // Fallback to hardcoded list if API fails
    select.innerHTML = `
      <option value="">Select Bank</option>
      <option value="access">Access Bank</option>
      <option value="gtbank">GTBank</option>
      <option value="zenith">Zenith Bank</option>
      <option value="firstbank">First Bank</option>
      <option value="uba">UBA</option>
      <option value="stanbic">Stanbic IBTC</option>
      <option value="fidelity">Fidelity Bank</option>
      <option value="opay">Opay</option>
      <option value="palmpay">PalmPay</option>
      <option value="kuda">Kuda Bank</option>
      <option value="moniepoint">Moniepoint</option>
      <option value="other">Other (type bank name)</option>
    `;
  }
}

// Run on page load
loadBanks();

// Show/hide manual fields when "Other" is selected
document.getElementById('sellBankName').addEventListener('change', function() {
  const isOther = this.value === 'other';
  document.getElementById('otherBankGroup').classList.toggle('hidden', !isOther);
  document.getElementById('otherAccountNameGroup').classList.toggle('hidden', !isOther);

  // Clear manual fields when switching away
  if (!isOther) {
    document.getElementById('sellOtherBankName').value = '';
    document.getElementById('sellOtherAccountName').value = '';
  }
});

// ────────────────────────────────────────────────
// Dynamic Footer Stats (runs on page load)
// ────────────────────────────────────────────────

function updateFooterStats() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const daysSinceEpoch = Math.floor((now.getTime() - new Date(2025, 0, 1).getTime()) / (1000 * 60 * 60 * 24));

  // Successful trades: start from 999647 + 2 per day
  const baseSuccessful = 999647;
  const successful = baseSuccessful + (daysSinceEpoch * 2);
  document.querySelector('[data-stat="successful"]').textContent = successful.toLocaleString() + '+';

  // Pending trades: random 0–3 during the day, reset at midnight
  const hoursSinceMidnight = now.getHours();
  const pendingRandom = Math.floor(Math.random() * 4); // 0 to 3
  const pending = hoursSinceMidnight > 0 ? pendingRandom : 0;
  document.querySelector('[data-stat="pending"]').textContent = pending;

  // Refunded trades: +1 every 7 days
  const baseRefunded = 50;
  const refunded = baseRefunded + Math.floor(daysSinceEpoch / 7);
  document.querySelector('[data-stat="refunded"]').textContent = refunded;
}

// Run on load
updateFooterStats();

// Optional: update pending trades every 5 minutes (simulate new pending)
setInterval(() => {
  const pendingEl = document.querySelector('[data-stat="pending"]');
  if (pendingEl) {
    const current = parseInt(pendingEl.textContent) || 0;
    const change = Math.random() < 0.3 ? 1 : (Math.random() < 0.6 ? -1 : 0); // sometimes +1, sometimes -1
    const next = Math.max(0, Math.min(3, current + change));
    pendingEl.textContent = next;
  }
}, 5 * 60 * 1000);