// ================================
// DEVELOPER PORTFOLIO V2
// main.js
// ================================

// ---------- ELEMENTS ----------
const bootScreen = document.getElementById("bootScreen");
const portfolioScene = document.getElementById("portfolioScene");

const bootText = document.getElementById("bootText");
const bootBar = document.getElementById("bootBar");
const enterText = document.getElementById("enterText");

// ---------- TERMINAL LINES ----------

const bootLines = [
  "████████████████████████████████████",
  "",
  "C:\\Users\\Shriyansh>",
  "",
  "npm run portfolio",
  "",
  "Initializing Portfolio Engine...",
  "Loading Assets...",
  "Loading Animations...",
  "Loading Developer Profile...",
  "Loading Experience...",
  "Loading Skills...",
  "Loading Projects...",
  "Loading UI...",
  "Loading Theme...",
  "Loading Java...",
  "Loading Node.js...",
  "Loading Express...",
  "Loading MongoDB...",
  "",
  "Build Successful.",
  "",
  "Access Granted.",
  "",
  "Welcome Shriyansh Sharma."
];

// ---------- TYPEWRITER ----------

let line = 0;
let progress = 0;

function typeNextLine() {

    if(line >= bootLines.length){

        bootBar.style.width = "100%";

        setTimeout(()=>{
            enterText.classList.add("show");
        },500);

        return;
    }

    let current = bootLines[line];

    let index = 0;

    let interval = setInterval(()=>{

        bootText.textContent += current.charAt(index);

        index++;

        if(index >= current.length){

            clearInterval(interval);

            bootText.textContent += "\n";

            line++;

            progress += (100 / bootLines.length);

            bootBar.style.width = progress + "%";

            bootText.scrollTop = bootText.scrollHeight;

            setTimeout(typeNextLine,120);

        }

    },22);

}

// ---------- START ----------

window.addEventListener("load",()=>{

    typeNextLine();

});

// ---------- ENTER TO CONTINUE ----------

function startPortfolio(){

    if (!bootScreen || bootScreen.classList.contains("done")) return;

    bootScreen.classList.add("done");

    bootScreen.style.transition=".9s";

    bootScreen.style.opacity="0";

    bootScreen.style.pointerEvents="none";

    document.body.classList.add("loaded");

    setTimeout(()=>{

        bootScreen.style.display="none";

    },900);

}

document.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        startPortfolio();

    }

});

bootScreen?.addEventListener("click", () => {
  startPortfolio();
});

// ==============================
// CURSOR LIGHT
// ==============================

const cursor = document.querySelector(".cursor-light");

document.addEventListener("mousemove",(e)=>{

    if(!cursor) return;

    cursor.style.left = e.clientX+"px";
    cursor.style.top = e.clientY+"px";

});

// ==============================
// MOBILE MENU
// ==============================

const menuBtn=document.getElementById("menuBtn");
const navLinks=document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ==============================
// KEYBOARD ANIMATION
// ==============================

const keys=document.querySelectorAll(".key");

keys.forEach((key)=>{

key.addEventListener("mouseenter",()=>{

key.style.transform="translateY(-18px) rotateX(18deg) scale(1.08)";

});

key.addEventListener("mouseleave",()=>{

key.style.transform="";

});

key.addEventListener("mousedown",()=>{

key.classList.add("clicked");

});

key.addEventListener("mouseup",()=>{

setTimeout(()=>{

key.classList.remove("clicked");

},180);

});

});

// ==============================
// PROFILE PARALLAX
// ==============================

const profile=document.querySelector(".profile-card");

document.addEventListener("mousemove",(e)=>{

if(!profile) return;

let x=(window.innerWidth/2-e.clientX)/30;
let y=(window.innerHeight/2-e.clientY)/30;

profile.style.transform=
`rotateY(${x}deg) rotateX(${-y}deg)`;

});

// ==============================
// FLOATING BADGES
// ==============================

const badges=document.querySelectorAll(".floating-badge");

badges.forEach((badge,i)=>{

let angle=i*120;

setInterval(()=>{

angle+=1;

let x=Math.cos(angle*Math.PI/180)*20;

let y=Math.sin(angle*Math.PI/180)*20;

badge.style.transform=`translate(${x}px,${y}px)`;

},40);

});

// ==============================
// RANDOM TERMINAL GLITCH
// ==============================

setInterval(()=>{

const terminal=document.querySelector(".boot-terminal");

if(!terminal) return;

terminal.style.filter="brightness(1.25)";

setTimeout(()=>{

terminal.style.filter="brightness(1)";

},80);

},5000);

// ==============================
// BUTTON GLOW
// ==============================

document.querySelectorAll(".cyber-btn").forEach(btn=>{

btn.addEventListener("mousemove",(e)=>{

const rect=btn.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

btn.style.background=
`radial-gradient(circle at ${x}px ${y}px,
rgba(255,0,0,.55),
rgba(255,0,0,.18))`;

});

btn.addEventListener("mouseleave",()=>{

btn.style.background="";

});

});

