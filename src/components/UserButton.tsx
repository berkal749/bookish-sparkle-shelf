import { UserButton as ClerkUserButton } from '@clerk/clerk-react';

const UserButton = () => {
  return (
    <ClerkUserButton 
      afterSignOutUrl="/auth"
      appearance={{
        elements: {
          avatarBox: 'w-10 h-10'
        }
      }}
    />
  );
};

export default UserButton;
