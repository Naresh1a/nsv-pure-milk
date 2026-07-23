export interface Village { name: string; pincode: string }
export interface Mandal { name: string; villages: Village[] }
export interface District { name: string; mandals: Mandal[] }

export const DISTRICT_TRANSLATIONS: Record<string, { te: string; hi: string }> = {
  Adilabad: { te: "ఆదిలాబాద్", hi: "आदिलाबाद" },
  "Bhadradri Kothagudem": { te: "భద్రాద్రి కొత్తగూడెం", hi: "भद्राद्रि कोठागुडेम" },
  Hyderabad: { te: "హైదరాబాద్", hi: "हैदराबाद" },
  Jagtial: { te: "జగిత్యాల", hi: "जगित्याल" },
  Jangaon: { te: "జనగామ", hi: "जनगांव" },
  "Jayashankar Bhupalpally": { te: "జయశంకర్ భూపాలపల్లి", hi: "जयशंकर भूपालपल्ली" },
  "Jogulamba Gadwal": { te: "జోగులాంబ గద్వాల", hi: "जोगुलांबा गडवाल" },
  Kamareddy: { te: "కామారెడ్డి", hi: "कामाరెడ్డి" },
  Karimnagar: { te: "కరీంనగర్", hi: "करीमनगर" },
  Khammam: { te: "ఖమ్మం", hi: "खम्मम" },
  "Komaram Bheem Asifabad": { te: "కొమరం భీమ్ ఆసిఫాబాద్", hi: "कोमाराम भीम आसिफाबाद" },
  Mahabubabad: { te: "మహబూబాబాద్", hi: "महबूबाबाद" },
  Mahabubnagar: { te: "మహబూబ్‌నగర్", hi: "महबूबनगर" },
  Mancherial: { te: "మంచిర్యాల", hi: "मंचेरियल" },
  Medak: { te: "మెదక్", hi: "मेडक" },
  "Medchal-Malkajgiri": { te: "మేడ్చల్-మల్కాజ్‌గిరి", hi: "मेडचल-मलकाजगिरि" },
  Mulugu: { te: "ములుగు", hi: "मुलुगु" },
  Nagarkurnool: { te: "నాగర్‌కర్నూల్", hi: "नागरकर्नूल" },
  Nalgonda: { te: "నల్గొండ", hi: "नलगोंडा" },
  Narayanpet: { te: "నారాయణపేట", hi: "नारायणपेट" },
  Nirmal: { te: "నిర్మల్", hi: "निर्मल" },
  Nizamabad: { te: "నిజామాబాద్", hi: "निज़ामाबाद" },
  Peddapalli: { te: "పెద్దపల్లి", hi: "पेद्दापल्ली" },
  "Rajanna Sircilla": { te: "రాజన్న సిరిసిల్ల", hi: "राजन्ना सिरसिल्ला" },
  "Ranga Reddy": { te: "రంగారెడ్డి", hi: "रंगारेड्डी" },
  Sangareddy: { te: "సంగారెడ్డి", hi: "संगारेड्डी" },
  Siddipet: { te: "సిద్దిపేట", hi: "सिद्धिपेट" },
  Suryapet: { te: "సూర్యాపేట", hi: "सूर्यापेट" },
  Vikarabad: { te: "వికారాబాద్", hi: "विकाराबाद" },
  Wanaparthy: { te: "వనపర్తి", hi: "वनपर्थी" },
  Warangal: { te: "వరంగల్", hi: "वरंगल" },
  Hanamkonda: { te: "హనుమకొండ", hi: "हनमकोंडा" },
  "Yadadri Bhuvanagiri": { te: "యాదాద్రి భువనగిరి", hi: "यादाद्रि भुवनगिरि" },
};

export const MANDAL_TRANSLATIONS: Record<string, { te: string; hi: string }> = {
  "Jubilee Hills": { te: "జూబ్లీ హిల్స్", hi: "जुबली हिल्स" },
  "Gachibowli / Serilingampally": { te: "గచ్చిబౌలి / శేరిలింగంపల్లి", hi: "गचीबोवली / सेरिलिंगमपल्ली" },
  Kukatpally: { te: "కూకట్‌పల్లి", hi: "कुकटपल्ली" },
  Secunderabad: { te: "సికింద్రాబాద్", hi: "सिकंदराबाद" },
  Madhapur: { te: "మాదాపూర్", hi: "माधापुर" },
  "Banjara Hills": { te: "బంజారా హిల్స్", hi: "बंजारा हिल्स" },
  Ameerpet: { te: "అమీర్‌పేట్", hi: "अमीरपेट" },
  Miyapur: { te: "మియాపూర్", hi: "मियापुर" },
  Begumpet: { te: "బేగంపేట్", hi: "बेगमपेट" },
  Kondapur: { te: "కొండాపూర్", hi: "कोंडापुर" },
  "LB Nagar": { te: "ఎల్బీ నగర్", hi: "एलबी नगर" },
  Dilsukhnagar: { te: "దిల్‌సుఖ్‌నగర్", hi: "दिलसुखनगर" },
  "Charminar / Old City": { te: "చార్మినార్ / ఓల్డ్ సిటీ", hi: "चारमीनार / ओल्ड सिटी" },
};

