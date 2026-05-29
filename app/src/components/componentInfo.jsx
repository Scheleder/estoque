import React, { useState, useEffect } from 'react'
import { api } from '@/services/config'
import Loading from './loading'
import { Sparkles, AlertCircle } from 'lucide-react'

const ComponentInfo = ({ comp, fab }) => {
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!comp) return;

        const fetchInfo = async () => {
            setLoading(true);
            setError(null);
            try {
                // Request details about the component using the Gemini AI API
                const prompt = `Forneça detalhes técnicos estruturados, especificações principais, aplicações comuns, observações importantes e forneça obrigatoriamente um link direto ou link de busca para encontrar o datasheet do componente descrito como "${comp}"${fab ? ` do fabricante/marca "${fab}"` : ''}. Formate esse link como link Markdown (ex: [Visualizar Datasheet](url) ou [Buscar Datasheet no Octopart](url)). Responda em português de forma clara, técnica e objetiva em formato Markdown com cabeçalhos.`;
                
                const response = await api.post('/info', { prompt });
                if (response.data && response.data.answer) {
                    setInfo(response.data.answer);
                } else {
                    setInfo("Nenhuma informação adicional foi encontrada.");
                }
            } catch (err) {
                console.error("Erro ao consultar a API do Gemini:", err);
                setError("Não foi possível carregar as informações inteligentes do componente.");
            } finally {
                setLoading(false);
            }
        };

        fetchInfo();
    }, [comp, fab]);

    // Fast, lightweight client-side markdown formatter
    const formatText = (text) => {
        if (!text) return null;
        return text.split('\n').map((line, i) => {
            // Trim whitespace
            const trimmed = line.trim();
            if (!trimmed) return <div key={i} className="h-2" />;

            // Headings
            if (trimmed.startsWith('### ')) {
                return <h4 key={i} className="text-sm font-bold text-[#7F0000] mt-4 mb-2">{trimmed.replace('### ', '')}</h4>;
            }
            if (trimmed.startsWith('## ')) {
                return <h3 key={i} className="text-md font-bold text-gray-800 mt-5 mb-2.5 border-b border-gray-200 pb-1">{trimmed.replace('## ', '')}</h3>;
            }
            if (trimmed.startsWith('# ')) {
                return <h2 key={i} className="text-lg font-bold text-gray-900 mt-6 mb-3 border-b-2 border-gray-300 pb-1">{trimmed.replace('# ', '')}</h2>;
            }

            // Bullet Lists
            if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
                const content = trimmed.substring(2);
                return <li key={i} className="ml-5 list-disc text-xs text-gray-600 my-1">{renderFormatting(content)}</li>;
            }

            // Numbered Lists
            if (/^\d+\.\s/.test(trimmed)) {
                const content = trimmed.replace(/^\d+\.\s/, '');
                return <li key={i} className="ml-5 list-decimal text-xs text-gray-600 my-1">{renderFormatting(content)}</li>;
            }

            // Normal paragraphs
            return <p key={i} className="text-xs text-gray-600 my-1.5 leading-relaxed">{renderFormatting(trimmed)}</p>;
        });
    };

    // Helper to format bold text (**text**) and links ([text](url))
    const renderFormatting = (line) => {
        if (!line) return line;

        // Combine regex for bold and links
        const combinedRegex = /(\*\*(.*?)\*\*|\[(.*?)\]\((.*?)\))/g;
        let parts = [];
        let lastIndex = 0;
        let match;

        while ((match = combinedRegex.exec(line)) !== null) {
            // Add plain text before match
            if (match.index > lastIndex) {
                parts.push(line.substring(lastIndex, match.index));
            }

            if (match[2] !== undefined) {
                // Bold match: **text**
                parts.push(<strong key={match.index} className="font-bold text-gray-800">{match[2]}</strong>);
            } else if (match[3] !== undefined && match[4] !== undefined) {
                // Link match: [text](url)
                parts.push(
                    <a
                        key={match.index}
                        href={match[4]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#7F0000] hover:text-[#990000] font-semibold underline underline-offset-2 transition-colors cursor-pointer"
                    >
                        {match[3]}
                    </a>
                );
            }

            lastIndex = combinedRegex.lastIndex;
        }

        if (lastIndex < line.length) {
            parts.push(line.substring(lastIndex));
        }

        return parts.length > 0 ? parts : line;
    };

    return (
        <div className="mt-4 shadow-xl rounded-xl mr-2 p-5 bg-white/95 border border-white/50 backdrop-blur-md transition-all duration-300 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-4 border-b pb-3 border-gray-200/80">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-[#7F0000] to-[#b30000]/10 flex items-center justify-center animate-pulse">
                    <Sparkles className="w-4 h-4 text-[#7F0000]" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-gray-800">Informações Inteligentes (Gemini AI)</h3>
                    <p className="text-[10px] text-gray-400">Dados técnicos gerados automaticamente</p>
                </div>
            </div>

            {/* Content States */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                    <Loading />
                    <span className="text-[11px] text-gray-500 animate-pulse">Consultando especificações técnicas...</span>
                </div>
            ) : error ? (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs font-medium">{error}</span>
                </div>
            ) : (
                <div className="prose max-w-none text-gray-600">
                    {formatText(info)}
                </div>
            )}
        </div>
    )
}

export default ComponentInfo