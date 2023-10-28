import React, { useContext, createContext, useState, useEffect, useCallback } from 'react';

import { Session, SignInWithOAuthCredentials, User } from '@supabase/supabase-js';
import { AxiosInstance } from 'axios';
import useSignIn from 'hooks/auth/useSignIn';
import useSignUp from 'hooks/auth/useSignUp';
import useSupabase from 'hooks/useSupabase';
import Loading from 'pages/shared/Loading';
import axiosInstance from 'utils/axiosInstance';
import supabaseInstance from 'utils/supabaseInstance';

import { SignInDto } from './models/sign-in-dto';
import { SignUpDto } from './models/sign-up-dto';

const AuthContext = createContext({});

function useAuth(): any {
  return useContext(AuthContext);
}

function AuthProvider({ children }: any): JSX.Element {
  const [user, setUser] = useState<User | undefined>();
  const [session, setSession] = useState<Session | null>();
  const [isLoading, setLoading] = useState(true);
  const supabase = useSupabase();
  const signUp = useSignUp();
  const signIn = useSignIn();

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      setSession(session);

      if (session) {
        setUser(session.user);

        // Manually refresh session when the token is expired
        const expiryAt = new Date(session?.expires_at || 0);

        if (expiryAt < new Date()) {
          const { error } = await supabase.auth.refreshSession();

          if (error) {
            throw error;
          }
        }
      }

      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user);
      setLoading(false);
    });

    setData();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSignUp = async (payload: SignUpDto) => {
    const newUser = await signUp.mutateAsync(payload);

    if (newUser.data.session) {
      supabaseInstance.auth.setSession({
        access_token: newUser.data.session.access_token,
        refresh_token: newUser.data.session.refresh_token,
      });
    }

    return newUser;
  };

  const handleSignIn = async (payload: SignInDto) => {
    const response = await signIn.mutateAsync(payload);

    if (response.data.session) {
      supabaseInstance.auth.setSession({
        access_token: response.data.session.access_token,
        refresh_token: response.data.session.refresh_token,
      });
    }

    return response;
  };

  const value = {
    signUp: (payload: SignUpDto) => handleSignUp(payload),
    signIn: (payload: SignInDto) => handleSignIn(payload),
    signInWithOAuth: (payload: SignInWithOAuthCredentials) =>
      supabaseInstance.auth.signInWithOAuth(payload),
    signOut: () => supabaseInstance.auth.signOut(),
    updateUser: (payload: { password: string }) => supabaseInstance.auth.updateUser(payload),
    resetPasswordForEmail: (email: string, options?: { redirectTo: string }) =>
      supabaseInstance.auth.resetPasswordForEmail(email, options),
    exchangeCodeForSession: (code: string) => supabaseInstance.auth.exchangeCodeForSession(code),
    user,
    session,
  };

  if (isLoading) {
    return <Loading />;
  }

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
}

function useClient(): AxiosInstance {
  const { session } = useAuth();
  const supabase = useSupabase();

  return useCallback(() => {
    const cl = axiosInstance;

    cl.interceptors.request.use(config => {
      if (session.access_token) {
        config.headers.set('Authorization', `Bearer ${session.access_token}`);
      }
      return config;
    });

    cl.interceptors.response.use(
      response => response,
      async error => {
        const conf = error.config;
        if (error.response.status === 401 && !conf.token_retry) {
          conf.token_retry = true;

          return supabase.auth
            .getSession()
            .then(res => {
              if (res.data.session?.access_token) {
                axiosInstance.defaults.headers.common.Authorization = `Bearer ${session?.access_token}`;

                return cl.request(conf);
              }
              if (res.error) {
                return Promise.reject(res.error);
              }

              return Promise.reject(res.error);
            })
            .catch(err => Promise.reject(err));
        }

        return Promise.reject(error);
      },
    );

    return cl;
  }, [session.access_token, supabase.auth])();
}

export { AuthContext, AuthProvider, useAuth, useClient };
