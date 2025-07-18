import React, { useState } from 'react';
import Joyride from 'react-joyride';

interface UserTourGuidePropType {
  isTourTriggered: boolean;
  setIsTourTriggered: (value: boolean) => void;
}

const UserTourGuide: React.FC<UserTourGuidePropType> = ({
  isTourTriggered,
  setIsTourTriggered,
}) => {
  const [tourKey, setTourKey] = useState(0);

  const steps = [
    {
      target: '#start_tour_guide',
      content: 'Welcome to User Tour Guide',
      spotlightPadding: 10,
    },
    {
      target: '#fullscreens_tour_guide',
      content: 'Use Budgetter in full screen view',
      spotlightPadding: 10,
    },
    {
      target: '#theme_change_tour',
      content: 'Change Your Comfortable Theme',
      spotlightPadding: 10,
    },
    {
      target: '#notification_section',
      content: 'View your notifications from here',
      spotlightPadding: 10,
    },
    {
      target: '#profile_section',
      content: 'This is the Profile section where you can edit details',
      spotlightPadding: 10,
    },
    {
      target: '#menu_toggle_button_section',
      content: 'Toggle the sidebar from here',
      spotlightPadding: 10,
    },
    {
      target: '#sidebar_section',
      content: 'Your navigation menu is here',
      spotlightPadding: 10,
    },
    {
      target: '#logout_section',
      content: 'Logout from your account from here',
      spotlightPadding: 10,
    },
  ];

  const locale = {
    last: 'Finish',
    next: 'Next',
    back: 'Back',
    skip: 'Skip',
  };

  const handleJoyrideCallback = (data: any) => {
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
      disableScrolling={true}
      run={isTourTriggered}
      continuous={true}
      locale={locale}
      scrollToFirstStep={false} // Prevents unnecessary repositioning
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
