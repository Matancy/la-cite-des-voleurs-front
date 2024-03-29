/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "light-gray": "#D9D9D9",
                "dark-brown": "#7A2E0C",
                "darker-brown": "#5D2409"
            },
            fontFamily: {
                GrenzeGotisch: ["GrenzeGotisch"],
                Inter: ["Inter"]
            },
        },
    },
    plugins: [],
};
