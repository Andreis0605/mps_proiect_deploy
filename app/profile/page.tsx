"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

import imgUndrawPlayingCardsYoqo2 from "../assets/8d654ea07ecdd3af3351a15d1735e9768387ab02.png";
import imgImage15 from "../assets/74fa2de4c48197aaf8036fda8b2c250e030e2bfc.png";

import { AVATARS, AvatarDisplay, getUserAvatar } from "../utils/avatar";
import { createAccount, verifyCredentials, updateUserProfile } from '../../firebase/auth';
import Toast from '../components/Toast';
import Navigation from '../components/Navigation';

// Mock credentials for testing
const MOCK_EMAIL = "student@edu-gamification.ro";
const MOCK_PASSWORD = "StudyGames2024!";

const PERSONALITY_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP"
];

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
  personality: string;
  avatarName: string;
  avatarImage: string;
  consent?: boolean;
}

// Debug wrapper to detect mount/unmount and focus events
function DebugInput(props: any) {
  const { debugId, ...rest } = props;
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.debug(`[DebugInput:${debugId}] mounted`);
    return () => {
      // eslint-disable-next-line no-console
      console.debug(`[DebugInput:${debugId}] unmounted`);
    };
  }, [debugId]);

  return (
    <input
      {...rest}
      onFocus={(e) => {
        // eslint-disable-next-line no-console
        console.debug(`[DebugInput:${debugId}] focus`);
        if (rest.onFocus) rest.onFocus(e);
      }}
      onBlur={(e) => {
        // eslint-disable-next-line no-console
        console.debug(`[DebugInput:${debugId}] blur`);
        if (rest.onBlur) rest.onBlur(e);
      }}
    />
  );
}

// --------- Extracted form components (stable, memoized) ----------
import React from 'react';

type LoginFormProps = {
  hasAccount: boolean;
  setHasAccount: (v: boolean) => void;
  onLogin: (email: string, password: string) => void;
  loginError?: string;
};

export const LoginFormInner = React.memo(function LoginFormInner({ hasAccount, setHasAccount, onLogin, loginError }: LoginFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Ai deja un profil?</h2>

      <label className="flex items-center gap-3 cursor-pointer mb-6">
        <input
          type="checkbox"
          checked={hasAccount}
          onChange={e => setHasAccount(e.target.checked)}
          className="w-5 h-5 accent-purple-600"
        />
        <span>Deja am un profil pe această platformă</span>
      </label>

      <h3 className="text-xl font-semibold mb-4">Completează datele de login:</h3>

      <form onSubmit={submit} className="space-y-4">
        <DebugInput
          debugId="login-email"
          name="loginEmail"
          type="email"
          placeholder="email@janedomain.ro"
          className="w-full border px-4 py-3 rounded-lg"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />

        <DebugInput
          debugId="login-password"
          name="loginPassword"
          type="password"
          placeholder="••••••••"
          className="w-full border px-4 py-3 rounded-lg"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />

        {loginError && <p className="text-red-600">{loginError}</p>}

        <button className="w-full bg-black text-white py-3 rounded-lg">Login</button>
      </form>
    </div>
  );
});

type SignupValues = { email: string; age: string; password: string; confirm: string; personality: string; avatarName: string };

type SignupFormProps = {
  hasAccount: boolean;
  setHasAccount: (v: boolean) => void;
  hasConsent: boolean;
  setHasConsent: (v: boolean) => void;
  onSignup: (values: SignupValues) => void;
  signupError?: string;
  avatars: any[];
  selectedAvatar: number;
  onSelectAvatar: (id: number) => void;
};

