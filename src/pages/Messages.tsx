import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Edit2,
  Heart,
  Bell,
  ChevronLeft
} from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';

import type { Attachment, Message, Contact, Profile } from '../components/messages/types';
import { ProfileEditModal } from '../components/messages/ProfileEditModal';
import { ChatListItem } from '../components/messages/ChatListItem';
import { MessageBubble } from '../components/messages/MessageBubble';
import { VoiceRecorderOverlay } from '../components/messages/VoiceRecorderOverlay';
import { AttachmentDropdown } from '../components/messages/AttachmentDropdown';
import { ChatInputBar } from '../components/messages/ChatInputBar';
import { BOT_RESPONSES, DEFAULT_CONTACTS, DEFAULT_MESSAGES } from '@/utils/constants';


export const Messages: React.FC = () => {

  // Local profile state
  const [currentUser, setCurrentUser] = useState<Profile>({
    name: 'David Peters',
    title: 'Senior Developer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'
  });
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // Active chat & contacts list
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactId, setSelectedContactId] = useState<string>('lisa');
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>({});

  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState('');

  // Input fields & overlays state
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  // Interactive Simulator status
  const [typingContactId, setTypingContactId] = useState<string | null>(null);

  // Mobile Navigation
  const [mobileShowChat, setMobileShowChat] = useState(false);

  // Ref hooks
  const recordingTimerRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // 1. Load Profile
    const storedProfile = localStorage.getItem('chat_profile');
    if (storedProfile) {
      try {
        setCurrentUser(JSON.parse(storedProfile));
      } catch (e) {
        console.error(e);
      }
    }

    // 2. Load Contacts & Messages
    const storedContacts = localStorage.getItem('chat_contacts');
    const storedMessages = localStorage.getItem('chat_messages');

    if (storedContacts && storedMessages) {
      try {
        setContacts(JSON.parse(storedContacts));
        setMessagesMap(JSON.parse(storedMessages));
      } catch (e) {
        console.error(e);
        initializeDefaultData();
      }
    } else {
      initializeDefaultData();
    }
  }, []);

  const initializeDefaultData = () => {
    localStorage.setItem('chat_contacts', JSON.stringify(DEFAULT_CONTACTS));
    localStorage.setItem('chat_messages', JSON.stringify(DEFAULT_MESSAGES));
    setContacts(DEFAULT_CONTACTS);
    setMessagesMap(DEFAULT_MESSAGES);
  };

  // Helper to persist data
  const persistState = (newContacts: Contact[], newMessagesMap: Record<string, Message[]>) => {
    localStorage.setItem('chat_contacts', JSON.stringify(newContacts));
    localStorage.setItem('chat_messages', JSON.stringify(newMessagesMap));
    setContacts(newContacts);
    setMessagesMap(newMessagesMap);
  };

  // Scroll to bottom helper
  const scrollToBottom = (behavior: 'smooth' | 'auto' = 'smooth') => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior });
    }
  };

  // Auto-scroll when selected contact changes, or messages count changes
  useEffect(() => {
    setTimeout(() => scrollToBottom('auto'), 50);
  }, [selectedContactId]);

  useEffect(() => {
    scrollToBottom('smooth');
  }, [messagesMap, typingContactId]);

  // Voice recording mock timer
  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      setRecordingSeconds(0);
    }

    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording]);

  const formatRecordingTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };


  // Select Contact & Clear Unread Badge
  const handleSelectContact = (contactId: string) => {
    setSelectedContactId(contactId);
    setMobileShowChat(true);

    const updatedContacts = contacts.map((c) => {
      if (c.id === contactId) {
        return { ...c, unreadCount: 0 };
      }
      return c;
    });

    persistState(updatedContacts, messagesMap);
  };

  // Send Message
  const handleSendMessage = (textToSend?: string, attachmentToSend?: Attachment) => {
    const content = textToSend || inputText;
    if (!content.trim() && !attachmentToSend) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      text: content.trim() ? content : undefined,
      timestamp: timeString,
      attachment: attachmentToSend,
      isRead: true
    };

    const currentChatMsgs = messagesMap[selectedContactId] || [];
    const updatedMessages = [...currentChatMsgs, newMessage];
    const newMessagesMap = {
      ...messagesMap,
      [selectedContactId]: updatedMessages
    };

    // Update contacts list last message details
    const updatedContacts = contacts.map((c) => {
      if (c.id === selectedContactId) {
        return {
          ...c,
          lastMessageTime: timeString
        };
      }
      return c;
    });

    persistState(updatedContacts, newMessagesMap);
    setInputText('');
    setShowEmojiPicker(false);

    // Trigger Smart Bot Reply Simulator
    triggerBotReply(selectedContactId, newMessagesMap, updatedContacts);
  };

  // Smart Bot Reply Logic
  const triggerBotReply = (
    contactId: string,
    currentMsgsMap: Record<string, Message[]>,
    currentContacts: Contact[]
  ) => {
    // Show typing state
    setTypingContactId(contactId);

    const delay = 1500 + Math.random() * 1000;
    setTimeout(() => {
      const pool = BOT_RESPONSES[contactId] || ["That sounds wonderful!", "I'll review this and let you know.", "Let me look into it."];
      const randomIndex = Math.floor(Math.random() * pool.length);
      const botText = pool[randomIndex];

      const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const botMessage: Message = {
        id: `msg-bot-${Date.now()}`,
        senderId: contactId,
        text: botText,
        timestamp: timeString,
        isRead: false
      };

      const updatedChatMsgs = [...(currentMsgsMap[contactId] || []), botMessage];
      const newMessagesMap = {
        ...currentMsgsMap,
        [contactId]: updatedChatMsgs
      };

      const updatedContacts = currentContacts.map((c) => {
        if (c.id === contactId) {
          return {
            ...c,
            lastMessageTime: timeString,
            unreadCount: selectedContactId === contactId ? 0 : c.unreadCount + 1
          };
        }
        return c;
      });

      setTypingContactId(null);
      persistState(updatedContacts, newMessagesMap);
    }, delay);
  };

  // Mock Voice Recording Send
  const handleSendVoiceMock = () => {
    if (isRecording) {
      setIsRecording(false);
      const voiceDuration = formatRecordingTime(recordingSeconds);

      const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        senderId: 'me',
        text: `🎤 Voice Message (${voiceDuration})`,
        timestamp: timeString,
        isRead: true
      };

      const currentChatMsgs = messagesMap[selectedContactId] || [];
      const newMessagesMap = {
        ...messagesMap,
        [selectedContactId]: [...currentChatMsgs, newMessage]
      };

      const updatedContacts = contacts.map((c) => {
        if (c.id === selectedContactId) {
          return { ...c, lastMessageTime: timeString };
        }
        return c;
      });

      persistState(updatedContacts, newMessagesMap);
      triggerBotReply(selectedContactId, newMessagesMap, updatedContacts);
    } else {
      setIsRecording(true);
    }
  };


  // Edit Profile Submit
  const handleSaveProfile = (updated: Profile) => {
    setCurrentUser(updated);
    localStorage.setItem('chat_profile', JSON.stringify(updated));
    setIsEditProfileModalOpen(false);
  };


  // Append Emoji to Input text
  const handleQuickEmojiClick = (emoji: string) => {
    setInputText((prev) => prev + emoji);
  };


  const filteredContacts = contacts.filter((c) => {
    const query = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(query) ||
      c.title.toLowerCase().includes(query)
    );
  });

  const activeContact = contacts.find((c) => c.id === selectedContactId) || DEFAULT_CONTACTS[0];
  const activeChatMessages = messagesMap[selectedContactId] || [];

  return (
    <DashboardLayout title="Messages">
      <div className="flex bg-white rounded-[24px] border border-[#DDE2E4]/60 h-[calc(100vh-140px)] min-h-[550px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.015)] animate-fade-in font-lexend relative">

        <div className={`
          ${mobileShowChat ? 'hidden' : 'flex'} 
          md:flex flex-col w-full md:w-[350px] border-r border-[#E9E9EB]/80 shrink-0 bg-white
        `}>
          {/* Header: User Info Card */}
          <div className="p-4 border-b border-[#E9E9EB]/60 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-100">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';
                  }}
                />
              </div>
              <div className="text-left">
                <h4 className="text-[14px] font-semibold text-body-black leading-tight">{currentUser.name}</h4>
                <p className="text-[12px] text-body-grey leading-tight mt-0.5">{currentUser.title}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditProfileModalOpen(true)}
              className="p-1.5 rounded-xl text-body-grey hover:bg-slate-100 hover:text-primary transition-all duration-200 cursor-pointer"
              title="Edit Profile"
              type="button"
            >
              <Edit2 size={15} />
            </button>
          </div>

          {/* Search Contacts */}
          <div className="p-3">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-body-grey pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search Here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F4F6F8]/80 pl-9 pr-4 py-2.5 rounded-[12px] text-[13px] text-body-black placeholder-[#818187] border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-body-grey hover:text-body-black text-[11px] font-medium"
                  type="button"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Contact Lists */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#F1F3F4]/60 px-2 pb-4">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => {
                const isSelected = contact.id === selectedContactId;
                const chatMsgs = messagesMap[contact.id] || [];
                const lastMsg = chatMsgs[chatMsgs.length - 1];

                let previewText = '';
                if (lastMsg) {
                  if (lastMsg.attachment) {
                    previewText = `📁 Attachment: ${lastMsg.attachment.name}`;
                  } else {
                    previewText = lastMsg.text || '';
                  }
                } else {
                  previewText = 'No messages yet';
                }

                return (
                  <ChatListItem
                    key={contact.id}
                    contact={contact}
                    isSelected={isSelected}
                    previewText={previewText}
                    onSelect={handleSelectContact}
                  />
                );
              })
            ) : (
              <div className="text-center py-8">
                <p className="text-[13px] text-body-grey font-sans select-none">No contacts found</p>
              </div>
            )}
          </div>
        </div>

        <div className={`
          ${mobileShowChat ? 'flex' : 'hidden'} 
          md:flex flex-col flex-1 bg-[#F8F9FB] relative overflow-hidden
        `}>

          {/* Active Chat Header */}
          <div className="h-16 px-4 md:px-6 border-b border-[#E9E9EB]/80 flex items-center justify-between bg-white shadow-[0_2px_8px_rgba(0,0,0,0.005)] z-10 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              {/* Back Button for Mobile View */}
              <button
                onClick={() => setMobileShowChat(false)}
                className="md:hidden p-1 mr-1 rounded-lg hover:bg-slate-100 text-body-grey hover:text-body-black transition-colors cursor-pointer shrink-0"
                type="button"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-100">
                  <img src={activeContact.avatar} alt={activeContact.name} className="w-full h-full object-cover" />
                </div>
                {activeContact.status === 'online' && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#4CAF50] border-2 border-white rounded-full" />
                )}
              </div>
              <div className="min-w-0">
                <h4 className="text-[14px] font-semibold text-body-black leading-none">{activeContact.name}</h4>
                <p className="text-[11px] text-body-grey mt-1 font-sans font-normal leading-none select-none">
                  {activeContact.status === 'online' ? 'Active now' : 'Offline'}
                </p>
              </div>
            </div>

            {/* Header Action Tools */}
            <div className="flex items-center gap-1.5">

              <button
                className="p-2 rounded-xl text-body-grey hover:bg-slate-100 hover:text-body-black transition-all duration-200 cursor-pointer"
                type="button"
              >
                <Heart size={15} />
              </button>
              <button
                className="p-2 rounded-xl text-body-grey hover:bg-slate-100 hover:text-body-black transition-all duration-200 cursor-pointer"
                type="button"
              >
                <Bell size={15} />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">

            {/* Seeding Date Separator */}
            <div className="flex items-center justify-center my-4 relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-[#E9E9EB]/60"></div>
              </div>
              <div className="relative bg-[#F8F9FB] px-4 select-none">
                <span className="text-[11px] font-medium text-body-grey font-sans tracking-wide">
                  Yesterday
                </span>
              </div>
            </div>

            {activeChatMessages.map((msg, index) => {
              const isMe = msg.senderId === 'me';

              const showTodayDivider = index > 0 &&
                !activeChatMessages[index - 1].timestamp.includes('Yesterday') &&
                msg.timestamp.includes('Yesterday') === false &&
                activeChatMessages[index - 1].timestamp.includes('Yesterday');

              return (
                <React.Fragment key={msg.id}>
                  {showTodayDivider && (
                    <div className="flex items-center justify-center my-4 relative">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-[#E9E9EB]/60"></div>
                      </div>
                      <div className="relative bg-[#F8F9FB] px-4 select-none">
                        <span className="text-[11px] font-medium text-body-grey font-sans tracking-wide">
                          Today
                        </span>
                      </div>
                    </div>
                  )}

                  <MessageBubble
                    msg={msg}
                    isMe={isMe}
                    contactAvatar={activeContact.avatar}
                    contactName={activeContact.name}
                    currentUserAvatar={currentUser.avatar}
                  />
                </React.Fragment>
              );
            })}

            {/* Smart Typing Indicator Simulation */}
            {typingContactId === selectedContactId && (
              <div className="flex items-start gap-3 justify-start animate-pulse">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-0.5 border border-slate-100 bg-slate-100">
                  <img src={activeContact.avatar} alt={activeContact.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <div className="px-4 py-3 rounded-2xl bg-white border border-[#E9E9EB]/65 rounded-tl-none flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[10px] text-body-grey font-sans mt-1.5 select-none">typing...</span>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Voice Recording Wave overlay */}
          <VoiceRecorderOverlay
            isRecording={isRecording}
            recordingSeconds={recordingSeconds}
            onCancel={() => setIsRecording(false)}
            onSend={handleSendVoiceMock}
          />

          {/* Attachment Quick Menu Popover */}
          <AttachmentDropdown
            isOpen={isAttachmentOpen}
            onClose={() => setIsAttachmentOpen(false)}
          />

          {/* Chat Messages Footer Input Bar */}
          <ChatInputBar
            inputText={inputText}
            onChangeText={setInputText}
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            isRecording={isRecording}
            onToggleRecording={handleSendVoiceMock}
            onToggleAttachment={() => setIsAttachmentOpen(!isAttachmentOpen)}
            onToggleEmojiPicker={() => setShowEmojiPicker(!showEmojiPicker)}
            showEmojiPicker={showEmojiPicker}
            onEmojiClick={handleQuickEmojiClick}
          />

        </div>

      </div>

      <ProfileEditModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        currentUser={currentUser}
        onSave={handleSaveProfile}
      />

    </DashboardLayout>
  );
};

export default Messages;
