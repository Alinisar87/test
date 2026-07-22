// Bilingual message catalogue (English + Urdu).
// Keys are dotted strings; each entry carries both languages side by side so
// translations stay in sync. Use {var} placeholders for interpolation.

export type Lang = "en" | "ur";

export const LANGS: { code: Lang; label: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "ur", label: "اردو", dir: "rtl" },
];

export function dirFor(lang: Lang): "ltr" | "rtl" {
  return lang === "ur" ? "rtl" : "ltr";
}

type Entry = { en: string; ur: string };

export const messages: Record<string, Entry> = {
  // --- Language switcher ---
  "lang.label": { en: "Language", ur: "زبان" },

  // --- Nav ---
  "nav.login": { en: "Log in", ur: "لاگ اِن" },
  "nav.getStarted": { en: "Get started", ur: "شروع کریں" },
  "nav.dashboard": { en: "Dashboard", ur: "ڈیش بورڈ" },
  "nav.admin": { en: "Admin", ur: "ایڈمن" },
  "nav.logout": { en: "Log out", ur: "لاگ آؤٹ" },

  // --- Common ---
  "common.back": { en: "Back", ur: "پیچھے" },
  "common.saveContinue": { en: "Save & continue", ur: "محفوظ کریں اور جاری رکھیں" },
  "common.saving": { en: "Saving…", ur: "محفوظ ہو رہا ہے…" },
  "common.saved": { en: "Saved", ur: "محفوظ ہو گیا" },
  "common.changesSave": { en: "Changes save as you continue", ur: "آپ کے آگے بڑھنے پر تبدیلیاں محفوظ ہوتی رہیں گی" },
  "common.optional": { en: "optional", ur: "اختیاری" },

  // --- Deadline / refund ---
  "deadline.text": { en: "Tax Year 2026 filing deadline: 30 September 2026", ur: "ٹیکس سال 2026 گوشوارہ جمع کرانے کی آخری تاریخ: 30 ستمبر 2026" },
  "deadline.daysLeft": { en: "{n} days left to file", ur: "گوشوارہ جمع کرانے میں {n} دن باقی" },
  "refund.fast": { en: "Eligible for fast refund — refunds under Rs 50,000 are issued within a month of filing.", ur: "فوری ریفنڈ کا اہل — 50,000 روپے سے کم ریفنڈ گوشوارہ جمع کرانے کے ایک ماہ کے اندر جاری ہوتے ہیں۔" },

  // --- Helpline ---
  "help.title": { en: "Need help filing?", ur: "گوشوارہ جمع کرانے میں مدد چاہیے؟" },
  "help.body": { en: "Our team can guide you through your return in Urdu or English.", ur: "ہماری ٹیم اردو یا انگریزی میں آپ کے گوشوارے میں رہنمائی کر سکتی ہے۔" },
  "help.cta": { en: "Contact support", ur: "سپورٹ سے رابطہ کریں" },

  // --- Landing ---
  "landing.badge": { en: "Done-for-you FBR filing — Tax Year 2026", ur: "آپ کی طرف سے ایف بی آر گوشوارہ — ٹیکس سال 2026" },
  "landing.h1a": { en: "We file your Pakistan tax return", ur: "ہم آپ کا پاکستانی ٹیکس گوشوارہ جمع کراتے ہیں" },
  "landing.h1b": { en: "so you don't have to", ur: "تاکہ آپ کو نہ کرنا پڑے" },
  "landing.sub": {
    en: "FBR now offers a simplified form — but you still have to understand it, reconcile your wealth statement, and chase your refund. Answer a few questions in your language, upload your documents, and our tax team prepares and files everything for you.",
    ur: "ایف بی آر اب ایک آسان فارم پیش کرتا ہے — لیکن پھر بھی آپ کو اسے سمجھنا، اپنے اثاثہ جات کا گوشوارہ ملانا اور ریفنڈ کا تعاقب کرنا پڑتا ہے۔ اپنی زبان میں چند سوالات کے جواب دیں، دستاویزات اپ لوڈ کریں، اور ہماری ٹیم سب کچھ تیار کر کے جمع کرا دے گی۔",
  },
  "landing.startReturn": { en: "Start my return", ur: "میرا گوشوارہ شروع کریں" },
  "landing.howItWorks": { en: "How it works", ur: "یہ کیسے کام کرتا ہے" },
  "landing.stepsTitle": { en: "Three steps to filed", ur: "گوشوارہ جمع کرانے کے تین مراحل" },
  "landing.step1t": { en: "Answer a short questionnaire", ur: "ایک مختصر سوالنامہ پُر کریں" },
  "landing.step1b": { en: "One simple question per screen, in Urdu or English. No tax jargon.", ur: "ہر اسکرین پر ایک آسان سوال، اردو یا انگریزی میں۔ کوئی ٹیکس اصطلاحات نہیں۔" },
  "landing.step2t": { en: "Upload your documents", ur: "اپنی دستاویزات اپ لوڈ کریں" },
  "landing.step2b": { en: "Salary certificate, tax deduction certificates, bank statements — a photo or PDF works.", ur: "تنخواہ سرٹیفکیٹ، ٹیکس کٹوتی سرٹیفکیٹ، بینک اسٹیٹمنٹ — تصویر یا پی ڈی ایف کافی ہے۔" },
  "landing.step3t": { en: "We prepare & file", ur: "ہم تیار کر کے جمع کراتے ہیں" },
  "landing.step3b": { en: "A professional verifies your figures, prepares your return and wealth statement, and files it on FBR IRIS.", ur: "ایک ماہر آپ کے اعداد و شمار کی تصدیق کرتا ہے، گوشوارہ اور اثاثہ جات کا بیان تیار کرتا ہے، اور ایف بی آر آئرس پر جمع کراتا ہے۔" },
  "landing.whyTitle": { en: "Why use us when FBR's form is free?", ur: "جب ایف بی آر کا فارم مفت ہے تو ہمیں کیوں استعمال کریں؟" },
  "landing.why1t": { en: "It's done for you", ur: "یہ آپ کی طرف سے ہو جاتا ہے" },
  "landing.why1b": { en: "You answer simple questions; a professional does the actual filing and stands behind it.", ur: "آپ آسان سوالات کے جواب دیتے ہیں؛ ایک ماہر اصل فائلنگ کرتا ہے اور اس کا ذمہ دار ہوتا ہے۔" },
  "landing.why2t": { en: "Business & AOP too", ur: "کاروبار اور اے او پی بھی" },
  "landing.why2b": { en: "Not just salaried — we handle business income, expenses and AOP returns end to end.", ur: "صرف تنخواہ دار نہیں — ہم کاروباری آمدنی، اخراجات اور اے او پی گوشوارے بھی سنبھالتے ہیں۔" },
  "landing.why3t": { en: "Wealth statement & refund", ur: "اثاثہ جات کا بیان اور ریفنڈ" },
  "landing.why3b": { en: "We reconcile your wealth statement correctly and follow up your refund for you.", ur: "ہم آپ کے اثاثہ جات کا بیان درست طریقے سے ملاتے ہیں اور آپ کا ریفنڈ فالو اپ کرتے ہیں۔" },
  "landing.faqTitle": { en: "Questions, answered", ur: "سوالات کے جواب" },
  "landing.faq1q": { en: "Do you file directly with FBR?", ur: "کیا آپ براہِ راست ایف بی آر میں جمع کراتے ہیں؟" },
  "landing.faq1a": { en: "Yes. You complete the questionnaire and uploads; our tax team verifies everything and files your return and wealth statement on FBR IRIS on your behalf. You get the filed acknowledgement.", ur: "جی ہاں۔ آپ سوالنامہ اور دستاویزات مکمل کرتے ہیں؛ ہماری ٹیم سب کچھ جانچ کر آپ کی طرف سے ایف بی آر آئرس پر گوشوارہ اور اثاثہ جات کا بیان جمع کراتی ہے۔ آپ کو تصدیق شدہ رسید ملتی ہے۔" },
  "landing.faq2q": { en: "Who is this for?", ur: "یہ کس کے لیے ہے؟" },
  "landing.faq2a": { en: "Tax Year 2026 returns for salaried individuals, self-employed / business individuals, and Associations of Persons (AOPs).", ur: "ٹیکس سال 2026 کے گوشوارے تنخواہ دار افراد، خود کاروبار کرنے والوں اور ایسوسی ایشن آف پرسنز (اے او پی) کے لیے۔" },
  "landing.faq3q": { en: "Can you auto-fill my data like FBR's form?", ur: "کیا آپ ایف بی آر کے فارم کی طرح میرا ڈیٹا خود بھر سکتے ہیں؟" },
  "landing.faq3a": { en: "FBR's own form auto-fills from its central database, which only FBR can access. We prepare your return from the documents and answers you give us — and a professional checks it before filing.", ur: "ایف بی آر کا اپنا فارم اس کے مرکزی ڈیٹابیس سے خود بھرتا ہے، جس تک صرف ایف بی آر کی رسائی ہے۔ ہم آپ کے دیے گئے دستاویزات اور جوابات سے گوشوارہ تیار کرتے ہیں — اور جمع کرانے سے پہلے ایک ماہر اسے جانچتا ہے۔" },
  "landing.ctaTitle": { en: "Ready to become a filer?", ur: "کیا آپ فائلر بننے کے لیے تیار ہیں؟" },
  "landing.ctaSub": { en: "Create your account and start your Tax Year 2026 return now.", ur: "اپنا اکاؤنٹ بنائیں اور ابھی اپنا ٹیکس سال 2026 کا گوشوارہ شروع کریں۔" },
  "landing.footerDisclaimer": { en: "eFile Pak is a tax-preparation and filing service. It is not affiliated with or endorsed by the Federal Board of Revenue (FBR). Tax computations are estimates for review; a professional verifies every return before filing.", ur: "eFile Pak ایک ٹیکس تیاری اور فائلنگ سروس ہے۔ اس کا فیڈرل بورڈ آف ریونیو (ایف بی آر) سے کوئی تعلق یا اس کی توثیق نہیں۔ ٹیکس حساب جائزے کے لیے تخمینہ ہیں؛ ہر گوشوارہ جمع کرانے سے پہلے ایک ماہر تصدیق کرتا ہے۔" },

  // --- Auth ---
  "auth.welcomeBack": { en: "Welcome back", ur: "خوش آمدید" },
  "auth.loginSub": { en: "Log in to continue your return.", ur: "اپنا گوشوارہ جاری رکھنے کے لیے لاگ اِن کریں۔" },
  "auth.createTitle": { en: "Create your account", ur: "اپنا اکاؤنٹ بنائیں" },
  "auth.createSub": { en: "Start your Tax Year 2026 return in minutes.", ur: "چند منٹ میں اپنا ٹیکس سال 2026 کا گوشوارہ شروع کریں۔" },
  "auth.name": { en: "Full name", ur: "پورا نام" },
  "auth.email": { en: "Email", ur: "ای میل" },
  "auth.password": { en: "Password", ur: "پاس ورڈ" },
  "auth.passwordHint": { en: "At least 8 characters.", ur: "کم از کم 8 حروف۔" },
  "auth.createBtn": { en: "Create account", ur: "اکاؤنٹ بنائیں" },
  "auth.loginBtn": { en: "Log in", ur: "لاگ اِن" },
  "auth.pleaseWait": { en: "Please wait…", ur: "براہِ کرم انتظار کریں…" },
  "auth.haveAccount": { en: "Already have an account?", ur: "پہلے سے اکاؤنٹ ہے؟" },
  "auth.newHere": { en: "New to eFile Pak?", ur: "eFile Pak پر نئے ہیں؟" },

  // --- Dashboard ---
  "dash.title": { en: "Your tax returns", ur: "آپ کے ٹیکس گوشوارے" },
  "dash.welcome": { en: "Welcome back, {name}.", ur: "خوش آمدید، {name}۔" },
  "dash.new": { en: "+ Start a new return", ur: "+ نیا گوشوارہ شروع کریں" },
  "dash.emptyTitle": { en: "No returns yet", ur: "ابھی تک کوئی گوشوارہ نہیں" },
  "dash.emptyBody": { en: "Start your Tax Year 2026 return — it takes a few minutes and we handle the filing.", ur: "اپنا ٹیکس سال 2026 کا گوشوارہ شروع کریں — اس میں چند منٹ لگتے ہیں اور فائلنگ ہم سنبھالتے ہیں۔" },
  "dash.continue": { en: "Continue", ur: "جاری رکھیں" },
  "dash.view": { en: "View", ur: "دیکھیں" },
  "dash.package": { en: "Return package", ur: "گوشوارہ پیکج" },
  "dash.payable": { en: "Payable", ur: "قابلِ ادا" },
  "dash.refund": { en: "Refund", ur: "ریفنڈ" },

  // --- Wizard screens ---
  "wiz.newTitle": { en: "Start your Tax Year 2026 return", ur: "اپنا ٹیکس سال 2026 کا گوشوارہ شروع کریں" },
  "wiz.newSub": { en: "Choose the option that best describes you. You can change this later.", ur: "وہ آپشن منتخب کریں جو آپ پر بہترین لاگو ہو۔ آپ اسے بعد میں بدل سکتے ہیں۔" },
  "wiz.continue": { en: "Continue", ur: "جاری رکھیں" },
  "wiz.filerType": { en: "How do you earn most of your income?", ur: "آپ اپنی زیادہ تر آمدنی کیسے کماتے ہیں؟" },
  "wiz.salaried": { en: "Salaried", ur: "تنخواہ دار" },
  "wiz.salariedHint": { en: "Employment income", ur: "ملازمت کی آمدنی" },
  "wiz.business": { en: "Business", ur: "کاروبار" },
  "wiz.businessHint": { en: "Self-employed / sole proprietor", ur: "خود کاروبار / واحد مالک" },
  "wiz.aop": { en: "AOP", ur: "اے او پی" },
  "wiz.aopHint": { en: "Association of Persons", ur: "ایسوسی ایشن آف پرسنز" },

  "wiz.s.type": { en: "About you", ur: "آپ کے بارے میں" },
  "wiz.s.income": { en: "Income", ur: "آمدنی" },
  "wiz.questionOf": { en: "Step {n} of {total}", ur: "مرحلہ {n} از {total}" },
  "wiz.s.name": { en: "Your name", ur: "آپ کا نام" },
  "wiz.s.cnic": { en: "Your CNIC", ur: "آپ کا شناختی کارڈ نمبر" },
  "wiz.s.resident": { en: "Residency", ur: "رہائش" },
  "wiz.s.prefill": { en: "Auto-fill", ur: "خودکار اندراج" },
  "wiz.s.salary": { en: "Salary income", ur: "تنخواہ کی آمدنی" },
  "wiz.s.business": { en: "Business income", ur: "کاروباری آمدنی" },
  "wiz.s.property": { en: "Property income", ur: "جائیداد کی آمدنی" },
  "wiz.s.other": { en: "Other income", ur: "دیگر آمدنی" },
  "wiz.s.withholding": { en: "Tax already paid", ur: "پہلے سے ادا شدہ ٹیکس" },
  "wiz.s.deductions": { en: "Deductions & credits", ur: "کٹوتیاں اور کریڈٹ" },
  "wiz.s.wealth": { en: "Wealth statement", ur: "اثاثہ جات کا بیان" },
  "wiz.s.documents": { en: "Documents", ur: "دستاویزات" },
  "wiz.s.review": { en: "Review & submit", ur: "جائزہ اور جمع" },

  "wiz.q.name": { en: "What is your full name (as on your CNIC)?", ur: "آپ کا پورا نام کیا ہے (جیسا شناختی کارڈ پر ہے)؟" },
  "wiz.q.cnic": { en: "What is your CNIC number?", ur: "آپ کا شناختی کارڈ نمبر کیا ہے؟" },
  "wiz.q.cnicHint": { en: "13 digits, with or without dashes.", ur: "13 ہندسے، ڈیش کے ساتھ یا بغیر۔" },
  "wiz.q.resident": { en: "Were you a resident of Pakistan during the tax year?", ur: "کیا آپ ٹیکس سال کے دوران پاکستان کے رہائشی تھے؟" },
  "wiz.q.residentLabel": { en: "Yes, I was a resident of Pakistan", ur: "جی ہاں، میں پاکستان کا رہائشی تھا" },
  "wiz.q.salary": { en: "What was your gross annual salary?", ur: "آپ کی مجموعی سالانہ تنخواہ کتنی تھی؟" },
  "wiz.q.salaryHint": { en: "Total taxable salary for the year, after removing tax-exempt allowances.", ur: "سال کی کل قابلِ ٹیکس تنخواہ، ٹیکس سے مستثنیٰ الاؤنسز نکال کر۔" },
  "wiz.q.business": { en: "What was your net business income?", ur: "آپ کی خالص کاروباری آمدنی کتنی تھی؟" },
  "wiz.q.businessHint": { en: "Net profit after business expenses.", ur: "کاروباری اخراجات کے بعد خالص منافع۔" },
  "wiz.q.property": { en: "Any property / rental income?", ur: "کوئی جائیداد / کرائے کی آمدنی؟" },
  "wiz.q.propertyHint": { en: "Gross rent received during the year. Leave 0 if none.", ur: "سال کے دوران وصول کردہ مجموعی کرایہ۔ نہ ہو تو 0 رہنے دیں۔" },
  "wiz.q.repair": { en: "Apply the 1/5 (20%) repair allowance on building rent", ur: "عمارت کے کرائے پر 1/5 (20%) مرمت الاؤنس لاگو کریں" },
  "wiz.q.otherNormal": { en: "Any other income taxed at normal rates?", ur: "عام شرح پر ٹیکس شدہ کوئی اور آمدنی؟" },
  "wiz.q.finalRegime": { en: "Any income under a final / separate tax regime?", ur: "کسی حتمی / علیحدہ ٹیکس نظام کے تحت آمدنی؟" },
  "wiz.q.finalRegimeHint": { en: "Dividends, profit on debt, capital gains on securities, etc. Not taxed again — used for your wealth statement.", ur: "ڈیویڈنڈ، منافع، سیکیورٹیز پر کیپیٹل گین وغیرہ۔ دوبارہ ٹیکس نہیں — اثاثہ جات کے بیان کے لیے استعمال ہوتا ہے۔" },
  "wiz.q.salaryWithholding": { en: "How much tax did your employer deduct from your salary?", ur: "آپ کے آجر نے تنخواہ سے کتنا ٹیکس کاٹا؟" },
  "wiz.q.salaryWithholdingHint": { en: "From your salary tax certificate.", ur: "آپ کے تنخواہ ٹیکس سرٹیفکیٹ سے۔" },
  "wiz.q.otherAdjustable": { en: "Any other adjustable tax withheld?", ur: "کوئی اور قابلِ ایڈجسٹ ٹیکس کاٹا گیا؟" },
  "wiz.q.otherAdjustableHint": { en: "Bank transactions, vehicle, utilities, property, etc.", ur: "بینک لین دین، گاڑی، یوٹیلیٹیز، جائیداد وغیرہ۔" },
  "wiz.q.advanceTax": { en: "Any advance tax paid directly (u/s 147)?", ur: "براہِ راست ادا کردہ کوئی ایڈوانس ٹیکس (دفعہ 147)؟" },
  "wiz.q.zakat": { en: "How much Zakat did you pay?", ur: "آپ نے کتنی زکوٰۃ ادا کی؟" },
  "wiz.q.zakatHint": { en: "Zakat deducted under the Zakat & Ushr Ordinance (a deductible allowance).", ur: "زکوٰۃ و عشر آرڈیننس کے تحت کٹوتی شدہ زکوٰۃ (قابلِ کٹوتی الاؤنس)۔" },
  "wiz.q.donations": { en: "Any charitable donations?", ur: "کوئی خیراتی عطیات؟" },
  "wiz.q.donationsHint": { en: "Donations to approved institutions. Tax credit capped at 30% of taxable income.", ur: "منظور شدہ اداروں کو عطیات۔ ٹیکس کریڈٹ قابلِ ٹیکس آمدنی کے 30% تک محدود۔" },
  "wiz.q.pension": { en: "Any approved pension fund contribution?", ur: "کوئی منظور شدہ پنشن فنڈ میں رقم؟" },
  "wiz.q.pensionHint": { en: "Contributions to a registered pension fund. Credit capped at 20% of taxable income.", ur: "رجسٹرڈ پنشن فنڈ میں رقم۔ کریڈٹ قابلِ ٹیکس آمدنی کے 20% تک محدود۔" },
  "wiz.q.wealthIntro": { en: "Your wealth statement reconciles your net worth at the start and end of the year against your income and spending. It is mandatory for individuals.", ur: "اثاثہ جات کا بیان سال کے آغاز اور اختتام پر آپ کی مجموعی مالیت کو آمدنی اور اخراجات سے ملاتا ہے۔ یہ افراد کے لیے لازمی ہے۔" },
  "wiz.q.opening": { en: "Net assets at the start of the year", ur: "سال کے آغاز پر خالص اثاثہ جات" },
  "wiz.q.openingHint": { en: "Total assets minus liabilities on 1 July.", ur: "یکم جولائی کو کل اثاثے منہا واجبات۔" },
  "wiz.q.closing": { en: "Net assets at the end of the year", ur: "سال کے اختتام پر خالص اثاثہ جات" },
  "wiz.q.closingHint": { en: "Total assets minus liabilities on 30 June.", ur: "30 جون کو کل اثاثے منہا واجبات۔" },
  "wiz.q.expenses": { en: "Personal & household expenses for the year", ur: "سال کے ذاتی اور گھریلو اخراجات" },
  "wiz.q.inflows": { en: "Other inflows (gifts, inheritance, remittance, exempt income)", ur: "دیگر آمدنی (تحائف، وراثت، ترسیلات، مستثنیٰ آمدنی)" },
  "wiz.reviewIntro": { en: "Review your figures. When you submit, our team receives your return, verifies everything, and files it with FBR.", ur: "اپنے اعداد و شمار کا جائزہ لیں۔ جمع کرانے پر ہماری ٹیم آپ کا گوشوارہ وصول کر کے سب کچھ جانچتی ہے اور ایف بی آر میں جمع کراتی ہے۔" },
  "wiz.submit": { en: "Submit to eFile Pak team", ur: "eFile Pak ٹیم کو جمع کرائیں" },
  "wiz.submitting": { en: "Submitting…", ur: "جمع ہو رہا ہے…" },
  "wiz.liveEstimate": { en: "Live estimate", ur: "فوری تخمینہ" },
  "wiz.estPayable": { en: "Estimated payable", ur: "متوقع قابلِ ادا" },
  "wiz.estRefund": { en: "Estimated refund", ur: "متوقع ریفنڈ" },
  "wiz.taxableIncome": { en: "Taxable income", ur: "قابلِ ٹیکس آمدنی" },
  "wiz.taxChargeable": { en: "Tax chargeable", ur: "قابلِ وصول ٹیکس" },
  "wiz.taxPaid": { en: "Tax already paid", ur: "پہلے ادا شدہ ٹیکس" },
  "wiz.pointsToReview": { en: "{n} point(s) to review", ur: "جائزے کے لیے {n} نکات" },

  // --- Prefill ---
  "prefill.title": { en: "Can we speed this up with auto-fill?", ur: "کیا ہم خودکار اندراج سے اسے تیز کر سکتے ہیں؟" },
  "prefill.body": { en: "FBR's own IRIS form auto-fills salary, withholding and bank balances from its central database — data only FBR can access. eFile Pak cannot pull that data directly. Enter your employer and bank below and we'll pre-label the fields for you to confirm from your documents.", ur: "ایف بی آر کا اپنا آئرس فارم تنخواہ، ود ہولڈنگ اور بینک بیلنس اپنے مرکزی ڈیٹابیس سے خود بھرتا ہے — یہ ڈیٹا صرف ایف بی آر کے پاس ہے۔ eFile Pak یہ ڈیٹا براہِ راست حاصل نہیں کر سکتا۔ نیچے اپنا آجر اور بینک درج کریں، ہم فیلڈز کو پہلے سے نمایاں کر دیں گے تاکہ آپ اپنی دستاویزات سے تصدیق کر سکیں۔" },
  "prefill.employer": { en: "Employer name", ur: "آجر کا نام" },
  "prefill.bank": { en: "Bank name", ur: "بینک کا نام" },
  "prefill.btn": { en: "Prepare fields", ur: "فیلڈز تیار کریں" },
  "prefill.note": { en: "No live FBR data is accessed. You'll confirm every figure from your own documents.", ur: "کوئی براہِ راست ایف بی آر ڈیٹا حاصل نہیں کیا جاتا۔ آپ ہر رقم اپنی دستاویزات سے خود تصدیق کریں گے۔" },
  "prefill.ready": { en: "Fields prepared for {employer}. Enter the amounts from your salary and bank documents in the next steps.", ur: "{employer} کے لیے فیلڈز تیار ہیں۔ اگلے مراحل میں اپنی تنخواہ اور بینک دستاویزات سے رقوم درج کریں۔" },

  // --- Disclaimer ---
  "disclaimer": { en: "Estimate only. Figures are computed from the information you provide using Tax Year 2026 rates and are for review purposes. They are not a filed return. A qualified tax professional reviews every return before it is filed with FBR, and tax rates must be verified against the current Finance Act at filing time.", ur: "صرف تخمینہ۔ اعداد و شمار آپ کی فراہم کردہ معلومات سے ٹیکس سال 2026 کی شرحوں پر مبنی ہیں اور جائزے کے لیے ہیں۔ یہ جمع شدہ گوشوارہ نہیں۔ ہر گوشوارہ ایف بی آر میں جمع کرانے سے پہلے ایک ماہر جائزہ لیتا ہے، اور جمع کرانے کے وقت شرحوں کی موجودہ فنانس ایکٹ سے تصدیق ضروری ہے۔" },
};
