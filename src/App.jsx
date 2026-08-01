// src/App.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Phone, CheckCircle, Award, Users, Shield,
  MapPin, Clock, Send, Eye, MessageCircle, ArrowRight, ArrowLeft
} from 'lucide-react';
import { BUSINESS_CONFIG } from './config/businessConfig';
import logo from './assets/Deewan.png';

// ----------------------------------------------------
// اینیمیٹڈ نمبر کاؤنٹر
// ----------------------------------------------------
const AnimatedCounter = ({ target, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target.replace(/\D/g, ''));
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  const hasPlus = target.includes('+');
  const hasPercent = target.includes('%');

  return (
    <span>
      {count}
      {hasPlus && '+'}
      {hasPercent && '%'}
    </span>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // واٹس ایپ لنک جنریٹر
  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.contact.whatsapp}?text=${encodeURIComponent("السلام علیکم، مجھے بلڈنگ میٹریل کے بارے میں معلومات چاہیے۔")}`;

  // اسکرول پر نیو بار کا پس منظر تبدیل کرنا
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsNavbarScrolled(true);
      } else {
        setIsNavbarScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ٹیسٹیمونیئل آٹو پلے
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const menuItems = [
    { label: "ہوم", href: "#home" },
    { label: "ہمارے بارے میں", href: "#about" },
    { label: "مصنوعات", href: "#products" },
    { label: "ہماری خصوصیات", href: "#why-choose-us" },
    { label: "خدمات", href: "#services" },
    { label: "گیلری", href: "#gallery" },
    { label: "رابطہ", href: "#contact" }
  ];

  const categories = [
    { title: "سیمنٹ", desc: "مضبوط اور پائیدار بنیادوں کے لیے پاکستان کے سب سے پائیدار اور معتبر برانڈز کا سیمنٹ۔", img: BUSINESS_CONFIG.images.categories.cement },
    { title: "سریا اور آئرن", desc: "بلند و بالا عمارات اور زلزلہ پروف ڈھانچے کے لیے بہترین گریڈ 60 کا اسٹیل سریا۔", img: BUSINESS_CONFIG.images.categories.steel },
    { title: "سینیٹری و فٹنگز", desc: "خوبصورت باتھ رومز کے لیے جدید ڈیزائن کی حامل دیرپا سینیٹری مصنوعات۔", img: BUSINESS_CONFIG.images.categories.sanitary },
    { title: "رنگ و روغن (Paints)", desc: "دیواروں کو موسمی اثرات سے بچانے اور ان کو نکھارنے کے لیے پریمیم پینٹس۔", img: BUSINESS_CONFIG.images.categories.paint },
    { title: "اینٹ، ریت اور کرش", desc: "تعمیر کی مضبوط ترین اساس کے لیے پختہ اول اینٹیں، سرگودھا پلانٹ بجری اور بہترین ریت۔", img: BUSINESS_CONFIG.images.categories.aggregate },
    { title: "ٹائلز اور ماربلز", desc: "آپ کی آرائشِ نو کی ضروریات کے لیے نفیس، پائیدار اور خوبصورت امپورٹڈ ڈیزائن ٹائلز۔", img: BUSINESS_CONFIG.images.categories.tiles }
  ];

  const featuredProducts = [
    { name: "پورٹ لینڈ سیمنٹ پریمیم گریڈ", category: "سیمنٹ", desc: "مضبوط ترین عمارات اور پلوں کی تعمیر کے لیے مستند انتخاب۔", badge: "دستیاب ہے" },
    { name: "گریڈ 60 اسٹیل ریبارز (سریا)", category: "لوہا اور اسٹیل", desc: "اعلیٰ لچک اور بے مثال بوجھ برداشت کرنے کی صلاحیت۔", badge: "دستیاب ہے" },
    { name: "جدید پیتل کی سینیٹری فٹنگز", category: "سینیٹری", desc: "زنگ سے مکمل طور پر پاک، خوبصورت واٹر کنٹرول ڈیزائنز۔", badge: "دستیاب ہے" },
    { name: "موسماتی اثرات سے محفوظ ایکسٹیریئر پینٹ", category: "پینٹس", desc: "دھوپ اور بارش سے بیرونی دیواروں کی رنگت کو مدھم نہ ہونے دے۔", badge: "دستیاب ہے" },
    { name: "اول درجہ سرخ کوئلہ پختہ اینٹیں", category: "بنیادی مواد", desc: "پوری طرح پکی ہوئی، یکساں سائز اور بے مثال پائیداری کی حامل۔", badge: "دستیاب ہے" },
    { name: "امپورٹڈ پورسیلان فلور ٹائلز", category: "ٹائلز", desc: "انتہائی مضبوط مٹیریل جو آپ کے فلور کو شیشے جیسا چمکدار بنائے۔", badge: "آرڈر پر تیار" }
  ];

  const testimonials = [
    { text: "دیوان بلڈنگ میٹریل اسٹور کے معیار اور ڈلیوری ٹائمنگ کا کوئی ثانی نہیں۔ ہم نے اپنے پورے کمرشل پلازہ کا مٹیریل یہیں سے خریدا اور انتہائی مطمئن ہیں۔", user: "محمد احمد (اے اینڈ او کنسٹرکشن)", area: "لاہور" },
    { text: "گھر کی تعمیر ایک مشکل مرحلہ ہوتا ہے، لیکن ان کی بہترین اور سچی گائیڈنس نے ہمارے لیے میٹریل کا انتخاب انتہائی آسان بنا دیا۔", user: "علی رضا (مکان مالک)", area: "ماڈل ٹاؤن" },
    { text: "مٹیریل کا معیار تو کمال ہے ہی، لیکن ان کا اخلاق اور بعد میں ملنے والی کسٹمر سروس بھی بہت شاندار ہے۔ قیمتیں بھی انتہائی مناسب ہیں۔", user: "انجینئر عثمان خان", area: "ڈی ایچ اے" }
  ];

  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80", caption: "تعمیراتی جگہ کا ایک جدید ڈھانچہ" },
    { url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80", caption: "ہائی رائز بلڈنگ کی مضبوط بنیاد" },
    { url: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80", caption: "ہماری پریمیم سرخ پختہ اینٹیں" },
    { url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80", caption: "اعلیٰ پائے کا سیمنٹ گودام" },
    { url: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80", caption: "شو روم پر آراستہ سینیٹری اور پینٹس" },
    { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", caption: "نفیس اور پریمیم باتھ روم ٹائلز" }
  ];

  return (
    <div className="bg-[#FAF9F5] text-stone-800 min-h-screen relative">

      {/* ----------------------------------------------------
          NAVBAR (پریمیم گلاس مارفک نیو بار)
         ---------------------------------------------------- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isNavbarScrolled
          ? 'bg-white/80 backdrop-blur-lg border-b border-stone-200/50 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
          : 'bg-transparent py-5'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* لوگو */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-10" />
          </div>

          {/* ڈیسک ٹاپ مینو لنکس */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="text-stone-600 hover:text-amber-600 transition-colors font-semibold text-sm relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* دائیں جانب کے ایکشنز */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className="bg-amber-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-stone-900 hover:scale-105 transition-all shadow-md shadow-amber-600/10"
            >
              قیمت معلوم کریں
            </a>
          </div>

          {/* موبائل مینو بٹن */}
          <button
            className="lg:hidden p-2 text-stone-900 hover:text-amber-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* موبائل سلائیڈ آؤٹ مینو */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-stone-200"
            >
              <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
                {menuItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-stone-700 hover:text-amber-600 py-3 border-b border-stone-100 font-bold transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-amber-600 text-white text-center py-3.5 rounded-xl font-bold block mt-4"
                >
                  قیمت معلوم کریں
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ----------------------------------------------------
          HERO SECTION (نیا خوبصورت لائٹ اور ماڈرن ہیرو سیکشن)
         ---------------------------------------------------- */}
      <header id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-gradient-to-br from-[#F5F3EC] via-[#FAF9F5] to-white">

        {/* پس منظر میں خوبصورت آرکیٹیکچر ڈیزائن آرکس کا احساس */}
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute left-10 bottom-0 w-[400px] h-[400px] bg-stone-200/50 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* بائیں جانب پریمیم ٹیکسٹ اور بٹنز (RTL کے مطابق سیدھی طرف) */}
            <div className="lg:col-span-7 text-right order-2 lg:order-1">

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-700 px-4 py-2 rounded-full mb-6"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse"></span>
                <span className="text-xs sm:text-sm font-bold">بہترین معیار • بے مثال اعتماد • پائیدار تعمیر</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl font-black text-stone-900 mb-6 leading-tight"
              >
                {BUSINESS_CONFIG.storeName}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="nastaliq text-2xl sm:text-3xl text-amber-600 max-w-3xl mb-4 leading-loose"
              >
                {BUSINESS_CONFIG.tagline}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-stone-600 max-w-xl mb-8 text-base sm:text-lg leading-relaxed"
              >
                ہم آپ کے آشیانے، تجارتی عمارات، اور تعمیراتی پروجیکٹس کے لیے ریت، لوہے اور اعلیٰ درجے کے سینیٹری و پینٹس سمیت تمام سامان انتہائی محفوظ اور سستی فراہمی کے ساتھ فراہم کرتے ہیں۔
              </motion.p>

              {/* بٹنز کا پریمیم سائز اور اسٹائل */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 items-center justify-start mb-8"
              >
                <a
                  href="#contact"
                  className="w-full sm:w-auto text-center bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-stone-900 hover:scale-105 transition-all shadow-lg shadow-amber-600/15"
                >
                  ہم سے رابطہ کیجیے
                </a>
                <a
                  href="#products"
                  className="w-full sm:w-auto text-center bg-white hover:bg-stone-50 text-stone-900 border border-stone-200 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-sm"
                >
                  مصنوعات دیکھیں
                </a>
              </motion.div>

            </div>

            {/* دائیں جانب کا خوبصورت آرکیٹیکچرل امیج گرڈ */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-md h-[400px] sm:h-[480px]"
              >
                {/* بڑی مرکزی تصویر */}
                <div className="absolute inset-4 rounded-2xl overflow-hidden shadow-2xl border border-white">
                  <img
                    src={BUSINESS_CONFIG.images.heroBg}
                    alt="Cement structures"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-stone-900/10"></div>
                </div>

                {/* آرکیٹیکچر کا چھوٹا فلوٹنگ فریم */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 w-40 h-40 bg-white p-2 rounded-2xl shadow-xl border border-stone-100 hidden sm:block"
                >
                  <img
                    src={BUSINESS_CONFIG.images.categories.steel}
                    alt="Steel rods"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </motion.div>

                {/* ایک اور وال پینٹ پریمیم بکس */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -top-4 -right-4 w-36 h-36 bg-white p-2 rounded-2xl shadow-xl border border-stone-100 hidden sm:block"
                >
                  <img
                    src={BUSINESS_CONFIG.images.categories.tiles}
                    alt="Luxury tiles"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </motion.div>

              </motion.div>
            </div>

          </div>
        </div>
      </header>

      {/* ----------------------------------------------------
          STATS SECTION (ایک انتہائی پریمیم فلوٹنگ بار)
         ---------------------------------------------------- */}
      <section className="relative z-20 py-8 bg-white border-y border-stone-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x md:divide-x-reverse md:divide-stone-200">

            <div className="py-4">
              <h3 className="text-3xl sm:text-5xl font-black text-amber-600 mb-2">
                <AnimatedCounter target="10+" />
              </h3>
              <p className="text-stone-500 font-bold text-sm sm:text-base">کاروبار کا تجربہ</p>
            </div>

            <div className="py-4">
              <h3 className="text-3xl sm:text-5xl font-black text-amber-600 mb-2">
                <AnimatedCounter target="1000+" />
              </h3>
              <p className="text-stone-500 font-bold text-sm sm:text-base">مطمئن صارفین</p>
            </div>

            <div className="py-4">
              <h3 className="text-3xl sm:text-5xl font-black text-amber-600 mb-2">
                <AnimatedCounter target="50+" />
              </h3>
              <p className="text-stone-500 font-bold text-sm sm:text-base">مصنوعات کی وسیع رینج</p>
            </div>

            <div className="py-4">
              <h3 className="text-3xl sm:text-5xl font-black text-amber-600 mb-2">
                <AnimatedCounter target="100%" />
              </h3>
              <p className="text-stone-500 font-bold text-sm sm:text-base">اعلیٰ معیار اور پائیداری</p>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          ABOUT US (ہمارے بارے میں - خوبصورت لائٹ ورژن)
         ---------------------------------------------------- */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* بائیں جانب کی تصویر کا خوبصورت ماڈرن اوورلیپنگ اسٹائل */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* بیک شیپ بریکٹ */}
            <div className="absolute -inset-3 bg-[#EAE7DC] rounded-3xl -z-10 transform -rotate-1"></div>
            <img
              src={BUSINESS_CONFIG.images.aboutBg}
              alt="Quality building materials"
              className="w-full h-[400px] sm:h-[500px] object-cover rounded-2xl shadow-xl border border-stone-200"
            />
          </motion.div>

          {/* دائیں جانب کا مواد */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center text-right"
          >
            <span className="text-amber-600 font-bold text-sm mb-2 tracking-widest">کمپنی پروفائل</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-6">
              دیوان بلڈنگ میٹریل اسٹور
            </h2>
            <p className="text-stone-600 leading-relaxed text-lg mb-6">
              ایک مضبوط اور پائیدار عمارت کی بنیاد بہترین میٹریل سے شروع ہوتی ہے۔ ہمارا مقصد تعمیراتی کاموں کے لیے موزوں، قابلِ بھروسہ، اور برانڈڈ بلڈنگ میٹریل فراہم کرنا ہے تاکہ آپ کے خوابوں کی عمارات سالہا سال تک ہر موسمی سختی کے سامنے سر اٹھائے کھڑی رہیں۔
            </p>
            <p className="text-stone-600 leading-relaxed text-lg mb-8">
              گھر کی تزئینِ نو سے لے کر ہائی رائز کمرشل پروجیکٹس تک، ہمارے پاس انتہائی مناسب قیمت پر ہر قسم کا تعمیری سامان اسٹاک میں موجود رہتا ہے۔
            </p>

            {/* پریمیم بلیٹ پوائنٹس */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                "اعلیٰ درجے کی معیاری مصنوعات",
                "مسابقتی مارکیٹ قیمتیں",
                "فوری اور محفوظ ڈلیوری سروس",
                "پروفیشنل کنسلٹنسی اور رہنمائی",
                "گاہکوں کی ضرورت کا احترام"
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-3 justify-start">
                  <CheckCircle className="text-amber-600 shrink-0" size={18} />
                  <span className="text-stone-800 font-semibold text-sm">{point}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-start">
              <a
                href="#products"
                className="bg-stone-900 text-white hover:bg-amber-600 px-6 py-3 rounded-xl font-bold transition-colors shadow-md"
              >
                ہماری پروڈکٹس دریافت کریں
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ----------------------------------------------------
          OWNER STORY (خوبصورت سلیٹ اسٹائل کارڈ)
         ---------------------------------------------------- */}
      <section className="py-24 bg-[#FAF9F5] border-y border-stone-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-3xl font-extrabold text-stone-900 mb-12">بانی و مالک کا پیغام</h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#F4F1EA] border border-stone-200/60 rounded-3xl p-8 sm:p-12 relative shadow-sm"
          >
            {/* تصویر کی جگہ */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <img
                src={BUSINESS_CONFIG.owner.image}
                alt={BUSINESS_CONFIG.owner.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>

            <div className="pt-10">
              <p className="text-xl sm:text-2xl text-stone-700 italic leading-relaxed font-medium mb-8 text-right">
                "{BUSINESS_CONFIG.owner.quote}"
              </p>

              <h4 className="text-lg font-black text-stone-900 mb-1">{BUSINESS_CONFIG.owner.name}</h4>
              <p className="text-stone-500 text-sm mb-6">{BUSINESS_CONFIG.owner.title}</p>

              <div className="nastaliq text-2xl text-amber-600 border-t border-stone-300/40 pt-6">
                {BUSINESS_CONFIG.owner.signature}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ----------------------------------------------------
          CATEGORIES SECTION (خوبصورت تصویروں والے کیٹیگری کارڈز)
         ---------------------------------------------------- */}
      <section id="products" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-bold text-sm mb-2 tracking-widest block">پروڈکٹ کیٹلاگ</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-4">ہماری مصنوعات</h2>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">ہر گھر کی پائیداری کے لیے مکمل مٹیریل رینج</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className="bg-white border border-stone-200/50 rounded-2xl overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all"
            >
              <div className="h-56 relative overflow-hidden">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-6 text-right">
                <h3 className="text-xl font-bold text-stone-900 mb-2">{cat.title}</h3>
                <p className="text-stone-600 mb-6 text-sm leading-relaxed">{cat.desc}</p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-amber-600 hover:text-stone-900 transition-colors text-sm font-bold"
                >
                  تفصیلات حاصل کریں <span>←</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------
          FEATURED PRODUCTS (مقبول ترین مصنوعات - کلاسک مینیمل ڈیزائن)
         ---------------------------------------------------- */}
      <section className="py-24 bg-[#FAF9F5] border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <span className="text-amber-600 font-bold text-sm mb-2 tracking-widest block">بہترین فروخت</span>
            <h2 className="text-3xl font-extrabold text-stone-900 mb-4">مقبول ترین پروڈکٹس</h2>
            <p className="text-stone-500 text-lg">بڑی تعمیراتی فارمز اور ٹھیکیداروں کا اولین انتخاب</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((prod, idx) => (
              <div
                key={idx}
                className="bg-white border border-stone-200/60 rounded-2xl p-6 relative hover:shadow-md transition-all hover:border-amber-600/30 text-right flex flex-col justify-between"
              >
                <div>
                  <span className="absolute top-4 left-4 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1 rounded-full font-bold">
                    {prod.badge}
                  </span>

                  <span className="text-xs text-amber-600 font-bold tracking-wide block mb-2">
                    {prod.category}
                  </span>

                  <h3 className="text-lg font-bold text-stone-900 mb-2">{prod.name}</h3>
                  <p className="text-stone-500 text-sm mb-6 leading-relaxed">{prod.desc}</p>
                </div>

                <div className="flex items-center justify-between border-t border-stone-100 pt-4 mt-4">
                  <span className="text-stone-500 font-semibold text-sm">قیمت کے لیے رابطہ کریں</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-600 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-stone-900 transition-all shadow-md shadow-amber-600/10"
                  >
                    قیمت پوچھیں
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------
          WHY CHOOSE US (جدید کلاسک گرڈ)
         ---------------------------------------------------- */}
      <section id="why-choose-us" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-bold text-sm mb-2 tracking-widest block">ہماری طاقت</span>
          <h2 className="text-3xl font-extrabold text-stone-900 mb-4">ہمیں کیوں منتخب کریں؟</h2>
          <p className="text-stone-500 text-lg">کوالٹی اور باہمی معاملات پر سمجھوتہ نہ کرنا ہماری پہچان ہے</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "سیمنٹ و آئرن پریمیم برانڈز", desc: "ہم صرف ان مٹیریلز کو فروخت کرتے ہیں جو ملکی اور بین الاقوامی کوالٹی اسٹینڈرڈ پر پورا اترتے ہیں۔", icon: <Award className="text-amber-600" size={26} /> },
            { title: "مارکیٹ ریٹ پر ڈسکاؤنٹ", desc: "کوئی خفیہ چارجز نہیں، بلک کوانٹٹی اور بڑے آرڈرز پر ہم خصوصی رعایتی پیکجز دیتے ہیں۔", icon: <Shield className="text-amber-600" size={26} /> },
            { title: "شفاف اور ایماندارانہ ڈیلنگ", desc: "کاروبار میں سچائی اور گاہک کے ساتھ کیا گیا وعدہ ہمارے لیے اولین ترجیح رکھتا ہے۔", icon: <CheckCircle className="text-amber-600" size={26} /> },
            { title: "ایک ہی چھت تلے سارا سامان", desc: "لوہا، سیمنٹ، ریت، پینٹ اور سینیٹری کے لیے آپ کو مختلف جگہوں پر جانے کی ضرورت نہیں پڑے گی۔", icon: <Users className="text-amber-600" size={26} /> },
            { title: "سالوں کا تجربہ کار اسٹاف", desc: "ہماری ٹیم تعمیری نوعیت کو دیکھتے ہوئے مٹیریل کی کوانٹٹی اور معیار کا درست مشورہ دیتی ہے۔", icon: <Award className="text-amber-600" size={26} /> },
            { title: "مستقل تعاون اور رہنمائی", desc: "آرڈر کی تیاری سے لے کر سائٹ پر میٹریل پہنچانے تک ہمارا اسٹاف متحرک اور رابطے میں رہتا ہے۔", icon: <CheckCircle className="text-amber-600" size={26} /> },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white border border-stone-200/50 p-8 rounded-2xl hover:shadow-lg transition-all text-right"
            >
              <div className="w-12 h-12 bg-amber-500/5 rounded-xl flex items-center justify-center mb-6 mr-0 ml-auto">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">{item.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------
          SERVICES SECTION (ہماری خدمات)
         ---------------------------------------------------- */}
      <section id="services" className="py-24 bg-[#F4F1EA] border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <span className="text-amber-600 font-bold text-sm mb-2 tracking-widest block">پیشکش</span>
            <h2 className="text-3xl font-extrabold text-stone-900 mb-4">ہماری خدمات</h2>
            <p className="text-stone-500 text-lg">صرف مصنوعات نہیں، بلکہ ایک مکمل اور بہترین سروس کا تجربہ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "ہر قسم کے تعمیراتی میٹریل کی بروقت ڈلیوری",
              "گھریلو اور کمرشل منصوبوں کے لیے مشاورت",
              "پروجیکٹ کی ضرورت کے مطابق مٹیریل کا تخمینہ",
              "بڑے اور ہول سیل آرڈرز پر خصوصی بچت",
              "قریبی اضلاع اور علاقوں میں تیز ترین فراہمی",
              "سستی اور پائیدار مصنوعات کا ون اسٹاپ حل"
            ].map((service, idx) => (
              <div key={idx} className="bg-white border border-stone-200/60 p-6 rounded-2xl flex items-center gap-4 text-right shadow-sm">
                <span className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-700 font-bold shrink-0">
                  {idx + 1}
                </span>
                <span className="text-stone-800 font-bold text-sm sm:text-base">{service}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-900 text-white hover:bg-amber-600 px-6 py-4 rounded-xl font-bold inline-block hover:scale-105 transition-all shadow-md"
            >
              اپنے پروجیکٹ کے بارے میں رہنمائی لیں
            </a>
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------
          GALLERY SECTION (خوبصورت امیج شو کیس)
         ---------------------------------------------------- */}
      <section id="gallery" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-bold text-sm mb-2 tracking-widest block">امیج گیلری</span>
          <h2 className="text-3xl font-extrabold text-stone-900 mb-4">حقیقی عکاسی</h2>
          <p className="text-stone-500 text-lg">ہماری فراہم کردہ کوالٹی اور حقیقی مصنوعات کے خاکے</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl group cursor-pointer border border-stone-200 shadow-sm"
              onClick={() => setSelectedGalleryImg(img)}
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-stone-900/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-white/85 p-3 rounded-full backdrop-blur-sm border border-white">
                  <Eye className="text-stone-900" size={24} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* گیلری لائٹ باکس ماڈل (Lightbox) */}
        <AnimatePresence>
          {selectedGalleryImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-stone-900/95 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedGalleryImg(null)}
            >
              <button
                className="absolute top-4 right-4 text-white hover:text-amber-500 p-2"
                onClick={() => setSelectedGalleryImg(null)}
              >
                <X size={32} />
              </button>

              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedGalleryImg.url}
                  alt={selectedGalleryImg.caption}
                  className="w-full max-h-[80vh] object-contain rounded-xl border border-white/10"
                />
                <p className="text-center text-white mt-4 text-lg font-bold">
                  {selectedGalleryImg.caption}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ----------------------------------------------------
          TESTIMONIALS (ہمارے صارفین کی رائے)
         ---------------------------------------------------- */}
      <section className="py-24 bg-white border-y border-stone-200/60 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <span className="text-amber-600 font-bold text-sm mb-2 tracking-widest block">تعریف اور تائید</span>
          <h2 className="text-3xl font-extrabold text-stone-900 mb-16">ہمارے صارفین کی رائے</h2>

          <div className="relative min-h-[220px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="bg-[#FAF9F5] border border-stone-200/50 rounded-2xl p-8 shadow-sm text-right"
              >
                <p className="text-lg sm:text-xl text-stone-700 italic mb-6 leading-loose">
                  "{testimonials[activeTestimonial].text}"
                </p>
                <h4 className="text-amber-600 font-extrabold text-base">{testimonials[activeTestimonial].user}</h4>
                <p className="text-stone-400 text-xs mt-1">{testimonials[activeTestimonial].area}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* نیویگیشن ڈاٹس */}
          <div className="flex justify-center gap-2.5 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all ${activeTestimonial === idx ? 'bg-amber-600 scale-125' : 'bg-stone-300'
                  }`}
                onClick={() => setActiveTestimonial(idx)}
              ></button>
            ))}
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------
          CONTACT SECTION (رابطہ کریں - الٹرا کلاسک اور روشن)
         ---------------------------------------------------- */}
      <section id="contact" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="text-amber-600 font-bold text-sm mb-2 tracking-widest block">رسائی حاصل کریں</span>
          <h2 className="text-3xl font-extrabold text-stone-900 mb-4">آج ہی رابطہ کریں</h2>
          <p className="text-stone-500 text-lg">بغیر کسی چارجز کے کوٹیشن اور مناسب ریٹس کی جانکاری حاصل کریں</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* رابطہ معلومات اور نقشہ */}
          <div className="space-y-8 text-right order-2 lg:order-1">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="bg-white border border-stone-200 p-6 rounded-2xl flex items-start gap-4">
                <MapPin className="text-amber-600 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-stone-900 mb-1 text-sm sm:text-base">آفس پتہ</h4>
                  <p className="text-stone-500 text-sm">{BUSINESS_CONFIG.contact.address}</p>
                </div>
              </div>

              <div className="bg-white border border-stone-200 p-6 rounded-2xl flex items-start gap-4">
                <Phone className="text-amber-600 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-stone-900 mb-1 text-sm sm:text-base">فون نمبر</h4>
                  <p className="text-stone-500 text-sm" dir="ltr">{BUSINESS_CONFIG.contact.phone}</p>
                </div>
              </div>

              <div className="bg-white border border-stone-200 p-6 rounded-2xl flex items-start gap-4">
                <Clock className="text-amber-600 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-stone-900 mb-1 text-sm sm:text-base">اوقات کار</h4>
                  <p className="text-stone-500 text-sm">{BUSINESS_CONFIG.contact.openingHours}</p>
                </div>
              </div>

              <div className="bg-white border border-stone-200 p-6 rounded-2xl flex items-start gap-4">
                <Send className="text-amber-600 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-stone-900 mb-1 text-sm sm:text-base">ای میل پتا</h4>
                  <p className="text-stone-500 text-sm">{BUSINESS_CONFIG.contact.email}</p>
                </div>
              </div>

            </div>

            {/* گوگل نقشہ (Map) */}
            <div className="rounded-2xl overflow-hidden border border-stone-200 h-64 relative shadow-sm">
              <iframe
                src={BUSINESS_CONFIG.contact.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Shop Location Map"
              ></iframe>
            </div>

          </div>

          {/* رابطہ فارم */}
          <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm order-1 lg:order-2 text-right">
            <h3 className="text-xl font-bold text-stone-900 mb-6">پیغام روانہ کریں</h3>

            <form onSubmit={handleFormSubmit} className="space-y-6">

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">نام شریف *</label>
                <input
                  type="text"
                  required
                  className="w-full bg-[#FAF9F5] border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-600 focus:bg-white transition-all text-right"
                  placeholder="اپنا نام درج کریں"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">رابطہ فون نمبر (موبائل) *</label>
                <input
                  type="tel"
                  required
                  className="w-full bg-[#FAF9F5] border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-600 focus:bg-white transition-all text-right"
                  placeholder="اپنا فعال فون نمبر لکھیں"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">مطلوبہ سامان / پروڈکٹ</label>
                <select className="w-full bg-[#FAF9F5] border border-stone-200 rounded-xl px-4 py-3 text-stone-700 focus:outline-none focus:border-amber-600 focus:bg-white transition-all text-right">
                  <option value="">برائے مہربانی مواد کا انتخاب کریں</option>
                  <option value="cement">سیمنٹ</option>
                  <option value="steel">سریا اور لوہا</option>
                  <option value="sanitary">سینیٹری مصنوعات</option>
                  <option value="paint">رنگ و روغن (Paints)</option>
                  <option value="tiles">ٹائلز اور دیگر تعمیراتی سامان</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">آپ کا پیغام</label>
                <textarea
                  rows="4"
                  className="w-full bg-[#FAF9F5] border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-600 focus:bg-white transition-all text-right"
                  placeholder="اپنی ڈلیوری لوکیشن یا سامان کی مقدار یہاں درج کریں..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-stone-900 hover:scale-105 transition-all shadow-md shadow-amber-600/10"
              >
                رابطہ قائم کریں
              </button>

              {/* کامیابی کا نوٹیفکیشن */}
              <AnimatePresence>
                {formSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl text-center font-bold"
                  >
                    پیغام کامیابی سے ریکارڈ ہو گیا ہے۔ ہم جلد ہی آپ کے فون نمبر پر رابطہ کریں گے۔
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------
          FOOTER (فوٹر - خوبصورت لائٹ گرے اسٹائل)
         ---------------------------------------------------- */}
      <footer className="bg-stone-900 text-stone-300 py-16 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-right">

            {/* برانڈ */}
            <div>
              <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2 justify-start">
               <img src={logo} alt="Logo" className="h-20" />
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed max-w-sm ml-auto mr-0">
                سالوں کا بھروسہ، مٹیریل کی پائیداری اور مضبوط بنیادوں کا حقیقی ساتھی۔ ہم آپ کے خوابوں کی عمارات کی پختگی کو یقینی بناتے ہیں۔
              </p>
            </div>

            {/* فوری لنکس */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">سائٹ مینو</h4>
              <ul className="space-y-3 text-sm">
                {menuItems.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} className="hover:text-amber-500 transition-colors text-stone-400">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* سوشل اور ہدف */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">ہمارا عزم</h4>
              <p className="text-stone-400 text-sm leading-relaxed mb-4">
                ہر مکان کو پائیدار اور دیدہ زیب بنانا۔ کسی بھی قسم کی کوٹیشن اور معلومات حاصل کرنے کے لیے ہم سے رابطہ کریں۔
              </p>
              <div className="flex gap-4 justify-end">
                <a
                  href={BUSINESS_CONFIG.contact.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-stone-800 border border-stone-700 p-2 rounded-lg text-stone-400 hover:text-white transition-all text-xs"
                >
                  فیس بک پیج
                </a>
                <a
                  href={BUSINESS_CONFIG.contact.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-stone-800 border border-stone-700 p-2 rounded-lg text-stone-400 hover:text-white transition-all text-xs"
                >
                  انسٹاگرام
                </a>
              </div>
            </div>

          </div>

          <div className="border-t border-stone-800 pt-8 text-center text-xs text-stone-500">
            <p>© 2026 {BUSINESS_CONFIG.storeName} — تمام جملہ حقوق محفوظ ہیں۔</p>
          </div>

        </div>
      </footer>

      {/* ----------------------------------------------------
          WHATSAPP FLOATING BUTTON (واٹس ایپ پلس پنگ بٹن)
         ---------------------------------------------------- */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-green-600 p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center group"
        title="ہم سے WhatsApp پر رابطہ کریں"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping -z-10"></span>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.993L2 22l5.163-1.355a9.95 9.95 0 0 0 4.843 1.258h.005c5.507 0 9.99-4.477 9.99-9.986 0-2.668-1.039-5.176-2.927-7.064A9.925 9.925 0 0 0 12.012 2Zm5.753 14.125c-.244.686-1.42 1.254-1.954 1.328-.485.067-.972.115-1.455-.022-.317-.09-.623-.194-1.015-.36a10.024 10.024 0 0 1-4.225-3.69 8.288 8.288 0 0 1-1.34-2.51 3.52 3.52 0 0 1 .15-2.073c.184-.37.45-.487.647-.6a.545.545 0 0 1 .45-.044c.142.043.284.088.426.133.14.045.242.062.338.25.132.259.45 1.11.49 1.196.04.087.042.176-.016.292-.058.116-.088.192-.177.294-.09.102-.178.188-.266.292-.098.117-.202.245-.084.45a9.5 9.5 0 0 0 1.767 2.19 8.442 8.442 0 0 0 2.548 1.57c.22.11.35.093.48-.052.13-.146.543-.632.688-.847.143-.217.288-.176.485-.1.198.077 1.254.592 1.472.7.218.11.363.164.417.26a1.18 1.18 0 0 1-.091.688Z" />
        </svg>

        <span className="absolute right-16 bg-stone-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-stone-800 shadow-md">
          WhatsApp پر بات کریں
        </span>
      </a>

    </div>
  );
}