const globalStatusStorage = globalThis as unknown as {
  userStatusMap: Map<string, 'active' | 'inactive'> | undefined;
};

export const userStatusMap = globalStatusStorage.userStatusMap ?? new Map<string, 'active' | 'inactive'>();

if (process.env.NODE_ENV !== 'production') {
  globalStatusStorage.userStatusMap = userStatusMap;
}
