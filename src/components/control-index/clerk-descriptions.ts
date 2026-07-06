export const CLERK_PARAM_DESCRIPTIONS: Record<string, string> = {
  id: 'The unique identifier for the user within the Clerk system.',
  pathRoot: 'The internal API path root for the user resource.',
  externalId:
    'An ID from an external system, often used for data migration or syncing.',
  username: 'The chosen username for the account, if enabled and provided.',
  'emailAddresses[0].id':
    'The unique identifier for the primary email address object.',
  'emailAddresses[0].pathRoot':
    'Internal path root for the primary email address resource.',
  'emailAddresses[0].emailAddress':
    'The actual email address string associated with the user.',
  'emailAddresses[0].matchesSsoConnection':
    'Indicates if this email was provided by a Single Sign-On provider.',
  'emailAddresses[0].linkedTo':
    'Information about other accounts or identities linked to this email.',
  'emailAddresses[0].verification.pathRoot':
    'Path root for the email verification resource.',
  'emailAddresses[0].verification.status':
    'The current status of the email verification (e.g., verified).',
  'emailAddresses[0].verification.strategy':
    'The method used to verify the email address.',
  phoneNumbers: 'A list of phone numbers associated with the user account.',
  web3Wallets: 'A list of Web3 wallet addresses connected to this user.',
  externalAccounts:
    'Connections to third-party providers like GitHub, Google, or Discord.',
  enterpriseAccounts: 'Enterprise-level SSO accounts linked to the user.',
  passkeys: 'Registered passkeys for passwordless authentication.',
  organizationMemberships: 'A list of organizations the user is a member of.',
  passwordEnabled: 'Whether the user has a password set for their account.',
  firstName: "The user's first name as provided during registration.",
  lastName: "The user's last name as provided during registration.",
  fullName: 'The concatenated first and last name of the user.',
  primaryEmailAddressId:
    'The ID of the email address designated as the primary contact.',
  'primaryEmailAddress.id':
    'The unique identifier for the primary email address.',
  'primaryEmailAddress.pathRoot':
    'Internal path root for the primary email address.',
  'primaryEmailAddress.emailAddress': 'The primary email address string.',
  primaryPhoneNumberId: 'The ID of the primary phone number, if available.',
  primaryPhoneNumber: 'The primary phone number associated with the user.',
  primaryWeb3WalletId: 'The ID of the primary Web3 wallet, if available.',
  primaryWeb3Wallet: 'The primary Web3 wallet address.',
  imageUrl: "The URL of the user's profile picture or avatar.",
  hasImage: 'Indicates whether the user has uploaded or set a profile image.',
  twoFactorEnabled:
    'Whether two-factor authentication is active for this user.',
  totpEnabled: 'Whether Time-based One-Time Password (TOTP) is enabled.',
  backupCodeEnabled:
    'Whether backup codes have been generated for 2FA recovery.',
  publicMetadata:
    'Data visible to both the frontend and backend, manageable via Clerk API.',
  'unsafeMetadata.email':
    'User email stored in unsafe metadata for quick reference.',
  'unsafeMetadata.origin':
    'The source or platform where the user originally registered.',
  'unsafeMetadata.alignment':
    'Character alignment or faction assigned during registration.',
  'unsafeMetadata.archetype': 'Selected character class or role in the system.',
  'unsafeMetadata.registered_at':
    'Timestamp of when the user was registered in the database.',
  createOrganizationEnabled:
    'Whether this user has permission to create new organizations.',
  createOrganizationsLimit:
    'The maximum number of organizations this user can create.',
  deleteSelfEnabled: 'Whether the user is allowed to delete their own account.',
  lastSignInAt: "The timestamp of the user's most recent successful login.",
  legalAcceptedAt: 'The timestamp when the user accepted the terms of service.',
  updatedAt: 'The timestamp of the last modification to the user profile.',
  createdAt: 'The timestamp when the user account was first created.',
  cachedSessionsWithActivities:
    'Recently active sessions associated with this user profile.',
};
