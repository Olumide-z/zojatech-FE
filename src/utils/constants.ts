import type { Contact, Message } from "@/components/messages/types";

export interface NavItem {
  to: string;
  label: string;
  icon: string;
  activeIcon?: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    to: '/portfolio',
    label: 'My Portfolio',
    icon: '/assets/portfolio.svg',
    activeIcon: '/assets/portfolio-active.svg',
  },
  {
    to: '/group',
    label: 'My Group',
    icon: '/assets/group.svg',
    activeIcon: '/assets/group.svg',
  },
  {
    to: '/messages',
    label: 'Messages',
    icon: '/assets/message-sidebar.svg',
    activeIcon: '/assets/message-sidebar-active.svg',
  },
  {
    to: '/analytics',
    label: 'Analytics',
    icon: '/assets/analytics.svg',
    activeIcon: '/assets/analytics.svg',
  },
  {
    to: '/pack',
    label: 'Pack',
    icon: '/assets/dollar coin.svg',
    activeIcon: '/assets/dollar coin.svg',
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: '/assets/Setting.svg',
    activeIcon: '/assets/Setting.svg',
  },
];


export const DEFAULT_CONTACTS: Contact[] = [
  {
    id: 'lisa',
    name: 'Lisa Roy',
    title: 'Project Lead',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    status: 'online',
    unreadCount: 0,
    lastMessageTime: '10:35 AM'
  },
  {
    id: 'jamie',
    name: 'Jamie Taylor',
    title: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'offline',
    unreadCount: 3,
    lastMessageTime: '10:35 AM'
  },
  {
    id: 'jason',
    name: 'Jason Roy',
    title: 'Product Owner',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    status: 'offline',
    unreadCount: 0,
    lastMessageTime: '10:35 AM'
  },
  {
    id: 'amy',
    name: 'Amy Frost',
    title: 'Marketing Specialist',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    status: 'online',
    unreadCount: 0,
    lastMessageTime: '10:35 AM'
  },
  {
    id: 'paul',
    name: 'Paul Wilson',
    title: 'QA Engineer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    status: 'offline',
    unreadCount: 0,
    lastMessageTime: '10:35 AM'
  },
  {
    id: 'ana',
    name: 'Ana Williams',
    title: 'Data Analyst',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    status: 'online',
    unreadCount: 1,
    lastMessageTime: '10:35 AM'
  }
];

