import React, { useState, useEffect } from 'react';

const sentences = [
    "my website!",
    "where I organize my notes.",
    "where I keep track of my projects.",
];
const sentenceEmoji = [" 🧙‍", " 📝", " 🚀"];

const TypingEffect = () => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentText, setCurrentText] = useState('');
    const [emoji, setEmoji] = useState('');

    useEffect(() => {
        if (index === sentences.length) {
            setIndex(0);
        }

        const handleTyping = async () => {
            setCurrentText(sentences[index].substring(0, subIndex));
            setEmoji(sentenceEmoji[index]);

            if (isDeleting) {
                if (subIndex > 0) {
                    setSubIndex(subIndex - 1);
                } else {
                    setIsDeleting(false);
                    setIndex((prev) => (prev + 1) % sentences.length);
                }
            } else {
                if (subIndex < sentences[index].length) {
                    setSubIndex(subIndex + 1);
                } else {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    setIsDeleting(true);
                }
            }
        };

        const timeout = setTimeout(handleTyping, 80);
        return () => clearTimeout(timeout);
    }, [index, subIndex, isDeleting]);

    return (
        <div>
            <div className="w-full h-6 flex items-center">
                <h4 className="lg:text-xl text-base font-mono font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                    This is <span>{currentText}</span>
                </h4><span>{emoji}</span>
            </div>
        </div>

    );
};

export default TypingEffect;
