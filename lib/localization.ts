export type LocaleCode =
  | 'en' | 'id' | 'fil' | 'hi' | 'ms' | 'tr' | 'es' | 'de' | 'fr' | 'pt'
  | 'ar' | 'ja' | 'ko' | 'zh-Hans' | 'zh-Hant' | 'th' | 'it';

export const localeOptions: Array<{ code: LocaleCode; label: string; short: string }> = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'id', label: 'Bahasa Indonesia', short: 'ID' },
  { code: 'fil', label: 'Filipino', short: 'PH' },
  { code: 'hi', label: 'हिन्दी', short: 'HI' },
  { code: 'ms', label: 'Bahasa Melayu', short: 'MS' },
  { code: 'tr', label: 'Türkçe', short: 'TR' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'pt', label: 'Português', short: 'PT' },
  { code: 'ar', label: 'العربية', short: 'AR' },
  { code: 'ja', label: '日本語', short: 'JA' },
  { code: 'ko', label: '한국어', short: 'KO' },
  { code: 'zh-Hans', label: '简体中文', short: '简' },
  { code: 'zh-Hant', label: '繁體中文', short: '繁' },
  { code: 'th', label: 'ไทย', short: 'TH' },
  { code: 'it', label: 'Italiano', short: 'IT' },
];

const common: Record<LocaleCode, Record<string, string>> = {
  en: { home:'Home', bratText:'Brat Text', video:'Brat Video', meme:'Brat Meme', image:'Brat Image', font:'Brat Font', album:'Brat Album Cover', features:'Features', styles:'Brat Styles', blog:'Blog', login:'Login', logout:'Sign out', language:'Language', tools:'Tools' },
  id: { home:'Beranda', bratText:'Teks Brat', video:'Brat Video', meme:'Brat Meme', image:'Brat Gambar', font:'Brat Font', album:'Brat Sampul Album', features:'Fitur', styles:'Gaya Brat', blog:'Blog', login:'Masuk', logout:'Keluar', language:'Bahasa', tools:'Alat' },
  fil: { home:'Home', bratText:'Brat Text', video:'Brat Video', meme:'Brat Meme', image:'Brat Larawan', font:'Brat Font', album:'Brat Album Cover', features:'Mga Feature', styles:'Brat Styles', blog:'Blog', login:'Mag-login', logout:'Mag-sign out', language:'Wika', tools:'Tools' },
  hi: { home:'होम', bratText:'ब्रैट टेक्स्ट', video:'Brat वीडियो', meme:'Brat मीम', image:'Brat इमेज', font:'Brat फ़ॉन्ट', album:'Brat एल्बम कवर', features:'फीचर्स', styles:'ब्रैट स्टाइल्स', blog:'ब्लॉग', login:'लॉगिन', logout:'साइन आउट', language:'भाषा', tools:'टूल्स' },
  ms: { home:'Utama', bratText:'Teks Brat', video:'Brat Video', meme:'Brat Meme', image:'Brat Imej', font:'Brat Fon', album:'Brat Kulit Album', features:'Ciri', styles:'Gaya Brat', blog:'Blog', login:'Log masuk', logout:'Log keluar', language:'Bahasa', tools:'Alat' },
  tr: { home:'Ana Sayfa', bratText:'Brat Metin', video:'Brat Video', meme:'Brat Meme', image:'Brat Görsel', font:'Brat Yazı Tipi', album:'Brat Albüm Kapağı', features:'Özellikler', styles:'Brat Stilleri', blog:'Blog', login:'Giriş', logout:'Çıkış', language:'Dil', tools:'Araçlar' },
  es: { home:'Inicio', bratText:'Texto Brat', video:'Brat Video', meme:'Brat Meme', image:'Brat Imagen', font:'Brat Fuente', album:'Brat Portada', features:'Funciones', styles:'Estilos Brat', blog:'Blog', login:'Iniciar sesión', logout:'Cerrar sesión', language:'Idioma', tools:'Herramientas' },
  de: { home:'Startseite', bratText:'Brat Text', video:'Brat Video', meme:'Brat Meme', image:'Brat Bild', font:'Brat Schrift', album:'Brat Albumcover', features:'Funktionen', styles:'Brat Styles', blog:'Blog', login:'Anmelden', logout:'Abmelden', language:'Sprache', tools:'Tools' },
  fr: { home:'Accueil', bratText:'Texte Brat', video:'Brat Vidéo', meme:'Brat Mème', image:'Brat Image', font:'Brat Police', album:"Brat Pochette d’album", features:'Fonctions', styles:'Styles Brat', blog:'Blog', login:'Connexion', logout:'Déconnexion', language:'Langue', tools:'Outils' },
  pt: { home:'Início', bratText:'Texto Brat', video:'Brat Vídeo', meme:'Brat Meme', image:'Brat Imagem', font:'Brat Fonte', album:'Brat Capa do álbum', features:'Recursos', styles:'Estilos Brat', blog:'Blog', login:'Entrar', logout:'Sair', language:'Idioma', tools:'Ferramentas' },
  ar: { home:'الرئيسية', bratText:'نص Brat', video:'Brat فيديو', meme:'Brat ميم', image:'Brat صورة', font:'Brat خط', album:'Brat غلاف ألبوم', features:'الميزات', styles:'أنماط Brat', blog:'المدونة', login:'تسجيل الدخول', logout:'تسجيل الخروج', language:'اللغة', tools:'الأدوات' },
  ja: { home:'ホーム', bratText:'Brat テキスト', video:'Brat 動画', meme:'Brat ミーム', image:'Brat 画像', font:'Brat フォント', album:'Brat アルバムカバー', features:'機能', styles:'Brat スタイル', blog:'ブログ', login:'ログイン', logout:'ログアウト', language:'言語', tools:'ツール' },
  ko: { home:'홈', bratText:'Brat 텍스트', video:'Brat 비디오', meme:'Brat 밈', image:'Brat 이미지', font:'Brat 폰트', album:'Brat 앨범 커버', features:'기능', styles:'Brat 스타일', blog:'블로그', login:'로그인', logout:'로그아웃', language:'언어', tools:'도구' },
  'zh-Hans': { home:'首页', bratText:'Brat 文本', video:'Brat 视频', meme:'Brat 表情包', image:'Brat 图片', font:'Brat 字体', album:'Brat 专辑封面', features:'功能', styles:'Brat 风格', blog:'博客', login:'登录', logout:'退出', language:'语言', tools:'工具' },
  'zh-Hant': { home:'首頁', bratText:'Brat 文字', video:'Brat 影片', meme:'Brat 迷因', image:'Brat 圖片', font:'Brat 字體', album:'Brat 專輯封面', features:'功能', styles:'Brat 風格', blog:'部落格', login:'登入', logout:'登出', language:'語言', tools:'工具' },
  th: { home:'หน้าแรก', bratText:'ข้อความ Brat', video:'Brat วิดีโอ', meme:'Brat มีม', image:'Brat รูปภาพ', font:'Brat ฟอนต์', album:'Brat ปกอัลบั้ม', features:'ฟีเจอร์', styles:'สไตล์ Brat', blog:'บล็อก', login:'เข้าสู่ระบบ', logout:'ออกจากระบบ', language:'ภาษา', tools:'เครื่องมือ' },
  it: { home:'Home', bratText:'Testo Brat', video:'Brat Video', meme:'Brat Meme', image:'Brat Immagine', font:'Brat Font', album:'Brat Copertina album', features:'Funzioni', styles:'Stili Brat', blog:'Blog', login:'Accedi', logout:'Esci', language:'Lingua', tools:'Strumenti' },
};

