'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'guest' | 'student' | 'counselor' | 'super_admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  departmentOrClass?: string;
  avatar?: string;
}

export const PRESET_USERS: Record<UserRole, UserProfile> = {
  guest: {
    id: 'guest',
    name: 'Tamu / Siswa Anonim',
    email: '',
    role: 'guest',
    roleLabel: 'Tamu (Guest)',
  },
  student: {
    id: 'usr-student-1',
    name: 'Dimas Surya Pratama',
    email: 'murid@gmail.com',
    role: 'student',
    roleLabel: 'Siswa (Pelapor Terdaftar)',
    departmentOrClass: 'XI MIPA 2',
  },
  counselor: {
    id: 'usr-bk-1',
    name: 'Ibu Siti Rahmawati, S.Psi., M.Pd.',
    email: 'guru@gmail.com',
    role: 'counselor',
    roleLabel: 'Guru Bimbingan Konseling (BK)',
    departmentOrClass: 'Koordinator Unit BK & Tim PPKSP',
  },
  super_admin: {
    id: 'usr-admin-1',
    name: 'Administrator Super Panel',
    email: 'admin@gmail.com',
    role: 'super_admin',
    roleLabel: 'Super Admin Website & Sistem',
    departmentOrClass: 'Tata Kelola IT & Infrastruktur Satuan Pendidikan',
  },
};

interface AuthContextType {
  currentUser: UserProfile;
  login: (role: UserRole) => void;
  loginWithEmail: (email: string, password?: string) => UserRole;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: PRESET_USERS.guest,
  login: () => {},
  loginWithEmail: () => 'guest',
  logout: () => {},
  switchRole: () => {},
  isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(PRESET_USERS.guest);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('ruangsuara_user_profile');
      if (savedProfile) {
        setCurrentUser(JSON.parse(savedProfile));
      } else {
        const savedRole = localStorage.getItem('ruangsuara_active_role') as UserRole | null;
        if (savedRole && PRESET_USERS[savedRole]) {
          setCurrentUser(PRESET_USERS[savedRole]);
        }
      }
    } catch {
      // Ignore local storage error
    }
  }, []);

  const switchRole = (role: UserRole) => {
    const user = PRESET_USERS[role] || PRESET_USERS.guest;
    setCurrentUser(user);
    try {
      localStorage.setItem('ruangsuara_active_role', role);
    } catch {
      // Ignore
    }
  };

  const login = (role: UserRole) => {
    switchRole(role);
  };

  const loginWithEmail = (inputEmail: string, _password?: string): UserRole => {
    const trimmed = inputEmail.trim().toLowerCase();
    let targetRole: UserRole = 'student';

    if (trimmed === 'admin@gmail.com' || trimmed.includes('admin')) {
      targetRole = 'super_admin';
    } else if (trimmed === 'guru@gmail.com' || trimmed.includes('guru') || trimmed.includes('bk')) {
      targetRole = 'counselor';
    } else {
      targetRole = 'student';
    }

    const baseUser = PRESET_USERS[targetRole];
    const derivedName = trimmed && trimmed !== 'murid@gmail.com' && !trimmed.includes('guru') && !trimmed.includes('admin')
      ? trimmed.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
      : baseUser.name;
    const derivedId = trimmed && trimmed !== 'murid@gmail.com' && !trimmed.includes('guru') && !trimmed.includes('admin')
      ? `usr-${trimmed.replace(/[^a-z0-9]/g, '')}`
      : baseUser.id;

    const user: UserProfile = {
      ...baseUser,
      id: derivedId,
      name: derivedName,
      email: trimmed || baseUser.email,
    };

    setCurrentUser(user);
    try {
      localStorage.setItem('ruangsuara_active_role', targetRole);
      localStorage.setItem('ruangsuara_user_email', user.email);
      localStorage.setItem('ruangsuara_user_profile', JSON.stringify(user));
    } catch {
      // Ignore
    }

    if (trimmed && trimmed.includes('@')) {
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          role: user.role,
          roleLabel: user.roleLabel,
          departmentOrClass: user.departmentOrClass,
        }),
      }).catch(() => {});
    }

    return targetRole;
  };

  const logout = () => {
    switchRole('guest');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        loginWithEmail,
        logout,
        switchRole,
        isAuthenticated: currentUser.role !== 'guest',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
