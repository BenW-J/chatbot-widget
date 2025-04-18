(function () {
    if (window.__simpleLottieButtonLoaded) return;
    window.__simpleLottieButtonLoaded = true;
  
    const lottieURL = "https://lottie.host/c404786e-2d84-4239-a092-5fa55366d5a7/DRPRrsgJH4.json";
  
    const host = document.createElement("div");
    host.id = "simple-lottie-widget";
    host.style.position = "fixed";
    host.style.bottom = "1rem";
    host.style.right = "1rem";
    host.style.zIndex = "9999";
  
    const shadow = host.attachShadow({ mode: "open" });
  
    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import 'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs';
    `;
    shadow.appendChild(script);
  
    const style = document.createElement("style");
    style.textContent = `
      #lottie-button {
        width: 96px;
        height: 96px;
        border-radius: 50%;
        background: rgba(22, 24, 141, 0.58);
        box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
        padding: 0;
        overflow: hidden;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
  
      dotlottie-player {
        width: 80%;
        height: 80%;
        display: block;
        box-sizing: border-box;
        vertical-align: middle;
      }
    `;
    shadow.appendChild(style);
  
    const button = document.createElement("button");
    button.id = "lottie-button";
    button.innerHTML = `
      <dotlottie-player
        src="${lottieURL}"
        autoplay
        loop
        background="transparent"
        mode="normal"
        renderer="svg"
        loading="lazy"
      ></dotlottie-player>
    `;
    shadow.appendChild(button);
  
    document.body.appendChild(host);
  })();
  