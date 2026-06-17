/* =========================
   G-BOARD STYLE DICTIONARY
   Categories | Cities | States | Predictions
  ========================== */

export const SUGGESTIONS_DICTIONARY = {
  // 1. BUSINESS CATEGORIES (Common across India)
  categories: [
    "Shop", "Showroom", "Service Center", "Restaurant", "Hotel", 
    "Hospital", "Clinic", "Pharmacy", "School", "College", 
    "Coaching Class", "Gym", "Spa", "Salon", "Garages", 
    "Electronics", "Hardware", "Grocery Store", "Boutique", 
    "Jewellery Store", "Bakery", "Cafe", "Car Rental", "NGO", 
    "Consultancy", "Real Estate", "Printing Press", "Photography Studio", 
    "Software Company", "Manufacturing", "Interior Design", "Logistics"
  ],

  // 2. MAJOR INDIAN CITIES 
  cities: [
    "Ahmedabad", "Mumbai", "Delhi", "Bangalore", "Hyderabad", 
    "Chennai", "Kolkata", "Pune", "Surat", "Jaipur", 
    "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", 
    "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara", 
    "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", 
    "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi", 
    "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai"
  ],

  // 3. INDIAN STATES
  states: [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ],

  // 4. LANGUAGE-BASED WORD PREDICTIONS (Gboard-style)
  language_predictions: {
    "en": ["How", "What", "Where", "When", "Show", "Add", "Update", "Business", "Profile", "Login", "Reset", "Help", "Register", "Near me", "Top rated"],
    "hi": ["कैसे", "क्या", "कहाँ", "कब", "दिखाओ", "जोड़ें", "अपडेट", "व्यवसाय", "प्रोफ़ाइल", "लॉगिन", "रीसेट", "मदद", "पंजीकरण", "मेरे पास", "टॉप रेटेड"],
    "gu": ["કેવી રીતે", "શું", "ક્યાં", "ક્યારે", "બતાવો", "ઉમેરો", "અપડેટ", "વ્યવસાય", "પ્રોફાઇલ", "લોગિન", "રીસેટ", "મદદ", "નોંધણી", "મારી નજીક", "ટોચના ક્રમાંકિત"],
    "mr": ["कसे", "काय", "कुठे", "केव्हा", "दाखवा", "जोडा", "अपडेट", "व्यवसाय", "प्रोफाइल", "लॉगिन", "रीसेट", "मदत", "नोंदणी", "माझ्या जवळ", "टॉप रेटेड"],
    "te": ["ఎలా", "ఏమిటి", "ఎక్కడ", "ఎప్పుడు", "చూపించు", "జోడించు", "అప్‌డేట్", "వ్యాపారం", "ప్రొఫైల్", "లాగిన్", "రీసెట్", "సహాయం", "రిజిస్ట్రేషన్", "నా దగ్గర", "టాప్ రేటెడ్"],
    "ta": ["எப்படி", "என்ன", "எங்கே", "எப்போது", "காண்பி", "சேர்", "புதுப்பி", "வணிகம்", "சுயவிவரம்", "உள்நுழை", "மீட்டமை", "உதவி", "பதிவு", "எனக்கு அருகில்", "சிறந்த மதிப்பீடு"],
    "bn": ["কিভাবে", "কি", "কোথায়", "কখন", "দেখান", "যোগ করুন", "আপডেট", "ব্যবসা", "প্রোফাইল", "লগইন", "রিসেট", "সাহায্য", "নিবন্ধন", "আমার কাছে", "সেরা রেট"],
    "kn": ["ಹೇಗೆ", "ಏನು", "ಎಲ್ಲಿ", "ಯಾವಾಗ", "ತೋರಿಸು", "ಸೇರಿಸು", "ಅಪ್‌ಡೇಟ್", "ವ್ಯವಹಾರ", "ಪ್ರೊಫೈಲ್", "ಲಾಗಿನ್", "ರಿಸೆಟ್", "ಸಹಾಯ", "ನೋಂದಣಿ", "ನನ್ನ ಹತ್ತಿರ", "ಟಾಪ್ ರೇಟೆಡ್"],
    "ml": ["എങ്ങനെ", "എന്ത്", "എവിടെ", "എപ്പോൾ", "കാണിക്കുക", "ചേർക്കുക", "അപ്ഡേറ്റ്", "ബിസിനസ്സ്", "പ്രൊഫൈൽ", "ലോഗിൻ", "റീസെറ്റ്", "സഹായം", "രജിസ്ട്രേഷൻ", "എന്റെ അടുത്ത്", "ടോപ്പ് റേറ്റഡ്"],
    "pa": ["ਕਿਵੇਂ", "ਕੀ", "ਕਿੱਥੇ", "ਕਦੋਂ", "ਦਿਖਾਓ", "ਜੋੜੋ", "ਅੱਪਡੇਟ", "ਕਾਰੋਬਾਰ", "ਪ੍ਰੋਫਾਈਲ", "ਲੌਗਇਨ", "ਰੀਸੈਟ", "ਮਦਦ", "ਰਜਿਸਟ੍ਰੇਸ਼ਨ", "ਮੇਰੇ ਨੇੜੇ", "ਟੌਪ ਰੇਟਡ"],
    "ur": ["کیسے", "کیا", "کہاں", "کب", "دکھائیں", "شامل کریں", "اپ ڈیٹ", "کاروبار", "پروفائل", "لاگ ان", "ری سیٹ", "مدد", "رجسٹریشن", "میرے قریب", "ٹاپ ریٹیڈ"],
    "ne": ["कसरी", "के", "कहाँ", "कहिले", "देखाउनुहोस्", "थप्नुहोस्", "अपडेट", "व्यवसाय", "प्रोफाइल", "लगइन", "रिसेट", "मद्दत", "दर्ता", "मेरो नजिक", "शीर्ष रेटेड"],
    "sa": ["कथम्", "किम्", "कुत्र", "कदा", "दर्शयतु", "योजयतु", "नवीकरोतु", "व्यापारः", "विवरणम्", "प्रविशतु", "पुनःस्थापयतु", "साहाय्यम्", "पञ्जीकरणम्", "मम समीपे", "सर्वश्रेष्ठः"],
    "as": ["কেনেদৰে", "কি", "ক’ত", "কেতিয়া", "দেখুৱাওক", "যোগ কৰক", "আপডেট", "ব্যৱসায়", "প্ৰফাইল", "লগইন", "ৰিছেট", "সহায়", "পঞ্জীয়ন", "মোৰ ওচৰত", "শীৰ্ষ স্থানপ্ৰাপ্ত"],
    "or": ["କିପରି", "କ’ଣ", "କେଉଁଠାରେ", "କେତେବେଳେ", "ଦେଖାନ୍ତୁ", "ଯୋଡନ୍ତୁ", "ଅପଡେଟ୍", "ବ୍ୟବସାୟ", "ପ୍ରୋଫାଇଲ୍", "ଲଗଇନ୍", "ରିସେଟ୍", "ସାହାଯ୍ୟ", "ପଞ୍ଜିକରଣ", "ମୋ ପାଖରେ", "ଟପ୍ ରେଟେଡ୍"]
  }
};