export function commonText(locale: LocaleCode, key: string) {
  return common[locale]?.[key] || common.en[key] || key;
}

export function normalizeLocale(input?: string | null): LocaleCode {
  const value = (input || '').toLowerCase().replace('_', '-');
  if (value.startsWith('zh-tw') || value.startsWith('zh-hk') || value.includes('hant')) return 'zh-Hant';
  if (value.startsWith('zh')) return 'zh-Hans';
  if (value.startsWith('id')) return 'id';
  if (value.startsWith('fil') || value.startsWith('tl')) return 'fil';
  if (value.startsWith('hi')) return 'hi';
  if (value.startsWith('ms')) return 'ms';
  if (value.startsWith('tr')) return 'tr';
  if (value.startsWith('es')) return 'es';
  if (value.startsWith('de')) return 'de';
  if (value.startsWith('fr')) return 'fr';
  if (value.startsWith('pt')) return 'pt';
  if (value.startsWith('ar')) return 'ar';
  if (value.startsWith('ja')) return 'ja';
  if (value.startsWith('ko')) return 'ko';
  if (value.startsWith('th')) return 'th';
  if (value.startsWith('it')) return 'it';
  return 'en';
}

export function localeFromTimezone(zone?: string): LocaleCode {
  const z = zone || '';
  if (/Jakarta|Makassar|Jayapura/.test(z)) return 'id';
  if (/Manila/.test(z)) return 'fil';
  if (/Kolkata|Calcutta/.test(z)) return 'hi';
  if (/Kuala_Lumpur|Kuching/.test(z)) return 'ms';
  if (/Istanbul/.test(z)) return 'tr';
  if (/Madrid|Canary/.test(z)) return 'es';
  if (/Berlin/.test(z)) return 'de';
  if (/Paris/.test(z)) return 'fr';
  if (/Lisbon/.test(z)) return 'pt';
  if (/Tokyo/.test(z)) return 'ja';
  if (/Seoul/.test(z)) return 'ko';
  if (/Bangkok/.test(z)) return 'th';
  if (/Rome/.test(z)) return 'it';
  return 'en';
}

export const translatorLanguageCode: Record<LocaleCode, string> = {
  en:'en', id:'id', fil:'fil', hi:'hi', ms:'ms', tr:'tr', es:'es', de:'de', fr:'fr', pt:'pt', ar:'ar', ja:'ja', ko:'ko', 'zh-Hans':'zh-CN', 'zh-Hant':'zh-TW', th:'th', it:'it'
};