// ==============================
// HERO REVEAL
// ==============================

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.animate([

{
opacity:0,
transform:"translateY(80px)"
},

{
opacity:1,
transform:"translateY(0)"
}

],{

duration:1000,
fill:"forwards"

});

}

});

});

document.querySelectorAll(".hero-content,.profile-zone,.keyboard-panel")
.forEach(el=>observer.observe(el));
const revealCards = document.querySelectorAll(
  ".glass-card, .project-card, .resume-card, .contact-form"
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-card");
    }
  });
}, { threshold: 0.2 });

revealCards.forEach((card) => {
  card.classList.add("hidden-card");
  revealObserver.observe(card);
});
document.querySelectorAll(".flow-card, .achievement-badge, .gamer-form").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,0,0,.28), rgba(255,255,255,.05))`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "";
  });
});
document.querySelectorAll(".footer-socials a").forEach(icon => {
  icon.addEventListener("mousemove", e => {
    const rect = icon.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    icon.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,.35), #ff1e1e)`;
  });

  icon.addEventListener("mouseleave", () => {
    icon.style.background = "";
  });
});
// ========================================
// CONTACT FORM CLIENT VALIDATION
// ========================================

const contactForm = document.getElementById("contactForm");
const contactSubmitBtn = document.getElementById("contactSubmitBtn");
const formResponse = document.getElementById("formResponse");
const messageField = document.getElementById("contactMessage");
const messageCount = document.getElementById("messageCount");

function showFieldError(field, message) {
  const wrapper = field.closest(".input-box");
  const errorElement = wrapper?.querySelector(".field-error");

  wrapper?.classList.add("has-error");

  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearFieldError(field) {
  const wrapper = field.closest(".input-box");
  const errorElement = wrapper?.querySelector(".field-error");

  wrapper?.classList.remove("has-error");

  if (errorElement) {
    errorElement.textContent = "";
  }
}

function isValidIndianPhone(phone) {
  if (!phone) return true;

  const cleaned = phone.replace(/[\s()-]/g, "");
  return /^(?:\+91|91)?[6-9]\d{9}$/.test(cleaned);
}

if (messageField && messageCount) {
  messageField.addEventListener("input", () => {
    messageCount.textContent = messageField.value.length;
    clearFieldError(messageField);
  });
}

if (contactForm) {
  const fields = contactForm.querySelectorAll(
    'input:not([name="website"]), textarea'
  );

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      clearFieldError(field);
    });
  });

  contactForm.addEventListener("submit", (event) => {
    let valid = true;

    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const phone = document.getElementById("contactPhone");
    const subject = document.getElementById("contactSubject");
    const message = document.getElementById("contactMessage");

    fields.forEach(clearFieldError);

    if (!name.value.trim() || name.value.trim().length < 2) {
      showFieldError(name, "Enter at least 2 characters.");
      valid = false;
    }

    if (!email.value.trim() || !email.validity.valid) {
      showFieldError(email, "Enter a valid email address.");
      valid = false;
    }

    if (!isValidIndianPhone(phone.value.trim())) {
      showFieldError(phone, "Enter a valid Indian mobile number.");
      valid = false;
    }

    if (
      subject.value.trim() &&
      subject.value.trim().length < 3
    ) {
      showFieldError(subject, "Enter at least 3 characters.");
      valid = false;
    }

    if (
      message.value.trim().length < 10 ||
      message.value.trim().length > 1000
    ) {
      showFieldError(
        message,
        "Message must contain 10 to 1000 characters."
      );

      valid = false;
    }

    if (!valid) {
      event.preventDefault();

      const firstInvalid = contactForm.querySelector(
        ".input-box.has-error input, .input-box.has-error textarea"
      );

      firstInvalid?.focus();
      return;
    }

    contactSubmitBtn.disabled = true;

    contactSubmitBtn.innerHTML = `
      <span>TRANSMITTING...</span>
      <i class="fa-solid fa-circle-notch fa-spin"></i>
    `;
  });
}

/*
 * Show server response received through redirect query parameters.
 */
const contactParams = new URLSearchParams(window.location.search);
const successMessage = contactParams.get("success");
const errorMessage = contactParams.get("error");

if (formResponse && successMessage === "1") {
  formResponse.className = "form-response success";
  formResponse.textContent =
    "> MESSAGE TRANSMITTED SUCCESSFULLY — I WILL CONTACT YOU SOON.";

  history.replaceState(
    {},
    document.title,
    `${window.location.pathname}#contact`
  );
}

if (formResponse && errorMessage) {
  formResponse.className = "form-response error";
  formResponse.textContent = `> TRANSMISSION FAILED — ${errorMessage}`;

  history.replaceState(
    {},
    document.title,
    `${window.location.pathname}#contact`
  );
}

