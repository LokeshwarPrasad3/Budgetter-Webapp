import { Loader2, Monitor, Smartphone } from 'lucide-react';
import { SessionType } from '@/types/api/auth/auth';
import { useMutation } from '@tanstack/react-query';
import { deleteOneUserSessions } from '@/services/auth';
import { Button } from '@/components/ui/button';
import { useUserLogout } from '@/hooks/auth/useUserLogout';

interface SessionsCardProps {
  session: SessionType;
  isActive: boolean;
  handleShowSession: () => void;
}

const SessionsCard = ({
  session,
  handleShowSession,
  isActive,
}: SessionsCardProps) => {
  const parts = session.userAgent?.split(' on ') || [];
  const browser = parts[0] || 'Unknown';
  const os = parts[1] || 'Unknown';

  const isMobile = /mobile|android|iphone|ipad/i.test(session.userAgent);

  const lastUsed = session.lastUsedAt
    ? new Date(session.lastUsedAt).toLocaleString()
    : 'N/A';

  const { mutateAsync: deleteSessionMutate, isPending } = useMutation({
    mutationFn: deleteOneUserSessions,
    onSuccess: (data) => {
      console.log(data.message);
      handleShowSession();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleDeleteSession = (sessionId: string) => {
    deleteSessionMutate({ sessionId });
  };

  const {
    handleUserLogout: handleCurrentUserLogout,
    isPending: currentUserLogoutPending,
  } = useUserLogout();

  return (
    <div
      key={session._id}
      className="flex flex-wrap items-center justify-center gap-y-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-bg_secondary_dark sm:justify-between"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-bg_primary_dark">
          {isMobile ? (
            <Smartphone className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <Monitor className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          )}
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {browser} on {os}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Last used: {lastUsed}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            IP: {session.ip}
            {isActive && (
              <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-400">
                Current
              </span>
            )}
          </p>
        </div>
      </div>

      <Button
        disabled={isActive ? currentUserLogoutPending : isPending}
        onClick={() => {
          if (isActive) {
            handleCurrentUserLogout();
          } else {
            handleDeleteSession(session._id);
          }
        }}
        className="inline-flex items-center rounded-md bg-gradient-to-br from-red-500 via-red-500/80 to-red-500/70 px-3 py-1.5 text-sm font-medium text-white shadow hover:from-red-500 hover:via-red-500 hover:to-red-500 focus:outline-none"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Deleting..
          </>
        ) : (
          'Log out'
        )}
      </Button>
    </div>
  );
};

export default SessionsCard;
