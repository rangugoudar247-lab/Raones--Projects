export type Language = 'en' | 'kn';

export const translations = {
  en: {
    // App Brand
    appName: 'Gram Sahayak',
    appSubtitle: 'Rural Emergency & Livelihood Assistant',
    disclaimerBar: 'Safety Advisory: AI-assisted guidance does not replace official emergency services (112/108) or certified agricultural/veterinary experts.',

    // Navigation
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      emergency: 'Emergency SOS',
      newAdvisory: 'New Advisory',
      history: 'History',
      resources: 'Helplines & Resources',
      profile: 'My Profile',
      settings: 'Settings',
      login: 'Sign In',
      register: 'Register',
      logout: 'Sign Out',
      quickEmergency: '🚨 Emergency 112',
    },

    // Landing Page
    landing: {
      badge: 'Empowering Rural Workers & Small Farmers',
      title: 'Fast AI Emergency Guidance & Everyday Farming Solutions',
      description: 'Instant, evidence-informed action steps for crop failures, livestock emergencies, severe weather events, and rural livelihood challenges in English and Kannada.',
      ctaEmergency: '🚨 Emergency Assistance',
      ctaAdvisory: '🌾 Get Farming Advisory',
      stats: {
        helpline247: '24/7 Rapid Helplines',
        languages: 'English & Kannada Supported',
        categories: '5 Key Rural Domains',
        safetyFirst: 'Safety-First Verified Protocols',
      },
      featuresTitle: 'Complete Practical Assistance for Your Village & Farm',
      featuresSubtitle: 'Built specifically for rural conditions, small screens, and immediate clarity.',
      features: [
        {
          title: 'Emergency Life & Farm Safety',
          desc: 'Immediate triage for fires, chemical exposure, electrocution risks, and natural floods with one-touch emergency calling.',
        },
        {
          title: 'Crop Health & Pest Control',
          desc: 'Identify pest infestations, disease symptoms, fertilizer guidance, and irrigation strategies for local soil varieties.',
        },
        {
          title: 'Livestock Care & Veterinary Help',
          desc: 'Actionable steps for sick cows, sheep, goats, or poultry, warning signs detection, and 1962 Pashu Sanjeevani dispatch.',
        },
        {
          title: 'Weather & Disaster Preparedness',
          desc: 'Practical protection before heavy rains, hail, drought, and lightning strikes to prevent crop loss and injuries.',
        },
        {
          title: 'Government Schemes & Subsidies',
          desc: 'Direct info on PM-KISAN, PM Fasal Bima, Kisan Credit Cards, Raitha Samparka Kendras, and agricultural loans.',
        },
        {
          title: 'Bilingual & Voice Ready',
          desc: 'Read or speak your problem naturally in Kannada or English without complicated forms.',
        }
      ],
      emergencyBannerTitle: 'Facing an Urgent Crisis Right Now?',
      emergencyBannerDesc: 'Access immediate life safety protocols, evacuation guidance, and one-tap emergency call buttons.',
      call112: 'Call 112 (National Emergency)',
      call1962: 'Call 1962 (Animal Ambulance)',
      call1551: 'Call 1551 (Kisan Call Center)',
    },

    // Emergency Page
    emergency: {
      title: 'Rural Emergency Assistant',
      subtitle: 'Immediate safety prioritization and emergency service dispatch. Never delay calling emergency responders.',
      cautionAlert: 'If life, health, or property is in imminent danger, dial 112 immediately. This tool provides safety precautions while help is on the way.',
      selectType: 'Select Emergency Type',
      types: {
        animal: 'Animal / Livestock Emergency',
        crop: 'Severe Crop Devastation / Pest Outbreak',
        flood: 'Flood / Flash Flood / Submerged Land',
        drought: 'Extreme Drought / Water Crisis',
        fire: 'Barn, Farm or Crop Fire',
        weather: 'Extreme Weather / Storm / Lightning',
        electrical: 'Fallen Power Lines / Electrical Shock Risk',
        chemical: 'Pesticide / Chemical Poisoning Exposure',
        accident: 'Farm Machinery or Vehicle Accident',
        other: 'Other Rural Emergency',
      },
      describeLabel: 'What is happening right now? (Be specific)',
      describePlaceholder: 'e.g., A high voltage power line fell onto our wet paddy field and sparks are jumping near the cattle shed...',
      locationLabel: 'Your Location (Village, Taluk, Landmark)',
      locationPlaceholder: 'e.g., Bilikere village, near primary school, Hunsur taluk',
      urgencyLabel: 'Severity Assessment',
      submitBtn: '🚨 Analyze Emergency & Get Immediate Actions',
      analyzingBtn: 'Analyzing Emergency Protocols...',
      resultTitle: 'Emergency Action Plan',
      immediateSafety: 'Immediate Life-Safety Steps',
      avoidTitle: 'Dangerous Actions to AVOID',
      nextStepsTitle: 'Next Protective Measures',
      callHelplines: 'Key Helplines to Contact Immediately',
      dialNow: 'Dial Now',
    },

    // Advisory Form
    advisoryForm: {
      title: 'Request Rural Advisory',
      subtitle: 'Describe your farming, livestock, or livelihood challenge to receive structured AI guidance.',
      categoryLabel: 'Problem Category',
      categories: {
        Agriculture: 'Agriculture & Crops',
        Livestock: 'Livestock & Animals',
        Weather: 'Weather & Natural Events',
        Livelihood: 'Livelihood & Schemes',
        Other: 'General Rural Question',
      },
      subcategoryLabel: 'Subcategory (Optional)',
      cropTypeLabel: 'Crop Name / Variety',
      cropTypePlaceholder: 'e.g., Ragi, Paddy, Tomato, Arecanut, Cotton',
      cropStageLabel: 'Growth Stage',
      cropStagePlaceholder: 'e.g., Seedling, Flowering, Fruiting, Mature',
      livestockTypeLabel: 'Animal Type',
      livestockTypePlaceholder: 'e.g., Dairy Cow, Buffalo, Goat, Sheep, Broiler Poultry',
      livestockAgeLabel: 'Age / Weight of Animal',
      livestockAgePlaceholder: 'e.g., 2 years old, 3-month calf',
      durationLabel: 'How long has this problem existed?',
      durationPlaceholder: 'e.g., 2 days, 1 week, since yesterday morning',
      severityLabel: 'Observed Severity',
      severityOptions: {
        low: 'Low (Early signs / General query)',
        medium: 'Medium (Noticeable damage / Needs attention)',
        high: 'High (Spreading rapidly / Loss of yield or health)',
        critical: 'Critical (Severe threat / Emergency)',
      },
      problemLabel: 'Describe the Problem in Detail',
      problemPlaceholder: 'Describe the symptoms, color changes, unusual animal behavior, or farming situation in simple words...',
      locationLabel: 'Your Location / Village',
      locationPlaceholder: 'e.g., Mandya, Maddur taluk',
      extraLabel: 'Additional Observations / Context',
      extraPlaceholder: 'Soil type, recent rain, fertilizers applied, animal diet, etc.',
      languageLabel: 'Preferred Response Language',
      submitBtn: 'Generate AI Advisory',
      submittingBtn: 'Analyzing with Gemini AI...',
      voicePrompt: 'Click microphone to speak your problem',
      listening: 'Listening... speak clearly',
    },

    // Advisory Result View
    advisoryResult: {
      title: 'Advisory Guidance Report',
      summary: 'Problem Understanding & Summary',
      immediateActions: 'Immediate Actions Checklist',
      nextSteps: 'Recommended Next Steps',
      thingsToAvoid: 'Critical Things to AVOID',
      professionalHelp: 'Expert Consultation Recommendation',
      followUp: 'Key Questions to Investigate',
      disclaimer: 'Official Verification Notice',
      printBtn: 'Print / Save PDF',
      shareBtn: 'Share Advisory',
      backBtn: 'Back to Advisories',
      copied: 'Advisory copied to clipboard!',
    },

    // Dashboard
    dashboard: {
      welcome: 'Welcome,',
      subtitle: 'Here is your farm and rural advisory dashboard.',
      emergencyAlert: 'Need Urgent Help? Access Emergency Mode immediately for instant safety actions.',
      emergencyBtn: '🚨 Emergency Mode',
      newAdvisoryBtn: '➕ Create New Advisory',
      stats: {
        total: 'Saved Advisories',
        critical: 'Critical Issues',
        agriculture: 'Crop Inquiries',
        livestock: 'Livestock Care',
      },
      recentTitle: 'Your Recent Advisories',
      viewAll: 'View All History',
      noAdvisories: 'No advisories yet. Ask a question about your crops, animals, or farm to get started!',
      quickHelplines: 'Direct Emergency Helplines',
    },

    // History
    history: {
      title: 'Advisory History',
      subtitle: 'View, search, and manage your past AI farming and emergency guidance.',
      searchPlaceholder: 'Search by crop, animal, symptom, or keyword...',
      filterAll: 'All Categories',
      confirmDelete: 'Are you sure you want to delete this advisory? This action cannot be undone.',
      deleteBtn: 'Delete',
      viewBtn: 'Open Advisory',
      empty: 'No advisories found matching your criteria.',
    },

    // Resources
    resources: {
      title: 'Rural Helplines & Support Directory',
      subtitle: 'Direct telephone numbers, official websites, and local support centers for farmers in Karnataka and India.',
      searchPlaceholder: 'Search helplines, schemes, or departments...',
      categories: {
        all: 'All Resources',
        Emergency: 'Emergency & Police/Fire',
        Agriculture: 'Agriculture & Crops',
        Livestock: 'Veterinary & Animals',
        Livelihood: 'Schemes & Credit',
        Weather: 'Weather & Disaster',
      },
      callNow: 'Call Hotline',
      visitWebsite: 'Visit Official Portal',
    },

    // Profile & Settings
    profile: {
      title: 'Farmer Profile',
      subtitle: 'Update your location and language settings so advisories are personalized to your local conditions.',
      fullName: 'Full Name',
      phone: 'Phone Number',
      preferredLanguage: 'Preferred Advisory Language',
      village: 'Village / Town',
      district: 'District',
      state: 'State',
      saveBtn: 'Save Profile Changes',
      saving: 'Saving Changes...',
      savedSuccess: 'Profile saved successfully!',
    },

    settings: {
      title: 'Application Settings',
      subtitle: 'Manage language, safety display preferences, and local data.',
      languageTitle: 'Language Preferences',
      languageDesc: 'Choose your default language for both the user interface and AI advisory responses.',
      offlineTitle: 'Offline Safety Quick Guide',
      offlineDesc: 'Keep these emergency numbers saved in your mobile phone contacts for offline access.',
      systemStatus: 'System Integration Status',
      backendStatus: 'Backend API Service',
      geminiStatus: 'Google Gemini AI Engine',
      supabaseStatus: 'Supabase Database & Auth',
    },

    // Auth
    auth: {
      loginTitle: 'Sign In to Gram Sahayak',
      loginSubtitle: 'Access your saved crop advisories and farm history',
      registerTitle: 'Create Farmer Account',
      registerSubtitle: 'Register for personalized agricultural and emergency guidance',
      emailLabel: 'Email Address',
      passwordLabel: 'Password',
      confirmPassword: 'Confirm Password',
      loginBtn: 'Sign In',
      registerBtn: 'Create Account',
      orDemo: 'Or test instantly with Demo Mode',
      demoLoginBtn: '⚡ Quick Demo Login (No Password Required)',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      forgotPassword: 'Forgot password?',
      forgotTitle: 'Reset Your Password',
      forgotSubtitle: 'Enter your email to receive password recovery instructions',
      sendResetBtn: 'Send Recovery Link',
      backToLogin: 'Back to Sign In',
    },

    // Common
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      tryAgain: 'Try Again',
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      all: 'All',
      date: 'Date',
      urgency: 'Urgency',
      category: 'Category',
    }
  },

  kn: {
    // App Brand (Kannada)
    appName: 'ಗ್ರಾಮ ಸಹಾಯಕ',
    appSubtitle: 'ಗ್ರಾಮೀಣ ತುರ್ತು ಮತ್ತು ಜೀವನೋಪಾಯ ಸಹಾಯಕ',
    disclaimerBar: 'ಸುರಕ್ಷತಾ ಎಚ್ಚರಿಕೆ: ಎಐ ಸಲಹೆಯು ತುರ್ತು ಸೇವೆಗಳು (112/108) ಅಥವಾ ಪ್ರಮಾಣೀಕೃತ ಕೃಷಿ/ಪಶುವೈದ್ಯರ ಅಧಿಕೃತ ತಪಾಸಣೆಗೆ ಪರ್ಯಾಯವಲ್ಲ.',

    // Navigation
    nav: {
      home: 'ಮುಖಪುಟ',
      dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      emergency: 'ತುರ್ತು ನೆರವು (SOS)',
      newAdvisory: 'ಹೊಸ ಸಲಹೆ',
      history: 'ಹಿಂದಿನ ಸಲಹೆಗಳು',
      resources: 'ಸಹಾಯವಾಣಿಗಳು',
      profile: 'ನನ್ನ ಪ್ರೊಫೈಲ್',
      settings: 'ಸೆಟ್ಟಿಂಗ್ಸ್',
      login: 'ಲಾಗಿನ್',
      register: 'ಖಾತೆ ತೆರೆಯಿರಿ',
      logout: 'ನಿರ್ಗಮಿಸಿ',
      quickEmergency: '🚨 ತುರ್ತು 112',
    },

    // Landing Page
    landing: {
      badge: 'ರೈತರು ಮತ್ತು ಗ್ರಾಮೀಣ ಕಾರ್ಮಿಕರ ನೆರವಿಗಾಗಿ',
      title: 'ತುರ್ತು ಪರಿಸ್ಥಿತಿ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಕೃಷಿ ಪರಿಹಾರಗಳು',
      description: 'ಬೆಳೆ ರೋಗಗಳು, ಜಾನುವಾರುಗಳ ಅನಾರೋಗ್ಯ, ನೈಸರ್ಗಿಕ ವಿಕೋಪಗಳು ಮತ್ತು ಗ್ರಾಮೀಣ ಸಮಸ್ಯೆಗಳಿಗೆ ಕನ್ನಡದಲ್ಲೇ ತ್ವರಿತ, ಸುರಕ್ಷಿತ ಹಾಗೂ ಉಪಯುಕ್ತ ಎಐ ಮಾರ್ಗದರ್ಶನ.',
      ctaEmergency: '🚨 ತುರ್ತು ಸಹಾಯ',
      ctaAdvisory: '🌾 ಕೃಷಿ ಸಲಹೆ ಪಡೆಯಿರಿ',
      stats: {
        helpline247: '24/7 ತುರ್ತು ಸಹಾಯವಾಣಿ',
        languages: 'ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಬೆಂಬಲ',
        categories: '5 ಪ್ರಮುಖ ಗ್ರಾಮೀಣ ರಂಗಗಳು',
        safetyFirst: 'ಸುರಕ್ಷತೆಗೆ ಮೊದಲ ಆದ್ಯತೆ',
      },
      featuresTitle: 'ನಿಮ್ಮ ಊರು ಮತ್ತು ಜಮೀನಿಗೆ ಸಂಪೂರ್ಣ ನೆರವು',
      featuresSubtitle: 'ಗ್ರಾಮೀಣ ಪರಿಸ್ಥಿತಿ, ಮೊಬೈಲ್ ಪರದೆ ಮತ್ತು ಸರಳ ಬಳಕೆಗೆ ಅನುಗುಣವಾಗಿ ರೂಪಿಸಲಾಗಿದೆ.',
      features: [
        {
          title: 'ತುರ್ತು ಮತ್ತು ಸುರಕ್ಷತಾ ನೆರವು',
          desc: 'ಬೆಂಕಿ ಅವಘಡ, ರಾಸಾಯನಿಕ ವಿಷ, ವಿದ್ಯುತ್ ಅಪಾಯ ಹಾಗೂ ಪ್ರವಾಹದ ಸಮಯದಲ್ಲಿ ತ್ವರಿತ ಸುರಕ್ಷತಾ ಕ್ರಮಗಳು ಮತ್ತು ನೇರ ಕರೆ ಸೌಲಭ್ಯ.',
        },
        {
          title: 'ಬೆಳೆ ರಕ್ಷಣೆ ಮತ್ತು ಕೀಟ ನಿಯಂತ್ರಣ',
          desc: 'ಬೆಳೆ ರೋಗಗಳು, ಕೀಟಬಾಧೆ, ಗೊಬ್ಬರ ಬಳಕೆ ಮತ್ತು ನೀರಾವರಿ ನಿರ್ವಹಣೆಗೆ ನಿಖರ ವೈಜ್ಞಾನಿಕ ಸಲಹೆಗಳು.',
        },
        {
          title: 'ಪಶು ಆರೋಗ್ಯ ಮತ್ತು ಸಂಜೀವಿನಿ',
          desc: 'ಹಸು, ಎಮ್ಮೆ, ಕುರಿ, ಕೋಳಿಗಳ ಅನಾರೋಗ್ಯ ಲಕ್ಷಣಗಳ ತಪಾಸಣೆ ಮತ್ತು 1962 ಪಶು ಆಂಬ್ಯುಲೆನ್ಸ್ ಸಂಪರ್ಕ ಮಾಹಿತಿ.',
        },
        {
          title: 'ಹವಾಮಾನ ಮತ್ತು ಮುನ್ನೆಚ್ಚರಿಕೆ',
          desc: 'ಭಾರೀ ಮಳೆ, ಬಿರುಗಾಳಿ, ಸಿಡಿಲು ಮತ್ತು ಬರಗಾಲದ ಮುನ್ಸೂಚನೆ ಹಾಗೂ ಬೆಳೆ ಸಂರಕ್ಷಣಾ ವಿಧಾನಗಳು.',
        },
        {
          title: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ಸಬ್ಸಿಡಿ',
          desc: 'ಪಿಎಂ-ಕಿಸಾನ್, ಬೆಳೆ ವಿಮೆ, ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಮತ್ತು ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರಗಳ ಅಧಿಕೃತ ಮಾಹಿತಿ.',
        },
        {
          title: 'ಧ್ವನಿ ಮೂಲಕ ಪ್ರಶ್ನೆ ಕೇಳುವ ಸೌಲಭ್ಯ',
          desc: 'ಕೀಬೋರ್ಡ್ ಬಳಸದೆ ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲೇ ನೇರವಾಗಿ ಮಾತನಾಡಿ ಸಮಸ್ಯೆ ವಿವರಿಸಿ ಉತ್ತರ ಪಡೆಯಿರಿ.',
        }
      ],
      emergencyBannerTitle: 'ತಕ್ಷಣದ ತುರ್ತು ಪರಿಸ್ಥಿತಿಯೇ?',
      emergencyBannerDesc: 'ಜೀವ ರಕ್ಷಣೆಯ ಮಾರ್ಗಸೂಚಿಗಳು, ಸ್ಥಳಾಂತರ ಸೂಚನೆಗಳು ಮತ್ತು ತುರ್ತು ಕರೆ ಬಟನ್‌ಗಳು ಲಭ್ಯ.',
      call112: '112 ಗೆ ಕರೆ ಮಾಡಿ (ರಾಷ್ಟ್ರೀಯ ತುರ್ತು ಸೇವೆ)',
      call1962: '1962 ಗೆ ಕರೆ ಮಾಡಿ (ಪಶು ಆಂಬ್ಯುಲೆನ್ಸ್)',
      call1551: '1551 ಗೆ ಕರೆ ಮಾಡಿ (ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್)',
    },

    // Emergency Page
    emergency: {
      title: 'ಗ್ರಾಮೀಣ ತುರ್ತು ಸಹಾಯಕ',
      subtitle: 'ತಕ್ಷಣದ ಸುರಕ್ಷತೆ ಮತ್ತು ತುರ್ತು ರಕ್ಷಣಾ ನೆರವು. ಅಪಾಯದ ಸಂದರ್ಭದಲ್ಲಿ ತಕ್ಷಣ ತುರ್ತು ಸೇವೆಗಳಿಗೆ ಕರೆ ಮಾಡಿ.',
      cautionAlert: 'ಪ್ರಾಣಾಪಾಯ ಅಥವಾ ಗಂಭೀರ ಅಪಾಯವಿದ್ದರೆ ತಕ್ಷಣ 112 ಗೆ ಕರೆ ಮಾಡಿ. ರಕ್ಷಣಾ ಸಿಬ್ಬಂದಿ ಬರುವವರೆಗೆ ಈ ಕೆಳಗಿನ ಸುರಕ್ಷತಾ ಕ್ರಮಗಳನ್ನು ಪಾಲಿಸಿ.',
      selectType: 'ತುರ್ತು ಪರಿಸ್ಥಿತಿಯ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      types: {
        animal: 'ಜಾನುವಾರು / ಪ್ರಾಣಿ ತುರ್ತುಸ್ಥಿತಿ',
        crop: 'ತೀವ್ರ ಬೆಳೆ ನಾಶ / ಕೀಟಗಳ ಆಕ್ರಮಣ',
        flood: 'ಪ್ರವಾಹ / ಜಮೀನಿಗೆ ನೀರು ನುಗ್ಗುವಿಕೆ',
        drought: 'ತೀವ್ರ ಬರ / ನೀರಿನ ಬಿಕ್ಕಟ್ಟು',
        fire: 'ಕೊಟ್ಟಿಗೆ, ಹೊಲ ಅಥವಾ ಹುಲ್ಲು ಬೆಂಕಿ',
        weather: 'ಭಾರೀ ಬಿರುಗಾಳಿ / ಸಿಡಿಲು / ಮಿಂಚು',
        electrical: 'ತುಂಡಾದ ವಿದ್ಯುತ್ ತಂತಿ / ಶಾಕ್ ಅಪಾಯ',
        chemical: 'ಕೀಟನಾಶಕ / ರಾಸಾಯನಿಕ ವಿಷಬಾಧೆ',
        accident: 'ಕೃಷಿ ಯಂತ್ರೋಪಕರಣ ಅಥವಾ ವಾಹನ ಅಪಘಾತ',
        other: 'ಇತರ ತುರ್ತು ಪರಿಸ್ಥಿತಿ',
      },
      describeLabel: 'ಏನು ನಡೆಯುತ್ತಿದೆ? ಸ್ಪಷ್ಟವಾಗಿ ವಿವರಿಸಿ',
      describePlaceholder: 'ಉದಾ: ಭತ್ತದ ಗದ್ದೆಯಲ್ಲಿ ಹೈ-ವೋಲ್ಟೇಜ್ ವಿದ್ಯುತ್ ತಂತಿ ತುಂಡಾಗಿ ಬಿದ್ದಿದೆ, ಕೊಟ್ಟಿಗೆಯ ಹತ್ತಿರ ಕಿಡಿಗಳು ಹಾರುತ್ತಿವೆ...',
      locationLabel: 'ನಿಮ್ಮ ಸ್ಥಳ (ಗ್ರಾಮ, ತಾಲೂಕು, ಪ್ರಮುಖ ಗುರುತು)',
      locationPlaceholder: 'ಉದಾ: ಬಿಳಿಕೆರೆ ಗ್ರಾಮ, ಹುಣಸೂರು ತಾಲೂಕು',
      urgencyLabel: 'ಅಪಾಯದ ತೀವ್ರತೆ',
      submitBtn: '🚨 ತುರ್ತು ಪರಿಸ್ಥಿತಿ ವಿಶ್ಲೇಷಿಸಿ ಸುರಕ್ಷತಾ ಕ್ರಮ ಪಡೆಯಿರಿ',
      analyzingBtn: 'ಸುರಕ್ಷತಾ ಕ್ರಮಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...',
      resultTitle: 'ತುರ್ತು ಸುರಕ್ಷತಾ ಮಾರ್ಗಸೂಚಿ',
      immediateSafety: 'ತಕ್ಷಣ ಮಾಡಬೇಕಾದ ಜೀವ ರಕ್ಷಣಾ ಕ್ರಮಗಳು',
      avoidTitle: 'ಮಾಡಲೇಬಾರದ ಅಪಾಯಕಾರಿ ತಪ್ಪುಗಳು',
      nextStepsTitle: 'ಮುಂದಿನ ರಕ್ಷಣಾ ಕ್ರಮಗಳು',
      callHelplines: 'ತಕ್ಷಣ ಸಂಪರ್ಕಿಸಬೇಕಾದ ಸಹಾಯವಾಣಿಗಳು',
      dialNow: 'ಈಗಲೇ ಕರೆ ಮಾಡಿ',
    },

    // Advisory Form
    advisoryForm: {
      title: 'ಕೃಷಿ ಮತ್ತು ಗ್ರಾಮೀಣ ಸಲಹೆ ಕೋರಿಕೆ',
      subtitle: 'ನಿಮ್ಮ ಬೆಳೆ, ಪ್ರಾಣಿ ಅಥವಾ ಗ್ರಾಮೀಣ ಸಮಸ್ಯೆಯನ್ನು ತಿಳಿಸಿ ತಕ್ಷಣ ಎಐ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.',
      categoryLabel: 'ಸಮಸ್ಯೆಯ ವರ್ಗ',
      categories: {
        Agriculture: 'ಕೃಷಿ ಮತ್ತು ಬೆಳೆಗಳು',
        Livestock: 'ಜಾನುವಾರು ಮತ್ತು ಪ್ರಾಣಿ ಆರೋಗ್ಯ',
        Weather: 'ಹವಾಮಾನ ಮತ್ತು ನೈಸರ್ಗಿಕ ಘಟನೆಗಳು',
        Livelihood: 'ಜೀವನೋಪಾಯ ಮತ್ತು ಯೋಜನೆಗಳು',
        Other: 'ಸಾಮಾನ್ಯ ಗ್ರಾಮೀಣ ಪ್ರಶ್ನೆ',
      },
      subcategoryLabel: 'ಉಪವರ್ಗ (ಐಚ್ಛಿಕ)',
      cropTypeLabel: 'ಬೆಳೆಯ ಹೆಸರು / ತಳಿ',
      cropTypePlaceholder: 'ಉದಾ: ರಾಗಿ, ಭತ್ತ, ಟೊಮೇಟೊ, ಅಡಿಕೆ, ಹತ್ತಿ',
      cropStageLabel: 'ಬೆಳೆಯ ಹಂತ',
      cropStagePlaceholder: 'ಉದಾ: ಸಸಿ ಹಂತ, ಹೂವಾಡುವ ಹಂತ, ಕಾಯಿ ಕಟ್ಟುವ ಹಂತ, ಕೊಯ್ಲು',
      livestockTypeLabel: 'ಪ್ರಾಣಿಯ ವಿಧ',
      livestockTypePlaceholder: 'ಉದಾ: ಹೈನು ಹಸು, ಎಮ್ಮೆ, ಆಡು, ಕುರಿ, ಕೋಳಿ',
      livestockAgeLabel: 'ಪ್ರಾಣಿಯ ವಯಸ್ಸು / ತೂಕ',
      livestockAgePlaceholder: 'ಉದಾ: 2 ವರ್ಷ, 3 ತಿಂಗಳ ಕರು',
      durationLabel: 'ಸಮಸ್ಯೆ ಎಷ್ಟು ದಿನಗಳಿಂದ ಇದೆ?',
      durationPlaceholder: 'ಉದಾ: 2 ದಿನ, 1 ವಾರ, ನಿನ್ನೆಯಿಂದ',
      severityLabel: 'ಸಮಸ್ಯೆಯ ಗಂಭೀರತೆ',
      severityOptions: {
        low: 'ಕಡಿಮೆ (ಆರಂಭಿಕ ಹಂತ / ಸಾಮಾನ್ಯ ಮಾಹಿತಿ)',
        medium: 'ಮಧ್ಯಮ (ಗಮನಾರ್ಹ ಲಕ್ಷಣ / ಪರಿಹಾರ ಬೇಕು)',
        high: 'ಹೆಚ್ಚು (ವೇಗವಾಗಿ ಹರಡುತ್ತಿದೆ / ನಷ್ಟದ ಭೀತಿ)',
        critical: 'ತುರ್ತು (ತೀವ್ರ ಅಪಾಯ / ತಕ್ಷಣ ನೆರವು ಬೇಕು)',
      },
      problemLabel: 'ಸಮಸ್ಯೆಯನ್ನು ವಿವರವಾಗಿ ಬರೆಯಿರಿ',
      problemPlaceholder: 'ಎಲೆಗಳ ಬಣ್ಣ ಬದಲಾವಣೆ, ಕೀಟಗಳು, ಪ್ರಾಣಿಯ ನಡವಳಿಕೆ ಅಥವಾ ಯಾವುದೇ ತೊಂದರೆಯನ್ನು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಬರೆಯಿರಿ...',
      locationLabel: 'ನಿಮ್ಮ ಗ್ರಾಮ / ತಾಲೂಕು',
      locationPlaceholder: 'ಉದಾ: ಮಂಡ್ಯ, ಮದ್ದೂರು ತಾಲೂಕು',
      extraLabel: 'ಹೆಚ್ಚುವರಿ ಮಾಹಿತಿ / ಲಕ್ಷಣಗಳು',
      extraPlaceholder: 'ಮಣ್ಣಿನ ವಿಧ, ಇತ್ತೀಚಿನ ಮಳೆ, ಸಿಂಪಡಿಸಿದ ಗೊಬ್ಬರ, ಪ್ರಾಣಿಗೆ ನೀಡಿದ ಆಹಾರ ಇತ್ಯಾದಿ...',
      languageLabel: 'ಸಲಹೆ ನೀಡಬೇಕಾದ ಭಾಷೆ',
      submitBtn: 'ಎಐ ಸಲಹೆ ಪಡೆಯಿರಿ',
      submittingBtn: 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      voicePrompt: 'ಮಾತನಾಡಿ ಸಮಸ್ಯೆ ವಿವರಿಸಲು ಮೈಕ್ ಒತ್ತಿ',
      listening: 'ಕೇಳಿಸಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ... ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ',
    },

    // Advisory Result View
    advisoryResult: {
      title: 'ಸಲಹಾ ಮಾರ್ಗದರ್ಶನ ವರದಿ',
      summary: 'ಸಮಸ್ಯೆಯ ಗ್ರಹಿಕೆ ಮತ್ತು ಸಾರಾಂಶ',
      immediateActions: 'ತಕ್ಷಣ ಮಾಡಬೇಕಾದ ಕ್ರಮಗಳು',
      nextSteps: 'ಮುಂದಿನ ಶಿಫಾರಸು ಹಂತಗಳು',
      thingsToAvoid: 'ಮಾಡಬಾರದ ತಪ್ಪುಗಳು (ಎಚ್ಚರಿಕೆ)',
      professionalHelp: 'ತಜ್ಞರ ಭೇಟಿ ಅಥವಾ ಅಧಿಕೃತ ನೆರವು',
      followUp: 'ಪರಿಶೀಲಿಸಬೇಕಾದ ಹೆಚ್ಚುವರಿ ಪ್ರಶ್ನೆಗಳು',
      disclaimer: 'ಅಧಿಕೃತ ಪರಿಶೀಲನಾ ಸೂಚನೆ',
      printBtn: 'ಪ್ರಿಂಟ್ / ಪಿಡಿಎಫ್ ಉಳಿಸಿ',
      shareBtn: 'ಸಲಹೆ ಹಂಚಿಕೊಳ್ಳಿ',
      backBtn: 'ಹಿಂದಕ್ಕೆ ಹೋಗಿ',
      copied: 'ಸಲಹೆಯನ್ನು ನಕಲಿಸಲಾಗಿದೆ!',
    },

    // Dashboard
    dashboard: {
      welcome: 'ಸ್ವಾಗತ,',
      subtitle: 'ನಿಮ್ಮ ಕೃಷಿ ಮತ್ತು ಗ್ರಾಮೀಣ ಸಲಹಾ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್.',
      emergencyAlert: 'ತುರ್ತು ನೆರವು ಬೇಕೇ? ತಕ್ಷಣ ಸುರಕ್ಷತಾ ಕ್ರಮಗಳನ್ನು ಪಡೆಯಲು ತುರ್ತು ಮೋಡ್ ಬಳಸಿ.',
      emergencyBtn: '🚨 ತುರ್ತು ಮೋಡ್',
      newAdvisoryBtn: '➕ ಹೊಸ ಸಲಹೆ ಕೇಳಿ',
      stats: {
        total: 'ಉಳಿಸಿದ ಸಲಹೆಗಳು',
        critical: 'ತುರ್ತು ಸಮಸ್ಯೆಗಳು',
        agriculture: 'ಬೆಳೆ ವಿಚಾರಣೆಗಳು',
        livestock: 'ಪಶು ಆರೋಗ್ಯ',
      },
      recentTitle: 'ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಸಲಹೆಗಳು',
      viewAll: 'ಎಲ್ಲಾ ಹಳೆಯ ಸಲಹೆಗಳನ್ನು ನೋಡಿ',
      noAdvisories: 'ಇನ್ನೂ ಯಾವುದೇ ಸಲಹೆಗಳಿಲ್ಲ. ನಿಮ್ಮ ಬೆಳೆ ಅಥವಾ ಪ್ರಾಣಿಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ ಆರಂಭಿಸಿ!',
      quickHelplines: 'ನೇರ ತುರ್ತು ಸಹಾಯವಾಣಿಗಳು',
    },

    // History
    history: {
      title: 'ಹಿಂದಿನ ಸಲಹೆಗಳ ಇತಿಹಾಸ',
      subtitle: 'ನಿಮ್ಮ ಹಿಂದಿನ ಕೃಷಿ ಹಾಗೂ ತುರ್ತು ಮಾರ್ಗದರ್ಶನಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ವೀಕ್ಷಿಸಿ.',
      searchPlaceholder: 'ಬೆಳೆ, ಪ್ರಾಣಿ ಅಥವಾ ಕೀವರ್ಡ್ ಮೂಲಕ ಹುಡುಕಿ...',
      filterAll: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
      confirmDelete: 'ಈ ಸಲಹೆಯನ್ನು ಖಂಡಿತ ಅಳಿಸಲು ಬಯಸುವಿರಾ?',
      deleteBtn: 'ಅಳಿಸಿ',
      viewBtn: 'ಸಲಹೆ ನೋಡಿ',
      empty: 'ಯಾವುದೇ ಸಲಹೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
    },

    // Resources
    resources: {
      title: 'ಗ್ರಾಮೀಣ ಸಹಾಯವಾಣಿಗಳು ಮತ್ತು ಕೇಂದ್ರಗಳು',
      subtitle: 'ರೈತರಿಗಾಗಿ ಪ್ರಮುಖ ದೂರವಾಣಿ ಸಂಖ್ಯೆಗಳು, ಕೃಷಿ ಇಲಾಖೆಗಳು ಹಾಗೂ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ವಿವರ.',
      searchPlaceholder: 'ಸಹಾಯವಾಣಿ ಅಥವಾ ಯೋಜನೆ ಹುಡುಕಿ...',
      categories: {
        all: 'ಎಲ್ಲಾ ಸೇವೆಗಳು',
        Emergency: 'ತುರ್ತು ಸೇವೆಗಳು (112/108/101)',
        Agriculture: 'ಕೃಷಿ ಮತ್ತು ಬೆಳೆಗಳು',
        Livestock: 'ಪಶು ವೈದ್ಯಕೀಯ (1962)',
        Livelihood: 'ಯೋಜನೆಗಳು ಮತ್ತು ಸಾಲ',
        Weather: 'ಹವಾಮಾನ ಮತ್ತು ವಿಪತ್ತು',
      },
      callNow: 'ಈಗಲೇ ಕರೆ ಮಾಡಿ',
      visitWebsite: 'ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ಭೇಟಿ ನೀಡಿ',
    },

    // Profile & Settings
    profile: {
      title: 'ರೈತರ ಪ್ರೊಫೈಲ್',
      subtitle: 'ನಿಮ್ಮ ಊರು ಮತ್ತು ಭಾಷೆಯ ವಿವರಗಳನ್ನು ನವೀಕರಿಸಿ, ಇದರಿಂದ ಹೆಚ್ಚು ನಿಖರ ಸಲಹೆಗಳು ದೊರೆಯುತ್ತವೆ.',
      fullName: 'ಪೂರ್ಣ ಹೆಸರು',
      phone: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
      preferredLanguage: 'ಆದ್ಯತೆಯ ಭಾಷೆ',
      village: 'ಗ್ರಾಮ / ಊರು',
      district: 'ಜಿಲ್ಲೆ',
      state: 'ರಾಜ್ಯ',
      saveBtn: 'ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ',
      saving: 'ಉಳಿಸಲಾಗುತ್ತಿದೆ...',
      savedSuccess: 'ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!',
    },

    settings: {
      title: 'ಅಪ್ಲಿಕೇಶನ್ ಸೆಟ್ಟಿಂಗ್ಸ್',
      subtitle: 'ಭಾಷೆ, ತುರ್ತು ಸಂಪರ್ಕಗಳು ಮತ್ತು ಸಿಸ್ಟಮ್ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.',
      languageTitle: 'ಭಾಷಾ ಆಯ್ಕೆ',
      languageDesc: 'ಆ್ಯಪ್ ಮತ್ತು ಎಐ ಸಲಹೆಗಳಿಗೆ ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
      offlineTitle: 'ಆಫ್‌ಲೈನ್ ತುರ್ತು ಸಂಪರ್ಕಗಳು',
      offlineDesc: 'ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದ ಸಂದರ್ಭಕ್ಕಾಗಿ ಈ ಪ್ರಮುಖ ಸಂಖ್ಯೆಗಳನ್ನು ನಿಮ್ಮ ಮೊಬೈಲ್‌ನಲ್ಲಿ ಸೇವ್ ಮಾಡಿಕೊಳ್ಳಿ.',
      systemStatus: 'ಸಿಸ್ಟಮ್ ಸ್ಥಿತಿ',
      backendStatus: 'ಬ್ಯಾಕೆಂಡ್ ಎಪಿಐ ಸೇವೆ',
      geminiStatus: 'ಗೂಗಲ್ ಜೆಮಿನಿ ಎಐ ಎಂಜಿನ್',
      supabaseStatus: 'ಸೂಪಬೇಸ್ ಡೇಟಾಬೇಸ್',
    },

    // Auth
    auth: {
      loginTitle: 'ಗ್ರಾಮ ಸಹಾಯಕಕ್ಕೆ ಲಾಗಿನ್ ಮಾಡಿ',
      loginSubtitle: 'ನಿಮ್ಮ ಹಿಂದಿನ ಬೆಳೆ ಸಲಹೆಗಳು ಮತ್ತು ಇತಿಹಾಸವನ್ನು ವೀಕ್ಷಿಸಿ',
      registerTitle: 'ರೈತರ ಹೊಸ ಖಾತೆ ತೆರೆಯಿರಿ',
      registerSubtitle: 'ವೈಯಕ್ತಿಕ ಕೃಷಿ ಮತ್ತು ತುರ್ತು ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ನೋಂದಾಯಿಸಿ',
      emailLabel: 'ಇಮೇಲ್ ವಿಳಾಸ',
      passwordLabel: 'ಪಾಸ್‌ವರ್ಡ್',
      confirmPassword: 'ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ',
      loginBtn: 'ಲಾಗಿನ್ ಮಾಡಿ',
      registerBtn: 'ಖಾತೆ ರಚಿಸಿ',
      orDemo: 'ಅಥವಾ ಡೆಮೊ ಮೋಡ್ ಮೂಲಕ ತಕ್ಷಣ ಪರೀಕ್ಷಿಸಿ',
      demoLoginBtn: '⚡ ತ್ವರಿತ ಡೆಮೊ ಲಾಗಿನ್ (ಪಾಸ್‌ವರ್ಡ್ ಅಗತ್ಯವಿಲ್ಲ)',
      noAccount: 'ಖಾತೆ ಇಲ್ಲವೇ?',
      hasAccount: 'ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರಾ?',
      forgotPassword: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?',
      forgotTitle: 'ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸಿ',
      forgotSubtitle: 'ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸುವ ಲಿಂಕ್ ಪಡೆಯಿರಿ',
      sendResetBtn: 'ಲಿಂಕ್ ಕಳುಹಿಸಿ',
      backToLogin: 'ಲಾಗಿನ್‌ಗೆ ಹಿಂತಿರುಗಿ',
    },

    // Common
    common: {
      loading: 'ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ...',
      error: 'ದೋಷ ಕಂಡುಬಂದಿದೆ',
      tryAgain: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
      save: 'ಉಳಿಸಿ',
      cancel: 'ರದ್ದುಮಾಡಿ',
      close: 'ಮುಚ್ಚಿ',
      all: 'ಎಲ್ಲವೂ',
      date: 'ದಿನಾಂಕ',
      urgency: 'ತೀವ್ರತೆ',
      category: 'ವರ್ಗ',
    }
  }
};
