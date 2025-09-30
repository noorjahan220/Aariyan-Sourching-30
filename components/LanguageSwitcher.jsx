"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import { languages } from "../Data/languages"; // Adjust import path if needed

const LanguageSwitcher = () => {
  const initialLang = languages.find(lang => lang.code === 'en') || languages[0];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(initialLang);
  const wrapperRef = useRef(null);

  // The core logic for changing the language remains the same
  const changeLanguage = (langCode) => {
    const maxAttempts = 10;
    let attempts = 0;
    const tryChangingLanguage = () => {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event("change"));
      } else {
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(tryChangingLanguage, 200);
        } else {
          console.error("Could not find the Google Translate select element.");
        }
      }
    };
    tryChangingLanguage();
  };

  const handleSelect = (lang) => {
    setSelectedLang(lang);
    setIsOpen(false);
    changeLanguage(lang.code);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <Fragment>
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      <div className="relative inline-block" ref={wrapperRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center cursor-pointer justify-center w-7 h-4 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <img
            src={selectedLang.flag}
            alt={selectedLang.name}
            className="w-7 h-4 object-cover"
          />
        </button>
        {isOpen && (
          <div
            className="absolute z-50 right-0 mt-2 w-52 border border-gray-300 origin-top-right bg-white "
            role="menu"
            aria-orientation="vertical"
          >
            <ul className="py-1 max-h-50 overflow-y-auto " role="none">
              {languages.map((lang) => (
                <li key={lang.code} role="none">
                  {/* === UI CHANGE 3: White theme list items === */}
                  <button
                    onClick={() => handleSelect(lang)}
                    className="flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-gray-800 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <img
                      src={lang.flag}
                      alt={`${lang.name} flag`}
                      className="w-7 h-4"
                    />
                    <span>{lang.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default LanguageSwitcher;