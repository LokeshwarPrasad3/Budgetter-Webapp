import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as Sentry from '@sentry/react';

export const useSentryIntegration = () => {
  const user = useSelector((state: any) => state.user?.user);
  const location = useLocation();

  // 1. User Identification
  useEffect(() => {
    if (user && (user._id || user.id)) {
      Sentry.setUser({
        id: user._id || user.id,
        email: user.email,
        username: user.username,
        ip_address: '{{auto}}', // Let Sentry infer if needed, or omit
      });

      // 3. Additional debugging context
      Sentry.setTag('user_role', user.profession || 'unknown');
      Sentry.setTag('account_verified', String(user.isVerified));

      // Clear sensitive context if any was previously set
      // (Sentry.setUser overrides, so we are good)
    } else {
      Sentry.setUser(null);
      Sentry.setTag('user_role', 'guest');
    }
  }, [user]);

  // 4. Breadcrumbs for Navigation
  useEffect(() => {
    Sentry.addBreadcrumb({
      category: 'navigation',
      message: `Navigated to ${location.pathname}`,
      level: 'info',
      data: {
        path: location.pathname,
        search: location.search,
        hash: location.hash,
      },
    });
  }, [location]);

  // Environment context (can be set once, but safe here)
  useEffect(() => {
    Sentry.setContext('environment', {
      mode: import.meta.env.MODE,
      platform: navigator.platform,
      userAgent: navigator.userAgent,
    });
  }, []);
};