export const SignupFormInner = React.memo(function SignupFormInner({
  hasAccount,
  setHasAccount,
  hasConsent,
  setHasConsent,
  onSignup,
  signupError,
  avatars,
  selectedAvatar,
  onSelectAvatar
}: SignupFormProps) {
  const [age, setAge] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [personality, setPersonality] = React.useState("");
  const [avatarName, setAvatarName] = React.useState("");
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [ageIsNumber, setAgeIsNumber] = React.useState(true);

  const isFormComplete =
    email &&
    age &&
    personality &&
    avatarName &&
    password &&
    confirm &&
    password === confirm &&
    hasConsent &&
    ageIsNumber;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup({ email, age, password, confirm, personality, avatarName });
  };

  return (
    <div className="mt-12 space-y-6">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={hasAccount}
          onChange={e => setHasAccount(e.target.checked)}
          className="w-5 h-5 accent-purple-600"
        />
        <span>Deja am un profil pe această platformă</span>
      </label>

      <h3 className="text-2xl font-bold">Profilul tău</h3>

      <div className="space-y-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={hasConsent}
            onChange={e => setHasConsent(e.target.checked)}
            className="w-5 h-5 accent-purple-600"
          />
          <span className="text-red-600 font-semibold">
            Îmi dau acordul pentru prelucrarea datelor *
          </span>
        </label>

        {/* GDPR link */}
        <a
          href="https://docs.google.com/document/d/1u_9xVyP9WqC9K9cl5djnjGmqHblpMybX/edit"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-8 text-sm text-indigo-600 underline hover:text-indigo-800"
        >
          Citește documentul GDPR
        </a>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <DebugInput
          debugId="signup-age"
          name="signupAge"
          type="text"
          inputMode="numeric"
          placeholder="Vârstă"
          className="w-full border px-4 py-3 rounded-lg"
          value={age}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const v = e.target.value.replace(/\D/g, '');
            setAge(v);
            setAgeIsNumber(v === '' || /^[0-9]+$/.test(v));
          }}
        />
        {!ageIsNumber && <p className="text-red-600 text-sm">Vârsta trebuie să conțină doar cifre.</p>}

        <div className="relative">
          <button type="button" onClick={() => setShowDropdown(!showDropdown)} className="w-full border px-4 py-3 rounded-lg text-left">
            {personality || "Selectează tipul de personalitate"}
          </button>
          {showDropdown && (
            <div className="absolute top-full left-0 w-full bg-white border max-h-60 overflow-y-auto shadow-lg rounded-lg z-10">
              {PERSONALITY_TYPES.map(type => (
                <button key={type} type="button" onClick={() => { setPersonality(type); setShowDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-purple-100">
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        <DebugInput debugId="signup-email" name="signupEmail" type="email" placeholder="email@janedomain.ro" className="w-full border px-4 py-3 rounded-lg" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />

        <DebugInput debugId="signup-password" name="signupPassword" type="password" placeholder="Parolă" className="w-full border px-4 py-3 rounded-lg" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />

        <DebugInput debugId="signup-confirm" name="signupConfirm" type="password" placeholder="Confirmă parola" className="w-full border px-4 py-3 rounded-lg" value={confirm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirm(e.target.value)} />
        {password !== '' && confirm !== '' && password !== confirm && <p className="text-red-600 text-sm">Parolele nu coincid.</p>}

        <DebugInput debugId="signup-avatar" name="signupAvatar" type="text" placeholder="Numele Avatarului" className="w-full border px-4 py-3 rounded-lg" value={avatarName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAvatarName(e.target.value)} />

        {signupError && <p className="text-red-600">{signupError}</p>}

        <div className="grid grid-cols-6 gap-2">
          {avatars.map(avatar => (
            <AvatarDisplay key={avatar.id} avatarId={avatar.id} size="md" selected={selectedAvatar === avatar.id} className="cursor-pointer hover:ring-2 hover:ring-purple-400" onClick={() => onSelectAvatar(avatar.id)} />
          ))}
        </div>

        <button type="submit" disabled={!isFormComplete} className={`w-full py-3 rounded-lg ${isFormComplete ? "bg-black text-white hover:bg-gray-800" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
          Salvează
        </button>
      </form>
    </div>
  );
});

// Move ProfileViewInner to module scope so its identity is stable across renders.
export const ProfileViewInner = React.memo(function ProfileViewInner({
  formData,
  setFormData,
  selectedAvatar,
  setShowDropdown,
  showDropdown,
  handleAvatarSelect,
  handleUpdateProfile,
  handleDeleteProfile,
  handleLogout
}: any) {
  return (
    <div className="mt-12">
      <div className="bg-purple-600 p-6 rounded-lg text-center mb-8 text-white">
        <img src={imgImage15.src} className="mx-auto max-w-xs mb-4" />
        <a
          href="https://www.16personalities.com/"
          target="_blank"
          className="bg-white text-purple-600 px-6 py-3 rounded-lg inline-block"
        >
          Take 16 Personality Test
        </a>
      </div>

      <h2 className="text-2xl font-bold mb-6">Profilul tău</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Form */}
        <div className="space-y-4">
          <DebugInput
            debugId="profile-age"
            type="number"
            className="w-full border px-4 py-3 rounded-lg"
            value={formData.age}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData((prev: any) => ({ ...prev, age: e.target.value }))}
            onFocus={() => console.debug('[Profile][View] age focus')}
            onBlur={() => console.debug('[Profile][View] age blur')}
          />

          {/* Personality */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full border px-4 py-3 rounded-lg text-left"
            >
              {formData.personality}
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 w-full bg-white border shadow-lg z-10">
                {PERSONALITY_TYPES.map((type: string) => (
                  <button
                    key={type}
                    className="w-full px-4 py-2 text-left hover:bg-purple-100"
                    onClick={() => {
                      setFormData((prev: any) => ({ ...prev, personality: type }));
                      setShowDropdown(false);
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          <DebugInput
            debugId="profile-email"
            type="email"
            className="w-full border px-4 py-3 rounded-lg"
            value={formData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData((prev: any) => ({ ...prev, email: e.target.value }))}
            onFocus={() => console.debug('[Profile][View] email focus')}
            onBlur={() => console.debug('[Profile][View] email blur')}
          />

          <button type="button" onClick={(e) => { e.preventDefault(); handleUpdateProfile(); }} className="w-full bg-black text-white py-3 rounded-lg">
            Salvează
          </button>
        </div>

        {/* Right Avatar Form */}
        <div className="space-y-4">
          <DebugInput
            debugId="profile-avatarName"
            type="text"
            className="w-full border px-4 py-3 rounded-lg"
            value={formData.avatarName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData((prev: any) => ({ ...prev, avatarName: e.target.value }))}
            onFocus={() => console.debug('[Profile][View] avatar focus')}
            onBlur={() => console.debug('[Profile][View] avatar blur')}
          />

          <div className="grid grid-cols-6 gap-2">
            {AVATARS.map((avatar: any) => (
              <AvatarDisplay
                key={avatar.id}
                avatarId={avatar.id}
                size="md"
                selected={selectedAvatar === avatar.id}
                onClick={() => handleAvatarSelect(avatar.id)}
                className="cursor-pointer hover:ring-2 hover:ring-purple-400"
              />
            ))}
          </div>

          <button type="button" onClick={(e) => { e.preventDefault(); handleUpdateProfile(); }} className="w-full bg-black text-white py-3 rounded-lg">
            Salvează
          </button>
        </div>
      </div>

      <button
        onClick={handleDeleteProfile}
        className="w-full py-3 bg-red-600 text-white rounded-lg mt-12 hover:bg-red-700"
      >
        Șterge întregul profil
      </button>
      <button
        onClick={handleLogout}
        className="w-full py-3 bg-gray-800 text-white rounded-lg mt-4 hover:bg-gray-900"
      >
        Logout
      </button>
    </div>
  );
});


export default function ProfilePage() {
  const router = useRouter();
  const pathname = usePathname();

  const [hasAccount, setHasAccount] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<number>(1);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    personality: "",
    avatarName: "",
    avatarImage: ""
  });

  // Local live validation state for signup
  const [signupPasswordLocal, setSignupPasswordLocal] = useState("");
  const [signupConfirmLocal, setSignupConfirmLocal] = useState("");
  const [ageIsNumber, setAgeIsNumber] = useState(true);

  // Toast state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');

  useEffect(() => {
    const saved = localStorage.getItem("userAvatar");
    if (saved) setSelectedAvatar(parseInt(saved));
  }, []);

  // Restore session from localStorage if present
  useEffect(() => {
    try {
      const s = localStorage.getItem('sessionUser');
      if (s) {
        const u = JSON.parse(s);
        if (u && u.email) {
          setIsLoggedIn(true);
          setFormData(prev => ({ ...prev, email: u.email, age: u.age || '', personality: u.personality || '', avatarName: u.avatarName || '', consent: !!u.consent }));
          setHasConsent(!!u.consent);
        }
      }
    } catch (err) { }
  }, []);


  /* ----------------------------- PROFILE VIEW (memoized) ----------------------------- */



  const handleAvatarSelect = useCallback((avatarId: number) => {
    setSelectedAvatar(avatarId);
    try { localStorage.setItem("userAvatar", avatarId.toString()); } catch (err) { }
    const a = AVATARS.find(av => av.id === avatarId);
    if (a) {
      // store the avatar image URL in form data
      setFormData(prev => ({ ...prev, avatarImage: a.image.src }));
      // if user is logged in, update sessionUser in localStorage so nav updates
      try {
        const s = localStorage.getItem('sessionUser');
        if (s) {
          const u = JSON.parse(s) || {};
          const nu = { ...u, avatarImage: a.image.src };
          localStorage.setItem('sessionUser', JSON.stringify(nu));
          window.dispatchEvent(new Event('sessionUserChanged'));
        }
      } catch (err) { }
    }
  }, [setSelectedAvatar, setFormData]);

  // (avatar selection persistence handled in handleAvatarSelect)

  const handleLogin = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Read latest values from the form (uncontrolled inputs)
    const target = e.target as HTMLFormElement;
    const fd = new FormData(target);
    const email = (fd.get('loginEmail') as string) || formData.email;
    const password = (fd.get('loginPassword') as string) || formData.password;

    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      setIsLoggedIn(true);
      setHasConsent(true);
      setLoginError("");
      setFormData(prev => ({
        ...prev,
        email,
        password,
        age: "20",
        personality: "INTJ",
        avatarName: "SuperCoolAvatarName"
      }));
      try {
        const avatar = getUserAvatar().image.src;
        localStorage.setItem('sessionUser', JSON.stringify({ email, age: '20', personality: 'INTJ', avatarName: 'SuperCoolAvatarName', avatarImage: avatar }));
        window.dispatchEvent(new Event('sessionUserChanged'));
      } catch (err) { }
      setToastMessage('Autentificare reușită'); setToastType('success'); setToastVisible(true);
    } else {
      setLoginError("Email sau parolă incorectă. Încearcă: " + MOCK_EMAIL);
    }
  }, [formData, setFormData, setIsLoggedIn, setHasConsent, setLoginError, setToastMessage, setToastType, setToastVisible]);

  const handleSignup = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Read latest values from the form (uncontrolled inputs)
    const target = e.target as HTMLFormElement;
    const fd = new FormData(target);
    const email = (fd.get('signupEmail') as string) || formData.email;
    const age = (fd.get('signupAge') as string) || formData.age;
    const password = (fd.get('signupPassword') as string) || formData.password;
    const confirm = (fd.get('signupConfirm') as string) || formData.confirmPassword;
    const avatarName = (fd.get('signupAvatar') as string) || formData.avatarName;

    // Basic validation: consent + password fields must be present and match
    if (!hasConsent) {
      setSignupError("Trebuie să îți dai acordul pentru prelucrarea datelor.");
      return;
    }

    if (!password || !confirm) {
      setSignupError("Completează atât parola, cât și confirmarea parolei.");
      return;
    }

    if (password !== confirm) {
      setSignupError("Parolele nu coincid. Te rog verifică și încearcă din nou.");
      return;
    }

    setSignupError("");
    setFormData(prev => ({
      ...prev,
      email,
      age,
      password,
      confirmPassword: confirm,
      avatarName
    }));
    setIsLoggedIn(true);
    try {
      const chosen = AVATARS.find(a => a.id === selectedAvatar);
      const avatarSrc = chosen ? chosen.image.src : getUserAvatar().image.src;
      localStorage.setItem('sessionUser', JSON.stringify({ email, age, personality: formData.personality || '', avatarName: avatarName || '', avatarImage: avatarSrc }));
      window.dispatchEvent(new Event('sessionUserChanged'));
    } catch (err) { }
    setToastMessage('Cont creat cu succes'); setToastType('success'); setToastVisible(true);
  }, [formData, selectedAvatar, setFormData, setIsLoggedIn, setSignupError, setToastMessage, setToastType, setToastVisible]);

  const handleDeleteProfile = useCallback(() => {
    if (confirm("Sigur dorești să ștergi întregul profil?")) {
      setIsLoggedIn(false);
      setHasAccount(false);
      setHasConsent(false);
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        personality: "",
        avatarName: "",
        avatarImage: ""
      });
      try { localStorage.removeItem('sessionUser'); window.dispatchEvent(new Event('sessionUserChanged')); } catch (err) { }
    }
  }, [setIsLoggedIn, setHasAccount, setHasConsent, setFormData]);

  const handleLogout = useCallback(() => {
    // clear local session and state
    setIsLoggedIn(false);
    setHasAccount(false);
    setHasConsent(false);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      age: "",
      personality: "",
      avatarName: "",
      avatarImage: ""
    });
    try { localStorage.removeItem('sessionUser'); window.dispatchEvent(new Event('sessionUserChanged')); } catch (err) { }
    // navigate home
    try { router.push('/home'); } catch (err) { /* ignore */ }
  }, [setIsLoggedIn, setHasAccount, setHasConsent, setFormData, router]);

  const handleUpdateProfile = useCallback(async () => {
    // Only allow update if we have an email for the current user
    const email = formData.email;
    if (!email) {
      setToastMessage('Completează email-ul înainte de a salva.'); setToastType('error'); setToastVisible(true);
      return;
    }

    try {
      const updates: any = {
        age: formData.age || '',
        personality: formData.personality || '',
        avatarName: formData.avatarName || '',
        avatarImage: formData.avatarImage || ''
      };
      // include consent as a boolean if present
      if (typeof formData.consent !== 'undefined') updates.consent = !!formData.consent;

      await updateUserProfile(email, updates);

      // update local session copy
      try {
        const s = localStorage.getItem('sessionUser');
        let u = s ? JSON.parse(s) : {};
        u = { ...u, ...updates };
        if (typeof updates.consent !== 'undefined') u.consent = updates.consent;
        localStorage.setItem('sessionUser', JSON.stringify(u));
        window.dispatchEvent(new Event('sessionUserChanged'));
      } catch (err) { }
      setToastMessage('Profil actualizat cu succes'); setToastType('success'); setToastVisible(true);
    } catch (err) {
      console.error('updateUserProfile error', err);
      setToastMessage('Eroare la actualizarea profilului'); setToastType('error'); setToastVisible(true);
    }
  }, [formData, updateUserProfile, setToastMessage, setToastType, setToastVisible]);

  // Value-based handlers for the extracted inner forms
  const handleLoginWithValues = useCallback((email: string, password: string) => {
    (async () => {
      try {
        const user = await verifyCredentials(email, password);
        if (!user) {
          setLoginError('Email sau parolă incorectă.');
          return;
        }

        // login OK
        setIsLoggedIn(true);
        setHasConsent(!!user.consent);
        setLoginError('');
        setFormData(prev => ({ ...prev, email, password, age: user.age || '', personality: user.personality || '', avatarName: user.avatarName || '', avatarImage: user.avatarImage || prev.avatarImage || getUserAvatar().image.src, consent: !!user.consent }));
        try { localStorage.setItem('sessionUser', JSON.stringify({ email, age: user.age || '', personality: user.personality || '', avatarName: user.avatarName || '', avatarImage: user.avatarImage || getUserAvatar().image.src, consent: !!user.consent })); window.dispatchEvent(new Event('sessionUserChanged')); } catch (err) { }
        setToastMessage('Autentificare reușită'); setToastType('success'); setToastVisible(true);
      } catch (err) {
        console.error('verifyCredentials error', err);
        setLoginError('Eroare la autentificare. Încearcă din nou.');
        setToastMessage('Eroare la autentificare'); setToastType('error'); setToastVisible(true);
      }
    })();
  }, [setFormData, setIsLoggedIn, setHasConsent, setLoginError, setToastMessage, setToastType, setToastVisible]);

  const handleSignupWithValues = useCallback((values: { email: string; age: string; password: string; confirm: string; personality: string; avatarName: string }) => {
    (async () => {
      try {
        if (!hasConsent) {
          setSignupError("Trebuie să îți dai acordul pentru prelucrarea datelor.");
          return;
        }
        if (!values.password || !values.confirm) {
          setSignupError("Completează atât parola, cât și confirmarea parolei.");
          return;
        }
        if (values.password !== values.confirm) {
          setSignupError("Parolele nu coincid. Te rog verifică și încearcă din nou.");
          return;
        }

        // create account in Firebase Realtime DB
        const chosenAvatar = AVATARS.find(a => a.id === selectedAvatar);
        const avatarImageSrc = chosenAvatar ? chosenAvatar.image.src : '';
        const user = await createAccount({
          email: values.email,
          password: values.password,
          age: values.age,
          personality: values.personality,
          avatarName: values.avatarName,
          avatarImage: avatarImageSrc,
          consent: !!hasConsent
        });

        setSignupError("");
        setFormData(prev => ({
          ...prev,
          email: values.email,
          age: values.age,
          password: values.password,
          confirmPassword: values.confirm,
          personality: values.personality,
          avatarName: values.avatarName,
          avatarImage: avatarImageSrc
        }));
        setIsLoggedIn(true);
        try { localStorage.setItem('sessionUser', JSON.stringify({ email: values.email, age: values.age, personality: values.personality, avatarName: values.avatarName, avatarImage: avatarImageSrc, consent: !!hasConsent })); window.dispatchEvent(new Event('sessionUserChanged')); } catch (err) { }
        setToastMessage('Cont creat cu succes'); setToastType('success'); setToastVisible(true);
        console.debug('Created user', user);
      } catch (err: any) {
        console.error('createAccount error', err);
        setSignupError('Eroare la crearea contului. Încearcă din nou.');
      }
    })();
  }, [hasConsent, selectedAvatar, setFormData, setIsLoggedIn, setSignupError, setToastMessage, setToastType, setToastVisible]);

  /* ------------------------- REUSABLE SECTIONS ------------------------- */

  const PrivacySection = () => (
    <div className="mt-16 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-6">Confidențialitate și protecția datelor tale</h1>

        <p className="font-semibold text-lg">Transparența este esențială pentru noi.</p>
        <p className="mb-6">Toate informațiile introduse sunt criptate și folosite doar în scop academic.</p>

        {isLoggedIn && (
          <label className="flex items-center gap-3 cursor-pointer mt-4">
            <input
              type="checkbox"
              checked={hasConsent}
              onChange={async e => {
                const v = e.target.checked;
                setHasConsent(v);
                // update local form state and session copy
                setFormData(prev => ({ ...prev, consent: v }));
                try {
                  const s = localStorage.getItem('sessionUser');
                  let u = s ? JSON.parse(s) : {};
                  u = { ...u, consent: v };
                  localStorage.setItem('sessionUser', JSON.stringify(u));
                  window.dispatchEvent(new Event('sessionUserChanged'));
                } catch (err) { }

                // if logged in, persist to DB
                try {
                  if (formData.email) await updateUserProfile(formData.email, { consent: v });
                } catch (err) {
                  console.error('Failed to persist consent', err);
                }
              }}
              className="w-5 h-5 accent-purple-600"
            />
            <span>Îmi dau acordul pentru prelucrarea datelor</span>
          </label>
        )}
      </div>

      <img
        src={imgUndrawPlayingCardsYoqo2.src}
        className="max-w-xs"
        alt="Privacy illustration"
      />
    </div>
  );

  /* ---------------------------- LOGIN FORM ---------------------------- */

  const LoginForm = () => (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Ai deja un profil?</h2>

      <label className="flex items-center gap-3 cursor-pointer mb-6">
        <input
          type="checkbox"
          checked={hasAccount}
          onChange={e => setHasAccount(e.target.checked)}
          className="w-5 h-5 accent-purple-600"
        />
        <span>Deja am un profil pe această platformă</span>
      </label>

      <h3 className="text-xl font-semibold mb-4">Completează datele de login:</h3>

      <form onSubmit={handleLogin} className="space-y-4">
        <DebugInput
          debugId="login-email"
          name="loginEmail"
          type="email"
          placeholder="email@janedomain.ro"
          className="w-full border px-4 py-3 rounded-lg"
          defaultValue={formData.email}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        />

        <DebugInput
          debugId="login-password"
          name="loginPassword"
          type="password"
          placeholder="••••••••"
          className="w-full border px-4 py-3 rounded-lg"
          defaultValue={formData.password}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, password: e.target.value }))}
        />

        {loginError && <p className="text-red-600">{loginError}</p>}

        <button className="w-full bg-black text-white py-3 rounded-lg">
          Login
        </button>
      </form>
    </div>
  );

  /* ---------------------------- SIGNUP FORM ---------------------------- */

  const SignupForm = () => {
    const currentPassword = signupPasswordLocal || formData.password;
    const currentConfirm = signupConfirmLocal || formData.confirmPassword;
    const numericAge = formData.age || '';

    const isFormComplete =
      formData.email &&
      numericAge &&
      formData.personality &&
      formData.avatarName &&
      currentPassword &&
      currentConfirm &&
      currentPassword === currentConfirm &&
      hasConsent &&
      ageIsNumber;

    return (
      <div className="mt-12 space-y-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={hasAccount}
            onChange={e => setHasAccount(e.target.checked)}
            className="w-5 h-5 accent-purple-600"
          />
          <span>Deja am un profil pe această platformă</span>
        </label>

        <h3 className="text-2xl font-bold">Profilul tău</h3>

        {/* Consent */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={hasConsent}
            onChange={e => setHasConsent(e.target.checked)}
            className="w-5 h-5 accent-purple-600"
          />
          <span className="text-red-600 font-semibold">
            Îmi dau acordul pentru prelucrarea datelor *
          </span>
        </label>

        <form onSubmit={handleSignup} className="space-y-4">
          <DebugInput
            debugId="signup-age"
            name="signupAge"
            type="text"
            inputMode="numeric"
            placeholder="Vârstă"
            className="w-full border px-4 py-3 rounded-lg"
            defaultValue={formData.age}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const v = (e.target as HTMLInputElement).value.replace(/\D/g, '');
              (e.target as HTMLInputElement).value = v;
              setAgeIsNumber(v === '' || /^[0-9]+$/.test(v));
            }}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, age: e.target.value }))}
          />
          {!ageIsNumber && <p className="text-red-600 text-sm">Vârsta trebuie să conțină doar cifre.</p>}

          {/* Personality dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full border px-4 py-3 rounded-lg text-left"
            >
              {formData.personality || "Selectează tipul de personalitate"}
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 w-full bg-white border max-h-60 overflow-y-auto shadow-lg rounded-lg z-10">
                {PERSONALITY_TYPES.map(type => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, personality: type }));
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-purple-100"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          <DebugInput
            debugId="signup-email"
            name="signupEmail"
            type="email"
            placeholder="email@janedomain.ro"
            className="w-full border px-4 py-3 rounded-lg"
            defaultValue={formData.email}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />

          <DebugInput
            debugId="signup-password"
            name="signupPassword"
            type="password"
            placeholder="Parolă"
            className="w-full border px-4 py-3 rounded-lg"
            value={signupPasswordLocal}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignupPasswordLocal(e.target.value)}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          />

          <DebugInput
            debugId="signup-confirm"
            name="signupConfirm"
            type="password"
            placeholder="Confirmă parola"
            className="w-full border px-4 py-3 rounded-lg"
            value={signupConfirmLocal}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignupConfirmLocal(e.target.value)}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          />
          {signupPasswordLocal !== '' && signupConfirmLocal !== '' && signupPasswordLocal !== signupConfirmLocal && (
            <p className="text-red-600 text-sm">Parolele nu coincid.</p>
          )}

          <DebugInput
            debugId="signup-avatar"
            name="signupAvatar"
            type="text"
            placeholder="Numele Avatarului"
            className="w-full border px-4 py-3 rounded-lg"
            defaultValue={formData.avatarName}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, avatarName: e.target.value }))}
          />

          {signupError && <p className="text-red-600">{signupError}</p>}

          {/* Avatar grid */}
          <div className="grid grid-cols-6 gap-2">
            {AVATARS.map(avatar => (
              <AvatarDisplay
                key={avatar.id}
                avatarId={avatar.id}
                size="md"
                selected={selectedAvatar === avatar.id}
                className="cursor-pointer hover:ring-2 hover:ring-purple-400"
                onClick={() => handleAvatarSelect(avatar.id)}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={!isFormComplete}
            className={`w-full py-3 rounded-lg ${isFormComplete
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Salvează
          </button>
        </form>
      </div>
    );
  };

  /* ------------------------------ RENDER ------------------------------- */

  return (
    <div className="min-h-screen bg-white pb-20">
      <Navigation />

      <div className="w-full">
        {/* Full-width purple banner to improve nav text contrast (matches other pages) */}
        <div className="bg-purple-600 w-full py-6 text-center text-white">
          <div className="max-w-7xl mx-auto px-8">
            <h1 className="text-2xl font-bold">Profil</h1>
            <p className="opacity-90">Managează-ți setările și datele contului</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8">
          <Toast visible={toastVisible} message={toastMessage} type={toastType} onClose={() => setToastVisible(false)} />
          <PrivacySection />

          {!isLoggedIn && (
            <div>
              <div style={{ display: hasAccount ? 'block' : 'none' }}>
                <LoginFormInner hasAccount={hasAccount} setHasAccount={setHasAccount} onLogin={handleLoginWithValues} loginError={loginError} />
              </div>
              <div style={{ display: hasAccount ? 'none' : 'block' }}>
                <SignupFormInner hasAccount={hasAccount} setHasAccount={setHasAccount} hasConsent={hasConsent} setHasConsent={setHasConsent} onSignup={handleSignupWithValues} signupError={signupError} avatars={AVATARS} selectedAvatar={selectedAvatar} onSelectAvatar={handleAvatarSelect} />
              </div>
            </div>
          )}

          {isLoggedIn && (
            <ProfileViewInner
              formData={formData}
              setFormData={setFormData}
              selectedAvatar={selectedAvatar}
              setShowDropdown={setShowDropdown}
              showDropdown={showDropdown}
              handleAvatarSelect={handleAvatarSelect}
              handleUpdateProfile={handleUpdateProfile}
              handleDeleteProfile={handleDeleteProfile}
              handleLogout={handleLogout}
            />
          )}
        </div>
      </div>
    </div>
  );
}
