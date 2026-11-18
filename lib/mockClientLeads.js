// 75 Realistic Mock Client Leads for Propkads Admin Portal Local Testing
// Strictly uses the 5 Website Form Property Types:
// 1. Apartments
// 2. Houses / Villas
// 3. Plots / Land
// 4. Shops / Commercial
// 5. Farmhouses

const NAMES = [
  'Muhammad Tariq', 'Farhan Ali', 'Kashif Mehmood', 'Zubair Sheikh', 'Asim Qureshi',
  'Bilal Khan', 'Kamran Siddiqui', 'Imran Abbasi', 'Waqas Ahmed', 'Usman Ghani',
  'Hamza Javed', 'Saad Rafiq', 'Adnan Malik', 'Noman Rauf', 'Rehan Baig',
  'Faisal Haroon', 'Rashid Minhas', 'Babar Azam', 'Junaid Jamshed', 'Shoaib Akhtar',
  'Rizwan Munir', 'Haris Rauf', 'Shadab Khan', 'Fakhar Zaman', 'Shaheen Afridi',
  'Naseem Shah', 'Abrar Ahmed', 'Saud Shakeel', 'Abdullah Shafique', 'Salman Ali Agha',
  'Hassan Ali', 'Imad Wasim', 'Sarfaraz Ahmed', 'Mohammad Amir', 'Wahab Riaz',
  'Umar Akmal', 'Ahmed Shehzad', 'Sohail Tanvir', 'Yasir Shah', 'Azhar Ali',
  'Asad Shafiq', 'Misbah ul Haq', 'Younis Khan', 'Inzamam ul Haq', 'Saeed Anwar',
  'Aamer Sohail', 'Wasim Akram', 'Waqar Younis', 'Shoaib Malik', 'Shahid Afridi',
  'Abdul Razzaq', 'Moin Khan', 'Rashid Latif', 'Mushtaq Ahmed', 'Saqlain Mushtaq',
  'Shoaib Mohammad', 'Mudassar Nazar', 'Zaheer Abbas', 'Javed Miandad', 'Majid Khan',
  'Asif Iqbal', 'Hanif Mohammad', 'Fazal Mahmood', 'Abdul Qadir', 'Imran Khan',
  'Tariq Jamil', 'Owais Qarni', 'Irfan Junejo', 'Danyal Zafar', 'Ali Zafar',
  'Atif Aslam', 'Rahat Fateh', 'Nusrat Fateh', 'Ghulam Ali', 'Mehdi Hassan'
];

const COMPANIES = [
  'Al-Madina Builders & Developers', 'Emaar Signature Properties', 'Skyline Associates', 'Prime City Developers',
  'Grand Heights Real Estate', 'Apex Horizon Builders', 'Crescent Developers', 'Falcon Construction Group',
  'Blue World Associates', 'Capital Smart Developers', 'Park View Promoters', 'Bahria Landmark Group',
  'Gulberg Greens Promoters', 'Faisal Hills Group', 'Kingdom Valley Developers', 'Al-Miraj Construction',
  'New Metro City Group', 'Al-Noor Orchard Associates', 'Etihad Town Developers', 'Lake City Holdings',
  'Central Park Real Estate', 'Model Town Developers', 'DHA City Associates', 'Paragon Heights Group',
  'Omega Residencia Builders', 'Midland Properties', 'Urban Developers', 'Bismillah Housing Associates',
  'Victoria City Promoters', 'Dream Gardens Group', 'Pearl Continental Real Estate', 'Safari Valley Associates',
  'Royal Orchard Developers', 'Defence Skyline Properties', 'Al-Bari Group', 'Al-Raziq Builders',
  'Zamzam Developers', 'Al-Haram City Group', 'Star Marketing Associates', 'Zameen Promoters',
  'Pakland Builders', 'Giga Group Construction', 'Silver Oaks Developers', 'Highland City Builders',
  'Crown Vista Properties', 'Elysium Towers Group', 'One Constitution Builders', 'Centaurus Skyline',
  'Islamabad Creek Associates', 'Margalla View Developers', 'Pine City Associates', 'Murree Hills Group',
  'Green Valley Farms', 'Orchard Country Homes', 'Ravi Urban Properties', 'Chenab Valley Associates',
  'Indus Heights', 'Mehran Developers', 'Clifton Horizon', 'Defence View Builders',
  'Gulshan Heights', 'North Nazimabad Promoters', 'Scheme 33 Associates', 'Malir City Group',
  'Korangi Industrial Developers', 'SITE Associates', 'Hyderabad Greens', 'Sukkur City Promoters',
  'Larkana Real Estate', 'Peshawar Enclave', 'Hayatabad Heights', 'Abbottabad Hills Promoters',
  'Swat Valley Resorts', 'Quetta Oasis Developers', 'Gwadar Port Associates'
];

const CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Peshawar', 'Hyderabad', 'Gujranwala', 'Sialkot',
  'Quetta', 'Abbottabad', 'Bahawalpur', 'Sargodha', 'Sukkur', 'Gwadar'
];

const PROPERTY_TYPES = [
  'Apartments',
  'Houses / Villas',
  'Plots / Land',
  'Shops / Commercial',
  'Farmhouses',
];

const PHONE_PREFIXES = ['0300', '0321', '0333', '0345', '0312', '0301', '0322', '0334', '0346', '0313'];

// Generate exactly 75 leads, ordered newest to oldest
export const INITIAL_MOCK_LEADS = NAMES.map((name, i) => {
  const comp = COMPANIES[i % COMPANIES.length];
  const city = CITIES[i % CITIES.length];
  const propType = PROPERTY_TYPES[i % PROPERTY_TYPES.length];
  const prefix = PHONE_PREFIXES[i % PHONE_PREFIXES.length];
  const randNum = String(1000000 + ((i * 7393 + 4821) % 8999999));
  const phone = `${prefix}${randNum.substring(0, 7)}`;

  // Spread over 60 days
  const hoursAgo = Math.floor(i * 19.2); // ~19 hours between leads
  const createdDate = new Date(Date.now() - hoursAgo * 3600000);

  return {
    id: i + 1,
    full_name: name,
    company_name: comp,
    phone,
    city,
    inventory_type: propType,
    lead_category: 'client',
    status: i < 5 ? 'New' : (i < 20 ? 'Contacted' : (i < 40 ? 'Qualified' : (i < 55 ? 'Meeting / Proposal' : 'Deal Closed'))),
    next_followup_date: null,
    next_action_type: null,
    created_at: createdDate.toISOString(),
  };
});

export let liveLocalDevLeads = [...INITIAL_MOCK_LEADS];

export function addLocalDevLead(newLead) {
  liveLocalDevLeads.unshift(newLead);
  return newLead;
}

export function updateLocalDevLead(id, updates) {
  liveLocalDevLeads = liveLocalDevLeads.map((l) => (l.id === Number(id) ? { ...l, ...updates } : l));
}

export function deleteLocalDevLead(id) {
  liveLocalDevLeads = liveLocalDevLeads.filter((l) => l.id !== Number(id));
}
