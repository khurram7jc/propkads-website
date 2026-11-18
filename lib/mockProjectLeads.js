// Realistic Mock Buyer Leads for Project Leads (Karachi Enclave & Future Projects)
// Matches actual buyer forms: Name, Phone, City/Country, Project, Unit Interest

const BUYER_NAMES = [
  'Faraz Hashmi', 'Tariq Aziz', 'Sohail Mehmood', 'Dr. Arshad Vohra', 'Junaid Siddiqui',
  'Capt. Naveed Anwer', 'Zeeshan Merchant', 'Khurram Shehzad', 'Mian Bilal', 'Syed Owais Ali',
  'Adnan Chawla', 'Faisal Lakhani', 'Shahid Memon', 'Rizwan Tabani', 'Atif Bawany',
  'Mohammad Salman', 'Hassan Raza', 'Engr. Imran Qureshi', 'Adeel Mansoor', 'Omer Farooq',
  'Danish Feroz', 'Waqar Younus', 'Ali Shan', 'Saad Ghaffar', 'Bilal Parekh',
  'Noman Moten', 'Umair Jafri', 'Hamid Noor', 'Haroon Rasheed', 'Asadullah Khan',
  'Nasir Mehmood', 'Taimoor Baig', 'Mustafa Kamal', 'Farooq Sattar', 'Javed Afridi',
  'Raza Haroon', 'Wasim Akhtar', 'Mirza Ishtiaq', 'Kamran Farooqi', 'Suleman Chawla',
  'Fawad Chundrigar', 'Murtaza Wahab', 'Saleem Mandviwalla', 'Aminul Haque', 'Zubair Motiwala',
  'Hanif Gohar', 'Mohsin Sheikhani', 'Babar Chughtai', 'Akbar Dhedhi', 'Arif Habib',
  'Asim Majeed', 'Khalid Tawab', 'Majid Sultan', 'Rehan Zafar', 'Shabbir Diwan',
  'Tanveer Ahmed', 'Zahid Hussain', 'Qasim Suri', 'Rashid Godil', 'Shahbaz Zaheer'
];

const CITIES = [
  'Karachi', 'Dubai (UAE)', 'Karachi', 'Riyadh (KSA)', 'Karachi',
  'London (UK)', 'Karachi', 'Doha (Qatar)', 'Karachi', 'Jeddah (KSA)',
  'Lahore', 'Karachi', 'Abu Dhabi (UAE)', 'Islamabad', 'Muscat (Oman)', 'Karachi'
];

const UNITS = [
  'Emerald (1230 SQFT) - PKR 1.72 Cr',
  'Ruby (1230 SQFT) - PKR 1.72 Cr',
  'Sapphire (935 SQFT) - PKR 1.30 Cr',
  'Opal (840 SQFT) - PKR 1.17 Cr',
];

const PHONE_PREFIXES = ['0300', '0321', '0333', '0345', '0312', '+97150', '+96650', '+44770', '0301', '0322'];

export const INITIAL_MOCK_PROJECT_LEADS = BUYER_NAMES.map((name, i) => {
  const city = CITIES[i % CITIES.length];
  const unit = UNITS[i % UNITS.length];
  const prefix = PHONE_PREFIXES[i % PHONE_PREFIXES.length];
  const randNum = String(1000000 + ((i * 8429 + 3147) % 8999999));
  const phone = prefix.startsWith('+') ? `${prefix}${randNum.substring(0, 7)}` : `${prefix}${randNum.substring(0, 7)}`;

  // Spread over 45 days
  const hoursAgo = Math.floor(i * 18);
  const createdDate = new Date(Date.now() - hoursAgo * 3600000);

  return {
    id: 1000 + i + 1,
    full_name: name,
    company_name: 'Karachi Enclave',
    phone,
    city,
    inventory_type: 'Apartments',
    lead_category: 'project',
    project_name: 'Karachi Enclave',
    unit_interest: unit,
    status: i < 4 ? 'New' : (i < 18 ? 'Contacted' : (i < 35 ? 'Qualified' : (i < 48 ? 'Site Visit' : 'Deal Closed'))),
    next_followup_date: null,
    next_action_type: null,
    created_at: createdDate.toISOString(),
  };
});

export let liveLocalDevProjectLeads = [...INITIAL_MOCK_PROJECT_LEADS];

export function addLocalDevProjectLead(newLead) {
  liveLocalDevProjectLeads.unshift(newLead);
  return newLead;
}

export function updateLocalDevProjectLead(id, updates) {
  liveLocalDevProjectLeads = liveLocalDevProjectLeads.map((l) => (l.id === Number(id) ? { ...l, ...updates } : l));
}

export function deleteLocalDevProjectLead(id) {
  liveLocalDevProjectLeads = liveLocalDevProjectLeads.filter((l) => l.id !== Number(id));
}
