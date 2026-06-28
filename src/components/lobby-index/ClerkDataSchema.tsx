import { useState, useEffect } from 'react';
import { $clerkStore } from '@clerk/astro/client';
import { Database } from 'lucide-react';

export default function ClerkDataSchema() {
  const [clerk, setClerk] = useState($clerkStore.get());

  useEffect(() => {
    const unsubscribe = $clerkStore.subscribe((newClerk) => {
      setClerk(newClerk);
    });
    return () => unsubscribe();
  }, []);

  const user = clerk?.user;

  const getFlattenedParams = (
    userData: Record<string, unknown> | null | undefined,
  ) => {
    if (!userData) return [];
    return [
      { key: 'id', val: userData.id },
      { key: 'pathRoot', val: userData.pathRoot },
      { key: 'externalId', val: String(userData.externalId) },
      { key: 'username', val: String(userData.username) },
      { key: 'emailAddresses[0].id', val: userData.emailAddresses?.[0]?.id },
      {
        key: 'emailAddresses[0].pathRoot',
        val: userData.emailAddresses?.[0]?.pathRoot,
      },
      {
        key: 'emailAddresses[0].emailAddress',
        val: userData.emailAddresses?.[0]?.emailAddress,
      },
      {
        key: 'emailAddresses[0].matchesSsoConnection',
        val: String(userData.emailAddresses?.[0]?.matchesSsoConnection),
      },
      {
        key: 'emailAddresses[0].linkedTo',
        val: JSON.stringify(userData.emailAddresses?.[0]?.linkedTo),
      },
      {
        key: 'emailAddresses[0].verification.pathRoot',
        val: String(
          userData.emailAddresses?.[0]?.verification?.pathRoot || 'EMPTY',
        ),
      },
      {
        key: 'emailAddresses[0].verification.status',
        val: String(userData.emailAddresses?.[0]?.verification?.status),
      },
      {
        key: 'emailAddresses[0].verification.strategy',
        val: String(userData.emailAddresses?.[0]?.verification?.strategy),
      },
      { key: 'phoneNumbers', val: JSON.stringify(userData.phoneNumbers) },
      { key: 'web3Wallets', val: JSON.stringify(userData.web3Wallets) },
      {
        key: 'externalAccounts',
        val: JSON.stringify(userData.externalAccounts),
      },
      {
        key: 'enterpriseAccounts',
        val: JSON.stringify(userData.enterpriseAccounts),
      },
      { key: 'passkeys', val: JSON.stringify(userData.passkeys) },
      {
        key: 'organizationMemberships',
        val: JSON.stringify(userData.organizationMemberships),
      },
      { key: 'passwordEnabled', val: String(userData.passwordEnabled) },
      { key: 'firstName', val: userData.firstName },
      { key: 'lastName', val: userData.lastName },
      { key: 'fullName', val: userData.fullName },
      { key: 'primaryEmailAddressId', val: userData.primaryEmailAddressId },
      { key: 'primaryEmailAddress.id', val: userData.primaryEmailAddress?.id },
      {
        key: 'primaryEmailAddress.pathRoot',
        val: userData.primaryEmailAddress?.pathRoot,
      },
      {
        key: 'primaryEmailAddress.emailAddress',
        val: userData.primaryEmailAddress?.emailAddress,
      },
      {
        key: 'primaryPhoneNumberId',
        val: String(userData.primaryPhoneNumberId),
      },
      { key: 'primaryPhoneNumber', val: String(userData.primaryPhoneNumber) },
      { key: 'primaryWeb3WalletId', val: String(userData.primaryWeb3WalletId) },
      { key: 'primaryWeb3Wallet', val: String(userData.primaryWeb3Wallet) },
      { key: 'imageUrl', val: userData.imageUrl },
      { key: 'hasImage', val: String(userData.hasImage) },
      { key: 'twoFactorEnabled', val: String(userData.twoFactorEnabled) },
      { key: 'totpEnabled', val: String(userData.totpEnabled) },
      { key: 'backupCodeEnabled', val: String(userData.backupCodeEnabled) },
      { key: 'publicMetadata', val: JSON.stringify(userData.publicMetadata) },
      { key: 'unsafeMetadata.email', val: userData.unsafeMetadata?.email },
      { key: 'unsafeMetadata.origin', val: userData.unsafeMetadata?.origin },
      {
        key: 'unsafeMetadata.alignment',
        val: userData.unsafeMetadata?.alignment,
      },
      {
        key: 'unsafeMetadata.archetype',
        val: userData.unsafeMetadata?.archetype,
      },
      {
        key: 'unsafeMetadata.registered_at',
        val: userData.unsafeMetadata?.registered_at,
      },
      {
        key: 'createOrganizationEnabled',
        val: String(userData.createOrganizationEnabled),
      },
      {
        key: 'createOrganizationsLimit',
        val: String(userData.createOrganizationsLimit),
      },
      { key: 'deleteSelfEnabled', val: String(userData.deleteSelfEnabled) },
      { key: 'lastSignInAt', val: userData.lastSignInAt },
      { key: 'legalAcceptedAt', val: String(userData.legalAcceptedAt) },
      { key: 'updatedAt', val: userData.updatedAt },
      { key: 'createdAt', val: userData.createdAt },
      {
        key: 'cachedSessionsWithActivities',
        val: String(userData.cachedSessionsWithActivities),
      },
    ];
  };

  const flattenedParamsList = getFlattenedParams(user);

  return (
    <div
      id="clerk-data-schema"
      className="border-2 border-black p-4 bg-zinc-800 text-[#E6E2D8] hard-shadow-sm flex flex-col font-mono mt-4"
    >
      <div className="flex items-center gap-2 mb-3 pb-1.5 border-b border-[#E6E2D8]/20">
        <Database className="w-4 h-4 text-amber-500" />
        <h3 className="text-sm font-bold uppercase tracking-wider">
          Clerk Data Schema
        </h3>
      </div>

      {user ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 select-text">
          {flattenedParamsList.map((item, idx) => (
            <div
              key={idx}
              className="border border-[#E6E2D8]/10 p-2 bg-zinc-900/50 flex flex-col justify-between hover:bg-zinc-700 transition-colors"
            >
              <div className="text-[9px] text-amber-500/70 uppercase tracking-widest font-bold mb-1 truncate">
                {item.key}
              </div>
              <div className="font-bold text-[#E6E2D8] font-mono break-all text-[11px] leading-tight">
                {item.val === null ||
                String(item.val) === 'null' ||
                item.val === undefined ? (
                  <span className="opacity-30">NULL</span>
                ) : String(item.val) === 'true' || item.val === true ? (
                  <span className="text-green-400">TRUE</span>
                ) : String(item.val) === 'false' || item.val === false ? (
                  <span className="text-red-400">FALSE</span>
                ) : (
                  String(item.val)
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-amber-500 italic py-4 text-center text-xs">
          - No active player session detected in clerk store -
        </p>
      )}
    </div>
  );
}
