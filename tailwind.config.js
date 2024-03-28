/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "light-gray": "#D9D9D9",
            },
            fontFamily: {
                GrenzeGotisch: ["GrenzeGotisch"],
                Inter: ["Inter"]
            },
        },
    },
    plugins: [],
};
