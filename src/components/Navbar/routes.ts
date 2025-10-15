const navigationLinks = [
  { href: '/', label: 'Novidades' },
  {
    label: 'Conta',
    submenu: true,
    type: 'description',
    items: [
      {
        href: '/account/create',
        label: 'Criar conta',
        description: 'Crie uma conta para começar.',
      },
      {
        href: '/account/login',
        label: 'Acessar conta',
        description: 'Faça login na sua conta.',
      },
      {
        href: '#',
        label: 'Recuperar conta',
        description: 'Recupere sua conta se você esqueceu sua senha.',
      },
    ],
  },
  {
    label: 'Comunidade',
    submenu: true,
    type: 'description',
    items: [
      {
        href: '/community/characters',
        label: 'Buscar jogador',
        description: 'Navegue por todos os jogadores da comunidade.',
      },
      {
        href: '/community/downloads',
        label: 'Downloads',
        description: 'Baixar clientes e ferramentas',
      },
      {
        href: '/community/guilds',
        label: 'Guilds',
        description: 'Encontre e junte-se a guildas.',
      },
      {
        href: '/community/highscores',
        label: 'Rankings',
        description: 'Veja os melhores jogadores do servidor.',
      },
      {
        href: '/community/systems',
        label: 'Sistemas',
        description: 'Explore os sistemas e mecânicas do jogo.',
      },
      {
        href: '/community/who-is-live',
        label: 'Quem está ao vivo',
        description: 'Veja quem está jogando agora.',
      },
      {
        href: '/community/who-is-dead',
        label: 'Quem está morto',
        description: 'Veja quem morreu recentemente.',
      },
    ],
  },
  {
    label: 'Gameplay',
    submenu: true,
    type: 'simple',
    items: [
      { href: '/gameplay/events', label: 'Eventos' },
      { href: '/gameplay/quests', label: 'Quests' },
      { href: '/gameplay/raids', label: 'Raids' },
      { href: '/gameplay/tasks', label: 'Tarefas' },
      { href: '/gameplay/missions', label: 'Missões' },
      { href: '/gameplay/items', label: 'Itens' },
      { href: '/gameplay/monsters', label: 'Monstros' },
      { href: '/gameplay/techniques', label: 'Técnicas' },
      { href: '/gameplay/vocations', label: 'Vocações' },
    ],
  },
  {
    label: 'Servidor',
    submenu: true,
    type: 'simple',
    items: [
      { href: '/server/changelog', label: 'Atualizações' },
      { href: '/server/server-info', label: 'Informações do servidor' },
      { href: '/server/team', label: 'Equipe' },
    ],
  },
  {
    label: 'Shopping',
    submenu: true,
    type: 'simple',
    items: [
      { href: '/shop/showcase', label: 'Vitrine' },
      { href: '/shop/bazar', label: 'Bazar' },
      { href: '/shop/buy-points', label: 'Comprar Pontos' },
      { href: '/shop/market', label: 'Mercado' },
    ],
  },
];

export { navigationLinks };
