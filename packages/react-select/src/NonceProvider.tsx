import * as React from 'react';
import { useMemo } from 'react';
import { ReactNode } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

interface NonceProviderProps {
  nonce: string;
  children: ReactNode;
  cacheKey: string;
}

export default ({ nonce, children, cacheKey }: NonceProviderProps) => {
    throw new Error("STUB");
};
