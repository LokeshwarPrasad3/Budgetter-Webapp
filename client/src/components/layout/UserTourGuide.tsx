import { getStepsForPath } from '@/utils/tour/tourguides';
import React, { useState } from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';

interface UserTourGuidePropType {
  isTourTriggered: boolean;
  setIsTourTriggered: (value: boolean) => void;
}

const UserTourGuide: React.FC<UserTourGuidePropType> = ({
  isTourTriggered,
  setIsTourTriggered,
}) => {
  const [tourKey, setTourKey] = useState(0);

  const steps: Step[] = getStepsForPath(location.pathname);

  const locale = {
    last: 'Finish',
    next: 'Next',
    back: 'Back',
    skip: 'Skip',
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, action } = data;
    const finishedStatuses = ['finished', 'skipped'];
    if (finishedStatuses.includes(status)) {
      setIsTourTriggered(false);
      setTourKey((prevKey) => prevKey + 1);
    }
    if (action === 'close') {
      setIsTourTriggered(false);
      setTourKey(0);
      return;
    }
  };

  return (
    <Joyride
      key={tourKey}
      steps={steps}
      run={isTourTriggered}
      continuous={true}
      locale={locale}
      scrollToFirstStep={false}
      scrollOffset={100}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 10000, // Ensure tooltips are on top
        },
        spotlight: {
          borderRadius: '8px', // Smooth spotlight
        },
        buttonNext: {
          backgroundColor: '#6d58db',
          color: '#ffffff',
        },
        buttonBack: {
          backgroundColor: '#ffffff',
          color: '#596ae0',
          borderRadius: '5px',
        },
        buttonClose: {
          height: '12px',
          width: '12px',
          fontWeight: '500',
        },
      }}
    />
  );
};

export default UserTourGuide;
