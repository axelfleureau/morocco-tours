// Multi-language support system for Morocco Dreams
export type Language = 'it' | 'en' | 'ar' | 'ru' | 'zh';

export const languages = {
  it: 'Italiano',
  en: 'English', 
  ar: 'العربية',
  ru: 'Русский',
  zh: '中文'
};

export const translations = {
  it: {
    'nav.home': 'Home',
    'nav.travels': 'Viaggi',
    'nav.experiences': 'Esperienze',
    'nav.about': 'Chi Siamo',
    'nav.contact': 'Contatti',
    'hero.title': 'Scopri il Marocco Autentico',
    'hero.subtitle': 'Viaggi indimenticabili nelle terre del Maghreb',
    'button.plan_trip': 'Pianifica il Tuo Viaggio',
    'button.add_to_cart': 'Aggiungi al Carrello',
    'cart.title': 'Il Tuo Carrello',
    'dashboard.title': 'La Mia Dashboard'
  },
  en: {
    'nav.home': 'Home',
    'nav.travels': 'Travels',
    'nav.experiences': 'Experiences', 
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'hero.title': 'Discover Authentic Morocco',
    'hero.subtitle': 'Unforgettable journeys in Maghreb lands',
    'button.plan_trip': 'Plan Your Trip',
    'button.add_to_cart': 'Add to Cart',
    'cart.title': 'Your Cart',
    'dashboard.title': 'My Dashboard'
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.travels': 'الرحلات',
    'nav.experiences': 'التجارب',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'hero.title': 'اكتشف المغرب الأصيل',
    'hero.subtitle': 'رحلات لا تُنسى في أراضي المغرب العربي',
    'button.plan_trip': 'خطط لرحلتك',
    'button.add_to_cart': 'أضف للسلة',
    'cart.title': 'سلة التسوق',
    'dashboard.title': 'لوحة التحكم'
  },
  ru: {
    'nav.home': 'Главная',
    'nav.travels': 'Путешествия',
    'nav.experiences': 'Впечатления',
    'nav.about': 'О нас',
    'nav.contact': 'Контакты',
    'hero.title': 'Откройте для себя подлинное Марокко',
    'hero.subtitle': 'Незабываемые путешествия по землям Магриба',
    'button.plan_trip': 'Планировать поездку',
    'button.add_to_cart': 'В корзину',
    'cart.title': 'Ваша корзина',
    'dashboard.title': 'Моя панель'
  },
  zh: {
    'nav.home': '首页',
    'nav.travels': '旅行',
    'nav.experiences': '体验',
    'nav.about': '关于我们',
    'nav.contact': '联系我们',
    'hero.title': '发现真正的摩洛哥',
    'hero.subtitle': '马格里布土地上的难忘之旅',
    'button.plan_trip': '计划您的旅行',
    'button.add_to_cart': '添加到购物车',
    'cart.title': '您的购物车',
    'dashboard.title': '我的仪表板'
  }
};

export const useTranslation = (language: Language = 'it') => {
  const t = (key: string): string => {
    return translations[language][key] || translations.it[key] || key;
  };

  return { t };
};