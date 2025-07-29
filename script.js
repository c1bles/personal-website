const terminal = document.getElementById('terminal');
const output = document.getElementById('output');
const input = document.getElementById('command-input');
const themeSwitcher = document.getElementById('theme-switcher');

let isLightTheme = false;

// Commands and their output.
const commands = {
    help: `
Available commands:
  <span class="command-echo">about</span>      - who am i?
  <span class="command-echo">projects</span>   - check out my projects
  <span class="command-echo">find-me</span>    - most of my accs! (includes contact info)
  <span class="command-echo">clear</span>      - clear the terminal screen
  <span class="command-echo">theme</span>      - change the theme (e.g., 'theme light', 'theme dark')
  <span class="command-echo">help</span>       - show this help message
  
    `,
    about: `
haii n welcome!! name's cibles/c1bles. i'm aspiring to at least become smth in life :3c
i do a lot of different stuff, like dev, music prod, photography, scanlation, and more...
i'm like legit really peak x3

i'm part of the persona, project moon, and subahiki fandoms (and some others ^^)

    `,
    projects: `
some of my projects!!!

<ul class="dev projects">
    <li>
        <p class="project-title">Nominal Reader</p>
        <p>Simple browser-based ebook reader, but more feature-focused!</p>
        <a href="nominal.cbls.dev" target="_blank">[Visit]</a> <a href="https://github.com/c1bles/nominal-reader" target="_blank">[GitHub]</a>
    </li>
    <li>
        <p class="project-title">T3RM1N4L (what this website is based on!!)</p>
        <p>A clean, modern and intuitive terminal-styled portfolio made with javascript.</p>
        <a href="https://t3rm1n4l.vercel.app/" target="_blank">[Live Demo]</a> <a href="https://github.com/c1bles/T3RM1N4L/" target="_blank">[GitHub]</a>
    </li>
    <li>
        <p class="project-title">ChibiDock</p>
        <p>Barebones comic reader made in html for website integration.</p>
        <a href="https://chibidock.vercel.app/" target="_blank">[Live Demo]</a> <a href="https://github.com/c1bles/ChibiDock" target="_blank">[GitHub]</a>
    </li>
</ul>
    `,
    find-me: `
some of my accs! (too lazy to put them all)

Email: <a href="mailto:contact@cbls.dev">contact@cbls.dev</a>
GitHub: <a href="https://github.com/c1bles" target="_blank">github.com/c1bles</a>
Discord: <a href="https://discordid.netlify.app/?id=770202003572785162" target="_blank">my discord account</a>
Twitter/X: <a href="https://x.com/@c1bles">https://x.com/@c1bles</a>
MyAnimeList: <a href="https://myanimelist.net/profile/cibles">https://myanimelist.net/profile/cibles</a>

Minecraft: <a href="https://namemc.com/profile/Cibles.5">Cibles</a>
Roblox: <a href="https://namemc.com/profile/Cibles.5">Cibles</a>
Steam: <a href="https://steamcommunity.com/profiles/c1bles">https://steamcommunity.com/profiles/c1bles</a>

    `,
};

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        isLightTheme = true;
        localStorage.setItem('portfolioTheme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        isLightTheme = false;
        localStorage.setItem('portfolioTheme', 'dark');
    }
}

function toggleTheme() {
    applyTheme(isLightTheme ? 'dark' : 'light');
}

function handleThemeCommand(args) {
    const theme = args[0];
    if (theme === 'light' || theme === 'dark') {
        applyTheme(theme);
        print(`Theme set to ${theme}.`);
    } else {
        print(`Usage: theme [light|dark]`);
    }
}

function printWelcomeMessage() {
    const welcome = `
welcome to my peak website!!!! :3
i'd recommend starting with the 'about' command
use 'help' to get a list of all of the available commands
    `;
    print(welcome);
}

function print(message) {
    const p = document.createElement('div');
    p.innerHTML = message;
    output.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;
}

function handleCommand(e) {
    if (e.key === 'Enter') {
        const fullCommand = input.value.trim().toLowerCase();
        input.value = '';

        if (fullCommand) {
            print(`<span class="prompt">&gt;</span> <span class="command-echo">${fullCommand}</span>`);
            const [command, ...args] = fullCommand.split(/\s+/);

            if (command === 'clear') {
                output.innerHTML = '';
            } else if (command === 'theme') {
                handleThemeCommand(args);
            } else if (commands[command]) {
                print(commands[command]);
            } else {
                print(`Command not found: ${command}. Type 'help' for a list of commands.`);
            }
        }
    }
}

// Focus the input when the terminal is clicked
terminal.addEventListener('click', () => {
    input.focus();
});

// Handle keydown events for commands
input.addEventListener('keydown', handleCommand);

// Handle theme switcher click
themeSwitcher.addEventListener('click', toggleTheme);

// Initial setup
const savedTheme = localStorage.getItem('portfolioTheme') || 'dark';
applyTheme(savedTheme);
printWelcomeMessage();
input.focus();
