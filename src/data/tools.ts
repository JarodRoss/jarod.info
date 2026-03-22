export interface Tool {
  name: string
  pkg: string
  icon: string
  version: string
  size: string
  desc: string
  deps: string[]
}

export const tools: Tool[] = [
  {
    name: 'VS Code',
    pkg: 'visual-studio-code-bin',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
    version: '1.96.2-1',
    size: '364.2 MiB',
    desc: 'Visual Studio Code (vscode): Editor of choice',
    deps: ['electron', 'nodejs', 'nss', 'libxkbfile'],
  },
  {
    name: 'Docker',
    pkg: 'docker',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    version: '1:27.5.1-1',
    size: '198.7 MiB',
    desc: 'Pack, ship and run any application as a lightweight container',
    deps: ['containerd', 'runc', 'libseccomp', 'iptables'],
  },
  {
    name: 'Vim',
    pkg: 'vim',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vim/vim-original.svg',
    version: '9.1.0-1',
    size: '34.8 MiB',
    desc: 'Vi Improved, a highly configurable text editor',
    deps: ['glibc', 'libgpm', 'acl', 'ncurses'],
  },
  {
    name: 'OpenVPN',
    pkg: 'openvpn',
    icon: 'https://cdn.simpleicons.org/openvpn/white',
    version: '2.6.12-1',
    size: '12.4 MiB',
    desc: 'An easy-to-use, robust VPN solution',
    deps: ['openssl', 'lzo', 'lz4', 'libsystemd'],
  },
  {
    name: 'MobaXterm',
    pkg: 'mobaxterm',
    icon: 'https://mobaxterm.mobatek.net/img/moba/xterm_logo.png',
    version: '24.4-1',
    size: '48.6 MiB',
    desc: 'Enhanced terminal for remote computing (wine)',
    deps: ['wine', 'xorg-server', 'libx11', 'cygwin'],
  },
  {
    name: 'HeidiSQL',
    pkg: 'heidisql',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
    version: '12.8.0-1',
    size: '52.3 MiB',
    desc: 'Lightweight database browser and editor',
    deps: ['wine', 'mariadb-libs', 'libssl', 'zlib'],
  },
  {
    name: 'Git',
    pkg: 'git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    version: '2.47.1-1',
    size: '45.2 MiB',
    desc: 'The fast distributed version control system',
    deps: ['curl', 'expat', 'openssl', 'perl'],
  },
  {
    name: 'Wireshark',
    pkg: 'wireshark-qt',
    icon: 'https://cdn.simpleicons.org/wireshark/white',
    version: '4.4.3-1',
    size: '78.9 MiB',
    desc: 'Network protocol analyzer',
    deps: ['qt6-base', 'glib2', 'libpcap', 'lua53'],
  },
]