// ==========================================
// CONTACT SUCCESS TERMINAL TRANSMISSION
// ==========================================

const transmissionOverlay =
  document.getElementById("transmissionOverlay");

const transmissionTerminal =
  document.querySelector(".transmission-terminal");

const transmissionText =
  document.getElementById("transmissionText");

const transmissionBar =
  document.getElementById("transmissionBar");

const transmissionPercent =
  document.getElementById("transmissionPercent");

const transmissionSuccess =
  document.getElementById("transmissionSuccess");

const terminalClose =
  document.getElementById("terminalClose");

const terminalDoneBtn =
  document.getElementById("terminalDoneBtn");

const transmissionLines = [
  "> INITIALIZING SECURE CONNECTION...",
  "> VERIFYING TRANSMISSION KEY...",
  "> ENCRYPTING MESSAGE PAYLOAD...",
  "> CONNECTING TO PORTFOLIO SERVER...",
  "> SAVING DATA TO MONGODB...",
  "> DISPATCHING TELEGRAM ALERT...",
  "> VERIFYING DELIVERY STATUS...",
  "> TRANSMISSION COMPLETE."
];

let transmissionRunning = false;

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function typeTransmissionLine(text) {
  if (!transmissionText) return;

  if (transmissionText.textContent.length > 0) {
    transmissionText.textContent += "\n";
  }

  for (const character of text) {
    transmissionText.textContent += character;
    transmissionText.scrollTop = transmissionText.scrollHeight;
    await sleep(18);
  }
}

function updateTransmissionProgress(value) {
  const safeValue = Math.max(0, Math.min(100, value));

  if (transmissionBar) {
    transmissionBar.style.width = `${safeValue}%`;
  }

  if (transmissionPercent) {
    transmissionPercent.textContent = `${safeValue}%`;
  }
}

async function runTransmissionTerminal() {
  if (
    transmissionRunning ||
    !transmissionOverlay ||
    !transmissionText ||
    !transmissionSuccess
  ) {
    return;
  }

  transmissionRunning = true;

  transmissionText.textContent = "";
  updateTransmissionProgress(0);

  transmissionSuccess.classList.remove("show");
  transmissionTerminal?.classList.remove("glitching");
  transmissionOverlay.classList.add("active");

  document.body.style.overflow = "hidden";

  await sleep(450);

  for (let index = 0; index < transmissionLines.length; index++) {
    await typeTransmissionLine(transmissionLines[index]);

    const currentProgress = Math.round(
      ((index + 1) / transmissionLines.length) * 100
    );

    updateTransmissionProgress(currentProgress);

    if (index === 3 || index === 6) {
      transmissionTerminal?.classList.add("glitching");

      setTimeout(() => {
        transmissionTerminal?.classList.remove("glitching");
      }, 720);
    }

    await sleep(260);
  }

  await sleep(550);

  transmissionTerminal?.classList.add("glitching");

  await sleep(600);

  transmissionTerminal?.classList.remove("glitching");
  transmissionSuccess.classList.add("show");

  transmissionRunning = false;
}

function closeTransmissionTerminal() {
  transmissionOverlay?.classList.remove("active");
  document.body.style.overflow = "";

  setTimeout(() => {
    if (transmissionText) {
      transmissionText.textContent = "";
    }

    updateTransmissionProgress(0);
    transmissionSuccess?.classList.remove("show");
    transmissionTerminal?.classList.remove("glitching");
  }, 500);
}

terminalClose?.addEventListener(
  "click",
  closeTransmissionTerminal
);

terminalDoneBtn?.addEventListener(
  "click",
  closeTransmissionTerminal
);

transmissionOverlay?.addEventListener("click", (event) => {
  if (event.target === transmissionOverlay) {
    closeTransmissionTerminal();
  }
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    transmissionOverlay?.classList.contains("active")
  ) {
    closeTransmissionTerminal();
  }
});

// ==========================================
// BACKEND REDIRECT RESPONSE HANDLING
// Success: /?success=1#contact
// Error:   /?error=message#contact
// ==========================================

const responseParams =
  new URLSearchParams(window.location.search);

const contactSuccess =
  responseParams.get("success");

const contactError =
  responseParams.get("error");

if (contactSuccess === "1") {
  window.addEventListener("load", () => {
    setTimeout(() => {
      runTransmissionTerminal();
    }, 650);
  });

  contactForm?.reset();

  if (messageCount) {
    messageCount.textContent = "0";
  }
}

if (contactError && formResponse) {
  formResponse.className = "form-response error";
  formResponse.textContent =
    `> TRANSMISSION FAILED — ${contactError}`;
}

if (contactSuccess === "1" || contactError) {
  history.replaceState(
    {},
    document.title,
    `${window.location.pathname}#contact`
  );
}

// ==============================
// END
// ==============================