export const VILLAGE_TRANSLATIONS: Record<string, { te: string; hi: string }> = {
  "Jubilee Hills Checkpost": { te: "జూబ్లీ హిల్స్ చెక్‌పోస్ట్", hi: "जुबली हिल्स चेकपोस्ट" },
  "Road No 36": { te: "రోడ్ నంబర్ 36", hi: "रोड नंबर 36" },
  Filmnagar: { te: "ఫిల్మ్‌నగర్", hi: "फिल्मनागर" },
  Venkatagiri: { te: "వెంకటగిరి", hi: "वेंकटगिरि" },
  "DLF Cyber City": { te: "డిఎల్‌ఎఫ్ సైబర్ సిటీ", hi: "डीएलएफ साइबर सिटी" },
  "Gachibowli Flyover Area": { te: "గచ్చిబౌలి ప్రాంతం", hi: "गचीबोवली क्षेत्र" },
  "Financial District": { te: "ఫైనాన్షియల్ డిస్ట్రిక్ట్", hi: "फाइनेंशियल डिस्ट्रिक्ट" },
  "KPHB Colony": { te: "కేపీహెచ్‌బీ కాలనీ", hi: "केपीएचबी कॉलोनी" },
  "Pragathi Nagar": { te: "ప్రగతి నగర్", hi: "प्रगति नगर" },
  Nizampet: { te: "నిజాంపేట్", hi: "निज़ामपेट" },
  "JNTU Area": { te: "జేఎన్‌టీయూ ప్రాంతం", hi: "जेएनटीयू क्षेत्र" },
  "Paradise Circle": { te: "ప్యారడైజ్ సర్కిల్", hi: "पैराडाइज सर्कल" },
  "Patny Center": { te: "పాట్నీ సెంటర్", hi: "पाटनी सेंटर" },
  "Clock Tower": { te: "క్లాక్ టవర్", hi: "क्लॉक टावर" },
  "RP Road": { te: "ఆర్‌పీ రోడ్", hi: "आरपी रोड" },
  "Adilabad Town": { te: "ఆదిలాబాద్ టౌన్", hi: "आदिलाबाद टाउन" },
  "Kothagudem Main Town": { te: "కొత్తగూడెం టౌన్", hi: "कोठागुडेम टाउन" },
  "Bhadrachalam Temple Town": { te: "భద్రాచలం టౌన్", hi: "भद्राचलम टाउन" },
};

export function getLocalizedDistrictName(name: string, lang: string): string {
  if (!name) return "";
  if (lang === "te" && DISTRICT_TRANSLATIONS[name]?.te) return `${name} (${DISTRICT_TRANSLATIONS[name].te})`;
  if (lang === "hi" && DISTRICT_TRANSLATIONS[name]?.hi) return `${name} (${DISTRICT_TRANSLATIONS[name].hi})`;
  return name;
}

export function getLocalizedMandalName(name: string, lang: string): string {
  if (!name) return "";
  if (lang === "te" && MANDAL_TRANSLATIONS[name]?.te) return `${name} (${MANDAL_TRANSLATIONS[name].te})`;
  if (lang === "hi" && MANDAL_TRANSLATIONS[name]?.hi) return `${name} (${MANDAL_TRANSLATIONS[name].hi})`;
  return name;
}

export function getLocalizedVillageName(name: string, lang: string): string {
  if (!name) return "";
  if (lang === "te" && VILLAGE_TRANSLATIONS[name]?.te) return `${name} (${VILLAGE_TRANSLATIONS[name].te})`;
  if (lang === "hi" && VILLAGE_TRANSLATIONS[name]?.hi) return `${name} (${VILLAGE_TRANSLATIONS[name].hi})`;
  return name;
}

