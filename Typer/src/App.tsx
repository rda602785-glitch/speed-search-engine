import { useState, useEffect, useMemo, useRef, useCallback, memo } from "react";
import { words } from "./types";

interface ActionButtonProps {
    label: string;
    onClick: () => void;
}
const ActionButton = memo(({ label, onClick }: ActionButtonProps) => {
    console.log("🔘 دکمه ActionButton رندر شد:", label); // 👈 این خط جادویی رو داخلش بذار
    return (
        <button type="button" onClick={onClick} className="btn btn-action">
            {label}
        </button>
    );
});


export default function App() {
    const [query, setQuery] = useState("");
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const timerIdRef = useRef<number | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (isActive) {
            timerIdRef.current = window.setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }

        return () => {
            if (timerIdRef.current !== null) {
                window.clearInterval(timerIdRef.current);
                timerIdRef.current = null;
            }
        };
    }, [isActive]);

    const filteredItems = useMemo(() => {
        console.log("⚡ فیلتر سنگین دیتای ۴,۰۰۰ تایی اجرا شد!");

        const normalizedQuery = query.toLowerCase().trim();
        if (!normalizedQuery) {
            return words;
        }

        return words.filter((item) =>
            item.word.toLowerCase().includes(normalizedQuery)
        );
    }, [query]);

    const handleReset = useCallback(() => {
        setIsActive(false);
        setSeconds(0);
        setQuery("");
        inputRef.current?.focus();
    }, []);

    return (
        <div className="app-container">
            <div className="timer-section">
                <div className="timer-display">
                    <span>
                        {String(Math.floor(seconds / 60)).padStart(2, "0")}:
                        {String(seconds % 60).padStart(2, "0")}
                    </span>
                    <div className="controls">
                        <button
                            type="button"
                            onClick={() => setIsActive((prev) => !prev)}
                            className={`btn ${isActive ? "btn-stop" : "btn-start"}`}
                        >
                            {isActive ? "توقف" : "شروع"}
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="btn btn-reset"
                        >
                            ریست
                        </button>
                    </div>

                    <div>
                        <input
                            type="text"
                            ref={inputRef}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="جستجوی کلمه..."
                        />
                        <ActionButton label="ریست و فوکوس مجدد" onClick={handleReset} />
                        <div>
                            <span>
                                تعداد نتایج : <strong>{filteredItems.length.toLocaleString('fa-IR')}</strong> از <strong>{words.length.toLocaleString('fa-IR')}</strong>
                            </span>
                        </div>


                        <div className="results-container">
                            {filteredItems.length === 0 ? (
                                <p className="no-results">هیچ کلمه‌ای با این عبارت پیدا نشد! 🔍</p>
                            ) : (
                                <ul className="word-list">
                                    {filteredItems.slice(0, 20).map((item) => (
                                        <li key={item.id} className="word-item">
                                            <span className="word-text">{item.word}</span>
                                            <span className="word-score">
                                                امتیاز: {item.score.toLocaleString("fa-IR")}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {filteredItems.length > 20 && (
                                <p className="results-hint">
                                    نمایش ۲۰ مورد از {filteredItems.length.toLocaleString("fa-IR")} نتیجه (برای عملکرد بهتر)
                                </p>
                            )}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}
