const Logo = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 50"
            width="150"
            height="40"
            fill="none"
        >
            <style>
                {`
      @keyframes rainbow {
        0% { fill: red; }
        16.7% { fill: orange; }
        33.3% { fill: yellow; }
        50% { fill: green; }
        66.7% { fill: blue; }
        83.3% { fill: indigo; }
        100% { fill: violet; }
      }
      text {
        fill: black;
        transition: fill 0.3s ease;
      }
      text:hover {
        animation: rainbow 6s infinite;
        cursor: pointer;
      }
    `}
            </style>
            <polygon
                points="25,0 50,50 0,50"
                className="fill-current text-black dark:text-white"
            />
            <text
                x="70"
                y="35"
                fontFamily="'Inter', Arial, sans-serif"
                fontSize="20"
                className="fill-current text-black dark:text-white"
            >
                vichea.Dev
            </text>
        </svg>
    );
};

export default Logo;