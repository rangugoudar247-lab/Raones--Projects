-- ==============================================================================
-- Rural Emergency & Livelihood Assistant (Gram Sahayak)
-- Seed Data: Emergency Contacts, Agricultural Services, Veterinary & Disaster
-- ==============================================================================

insert into public.resources (title, description, category, phone, website, state, district) values
-- Emergency Hotlines
('National Emergency Response Support System (ERSS)', 'Unified 24x7 emergency response service for police, fire, and medical emergencies across India.', 'Emergency', '112', 'https://112.gov.in', 'All India', 'National'),
('Ambulance & Medical Emergency', 'Immediate emergency medical response and hospital transport services.', 'Emergency', '108', null, 'Karnataka', 'Statewide'),
('Fire & Rescue Services', 'Immediate assistance for barn fires, field bushfires, and rural structure fires.', 'Emergency', '101', null, 'Karnataka', 'Statewide'),
('Pashu Sanjeevani - Veterinary Emergency Helpline', 'Toll-free 24/7 emergency veterinary healthcare assistance and mobile veterinary ambulance services for livestock in Karnataka.', 'Livestock', '1962', 'https://ahvs.karnataka.gov.in', 'Karnataka', 'Statewide'),
('Karnataka State Disaster Management Authority (KSDMA)', 'Emergency control room for flood, cyclone, lightning, and severe drought distress.', 'Emergency', '1070', 'https://ksdma.karnataka.gov.in', 'Karnataka', 'Statewide'),
('District Disaster Management Cell', 'District-level emergency response and flood/natural hazard rescue helpline.', 'Emergency', '1077', null, 'Karnataka', 'District Level'),
('Electrical Hazard & BESCOM/HESCOM/GESCOM Helpline', 'Report fallen high-voltage live wires, broken electric poles in farms, and transformer fires.', 'Emergency', '1912', null, 'Karnataka', 'Statewide'),

-- Agriculture & Farmer Assistance
('Kisan Call Center (KCC) - Ministry of Agriculture', 'Free toll-free expert agricultural consultancy in Kannada and English on crops, pest control, weather, and fertilizers.', 'Agriculture', '1800-180-1551', 'https://farmer.gov.in', 'All India', 'National'),
('Raitha Samparka Kendra (RSK) Portal', 'Local village-level agricultural extension centers for subsidized certified seeds, fertilizers, and pest management advisory.', 'Agriculture', '080-22212842', 'https://raitamitra.karnataka.gov.in', 'Karnataka', 'Statewide'),
('Pradhan Mantri Fasal Bima Yojana (PMFBY)', 'Crop insurance grievance and claim assistance for weather damages, drought, or pest devastation.', 'Agriculture', '1800-200-5142', 'https://pmfby.gov.in', 'All India', 'National'),
('ICAR - Krishi Vigyan Kendra (KVK)', 'Agricultural research extension units providing on-farm testing, soil health cards, and scientific farming guidance.', 'Agriculture', '080-23418840', 'https://kvk.icar.gov.in', 'Karnataka', 'Bangalore Rural'),
('Soil Health Card Scheme Helpline', 'Guidance on soil testing, nutrient deficiency correction, and dosage calculation.', 'Agriculture', '011-23382012', 'https://soilhealth.dac.gov.in', 'All India', 'National'),

-- Livestock & Dairy
('Animal Husbandry & Veterinary Services Helpline', 'Government animal disease surveillance, vaccination schedules, and Foot-and-Mouth disease reports.', 'Livestock', '080-22864987', 'https://ahvs.karnataka.gov.in', 'Karnataka', 'Statewide'),
('Karnataka Milk Federation (KMF) Support', 'Dairy farmer assistance for milk procurement, cattle feed supply, and artificial insemination.', 'Livestock', '080-26096800', 'https://kmfnandini.coop', 'Karnataka', 'Statewide'),
('National Dairy Development Board (NDDB) Advisory', 'Scientific dairy farming, silage making, clean milk production, and calf management guidance.', 'Livestock', '1800-180-1551', 'https://www.nddb.coop', 'All India', 'National'),

-- Livelihood & Government Schemes
('PM-KISAN Farmer Helpline', 'Direct income support helpline for Rs. 6000 annual transfer queries and registration verification.', 'Livelihood', '155261', 'https://pmkisan.gov.in', 'All India', 'National'),
('Kisan Credit Card (KCC) Institutional Credit', 'Concessional crop loans and working capital assistance for farmers and dairy owners.', 'Livelihood', '1800-11-2211', 'https://www.sbi.co.in', 'All India', 'National'),
('National Rural Livelihood Mission (NRLM) - Sanjeevini', 'Self-Help Groups (SHG), micro-enterprise loans, and rural artisan support in Karnataka.', 'Livelihood', '080-22340578', 'https://nrlm.gov.in', 'Karnataka', 'Statewide'),
('e-NAM National Agriculture Market Support', 'Online trading platform for agricultural commodities, fair price discovery, and mandi auction details.', 'Livelihood', '1800-270-0224', 'https://www.enam.gov.in', 'All India', 'National'),

-- Weather & Environmental Safety
('India Meteorological Department (IMD) Mausam & Meghdoot', 'Agromet advisory service providing district-wise 5-day weather forecasts and rainfall alerts.', 'Weather', '011-24611060', 'https://mausam.imd.gov.in', 'All India', 'National'),
('Karnataka State Natural Disaster Monitoring Centre (KSNDMC)', 'Real-time rainfall, weather warnings, lightning strike alerts, and reservoir levels.', 'Weather', '080-22340801', 'https://ksndmc.org', 'Karnataka', 'Statewide'),
('Damini Lightning Alert System', 'Early warning mobile app and notification service for lightning strikes within 20-40 km radius.', 'Weather', null, 'https://play.google.com/store/apps/details?id=com.lightening.live.damini', 'All India', 'National');
