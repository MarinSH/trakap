export const CONFIG_TECH_STACK = [
  'ANGULAR',
  'ANT_DESIGN',
  'AWS',
  'BABEL',
  'BOOTSTRAP',
  'BULMA',
  'C#',
  'C++',
  'CI/CD',
  'CLOUD',
  'CLOUD_FUNCTIONS',
  'CODEIGNITER',
  'COMPOSER',
  'CYPRESS',
  'DOCKER',
  'DOCKER_COMPOSE',
  'DOCTRINE',
  'DART',
  'ELASTICSEARCH',
  'ES6',
  'ESLINT',
  'FIREBASE',
  'FLASK',
  'FLUTTER',
  'FLOWS',
  'GIT',
  'GITLAB_CI',
  'GITHUB',
  'GRAPHIQL',
  'GRUNT',
  'GSAP',
  'HTML5',
  'JAVA',
  'JAVASCRIPT',
  'JEST',
  'JIRA',
  'JQUERY',
  'JUPYTER',
  'JUPYTER_NOTEBOOK',
  'KAFKA',
  'KOTLIN',
  'KUBERNETES',
  'LARAVEL',
  'MATHEMATICA',
  'MATERIAL_UI',
  'MERN_STACK',
  'MOCHA',
  'MONOLOG',
  'MONOREPOS',
  'MONGO_ATLAS',
  'MONGODB',
  'MYSQL',
  'NGINX',
  'NEXTAUTH',
  'NEXTJS',
  'NODEJS',
  'NPM',
  'NPM_SCRIPTS',
  'NEXUS',
  'PERL',
  'PHP',
  'PHPUNIT',
  'POSTGRESQL',
  'PRISMA',
  'PWA',
  'PYTHON',
  'RAILSVIEWS',
  'REACT',
  'REACT_NATIVE',
  'REACT_QUERY',
  'REDIS',
  'RUBY',
  'RUBY_ON_RAILS',
  'RUST',
  'SERVERLESS',
  'SLIM',
  'SPRING',
  'SQL',
  'SASS',
  'SENTRY',
  'SOLR',
  'STORYBOOK',
  'SYMFONY',
  'TAILWINDCSS',
  'TDD',
  'TENSORFLOW',
  'TERRAFORM',
  'TYPEORM',
  'TYPESCRIPT',
  'VAGRANT',
  'VUEJS',
  'VUEX',
  'WEBPACK',
  'YARN',
  'ZEND_FRAMEWORK',
];

export const CONFIG_REMOTE_WORK = [
    { 
      value: 'ONSITE', 
      label: 'Pas de télétravail',
    },
    { 
      value: 'ONEDAY', 
      label: '1 jour de télétravail',
    },
    { 
      value: 'TWODAY', 
      label: '2 jours de télétravail',
    },
    { 
      value: 'THREEDAY', 
      label: '3 jours de télétravail',
    },
    { 
      value: 'FOURDAY', 
      label: '4 jours de télétravail', 
    },
    { 
      value: 'ALLDAY', 
      label: 'Télétravail complet', 
    },
    { 
      value: 'NONE', 
      label: '' 
    },
  ];
  
  export const REMOTE_MAP = {
    ONSITE: 0,
    ONEDAY: 1,
    TWODAY: 2,
    THREEDAY: 3,
    FOURDAY: 4,
    ALLDAY: 5,
    NONE: 1
  };

  export const STATUS_LABELS = {
    SENDING: 'Envoyé',
    INTERVIEW: 'Contacté',
    PENDING:  'Attente',
    REJECTED:  'Refusé',
    ACCEPTED: 'Accepté',
};

export const CONTRACT_TYPES = [
  { value: 'CDI', label: 'CDI' },
  { value: 'CDD', label: 'CDD' },
  { value: 'Alternance', label: 'Alternance' },
];

export const SCHEDULE_TYPES = [
  { value: 'FLEXIBLE', label: 'Flexible' },
  { value: 'FIXED', label: 'Fixe' },
  { value: 'NONE', label: 'Sans information' },
];

export const FEELING_TYPES = [
  { value: 'BAD', label: '🔴' },
  { value: 'MIDDLE', label: '🟠' },
  { value: 'GOOD', label: '🟢' },
  { value: 'NEUTRAL', label: '⚪' },
];
