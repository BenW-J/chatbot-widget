//V1.0.1 - Lottie loaded inside Shadow DOM
(function () {
  if (window.__chatbotWidgetLoaded) return;
  window.__chatbotWidgetLoaded = true;

  const emailIconURL = "https://cdn.jsdelivr.net/gh/BenW-J/chatbot-widget@main/src/animations/lil-bot.json";
  const avatarURL = "https://cdn.jsdelivr.net/gh/BenW-J/chatbot-widget@main/src/animations/support-woman.json";

  window.ChatbotWidget = {
    open: () => {
      const win = document.querySelector("#chatbot-widget-host").shadowRoot.querySelector("#chatbot-window");
      const btnOpen = document.querySelector("#chatbot-widget-host").shadowRoot.querySelector("#chatbot-open");
      if (win && btnOpen) {
        win.style.display = "flex";
        btnOpen.style.display = "none";
      }
    }
  };

  const config = window.chatbotWidgetConfig || {
    botName: "Connie",
    welcomeMessage: "Hi there! I’m Connie from Build Connector. I can help you find the right construction professional — what type of service do you need?",
    options: ["Shop Fitter", "Electrician", "Plumber", "Builder"],
    theme: {
      accent: "#3539f2",
      bgColor: "#f9fafb"
    },
    avatar: avatarURL
  };

  function initChatWidget() {
    const host = document.createElement("div");
    host.id = "chatbot-widget-host";
    host.style.position = "fixed";
    host.style.bottom = "1rem";
    host.style.right = "1rem";
    host.style.zIndex = "9999";

    const shadow = host.attachShadow({ mode: "open" });

    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";
    shadow.appendChild(fontLink);

    const lottieScript = document.createElement("script");
    lottieScript.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
    lottieScript.onload = () => {
      try {
        renderChatWidget(shadow, host);
      } catch (e) {
        console.error("Chatbot widget failed to initialize:", e);
      }
    };
    shadow.appendChild(lottieScript);

    document.body.appendChild(host);
  }

  function renderChatWidget(shadow, host) {
    const widget = document.createElement("div");
    widget.innerHTML = `
      <button id="chatbot-open" aria-label="Open chat"
        style="
          width: 96px;
          height: 96px;
          border-radius: 50%;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
          background:rgba(22, 24, 141, 0.58);
          padding: 0;
          overflow: hidden;
          transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
        "
      >
        <lottie-player
          src="${emailIconURL}"
          background="transparent"
          speed="1"
          autoplay
          loop
          style="width: 96px; height: 96px"
        ></lottie-player>
      </button>

      <div id="chatbot-window"
        style="
          display: none;
          width: 90vw;
          max-width: 420px;
          height: 75vh;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
          overflow: hidden;
          transform: scale(0.95);
          opacity: 0;
          transition: all 0.3s ease-in-out;
          flex-direction: column;
        "
      >
        <div style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e5e7eb;
          background: white;
        ">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            ${
              config.avatar.endsWith(".json")
                ? `<lottie-player src="${config.avatar}" background="transparent" speed="1" style="width: 42px; height: 42px;" autoplay loop></lottie-player>`
                : `<img src="${config.avatar}" style="width: 24px; height: 24px; border-radius: 50%;" alt="bot avatar"/>`
            }
            <div style="font-weight: 600; font-size: 0.875rem;">${config.botName}</div>
          </div>
          <button id="chatbot-close" aria-label="Close chat"
            style="font-size: 1.25rem; color: #9ca3af; border: none; background: transparent; cursor: pointer; display: flex; align-items: center"
          >−</button>
        </div>

        <div id="chatbot-messages"
          style="
            flex: 1;
            padding: 0.75rem 1rem;
            overflow-y: auto;
            font-size: 0.875rem;
            line-height: 1.25;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            background-color: ${config.theme.bgColor};
          "
        ></div>

        <div style="border-top: 1px solid #e5e7eb; background: white; padding: 0.5rem;">
          <div style="display: flex; align-items: flex-end; gap: 0.5rem;">
            <textarea
              id="chatbot-input"
              style="
                flex: 1;
                resize: none;
                padding: 0.5rem 1rem;
                font-size: 0.875rem;
                border: 1px solid #d1d5db;
                border-radius: 20px;
                box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                min-height: 36px;
                max-height: 90px;
                overflow-y: auto;
                line-height: 1.4;
                height: auto;
                outline: none;
              "
            ></textarea>
            <button id="chatbot-send" aria-label="Send message"
              style="
                font-size: 1.25rem;
                border: none;
                background: transparent;
                cursor: pointer;
                transition: transform 0.2s ease-in-out;
                color: ${config.theme.accent};
              "
            >➤</button>
          </div>
        </div>
      </div>
    `;

    const styleBlock = document.createElement("style");
    styleBlock.textContent = `
      *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        line-height: 1.4;
        font-family: 'Inter', sans-serif;
        vertical-align: middle;
      }

      :host {
        font-family: 'Inter', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      textarea, button {
        font: inherit;
      }

      lottie-player {
        vertical-align: middle;
        display: block;
      }

      #chatbot-open:hover {
        box-shadow: 0 20px 25px -5px rgba(0,0,0,0.15);
      }

      #chatbot-send:hover {
        transform: scale(1.1);
      }

      #chatbot-close:hover {
        color: #4b5563;
      }

      @keyframes bounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
      }
    `;

    const responsiveStyle = document.createElement("style");
    responsiveStyle.textContent = `
      @media (min-width: 640px) {
        #chatbot-window {
          width: 384px !important; 
          height: 600px !important;
        }
      }

      @media (max-width: 480px) {
        #chatbot-window {
          height: 90vh !important;
          width: 95vw !important;
        }
      }
    `;

    shadow.appendChild(styleBlock);
    shadow.appendChild(responsiveStyle);
    shadow.appendChild(widget);
    shadow.host.setAttribute("lang", "en");
  }

  initChatWidget();
})();
