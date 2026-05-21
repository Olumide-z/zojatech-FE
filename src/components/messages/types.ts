export interface Attachment {
  name: string;
  type: 'pdf' | 'image' | 'doc';
  size: string;
  previewUrl?: string;
}

export interface Message {
  id: string;
  senderId: 'me' | string; // "me" for self, or contact's ID
  text?: string;
  timestamp: string;
  attachment?: Attachment;
  isRead?: boolean;
}

export interface Contact {
  id: string;
  name: string;
  title: string;
  avatar: string;
  status: 'online' | 'offline';
  unreadCount: number;
  lastMessageTime: string;
}

export interface Profile {
  name: string;
  title: string;
  avatar: string;
}