export const TELANGANA_DATA: District[] = [
  {
    name: "Adilabad",
    mandals: [
      {
        name: "Adilabad Urban",
        villages: [
          { name: "Adilabad Town", pincode: "504001" },
          { name: "Mavala", pincode: "504002" },
          { name: "Dasnapur", pincode: "504001" },
        ],
      },
      {
        name: "Bela / Jainath",
        villages: [
          { name: "Bela", pincode: "504309" },
          { name: "Jainath", pincode: "504309" },
          { name: "Gudihatnoor", pincode: "504308" },
        ],
      },
      {
        name: "Utnoor",
        villages: [
          { name: "Utnoor Town", pincode: "504311" },
          { name: "Indervelly", pincode: "504311" },
          { name: "Narnoor", pincode: "504311" },
        ],
      },
    ],
  },
  {
    name: "Bhadradri Kothagudem",
    mandals: [
      {
        name: "Kothagudem",
        villages: [
          { name: "Kothagudem Main Town", pincode: "507101" },
          { name: "Palwancha", pincode: "507115" },
          { name: "Rudrampur", pincode: "507115" },
          { name: "Suvarna Nagar", pincode: "507101" },
        ],
      },
      {
        name: "Bhadrachalam",
        villages: [
          { name: "Bhadrachalam Temple Town", pincode: "507111" },
          { name: "Burgampahad", pincode: "507114" },
          { name: "Sarapaka", pincode: "507128" },
          { name: "Aswapuram", pincode: "507116" },
        ],
      },
      {
        name: "Manuguru / Yellandu",
        villages: [
          { name: "Manuguru", pincode: "507117" },
          { name: "Yellandu", pincode: "507123" },
          { name: "Tekulapalli", pincode: "507123" },
        ],
      },
    ],
  },
  {
    name: "Hyderabad",
    mandals: [
      {
        name: "Jubilee Hills",
        villages: [
          { name: "Jubilee Hills Checkpost", pincode: "500033" },
          { name: "Road No 36 / 45 Jubilee Hills", pincode: "500033" },
          { name: "Film Nagar", pincode: "500096" },
          { name: "Nandagiri Hills", pincode: "500033" },
          { name: "Prashasan Nagar", pincode: "500033" },
          { name: "Shaikpet", pincode: "500008" },
        ],
      },
      {
        name: "Khairatabad / Banjara Hills",
        villages: [
          { name: "Banjara Hills Road No 1-14", pincode: "500034" },
          { name: "Somajiguda", pincode: "500082" },
          { name: "Khairatabad", pincode: "500004" },
          { name: "Erramanzil", pincode: "500004" },
          { name: "Panjagutta", pincode: "500082" },
          { name: "Raj Bhavan Road", pincode: "500082" },
        ],
      },
      {
        name: "Serilingampally / Hitech City",
        villages: [
          { name: "Gachibowli", pincode: "500032" },
          { name: "Madhapur", pincode: "500081" },
          { name: "Kondapur", pincode: "500084" },
          { name: "Hitech City", pincode: "500081" },
          { name: "Nanakramguda", pincode: "500032" },
          { name: "Financial District", pincode: "500032" },
          { name: "Hafeezpet", pincode: "500049" },
          { name: "Khajaguda", pincode: "500008" },
          { name: "Raidurgam", pincode: "500032" },
        ],
      },
      {
        name: "Kukatpally",
        villages: [
          { name: "Kukatpally Housing Board (KPHB)", pincode: "500072" },
          { name: "Miyapur", pincode: "500049" },
          { name: "Chanda Nagar", pincode: "500050" },
          { name: "Nizampet", pincode: "500090" },
          { name: "Bachupally", pincode: "500090" },
          { name: "Pragathi Nagar", pincode: "500090" },
          { name: "Hydernagar", pincode: "500072" },
          { name: "Allwyn Colony", pincode: "500072" },
        ],
      },
      {
        name: "Secunderabad",
        villages: [
          { name: "Secunderabad Station Area", pincode: "500003" },
          { name: "Begumpet", pincode: "500016" },
          { name: "East Marredpally", pincode: "500026" },
          { name: "West Marredpally", pincode: "500026" },
          { name: "Padmarao Nagar", pincode: "500025" },
          { name: "Sitaphalmandi", pincode: "500061" },
          { name: "Tarnaka", pincode: "500007" },
          { name: "Sindhi Colony", pincode: "500003" },
        ],
      },
      {
        name: "Ameerpet / SR Nagar",
        villages: [
          { name: "Ameerpet Cross Roads", pincode: "500016" },
          { name: "SR Nagar", pincode: "500038" },
          { name: "Sanjeeva Reddy Nagar", pincode: "500038" },
          { name: "Balkampet", pincode: "500038" },
          { name: "Vengal Rao Nagar", pincode: "500038" },
          { name: "Yellareddyguda", pincode: "500073" },
        ],
      },
      {
        name: "Mehdipatnam",
        villages: [
          { name: "Mehdipatnam", pincode: "500028" },
          { name: "Tolichowki", pincode: "500008" },
          { name: "Manikonda", pincode: "500089" },
          { name: "Puppalaguda", pincode: "500089" },
          { name: "Attapur", pincode: "500048" },
          { name: "Gudimalkapur", pincode: "500028" },
          { name: "Langar Houz", pincode: "500008" },
        ],
      },
      {
        name: "LB Nagar / Dilsukhnagar",
        villages: [
          { name: "LB Nagar Ring Road", pincode: "500074" },
          { name: "Dilsukhnagar", pincode: "500060" },
          { name: "Kothapet", pincode: "500035" },
          { name: "Saroornagar", pincode: "500035" },
          { name: "Nagole", pincode: "500068" },
          { name: "Chaitanyapuri", pincode: "500060" },
          { name: "Vanasthalipuram", pincode: "500070" },
          { name: "Hayathnagar", pincode: "501505" },
        ],
      },
      {
        name: "Charminar / Old City",
        villages: [
          { name: "Charminar", pincode: "500002" },
          { name: "Malakpet", pincode: "500036" },
          { name: "Santosh Nagar", pincode: "500059" },
          { name: "Chandrayangutta", pincode: "500005" },
          { name: "Faluknama", pincode: "500053" },
          { name: "Madannapet", pincode: "500059" },
        ],
      },
    ],
  },
  {
    name: "Jagtial",
    mandals: [
      {
        name: "Jagtial Urban",
        villages: [
          { name: "Jagtial City", pincode: "505327" },
          { name: "Dharoor", pincode: "505327" },
          { name: "Mothe", pincode: "505327" },
        ],
      },
      {
        name: "Korutla / Metpally",
        villages: [
          { name: "Korutla Town", pincode: "505326" },
          { name: "Metpally Town", pincode: "505325" },
          { name: "Ibrahimpatnam", pincode: "505450" },
          { name: "Mallapur", pincode: "505331" },
        ],
      },
      {
        name: "Dharmapuri",
        villages: [
          { name: "Dharmapuri Temple Town", pincode: "505425" },
          { name: "Gollapalli", pincode: "505532" },
          { name: "Velgatoor", pincode: "505526" },
        ],
      },
    ],
  },
  {
    name: "Jangaon",
    mandals: [
      {
        name: "Jangaon Urban",
        villages: [
          { name: "Jangaon Town", pincode: "506167" },
          { name: "Pembarthi", pincode: "506167" },
          { name: "Yashwanthapur", pincode: "506167" },
        ],
      },
      {
        name: "Station Ghanpur / Raghunathpally",
        villages: [
          { name: "Station Ghanpur", pincode: "506144" },
          { name: "Raghunathpally", pincode: "506317" },
          { name: "Lingala Ghanpur", pincode: "506167" },
        ],
      },
      {
        name: "Palakurthi / Bachannapet",
        villages: [
          { name: "Palakurthi", pincode: "506252" },
          { name: "Bachannapet", pincode: "506221" },
          { name: "Devaruppula", pincode: "506302" },
        ],
      },
    ],
  },
  {
    name: "Jayashankar Bhupalpally",
    mandals: [
      {
        name: "Bhupalpally",
        villages: [
          { name: "Bhupalpally Town", pincode: "506169" },
          { name: "Kaleshwaram", pincode: "505504" },
          { name: "Ghanpur", pincode: "506345" },
        ],
      },
      {
        name: "Kataram / Mahadevpur",
        villages: [
          { name: "Kataram", pincode: "505503" },
          { name: "Mahadevpur", pincode: "505504" },
          { name: "Mutharam", pincode: "505503" },
        ],
      },
    ],
  },
  {
    name: "Jogulamba Gadwal",
    mandals: [
      {
        name: "Gadwal",
        villages: [
          { name: "Gadwal Town", pincode: "509125" },
          { name: "Alampur", pincode: "509152" },
          { name: "Beechupally", pincode: "509125" },
        ],
      },
      {
        name: "Ieeja / Itikyal",
        villages: [
          { name: "Ieeja", pincode: "509127" },
          { name: "Itikyal", pincode: "509128" },
          { name: "Maldakal", pincode: "509132" },
        ],
      },
    ],
  },
  {
    name: "Kamareddy",
    mandals: [
      {
        name: "Kamareddy Urban",
        villages: [
          { name: "Kamareddy Town", pincode: "503111" },
          { name: "Devunipally", pincode: "503111" },
          { name: "Adloor", pincode: "503111" },
        ],
      },
      {
        name: "Banswada / Yellareddy",
        villages: [
          { name: "Banswada Town", pincode: "503187" },
          { name: "Yellareddy Town", pincode: "503122" },
          { name: "Pitlam", pincode: "503310" },
          { name: "Bhiknoor", pincode: "503101" },
        ],
      },
    ],
  },
  {
    name: "Karimnagar",
    mandals: [
      {
        name: "Karimnagar Town",
        villages: [
          { name: "Karimnagar Main City", pincode: "505001" },
          { name: "Collectorate Area", pincode: "505001" },
          { name: "Mukarampura", pincode: "505001" },
          { name: "Kothapalli", pincode: "505001" },
          { name: "Housing Board Colony", pincode: "505001" },
          { name: "Bhagyanagar", pincode: "505001" },
        ],
      },
      {
        name: "Huzurabad / Jammikunta",
        villages: [
          { name: "Huzurabad Town", pincode: "505468" },
          { name: "Jammikunta", pincode: "505122" },
          { name: "Veenavanka", pincode: "505502" },
          { name: "Shankarapatnam", pincode: "505470" },
        ],
      },
      {
        name: "Choppadandi / Manakondur",
        villages: [
          { name: "Choppadandi", pincode: "505415" },
          { name: "Manakondur", pincode: "505505" },
          { name: "Gangadhara", pincode: "505445" },
          { name: "Ramadugu", pincode: "505531" },
        ],
      },
    ],
  },
  {
    name: "Khammam",
    mandals: [
      {
        name: "Khammam Town",
        villages: [
          { name: "Khammam City Center", pincode: "507001" },
          { name: "Wyra Road", pincode: "507002" },
          { name: "Naya Bazar", pincode: "507001" },
          { name: "Khanapuram Haveli", pincode: "507002" },
          { name: "Mamillagudem", pincode: "507001" },
        ],
      },
      {
        name: "Wyra / Madhira",
        villages: [
          { name: "Wyra Town", pincode: "507165" },
          { name: "Madhira Town", pincode: "507203" },
          { name: "Sathupally", pincode: "507303" },
          { name: "Kalluru", pincode: "507209" },
        ],
      },
    ],
  },
  {
    name: "Komaram Bheem Asifabad",
    mandals: [
      {
        name: "Asifabad",
        villages: [
          { name: "Asifabad Town", pincode: "504293" },
          { name: "Rebbena", pincode: "504292" },
          { name: "Kerameri", pincode: "504293" },
        ],
      },
      {
        name: "Kagaznagar",
        villages: [
          { name: "Kagaznagar Paper Mill Area", pincode: "504296" },
          { name: "Sirpur T", pincode: "504299" },
          { name: "Dahegaon", pincode: "504273" },
        ],
      },
    ],
  },
  {
    name: "Mahabubabad",
    mandals: [
      {
        name: "Mahabubabad Urban",
        villages: [
          { name: "Mahabubabad Town", pincode: "506101" },
          { name: "Thorrur", pincode: "506163" },
          { name: "Kesamudram", pincode: "506112" },
        ],
      },
      {
        name: "Maripeda / Kuravi",
        villages: [
          { name: "Maripeda", pincode: "506315" },
          { name: "Kuravi", pincode: "506105" },
          { name: "Dornakal", pincode: "506381" },
        ],
      },
    ],
  },
  {
    name: "Mahabubnagar",
    mandals: [
      {
        name: "Mahabubnagar Town",
        villages: [
          { name: "Mahabubnagar Main City", pincode: "509001" },
          { name: "Clock Tower Mahbubnagar", pincode: "509001" },
          { name: "Jadcherla Town", pincode: "509301" },
          { name: "Bhutpur", pincode: "509382" },
        ],
      },
      {
        name: "Devarkadra / Nawabpet",
        villages: [
          { name: "Devarkadra", pincode: "509204" },
          { name: "Nawabpet", pincode: "509340" },
          { name: "Midjil", pincode: "509357" },
        ],
      },
    ],
  },
  {
    name: "Mancherial",
    mandals: [
      {
        name: "Mancherial Urban",
        villages: [
          { name: "Mancherial Town", pincode: "504208" },
          { name: "CCC Naspur", pincode: "504302" },
          { name: "Luxettipet", pincode: "504215" },
        ],
      },
      {
        name: "Bellampally / Mandamarri",
        villages: [
          { name: "Bellampally Town", pincode: "504251" },
          { name: "Mandamarri", pincode: "504231" },
          { name: "Chennur", pincode: "504201" },
          { name: "Kyathanpally", pincode: "504251" },
        ],
      },
    ],
  },
  {
    name: "Medak",
    mandals: [
      {
        name: "Medak Urban",
        villages: [
          { name: "Medak Cathedral Town", pincode: "502110" },
          { name: "Haveli Ghanpur", pincode: "502110" },
          { name: "Ramayampet", pincode: "502159" },
        ],
      },
      {
        name: "Toopran / Narsapur",
        villages: [
          { name: "Toopran Town", pincode: "502334" },
          { name: "Narsapur Town", pincode: "502313" },
          { name: "Yeldurthy", pincode: "502255" },
          { name: "Shankarampet", pincode: "502223" },
        ],
      },
    ],
  },
  {
    name: "Medchal-Malkajgiri",
    mandals: [
      {
        name: "Kompally / Quthbullapur",
        villages: [
          { name: "Kompally", pincode: "500014" },
          { name: "Suraram", pincode: "500055" },
          { name: "Jeedimetla", pincode: "500055" },
          { name: "Gajularamaram", pincode: "500055" },
          { name: "Suchitra Circle", pincode: "500067" },
          { name: "Dulapally", pincode: "500014" },
        ],
      },
      {
        name: "Malkajgiri / Uppal",
        villages: [
          { name: "Malkajgiri", pincode: "500047" },
          { name: "Uppal", pincode: "500039" },
          { name: "Boduppal", pincode: "500092" },
          { name: "Peerzadiguda", pincode: "500098" },
          { name: "Nacharam", pincode: "500076" },
          { name: "Mallapur", pincode: "500076" },
          { name: "Chengicherla", pincode: "500098" },
        ],
      },
      {
        name: "Medchal",
        villages: [
          { name: "Medchal Town", pincode: "501401" },
          { name: "Dundigal", pincode: "500043" },
          { name: "Gundlapochampally", pincode: "501401" },
          { name: "Kistapur", pincode: "501401" },
        ],
      },
      {
        name: "Alwal",
        villages: [
          { name: "Alwal", pincode: "500010" },
          { name: "Old Alwal", pincode: "500010" },
          { name: "Lothkunta", pincode: "500015" },
          { name: "Bolarum", pincode: "500010" },
          { name: "Yapral", pincode: "500087" },
          { name: "Sainikpuri", pincode: "500094" },
        ],
      },
    ],
  },
  {
    name: "Mulugu",
    mandals: [
      {
        name: "Mulugu Urban",
        villages: [
          { name: "Mulugu Town", pincode: "506343" },
          { name: "Ramappa Lake Area (Palampet)", pincode: "506345" },
          { name: "Ghanpur Mulugu", pincode: "506345" },
        ],
      },
      {
        name: "Eturnagaram / Mangapet",
        villages: [
          { name: "Eturnagaram Sanctuary", pincode: "506165" },
          { name: "Mangapet", pincode: "506172" },
          { name: "Tadvai", pincode: "506344" },
          { name: "Medaram", pincode: "506344" },
        ],
      },
    ],
  },
  {
    name: "Nagarkurnool",
    mandals: [
      {
        name: "Nagarkurnool Urban",
        villages: [
          { name: "Nagarkurnool Town", pincode: "509209" },
          { name: "Bijinapally", pincode: "509203" },
          { name: "Tadoor", pincode: "509209" },
        ],
      },
      {
        name: "Kalwakurthy / Achampet",
        villages: [
          { name: "Kalwakurthy Town", pincode: "509324" },
          { name: "Achampet Town", pincode: "509375" },
          { name: "Amrabad", pincode: "509326" },
          { name: "Srisailam Highway Checkpost", pincode: "509326" },
        ],
      },
    ],
  },
  {
    name: "Nalgonda",
    mandals: [
      {
        name: "Nalgonda Town",
        villages: [
          { name: "Nalgonda Main City", pincode: "508001" },
          { name: "Clock Tower Area", pincode: "508001" },
          { name: "Hyderabad Road Nalgonda", pincode: "508001" },
        ],
      },
      {
        name: "Miryalaguda / Nakrekal",
        villages: [
          { name: "Miryalaguda Town", pincode: "508207" },
          { name: "Nakrekal Town", pincode: "508211" },
          { name: "Devarakonda", pincode: "508248" },
          { name: "Narketpally", pincode: "508254" },
        ],
      },
    ],
  },
  {
    name: "Narayanpet",
    mandals: [
      {
        name: "Narayanpet Urban",
        villages: [
          { name: "Narayanpet Town", pincode: "509210" },
          { name: "Damaragidda", pincode: "509210" },
          { name: "Utkoor", pincode: "509326" },
        ],
      },
      {
        name: "Kosgi / Makthal",
        villages: [
          { name: "Kosgi Town", pincode: "509339" },
          { name: "Makthal Town", pincode: "509208" },
          { name: "Maddur", pincode: "509339" },
        ],
      },
    ],
  },
  {
    name: "Nirmal",
    mandals: [
      {
        name: "Nirmal Urban",
        villages: [
          { name: "Nirmal Town", pincode: "504106" },
          { name: "Mancherial Road Nirmal", pincode: "504106" },
          { name: "Soan", pincode: "504106" },
        ],
      },
      {
        name: "Bhainsa / Khanapur",
        villages: [
          { name: "Bhainsa Town", pincode: "504103" },
          { name: "Khanapur Nirmal", pincode: "504203" },
          { name: "Kaddam", pincode: "504202" },
        ],
      },
    ],
  },
  {
    name: "Nizamabad",
    mandals: [
      {
        name: "Nizamabad Urban",
        villages: [
          { name: "Nizamabad City Center", pincode: "503001" },
          { name: "Phulong X Road", pincode: "503001" },
          { name: "Vinayak Nagar", pincode: "503002" },
          { name: "Khaleelwadi", pincode: "503001" },
          { name: "Dichpally", pincode: "503175" },
        ],
      },
      {
        name: "Armoor / Bodhan",
        villages: [
          { name: "Armoor Town", pincode: "503224" },
          { name: "Bodhan Town", pincode: "503185" },
          { name: "Perkit", pincode: "503224" },
          { name: "Bheemgal", pincode: "503224" },
          { name: "Varni", pincode: "503201" },
        ],
      },
    ],
  },
  {
    name: "Peddapalli",
    mandals: [
      {
        name: "Peddapalli Urban",
        villages: [
          { name: "Peddapalli Town", pincode: "505172" },
          { name: "Centenary Colony", pincode: "505212" },
          { name: "Sulthanabad", pincode: "505185" },
        ],
      },
      {
        name: "Ramagundam / Godavarikhani",
        villages: [
          { name: "Ramagundam NTPC City", pincode: "505215" },
          { name: "Godavarikhani Town", pincode: "505209" },
          { name: "Manthani", pincode: "505184" },
        ],
      },
    ],
  },
  {
    name: "Rajanna Sircilla",
    mandals: [
      {
        name: "Sircilla Urban",
        villages: [
          { name: "Sircilla Textile Town", pincode: "505301" },
          { name: "Thangallapally", pincode: "505301" },
          { name: "Mustabad", pincode: "505303" },
        ],
      },
      {
        name: "Vemulawada",
        villages: [
          { name: "Vemulawada Temple Town", pincode: "505302" },
          { name: "Chandurthi", pincode: "505403" },
          { name: "Yellareddypet", pincode: "505305" },
        ],
      },
    ],
  },
  {
    name: "Ranga Reddy",
    mandals: [
      {
        name: "Rajendranagar",
        villages: [
          { name: "Rajendranagar", pincode: "500030" },
          { name: "Hyderguda", pincode: "500029" },
          { name: "Budvel", pincode: "500030" },
          { name: "Shamshabad", pincode: "501218" },
          { name: "Umda Nagar", pincode: "501218" },
          { name: "Kismatpur", pincode: "500030" },
          { name: "Bandlaguda Jagir", pincode: "500086" },
        ],
      },
      {
        name: "Chevella / Moinabad",
        villages: [
          { name: "Chevella Town", pincode: "501503" },
          { name: "Moinabad", pincode: "501504" },
          { name: "Shankarpally", pincode: "501203" },
          { name: "Himayatsagar", pincode: "500091" },
          { name: "Chilkur", pincode: "501504" },
          { name: "Kanakamamidi", pincode: "501504" },
        ],
      },
      {
        name: "Ibrahimpatnam / Maheswaram",
        villages: [
          { name: "Ibrahimpatnam", pincode: "501506" },
          { name: "Maheswaram", pincode: "501359" },
          { name: "Kandukur", pincode: "501359" },
          { name: "Kothur", pincode: "509228" },
          { name: "Shadnagar", pincode: "509216" },
          { name: "Tukkuguda", pincode: "501359" },
        ],
      },
    ],
  },
  {
    name: "Sangareddy",
    mandals: [
      {
        name: "Patancheru / Ameenpur",
        villages: [
          { name: "Patancheru Industrial Area", pincode: "502319" },
          { name: "Ameenpur", pincode: "502032" },
          { name: "Beeramguda", pincode: "502032" },
          { name: "Isnapur", pincode: "502307" },
          { name: "Muthangi", pincode: "502319" },
          { name: "Kollur", pincode: "502300" },
        ],
      },
      {
        name: "Sangareddy / Zaheerabad",
        villages: [
          { name: "Sangareddy Town", pincode: "502001" },
          { name: "Zaheerabad Town", pincode: "502220" },
          { name: "Kandi", pincode: "502285" },
          { name: "Sadasivpet", pincode: "502291" },
        ],
      },
    ],
  },
  {
    name: "Siddipet",
    mandals: [
      {
        name: "Siddipet Town",
        villages: [
          { name: "Siddipet Main City", pincode: "502103" },
          { name: "Gajwel Town", pincode: "502110" },
          { name: "Dubbak", pincode: "502108" },
          { name: "Husnabad", pincode: "505467" },
        ],
      },
    ],
  },
  {
    name: "Suryapet",
    mandals: [
      {
        name: "Suryapet Urban",
        villages: [
          { name: "Suryapet Main City", pincode: "508213" },
          { name: "Khammam Road Suryapet", pincode: "508213" },
          { name: "Chivvemla", pincode: "508213" },
        ],
      },
      {
        name: "Kodad / Huzurnagar",
        villages: [
          { name: "Kodad Town", pincode: "508206" },
          { name: "Huzurnagar Town", pincode: "508204" },
          { name: "Mellachervu", pincode: "508246" },
          { name: "Garidepally", pincode: "508201" },
        ],
      },
    ],
  },
  {
    name: "Vikarabad",
    mandals: [
      {
        name: "Vikarabad Urban",
        villages: [
          { name: "Vikarabad Town", pincode: "501101" },
          { name: "Ananthagiri Hills Area", pincode: "501101" },
          { name: "Dharur", pincode: "501121" },
        ],
      },
      {
        name: "Tandur / Pargi",
        villages: [
          { name: "Tandur Town", pincode: "501141" },
          { name: "Pargi Town", pincode: "501501" },
          { name: "Yalal", pincode: "501111" },
          { name: "Kulkacherla", pincode: "501502" },
        ],
      },
    ],
  },
  {
    name: "Wanaparthy",
    mandals: [
      {
        name: "Wanaparthy Urban",
        villages: [
          { name: "Wanaparthy Palace Town", pincode: "509103" },
          { name: "Kothakota", pincode: "509381" },
          { name: "Pebbair", pincode: "509104" },
        ],
      },
      {
        name: "Pangala / Atmakur",
        villages: [
          { name: "Pangal", pincode: "509120" },
          { name: "Atmakur Wanaparthy", pincode: "509131" },
          { name: "Ghanpur Wanaparthy", pincode: "509380" },
        ],
      },
    ],
  },
  {
    name: "Warangal Rural",
    mandals: [
      {
        name: "Narsampet",
        villages: [
          { name: "Narsampet Town", pincode: "506132" },
          { name: "Chennaraopet", pincode: "506332" },
          { name: "Duggondi", pincode: "506331" },
          { name: "Khanapur", pincode: "506132" },
        ],
      },
      {
        name: "Parkal / Geesugonda",
        villages: [
          { name: "Parkal Town", pincode: "506164" },
          { name: "Geesugonda", pincode: "506330" },
          { name: "Atmakur", pincode: "506342" },
          { name: "Shayampet", pincode: "506319" },
        ],
      },
    ],
  },
  {
    name: "Warangal Urban (Hanumakonda)",
    mandals: [
      {
        name: "Hanamkonda",
        villages: [
          { name: "Hanamkonda Main Road", pincode: "506001" },
          { name: "Subedari", pincode: "506001" },
          { name: "Naimnagar", pincode: "506009" },
          { name: "Kishanpura", pincode: "506001" },
          { name: "Balasamudram", pincode: "506001" },
          { name: "Kazipet", pincode: "506003" },
          { name: "NIT Campus Area", pincode: "506004" },
        ],
      },
      {
        name: "Warangal Town",
        villages: [
          { name: "Warangal Fort Road", pincode: "506002" },
          { name: "MGM Hospital Area", pincode: "506007" },
          { name: "Pochamma Maidan", pincode: "506002" },
          { name: "Under Bridge Road", pincode: "506002" },
          { name: "Deshaipet", pincode: "506006" },
        ],
      },
      {
        name: "Hasanparthy",
        villages: [
          { name: "Hasanparthy", pincode: "506015" },
          { name: "Ananthasagar", pincode: "506015" },
          { name: "Pegadapally", pincode: "506015" },
          { name: "Vemulawada Road", pincode: "506015" },
        ],
      },
    ],
  },
  {
    name: "Yadadri Bhuvanagiri",
    mandals: [
      {
        name: "Bhongir / Yadagirigutta",
        villages: [
          { name: "Bhongir Town & Fort", pincode: "508116" },
          { name: "Yadagirigutta Temple Town", pincode: "508115" },
          { name: "Alair", pincode: "508101" },
          { name: "Bibinagar", pincode: "508126" },
        ],
      },
      {
        name: "Choutuppal / Pochampally",
        villages: [
          { name: "Choutuppal Town", pincode: "508252" },
          { name: "Pochampally Silk Village", pincode: "508284" },
          { name: "Ramannapet", pincode: "508113" },
          { name: "Valigonda", pincode: "508112" },
        ],
      },
    ],
  },
];
