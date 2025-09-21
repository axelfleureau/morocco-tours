// Unified Design System for Morocco Dreams
export const designSystem = {
  // Color Palette
  colors: {
    // Primary brand colors
    primary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316', // Main orange
      600: '#ea580c', // Brand primary
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    secondary: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626', // Brand secondary
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    accent: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    success: {
      50: '#f0fdf4',
      500: '#22c55e',
      600: '#16a34a',
    },
    warning: {
      50: '#fffbeb',
      500: '#f59e0b',
      600: '#d97706',
    },
    error: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626',
    }
  },

  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Playfair Display', 'Georgia', 'serif'],
      mono: ['Fira Code', 'Monaco', 'monospace'],
      arabic: ['Noto Sans Arabic', 'Arial', 'sans-serif']
    },
    fontSize: {
      xs: ['12px', { lineHeight: '16px' }],
      sm: ['14px', { lineHeight: '20px' }],
      base: ['16px', { lineHeight: '24px' }],
      lg: ['18px', { lineHeight: '28px' }],
      xl: ['20px', { lineHeight: '28px' }],
      '2xl': ['24px', { lineHeight: '32px' }],
      '3xl': ['30px', { lineHeight: '36px' }],
      '4xl': ['36px', { lineHeight: '40px' }],
      '5xl': ['48px', { lineHeight: '1' }],
      '6xl': ['60px', { lineHeight: '1' }],
      '7xl': ['72px', { lineHeight: '1' }],
    },
    fontWeight: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    }
  },

  // Spacing
  spacing: {
    px: '1px',
    0: '0px',
    0.5: '2px',
    1: '4px',
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '44px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
    36: '144px',
    40: '160px',
    44: '176px',
    48: '192px',
    52: '208px',
    56: '224px',
    60: '240px',
    64: '256px',
    72: '288px',
    80: '320px',
    96: '384px',
  },

  // Border Radius
  borderRadius: {
    none: '0px',
    sm: '2px',
    DEFAULT: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px',
  },

  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',
  },

  // Animation
  animation: {
    none: 'none',
    spin: 'spin 1s linear infinite',
    ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    bounce: 'bounce 1s infinite',
    fadeIn: 'fadeIn 0.5s ease-in-out',
    slideUp: 'slideUp 0.3s ease-out',
    slideDown: 'slideDown 0.3s ease-out',
    scaleIn: 'scaleIn 0.2s ease-out',
  },

  // Breakpoints
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Component Patterns
  components: {
    // Button variants
    button: {
      base: 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      sizes: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl',
      },
      variants: {
        primary: 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 focus:ring-orange-500',
        secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-500',
        outline: 'border-2 border-orange-600 text-orange-600 hover:bg-orange-50 focus:ring-orange-500',
        ghost: 'text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-500',
        cta: 'bg-gradient-to-br from-orange-500 via-red-500 to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-orange-500',
      }
    },

    // Card variants
    card: {
      base: 'bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden',
      variants: {
        default: 'hover:shadow-md transition-shadow duration-200',
        elevated: 'shadow-lg hover:shadow-xl transition-shadow duration-200',
        interactive: 'hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer',
        travel: 'hover:shadow-lg transition-all duration-300 group',
      }
    },

    // Input variants
    input: {
      base: 'block w-full rounded-lg border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500',
      sizes: {
        sm: 'px-2.5 py-1.5 text-sm',
        md: 'px-3 py-2 text-base',
        lg: 'px-4 py-3 text-lg',
      },
      states: {
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
        success: 'border-green-500 focus:border-green-500 focus:ring-green-500',
        disabled: 'bg-neutral-100 cursor-not-allowed opacity-50',
      }
    },

    // Modal
    modal: {
      overlay: 'fixed inset-0 bg-black bg-opacity-50 z-40',
      container: 'fixed inset-0 z-50 flex items-center justify-center p-4',
      content: 'bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden',
      header: 'px-6 py-4 border-b border-neutral-200',
      body: 'px-6 py-4 overflow-y-auto',
      footer: 'px-6 py-4 border-t border-neutral-200 flex justify-end space-x-3',
    },

    // Navigation
    nav: {
      primary: 'bg-white/95 backdrop-blur-sm border-b border-neutral-200 sticky top-0 z-30',
      mobile: 'bg-white border-r border-neutral-200 shadow-lg',
      link: 'text-neutral-700 hover:text-orange-600 px-3 py-2 rounded-lg transition-colors duration-200',
      activeLink: 'text-orange-600 bg-orange-50 px-3 py-2 rounded-lg',
    },

    // Status indicators
    badge: {
      base: 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
      variants: {
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800',
        info: 'bg-blue-100 text-blue-800',
        neutral: 'bg-neutral-100 text-neutral-800',
        primary: 'bg-orange-100 text-orange-800',
      }
    }
  },

  // Layout Utilities
  layout: {
    container: 'mx-auto px-4 sm:px-6 lg:px-8',
    maxWidth: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
      full: 'max-w-full',
    },
    section: 'py-12 lg:py-16',
    grid: {
      responsive: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
      travel: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8',
      features: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
    }
  },

  // Moroccan-specific elements
  moroccan: {
    patterns: {
      geometric: 'bg-gradient-to-br from-orange-500/10 to-red-500/10',
      arabesque: 'bg-gradient-to-r from-orange-100/50 to-red-100/50',
      zellige: 'bg-gradient-to-r from-teal-500/20 to-blue-500/20',
    },
    colors: {
      terracotta: '#cc6633',
      saffron: '#f4c430',
      henna: '#a0522d',
      berber: '#8b4513',
      atlantic: '#4682b4',
      desert: '#daa520',
    }
  }
};

// CSS-in-JS utility functions
export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Theme utilities
export const getColorValue = (colorPath: string) => {
  const path = colorPath.split('.');
  let value: any = designSystem.colors;
  
  for (const key of path) {
    value = value[key];
    if (!value) return null;
  }
  
  return value;
};

// Responsive utilities
export const responsive = {
  mobile: (styles: string) => `@media (max-width: 767px) { ${styles} }`,
  tablet: (styles: string) => `@media (min-width: 768px) and (max-width: 1023px) { ${styles} }`,
  desktop: (styles: string) => `@media (min-width: 1024px) { ${styles} }`,
};

// Animation keyframes for CSS
export const keyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes slideDown {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes scaleIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  @keyframes moroccanGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(234, 88, 12, 0.3); }
    50% { box-shadow: 0 0 30px rgba(234, 88, 12, 0.6); }
  }
`;

export default designSystem;