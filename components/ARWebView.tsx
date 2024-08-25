/* eslint-disable import/order */
'use dom';
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  SceneLoader,
  Nullable,
  WebXRDefaultExperience,
  WebXRHitTest,
  Sound,
} from '@babylonjs/core';
import { DOMProps } from 'expo/dom';
import React, { useEffect, useRef, useState } from 'react';
import '@babylonjs/loaders';
import { Inspector } from '@babylonjs/inspector';
import { Section } from '@expo/html-elements';
import { Pressable, Text } from 'react-native';

type BabylonSceneProps = {
  modelUrl: string;
  debug?: boolean;
  dom?: DOMProps;
};

const ARWebView: React.FC<BabylonSceneProps> = ({ modelUrl, debug = false, dom }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<Nullable<Engine>>(null);
  const sceneRef = useRef<Nullable<Scene>>(null);
  const xrRef = useRef<Nullable<WebXRDefaultExperience>>(null);
  const soundRef = useRef<Nullable<Sound>>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      const engine = new Engine(canvasRef.current, true);
      engineRef.current = engine;

      const scene = new Scene(engine);
      sceneRef.current = scene;

      // Create a camera to start with
      const camera = new ArcRotateCamera(
        'camera',
        -Math.PI / 2,
        Math.PI / 2.5,
        10,
        Vector3.Zero(),
        scene
      );
      camera.attachControl(canvasRef.current, true);

      // Add a basic light
      const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
      light.intensity = 0.7;

      if (debug) {
        Inspector.Show(scene);
      }

      // Load the 3D model
      SceneLoader.Append('', modelUrl, scene, (scene) => {
        scene.createDefaultCameraOrLight(true, true, true);
        scene.createDefaultEnvironment();
      });

      // Load and setup the sound
      // const sound = new Sound('Music', '../assets/audio/alarm4.mp3', scene, null, {
      //   loop: false,
      //   autoplay: false,
      // });

      const sound = new Sound(
        'Violons',
        'https://www.babylonjs-playground.com/sounds/violons11.wav',
        scene,
        null,
        { loop: true, autoplay: false }
      );

      soundRef.current = sound;

      // Enable WebXR and configure AR session
      const setupWebXR = async () => {
        const xr = await scene.createDefaultXRExperienceAsync({
          uiOptions: {
            sessionMode: 'immersive-ar',
            referenceSpaceType: 'local-floor',
          },
          optionalFeatures: true,
        });

        xrRef.current = xr;

        // Enable the hit test feature
        const featuresManager = xr.baseExperience.featuresManager;
        const hitTestFeature = featuresManager.enableFeature(
          WebXRHitTest.Name,
          'latest'
        ) as WebXRHitTest;

        // Handle AR session start
        xr.baseExperience.onStateChangedObservable.add((state) => {
          if (state === BABYLON.WebXRState.IN_XR) {
            console.log('Entering XR');
          }
        });
      };

      setupWebXR();

      engine.runRenderLoop(() => {
        if (scene) {
          scene.render();
        }
      });

      const handleResize = () => {
        engine.resize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        engine.stopRenderLoop();
        scene.dispose();
        engine.dispose();
      };
    }
  }, [modelUrl, debug]);

  const handleToggleSound = () => {
    if (soundRef.current) {
      if (isPlaying) {
        soundRef.current.stop();
        setIsPlaying(false);
      } else {
        soundRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    //fiqure how to inject the tailwind cdn or some script to load styles in the webview
    <Section className="h-full w-full" {...dom}>
      <canvas ref={canvasRef} className="h-screen w-full" />
      <Pressable
        onPress={handleToggleSound}
        className="absolute left-0 top-0 m-2 rounded-lg bg-orange-600 px-8 py-2">
        <Text className="text-xl text-white">{isPlaying ? 'Stop' : 'Play'}</Text>
      </Pressable>
    </Section>
  );
};

export default ARWebView;
