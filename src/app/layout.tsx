import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';

import theme from '@/theme';

export const metadata: Metadata = {
  title: 'Valetax Test',
  description: 'Tree methods (create tree, get, rename, delete nodes)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <>
              <CssBaseline enableColorScheme />
              {children}
            </>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
