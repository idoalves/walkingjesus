import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

const { useState, useEffect } = React;

const translations: { [key: string]: any } = {
    pt: {
        loading: "Carregando Walking Jesus...",
        error: "Erro ao carregar dados do blog.",
        navInicio: "Início",
        navMensagens: "Mensagens",
        navSobre: "Sobre",
        postInspiracao: "Inspiração",
        btnReadMore: "Ver mensagem completa",
        quoteText: '"Eu sou o caminho, e a verdade e a vida; ninguém vem ao Pai, senão por mim."',
        quoteRef: "João 14:6",
        footerTagline: "Caminhando com Ele.",
        language: "EN"
    },
    en: {
        loading: "Loading Walking Jesus...",
        error: "Error loading blog data.",
        navInicio: "Home",
        navMensagens: "Messages",
        navSobre: "About",
        postInspiracao: "Inspiration",
        btnReadMore: "Read full message",
        quoteText: '"I am the way, the truth, and the life: no man cometh unto the Father, but by me."',
        quoteRef: "John 14:6",
        footerTagline: "Walking with Him.",
        language: "PT"
    }
};

const App = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState('en');

    useEffect(() => {
        fetch('./data.json')
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Erro ao carregar data.json:', error);
                setLoading(false);
            });
    }, []);

    const t = translations[lang];

    const toggleLang = () => {
        setLang(lang === 'pt' ? 'en' : 'pt');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-stone-50">
                <div className="text-xl font-serif text-stone-600 italic">{t.loading}</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-50">
                <div className="text-xl font-semibold text-red-600">{t.error}</div>
            </div>
        );
    }

    const settings = data.settings.WALKING_JESUS;
    const posts = data.posts;

    return (
        <div className="min-h-screen bg-[#faf9f6] font-serif text-stone-800">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-stone-100 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        {settings.logoUrl && (
                            <img src={settings.logoUrl} alt="Logo" className="w-10 h-10 rounded-full object-cover shadow-sm" />
                        )}
                        <h1 className="text-2xl font-bold tracking-tighter text-stone-900">{lang === 'pt' ? (settings.title_pt || settings.title) : settings.title}</h1>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="flex gap-8 text-sm uppercase tracking-widest font-medium text-stone-500">
                            <a href="#" className="hover:text-stone-900 transition">{t.navInicio}</a>
                            <a href="#" className="hover:text-stone-900 transition">{t.navMensagens}</a>
                            <a href="#" className="hover:text-stone-900 transition">{t.navSobre}</a>
                        </div>
                        <button
                            onClick={toggleLang}
                            className="bg-stone-100 hover:bg-stone-200 text-stone-600 px-3 py-1 rounded text-xs font-bold transition flex items-center gap-1"
                        >
                            <span>🌐</span>
                            {t.language}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Header */}
            <header className="py-20 px-6 text-center max-w-4xl mx-auto">
                <span className="inline-block px-3 py-1 bg-stone-100 text-stone-500 text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded">
                    {lang === 'pt' ? (settings.tagline_pt || settings.tagline) : settings.tagline}
                </span>
                <h2 className="text-5xl md:text-7xl font-bold text-stone-900 mb-8 leading-tight">
                    {lang === 'pt' ? (settings.heroText_pt || settings.heroText) : settings.heroText}
                </h2>
                <p className="text-xl md:text-2xl text-stone-600 leading-relaxed italic border-l-4 border-stone-200 pl-6 py-2 max-w-2xl mx-auto text-left md:text-center md:border-l-0 md:pl-0">
                    {lang === 'pt' ? (settings.heroSubtext_pt || settings.heroSubtext) : settings.heroSubtext}
                </p>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 pb-24">
                <div className="max-w-5xl mx-auto space-y-32">
                    {posts.map((post: any) => (
                        <article key={post.id} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                            <div className="md:col-span-7">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-sm text-stone-400 font-medium">
                                        <span className="uppercase tracking-widest">{post.date}</span>
                                        <span className="w-8 h-px bg-stone-200"></span>
                                        <span>{t.postInspiracao}</span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-stone-900 leading-snug hover:text-stone-600 transition cursor-pointer">
                                        {lang === 'pt' ? (post.title_pt || post.title) : post.title}
                                    </h3>
                                    <div
                                        className="prose prose-stone lg:prose-lg text-stone-600 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-stone-900"
                                        dangerouslySetInnerHTML={{ __html: lang === 'pt' ? (post.content_pt || post.content) : post.content }}
                                    />
                                    <button className="pt-4 flex items-center gap-2 group text-stone-900 font-bold border-b-2 border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-500 transition">
                                        {t.btnReadMore}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="md:col-span-5 relative mt-8 md:mt-0">
                                <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl skew-y-1 transform transition hover:skew-y-0 duration-500">
                                    {post.imageUrl ? (
                                        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-stone-200 flex items-center justify-center italic text-stone-400">
                                            Imago Deorum
                                        </div>
                                    )}
                                </div>
                                {/* Decorative element */}
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-stone-100 -z-10 rounded-full border border-stone-200 opacity-50"></div>
                            </div>
                        </article>
                    ))}
                </div>
            </main>

            {/* Spiritual Quote Section */}
            <section className="bg-stone-900 text-stone-100 py-24 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <svg className="w-12 h-12 mx-auto mb-8 text-stone-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3C14.017 2.44772 14.4647 2 15.017 2H21.017C21.5693 2 22.017 2.44772 22.017 3V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3.01701 21L3.01701 18C3.01701 16.8954 3.91244 16 5.01701 16H8.01701C8.56929 16 9.01701 15.5523 9.01701 15V9C9.01701 8.44772 8.56929 8 8.01701 8H5.01701C3.91244 8 3.01701 7.10457 3.01701 6V3C3.01701 2.44772 3.46473 2 4.01701 2H10.017C10.5693 2 11.017 2.44772 11.017 3V15C11.017 18.3137 8.33072 21 5.01701 21H3.01701Z" />
                    </svg>
                    <p className="text-2xl font-medium leading-relaxed mb-6">
                        {t.quoteText}
                    </p>
                    <p className="text-stone-500 uppercase tracking-widest text-sm font-bold">{t.quoteRef}</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-stone-100 flex flex-col items-center gap-6">
                <div className="flex gap-6 text-xl">
                    <a href="#" className="text-stone-400 hover:text-stone-900 transition">𝕏</a>
                    <a href="#" className="text-stone-400 hover:text-stone-900 transition">📸</a>
                    <a href="#" className="text-stone-400 hover:text-stone-900 transition">✉️</a>
                </div>
                <p className="text-stone-400 text-sm">
                    © {new Date().getFullYear()} {lang === 'pt' ? (settings.title_pt || settings.title) : settings.title}. {t.footerTagline}
                </p>
            </footer>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));