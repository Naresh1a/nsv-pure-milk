"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "te" | "hi";

interface Translations {
  [key: string]: {
    en: string;
    te: string;
    hi: string;
  };
}

export const DICTIONARY: Translations = {
  // ─── HEADER & NAV ───────────────────────────────────────────────────────────
  home: { en: "Home", te: "హోమ్", hi: "होम" },
  ourProcess: { en: "Our Process", te: "మన ప్రాసెస్", hi: "हमारी प्रक्रिया" },
  products: { en: "Products", te: "ఉత్పత్తులు", hi: "उत्पाद" },
  plans: { en: "1-Month Plans", te: "1-నెల ప్లాన్‌లు", hi: "1-महीने के प्लान" },
  reviews: { en: "Reviews", te: "రివ్యూలు", hi: "समीक्षाएं" },
  login: { en: "🔑 Login", te: "🔑 లాగిన్", hi: "🔑 लॉगिन" },
  register: { en: "📝 Register", te: "📝 రిజిస్టర్", hi: "📝 रजिस्टर" },
  logout: { en: "Logout", te: "లాగ్ అవుట్", hi: "लॉगआउट" },

  // ─── TOP PROMO BANNER ───────────────────────────────────────────────────────
  topBanner: {
    en: "🥛 NSV Pure Milk • 100% Farm Fresh • Doorstep Delivery Before 7 AM • Telangana",
    te: "🥛 NSV ప్యూర్ మిల్క్ • 100% ఫార్మ్ ఫ్రెష్ • ఉదయాన్నే 7 AM లోపే డోర్‌స్టెప్ డెలివరీ • తెలంగాణ",
    hi: "🥛 NSV प्योर मिल्क • 100% फार्म फ्रेश • सुबह 7 बजे से पहले होम डिलीवरी • तेलंगाना",
  },

  // ─── HERO SECTION ──────────────────────────────────────────────────────────
  heroPill: {
    en: "🌱 100% Pure, Organic & Chemical-Free NSV Milk",
    te: "🌱 100% స్వచ్ఛమైన, ఆర్గానిక్ & కెమికల్ రహిత పాలు",
    hi: "🌱 100% शुद्ध, जैविक और रसायन मुक्त दूध",
  },
  heroTitle: {
    en: "Pure NSV Farm Milk, Delivered Every Morning",
    te: "స్వచ్ఛమైన NSV ఫార్మ్ మిల్క్, ప్రతిరోజూ ఉదయాన్నే మీ ఇంటికి",
    hi: "शुद्ध NSV फार्म फ्रेश दूध, हर सुबह आपके घर तक",
  },
  heroSubtitle: {
    en: "Directly from our natural dairy farms to your kitchen. Chilled rapidly at 4°C and delivered to your doorstep before 7:00 AM.",
    te: "మన నాచురల్ డెయిరీ ఫార్మ్స్ నుండి నేరుగా మీ వంటగదికి. 4°C వద్ద చల్లబరచి ఉదయాన్నే 7:00 AM లోపు మీ డోర్‌స్టెప్‌కి చేర్చబడుతుంది.",
    hi: "हमारे प्राकृतिक डेयरी फार्मों से सीधे आपकी रसोई तक। 4°C पर ठंडा किया गया और सुबह 7:00 बजे से पहले आपके दरवाजे तक पहुंचाया गया।",
  },
  exploreProductsBtn: {
    en: "🥛 Explore NSV Products →",
    te: "🥛 NSV ఉత్పత్తులను చూడండి →",
    hi: "🥛 NSV उत्पाद देखें →",
  },
  monthPlansBtn: {
    en: "1-Month Subscriptions",
    te: "1-నెల సబ్‌స్క్రిప్షన్‌లు",
    hi: "1-महीने का सब्सक्रिप्शन",
  },

  // ─── PRODUCTS SECTION ──────────────────────────────────────────────────────
  catalogBadge: {
    en: "🥛 100% Fresh Dairy Catalog",
    te: "🥛 100% తాజా డెయిరీ క్యాటలాగ్",
    hi: "🥛 100% ताज़ा डेयरी कैटलॉग",
  },
  catalogTitle: {
    en: "NSV Fresh Dairy Products",
    te: "NSV తాజా డెయిరీ ఉత్పత్తులు",
    hi: "NSV ताज़ा डेयरी उत्पाद",
  },
  catalogSubtitle: {
    en: "Untouched & Pure Every Morning",
    te: "ప్రతిరోజూ ఉదయాన్నే స్వచ్ఛమైన నాణ్యత",
    hi: "हर सुबह शुद्ध और अछूता दूध",
  },
  subscribeDailyBtn: {
    en: "📅 Subscribe Daily →",
    te: "📅 సబ్‌స్క్రిప్షన్ ప్యాక్ ఎంచుకోండి →",
    hi: "📅 दैनिक सदस्यता लें →",
  },
  oneTimeOrderBtn: {
    en: "🥛 One-Time Sample Order →",
    te: "🥛 వన్-టైమ్ సాంపిల్ ఆర్డర్ →",
    hi: "🥛 एक बार का सैंपल ऑर्डर →",
  },

  // PRODUCT NAMES & DESCRIPTIONS
  cowMilkName: {
    en: "NSV Pure Cow Milk",
    te: "NSV ప్యూర్ ఆవు పాలు",
    hi: "NSV शुद्ध गाय का दूध",
  },
  cowMilkDesc: {
    en: "100% pure, unadulterated fresh cow milk directly from NSV Dairy Farm. Rich in natural calcium, protein, and essential vitamins.",
    te: "100% స్వచ్ఛమైన, కల్తీ లేని ఆవు పాలు నేరుగా ఫార్మ్ నుండి. సహజమైన క్యాల్షియం, ప్రోటీన్లతో నిండి ఉంటుంది.",
    hi: "NSV डेयरी फार्म से सीधे 100% शुद्ध और ताजा गाय का दूध। प्राकृतिक कैल्शियम और प्रोटीन से भरपूर।",
  },
  buffaloMilkName: {
    en: "NSV Rich Buffalo Milk",
    te: "NSV చిక్కటి గేదె పాలు",
    hi: "NSV गाढ़ा भैंस का दूध",
  },
  buffaloMilkDesc: {
    en: "Thick, high-fat pure buffalo milk from NSV farms, ideal for tea, coffee, rich curd, and traditional Indian sweets.",
    te: "టీ, కాఫీ, చిక్కటి పెరుగు మరియు స్వీట్ల తయారీకి అత్యంత అనుకూలమైన చిక్కటి గేదె పాలు.",
    hi: "चाय, कॉफी, गाढ़े दही और मिठाइयों के लिए आदर्श गाढ़ा और शुद्ध भैंस का दूध।",
  },
  a2MilkName: {
    en: "NSV Native A2 Desi Milk",
    te: "NSV నేటివ్ A2 దేశీ ఆవు పాలు",
    hi: "NSV देसी A2 गाय का दूध",
  },
  a2MilkDesc: {
    en: "Easy-to-digest A2 beta-casein protein milk from indigenous free-grazing desi cows at NSV Dairy Farm.",
    te: "స్వేచ్ఛగా మేసే మన సుదేశీ ఆవుల నుండి లభించే సులభంగా జీర్ణమయ్యే A2 దేశీ ఆవు పాలు.",
    hi: "प्राकृतिक रूप से चरने वाली देसी गायों से सुपाच्य A2 प्रोटीन युक्त दूध।",
  },
  freshCurdName: {
    en: "NSV Farm Fresh Curd",
    te: "NSV ఫార్మ్ ఫ్రెష్ మట్టికుండ పెరుగు",
    hi: "NSV ताजा मिट्टी के मटके का दही",
  },
  freshCurdDesc: {
    en: "Thick, naturally set fresh curd prepared in traditional terracotta clay pots with zero artificial additives.",
    te: "సాంప్రదాయ మట్టి కుండలలో ఎటువంటి రసాయనాలు లేకుండా సహజంగా తోడుపెట్టిన చిక్కటి పెరుగు.",
    hi: "पारंपरिक मिट्टी के बर्तनों में बिना किसी रसायन के स्वाभाविक रूप से जमाया गया गाढ़ा दही।",
  },

  // ─── CHECKOUT & PAYMENT FAILURE TRANSLATIONS ────────────────────────────────
  backToWebsite: {
    en: "← Back to Website",
    te: "← వెబ్‌సైట్‌కి తిరిగి వెళ్లండి",
    hi: "← वेबसाइट पर वापस जाएं",
  },
  dailySubscriptionOrder: {
    en: "📅 Daily Subscription Order",
    te: "📅 డైలీ సబ్‌స్క్రిప్షన్ ఆర్డర్",
    hi: "📅 दैनिक सब्सक्रिप्शन ऑर्डर",
  },
  oneTimeSampleOrder: {
    en: "🥛 One-Time Sample Order",
    te: "🥛 వన్-టైమ్ సాంపిల్ ఆర్డర్",
    hi: "🥛 एक बार का सैंपल ऑर्डर",
  },
  paymentFailedTitle: {
    en: "❌ Payment Failed",
    te: "❌ పేమెంట్ విఫలమైంది",
    hi: "❌ भुगतान विफल रहा",
  },
  paymentFailedDesc: {
    en: "Payment was not successful. Please retry your payment.",
    te: "పేమెంట్ విఫలమైంది, దయచేసి మళ్ళీ రీట్రై చేయండి.",
    hi: "भुगतान सफल नहीं हुआ। कृपया अपना भुगतान पुन: प्रयास करें।",
  },
  retryPaymentBtn: {
    en: "🔄 Retry Payment →",
    te: "🔄 మళ్లీ ప్రయత్నించండి (Retry Payment) →",
    hi: "🔄 पुन: प्रयास करें (Retry Payment) →",
  },
  step1TitleLocation: {
    en: "Step 1: Location & Feasibility Check",
    te: "స్టెప్ 1: లొకేషన్ & ఫీజిబిలిటీ ಪರಿ పరిశీలన",
    hi: "चरण 1: स्थान और उपलब्धता की जांच",
  },
  chooseDeliveryAddress: {
    en: "Select Your Delivery Location",
    te: "మీ డెలివరీ లొకేషన్ ఎంచుకోండి",
    hi: "अपना डिलीवरी स्थान चुनें",
  },
  deliveryTimeNotice: {
    en: "Enter address to check 5:30 AM - 7:00 AM delivery feasibility.",
    te: "ఉదయాన్నే 5:30 AM - 7:00 AM కి డెలివరీ ఫీజిబిలిటీ ఉందో లేదో చెక్ చేయడానికి అడ్రస్ ఇవ్వండి.",
    hi: "सुबह 5:30 से 7:00 बजे तक डिलीवरी उपलब्धता जांचने के लिए पता दर्ज करें।",
  },
  gpsAutoDetect: {
    en: "📍 GPS Auto-Detect",
    te: "📍 GPS ఆటో-డిటెక్ట్",
    hi: "📍 जीपीएस ऑटो-डिटेक्ट",
  },
  manualAddress: {
    en: "✏️ Manual Address",
    te: "✏️ మాన్యువల్ అడ్రస్",
    hi: "✏️ मैनुअल पता",
  },
  districtLabel: { en: "District *", te: "జిల్లా (District) *", hi: "जिला (District) *" },
  mandalLabel: { en: "Mandal *", te: "మండలం (Mandal) *", hi: "मंडल (Mandal) *" },
  villageLabel: { en: "Village / Area *", te: "గ్రామం / ఏరియా (Village) *", hi: "गांव / क्षेत्र *" },
  pincodeLabel: { en: "PIN Code", te: "పిన్ కోడ్ (PIN Code)", hi: "पिन कोड (PIN Code)" },
  houseNoLabel: { en: "House No / Street *", te: "ఇంటి నంబరు / వీధి *", hi: "मकान नंबर / गली *" },
  checkDeliveryFeasibilityBtn: {
    en: "🔍 Check Delivery Feasibility & Continue →",
    te: "🔍 డెలివరీ ఫీజిబిలిటీ చెక్ చేయండి →",
    hi: "🔍 डिलीवरी उपलब्धता जांचें और आगे बढ़ें →",
  },
  feasibleSuccessTitle: {
    en: "Great News! Delivery Feasible in Your Location!",
    te: "మంచి వార్త! మీ లొకేషన్‌లో డెలివరీ అందుబాటులో ఉంది!",
    hi: "खुशखबरी! आपके स्थान पर डिलीवरी उपलब्ध है!",
  },
  feasibleSuccessDesc: {
    en: "Fresh milk will be delivered right to your door every morning between 5:30 AM - 7:00 AM!",
    te: "ఉదయాన్నే 5:30 AM - 7:00 AM లోపు మీ ఇంటికి చల్లటి పాలు చేర్చబడతాయి!",
    hi: "हर सुबह 5:30 से 7:00 बजे के बीच ताज़ा दूध आपके घर पहुंचाया जाएगा!",
  },
  notFeasibleTitle: {
    en: "⚠️ Delivery Currently Not Available in Your Area",
    te: "⚠️ మీ ప్రాంతంలో డెలివరీ ప్రస్తుతం అందుబాటులో లేదు",
    hi: "⚠️ आपके क्षेत्र में वर्तमान में डिलीवरी उपलब्ध नहीं है",
  },
  notFeasibleDesc: {
    en: "We are currently expanding our direct farm supply network across Telangana. Submit a location request and we will launch in your area soon!",
    te: "మేము తెలంగాణ వ్యాప్తంగా కొత్త ఏరియాల్లో డెలివరీలు ప్రారంభించడానికి సిద్ధంగా ఉన్నాం. మీ ప్రాంతంలో త్వరలోనే డెలివరీ స్టార్ట్ చేస్తాం!",
    hi: "हम वर्तमान में तेलंगाना में अपने सीधे फार्म आपूर्ति नेटवर्क का विस्तार कर रहे हैं। अनुरोध दर्ज करें, हम जल्द ही आपके क्षेत्र में शुरू करेंगे!",
  },
  requestServiceBtn: {
    en: "📩 Request Delivery Expansion in My Area →",
    te: "📩 నా ఏరియాలో డెలివరీ ప్రారంభించండి (రిక్వెస్ట్ చేయండి) →",
    hi: "📩 मेरे क्षेत्र में डिलीवरी शुरू करने का अनुरोध करें →",
  },
  selectPaymentMethod: {
    en: "💳 Select Payment Method",
    te: "💳 చెల్లింపు విధానం ఎంచుకోండి",
    hi: "💳 भुगतान का तरीका चुनें",
  },
  editAddressBtn: {
    en: "← Edit Address",
    te: "← అడ్రస్ మార్చండి",
    hi: "← पता बदलें",
  },
  payAndConfirmBtn: {
    en: "✓ Pay & Confirm Doorstep Order",
    te: "✓ పేమెంట్ ఎంచుకుని ఆర్డర్ కన్‌ఫర్మ్ చేయండి",
    hi: "✓ भुगतान करें और ऑर्डर कन्फर्म करें",
  },
  orderConfirmedTitle: {
    en: "Order Confirmed Successfully! 🎉",
    te: "ఆర్డర్ విజయవంతంగా బుక్ అయింది! 🎉",
    hi: "ऑर्डर सफलतापूर्वक कन्फर्म हो गया! 🎉",
  },
  orderConfirmedDesc: {
    en: "Your order has been placed. Morning delivery slot: 5:30 AM - 7:00 AM.",
    te: "మీ ఆర్డర్ బుక్ అయింది! ఉదయం 5:30 AM - 7:00 AM కు డోర్‌స్టెప్ డెలివరీ వస్తుంది.",
    hi: "आपका ऑर्डर हो गया है। सुबह की डिलीवरी का समय: 5:30 - 7:00 बजे।",
  },
  goToHomepageBtn: {
    en: "Go to Homepage →",
    te: "హోమ్‌పేజీకి వెళ్లండి →",
    hi: "होमपेज पर जाएं →",
  },

  // ─── PROFILE & SETTINGS TRANSLATIONS ───────────────────────────────────────
  profileTitle: {
    en: "Customer Profile & Settings",
    te: "కస్టమర్ ప్రొఫైల్ & సెట్టింగ్స్",
    hi: "ग्राहक प्रोफ़ाइल और सेटिंग्स",
  },
  personalDetails: {
    en: "👤 Personal Details",
    te: "👤 వ్యక్తిగత వివరాలు",
    hi: "👤 व्यक्तिगत विवरण",
  },
  fullNameLabel: {
    en: "Full Name",
    te: "పూర్తి పేరు",
    hi: "पूरा नाम",
  },
  registeredMobileLabel: {
    en: "Registered Mobile Number",
    te: "రిజిస్టర్డ్ మొబైల్ నంబర్",
    hi: "पंजीकृत मोबाइल नंबर",
  },
  preferredLanguageTitle: {
    en: "🌐 Preferred Website Language",
    te: "🌐 వెబ్‌సైట్ భాష ఎంపిక",
    hi: "🌐 पसंदीदा वेबसाइट भाषा",
  },
  languageNotice: {
    en: "The entire website will present in your chosen language.",
    te: "మీరు ఎంచుకున్న భాషలోనే వెబ్‌సైట్ మొత్తం కనిపిస్తుంది.",
    hi: "पूरी वेबसाइट आपकी चुनी हुई भाषा में प्रदर्शित होगी।",
  },
  saveSettingsBtn: {
    en: "💾 Save Settings & Profile",
    te: "💾 సెట్టింగ్స్ సేవ్ చేయండి",
    hi: "💾 सेटिंग्स सुरक्षित करें",
  },
  settingsSavedSuccess: {
    en: "✅ Settings & Language Saved Successfully!",
    te: "✅ ప్రొఫైల్ మరియు భాషా సెట్టింగ్స్ సక్సెస్ ఫుల్‌గా సేవ్ అయ్యాయి!",
    hi: "✅ सेटिंग्स और भाषा सफलतापूर्वक सुरक्षित हो गई!",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  const syncLanguage = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nsv_language_pref") as Language;
      if (stored && ["en", "te", "hi"].includes(stored)) {
        setLanguageState(stored);
      }
    }
  };

  useEffect(() => {
    syncLanguage();
    if (typeof window !== "undefined") {
      const handleCustom = () => syncLanguage();
      window.addEventListener("nsv_lang_change", handleCustom);
      window.addEventListener("storage", handleCustom);
      return () => {
        window.removeEventListener("nsv_lang_change", handleCustom);
        window.removeEventListener("storage", handleCustom);
      };
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("nsv_language_pref", lang);
      window.dispatchEvent(new Event("nsv_lang_change"));
    }
  };

  const t = (key: string): string => {
    if (DICTIONARY[key] && DICTIONARY[key][language]) {
      return DICTIONARY[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
