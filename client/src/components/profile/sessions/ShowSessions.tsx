import { useState } from 'react';
import { PopoverForm } from '../../ui/popover-form';
import { useMutation } from '@tanstack/react-query';
import { getUserSessions } from '@/services/auth';
import { SessionType } from '@/types/api/auth/auth';
import SessionsCard from './SessionsCard';
import DeleteAllSession from './DeleteAllSession';
import { useSelector } from 'react-redux';

function SessionsLoader() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="flex animate-pulse items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-bg_secondary_dark"
        >
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-gray-200 dark:bg-gray-700" />
            <div className="space-y-2">
              <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-28 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
          <div className="h-8 w-20 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  );
}

const ShowSessions = () => {
  const [open, setOpen] = useState(false);
  const [sessions, setSessions] = useState<SessionType[] | []>([]);
  const currentAccessTokenId = useSelector(
    (state: any) => state.user?.user?.activeSessions?._id
  );

  const { mutateAsync: showSessionsMutate, isPending } = useMutation({
    mutationFn: getUserSessions,
    onSuccess: (data) => {
      setSessions(data?.data || []);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleShowSession = () => {
    showSessionsMutate();
  };

  return (
    <div className="flex w-full items-center justify-center">
      <PopoverForm
        title="Show All Sessions"
        open={open}
        setOpen={setOpen}
        width="364px"
        showSuccess={false}
        height="192px"
        handleShowSession={handleShowSession}
        openChild={
          <div className="mx-auto w-full max-w-3xl space-y-2 p-4">
            <div className="heading_part flex justify-between px-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Active Sessions
              </h2>
              {sessions.length !== 0 && <DeleteAllSession />}
            </div>

            {/* Loader only if fetching first time */}
            {isPending && sessions.length === 0 && <SessionsLoader />}

            {/* Show sessions list */}
            <div className="flex flex-col gap-3">
              {!isPending && sessions.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No active sessions found.
                </p>
              )}

              {sessions.map((session) => (
                <SessionsCard
                  key={session._id}
                  session={session}
                  handleShowSession={handleShowSession}
                  isActive={currentAccessTokenId === session._id}
                />
              ))}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ShowSessions;
