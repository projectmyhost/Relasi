import { EventEmitter } from 'events';

export interface ChatMessagePayload {
  id: string;
  reportId: string;
  sender: 'student' | 'counselor';
  senderName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface CounselorNotificationPayload {
  reportId: string;
  senderName: string;
  contentSnippet: string;
  timestamp: string;
}

export interface ChatTypingPayload {
  type: 'typing';
  reportId: string;
  senderRole: 'student' | 'counselor';
  senderName: string;
  isTyping: boolean;
}

export interface ChatReadPayload {
  type: 'read';
  reportId: string;
  readerRole: 'student' | 'counselor';
  timestamp: string;
}

class ChatEventEmitter extends EventEmitter {}

const globalForEmitter = globalThis as unknown as {
  chatEmitter: ChatEventEmitter | undefined;
};

export const chatEmitter = globalForEmitter.chatEmitter ?? new ChatEventEmitter();
chatEmitter.setMaxListeners(100);

if (process.env.NODE_ENV !== 'production') {
  globalForEmitter.chatEmitter = chatEmitter;
}
