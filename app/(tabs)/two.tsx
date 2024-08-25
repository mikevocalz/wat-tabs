import { H1 } from '@expo/html-elements';
import { Stack } from 'expo-router';
import { MotiView } from 'moti';
import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { ProgressIndicator } from '../../components/nativewindui/ProgressIndicator';

import ARWebView from '~/components/ARWebView';

export default function Home() {
  const width = Dimensions.get('window');

  const [loadingComplete, setLoadingComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let intervalId = null;
    if (loadingComplete) {
      intervalId = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 100 : prev + 5));
      }, 100);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [loadingComplete]);

  const handleLoadEnd = () => {
    setLoadingComplete(true);
    setProgress(0); // Reset progress to 0 to animate from the start
  };

  useEffect(() => {
    if (progress === 100) {
      const timeoutId = setTimeout(() => {
        setLoadingComplete(false);
      }, 1000); // Hide the progress indicator after 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [progress]);

  const injectTailwindCSS = `
const injectCSS = document.createElement('script');
injectCSS.setAttribute('src','https://cdn.tailwindcss.com/3.4.5');
document.head.appendChild(injectCSS);
  `;

  return (
    <>
      <View className="h-screen w-full flex-1 items-center justify-center bg-zinc-300">
        {loadingComplete && (
          <MotiView
            from={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{
              type: 'timing',
              duration: 2200,
              delay: 700,
            }}
            style={styles.loadingContainer}>
            <ProgressIndicator value={progress} />
          </MotiView>
        )}
        <ARWebView
          //onLoadProgress={handleLoadProgress}
          //onLoadEnd={handleLoadEnd}
          modelUrl="/assets/model/Duck.glb"
          debug={false}
          dom={{
            injectedJavaScript: injectTailwindCSS,
            onLoadEnd: handleLoadEnd,
            mixedContentMode: 'always',
            allowFileAccessFromFileURLs: true,
            allowUniversalAccessFromFileURLs: true,
            allowFileAccess: true,
            scrollEnabled: false,
            javaScriptEnabled: true,
            containerStyle: {
              flex: 1,
              width: '100%',
              height: '100%',
            },
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  loadingContainer: {
    zIndex: 40,
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#E2E8F0', // bg-zinc-200 equivalent
    paddingHorizontal: 32, // px-8 equivalent
    paddingTop: '30%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
