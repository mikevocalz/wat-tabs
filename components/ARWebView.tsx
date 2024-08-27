/* eslint-disable react/no-unknown-property */
'use dom';

import { DOMProps } from 'expo/dom';
import React, { FC, useEffect, useState } from 'react';
import '@babylonjs/loaders';
import { Engine, Scene as BabylonScene } from 'react-babylonjs';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import {
  ArcRotateCamera,
  HemisphericLight,
  SceneLoader,
  Nullable,
  AbstractMesh,
} from '@babylonjs/core';
import { FlatList, ListRenderItem, Pressable, Image, View } from 'react-native';

import DATA, { AvatarData } from '../data';

type BabylonSceneProps = {
  debug?: boolean;
  dom?: DOMProps;
  modelUrls?: AvatarData[];
};

const ARWebView: FC<BabylonSceneProps> = ({ modelUrls, debug = false, dom }) => {
  const [scene, setScene] = useState<Nullable<any>>(null);
  const [selectedModelUrl, setSelectedModelUrl] = useState(DATA[0].model);

  useEffect(() => {
    if (scene) {
      loadModel(scene, selectedModelUrl);
    }
  }, [scene, selectedModelUrl]);

  const onSceneMount = (scene: any) => {
    setScene(scene);

    const camera = new ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2,
      12,
      new Vector3(0, 1, 0),
      scene
    );
    camera.attachControl(scene.getEngine().getRenderingCanvas(), true);

    const light = new HemisphericLight('light', new Vector3(1, 1, 0), scene);
    light.intensity = 0.7;

    // Initially load the first model
    loadModel(scene, selectedModelUrl);
  };

  const loadModel = (scene: Scene, modelUrl: string) => {
    scene.meshes.forEach((mesh: AbstractMesh) => {
      mesh.dispose();
    });

    SceneLoader.Append(
      null,
      modelUrl,
      scene,
      (newMeshes: AbstractMesh[]) => {
        console.log('Model loaded successfully');

        // Calculate the bounding box
        const boundingInfo = newMeshes[0].getBoundingInfo();
        const maxDimension = Math.max(
          boundingInfo.boundingBox.extendSizeWorld.x,
          boundingInfo.boundingBox.extendSizeWorld.y,
          boundingInfo.boundingBox.extendSizeWorld.z
        );

        // Calculate the scale factor
        const scaleFactor = 1 / maxDimension;

        // Apply the scale factor to all meshes
        newMeshes.forEach((mesh) => {
          mesh.scaling = new Vector3(scaleFactor, scaleFactor, scaleFactor);
        });
      },
      (error) => {
        console.error('Failed to load the model:', error);
      }
    );
  };

  const handleItemPress = (item: AvatarData) => {
    setSelectedModelUrl(item.model); // Update the state to load a new model
  };

  const renderItem: ListRenderItem<AvatarData> = ({ item }) => (
    <Pressable onPress={() => handleItemPress(item)} className="aspect-square h-full">
      <Image
        className="z-90 aspect-square h-full rounded-full  shadow-xl"
        source={{ uri: item.avatar }}
        resizeMode="cover"
      />
    </Pressable>
  );

  return (
    <div style={{ flex: 1, width: '100%', height: '100vh' }} {...dom}>
      <Engine antialias adaptToDeviceRatio canvasId="babylon-js">
        <BabylonScene onSceneMount={(e) => onSceneMount(e.scene)}>
          <arcRotateCamera
            name="camera1"
            target={new Vector3(0, 1, 0)}
            alpha={-Math.PI / 2}
            beta={Math.PI / 2}
            radius={5}
            minZ={0.001}
            wheelPrecision={50}
            position={new Vector3(0, 1, -5)}
          />
          <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
          <ground name="ground" width={3} height={3} />
        </BabylonScene>
      </Engine>

      <View className="absolute bottom-0 left-0	right-0 h-[10vh] w-full grow bg-slate-300/20 md:h-[15vh] ">
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          scrollEnabled
          scrollEventThrottle={14}
          ListHeaderComponent={() => <View className="h-[13vh] w-[10px]" />}
          ListFooterComponent={() => <View className="h-[13vh] w-[70px]" />}
          contentContainerClassName="h-full gap-x-6 p-2 z-50 w-full pr-[300px]"
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </div>
  );
};

export default ARWebView;