export const DEFAULT_MESSAGES: Record<string, Message[]> = {
  lisa: [
    {
      id: 'l1',
      senderId: 'lisa',
      text: 'Hi David, have you got the project report pdf?',
      timestamp: 'Yesterday 10:30 AM',
      isRead: true
    },
    {
      id: 'l2',
      senderId: 'me',
      text: 'NO. I did not get it',
      timestamp: 'Yesterday 10:31 AM',
      isRead: true
    },
    {
      id: 'l3',
      senderId: 'lisa',
      text: 'Ok, I will just sent it here. Plz be sure to fill the details by today end of the day.',
      timestamp: 'Yesterday 10:32 AM',
      isRead: true
    },
    {
      id: 'l4',
      senderId: 'lisa',
      timestamp: 'Yesterday 10:32 AM',
      attachment: {
        name: 'project_report.pdf',
        type: 'pdf',
        size: '2.4 MB'
      },
      isRead: true
    },
    {
      id: 'l5',
      senderId: 'me',
      text: 'Ok. Should I send it over email as well after filling the details.',
      timestamp: 'Yesterday 10:33 AM',
      isRead: true
    },
    {
      id: 'l6',
      senderId: 'lisa',
      text: "Ya. I'll be adding more team members to it.",
      timestamp: 'Yesterday 10:34 AM',
      isRead: true
    },
    {
      id: 'l7',
      senderId: 'me',
      text: 'OK',
      timestamp: '10:35 AM',
      isRead: true
    }
  ],
  jamie: [
    {
      id: 'jm1',
      senderId: 'jamie',
      text: 'Hey David! Did you check out the new design drafts for the dashboard?',
      timestamp: 'Yesterday 3:15 PM',
      isRead: false
    },
    {
      id: 'jm2',
      senderId: 'me',
      text: 'Not yet, Jamie. Are they on Figma?',
      timestamp: 'Yesterday 3:20 PM',
      isRead: true
    },
    {
      id: 'jm3',
      senderId: 'jamie',
      text: 'Yes, I uploaded them in the Figma project space. Nice One. Will Do it tomorrow',
      timestamp: '10:35 AM',
      isRead: false
    }
  ],
  jason: [
    {
      id: 'js1',
      senderId: 'jason',
      text: 'Hi David, when can we schedule the review for the registration endpoint?',
      timestamp: 'Monday 2:10 PM',
      isRead: true
    },
    {
      id: 'js2',
      senderId: 'me',
      text: "Hey Jason, I'm working on the timeout issue. Let's do it tomorrow morning.",
      timestamp: 'Monday 2:15 PM',
      isRead: true
    },
    {
      id: 'js3',
      senderId: 'jason',
      text: "That's Great. I am Looking forward to having a great start.",
      timestamp: '10:35 AM',
      isRead: true
    }
  ],
  amy: [
    {
      id: 'a1',
      senderId: 'amy',
      text: 'Hi, will you start working on the chat app right now?',
      timestamp: 'Yesterday 5:00 PM',
      isRead: true
    },
    {
      id: 'a2',
      senderId: 'me',
      text: 'Yes Amy, starting the frontend structure using Tailwind!',
      timestamp: 'Yesterday 5:10 PM',
      isRead: true
    },
    {
      id: 'a3',
      senderId: 'amy',
      text: "Hi, will you start working on the chat app right now?",
      timestamp: '10:35 AM',
      isRead: true
    }
  ],
  paul: [
    {
      id: 'p1',
      senderId: 'paul',
      text: 'Hey buddy! All tests passed on staging. Good work!',
      timestamp: 'Yesterday 6:30 PM',
      isRead: true
    },
    {
      id: 'p2',
      senderId: 'me',
      text: 'Awesome Paul! Thanks for double checking everything.',
      timestamp: 'Yesterday 6:40 PM',
      isRead: true
    },
    {
      id: 'p3',
      senderId: 'paul',
      text: 'See you tomorrow champ',
      timestamp: '10:35 AM',
      isRead: true
    }
  ],
  ana: [
    {
      id: 'an1',
      senderId: 'ana',
      text: 'Hey, do you have the spreadsheet for the user analytics?',
      timestamp: 'Monday 11:00 AM',
      isRead: true
    },
    {
      id: 'an2',
      senderId: 'me',
      text: 'Yes, sending it over shortly.',
      timestamp: 'Monday 11:05 AM',
      isRead: true
    },
    {
      id: 'an3',
      senderId: 'ana',
      text: '??',
      timestamp: '10:35 AM',
      isRead: false
    }
  ]
};


export const BOT_RESPONSES: Record<string, string[]> = {
  lisa: [
    "Perfect! Let me know when you've reviewed the PDF.",
    "Awesome. I will share this with the stakeholders.",
    "Great! Let me check on the team calendar.",
    "Sure thing! Talk to you soon.",
    "Exactly. I'll get back to you with the details."
  ],
  jamie: [
    "Awesome! Let me know if you need any adjustments in the layout.",
    "Great. I will adjust the padding and fonts accordingly.",
    "Glad you like the mockups. I'll update Figma now.",
    "Sounds good! Let's check in tomorrow."
  ],
  jason: [
    "Got it! Keep up the good work on the registration flow.",
    "Excellent! Let me know once you find the endpoint timeout fix.",
    "Great! I will update the timeline on Jira.",
    "Perfect, thanks David!"
  ],
  amy: [
    "Sounds good, let's keep going!",
    "Great! Can you show me a screenshot of the responsive layout?",
    "Fabulous work. Let's touch base at the standup.",
    "Thanks! I'll update the marketing materials."
  ],
  paul: [
    "Superb! See you later.",
    "Indeed! Let me know if any other QA issue pops up.",
    "Awesome. Thanks for the quick fix!",
    "You got it, champ!"
  ],
  ana: [
    "Thanks so much, appreciate the help!",
    "Got the analytics, looking brilliant!",
    "Wonderful, I'll compile this into the final report.",
    "Thanks! Talk to you later."
  ]
};
