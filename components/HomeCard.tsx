import { MotiPressable } from 'moti/interactions';
import React, { ReactNode, FC } from 'react';
import { Text, View, Pressable, ViewStyle, StyleProp, ImageBackground } from 'react-native';

interface ButtonProps {
  children?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
  viewStyle?: string;
  imgClassName?: string;
  text?: string;
  altText?: string;
  imgUri: string;
}

const HomeCard: FC<ButtonProps> = ({
  text,
  altText,
  imgClassName,
  children,
  onPress,
  className,
  viewStyle,
  imgUri,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`${viewStyle} mb-0 min-h-[150px]  overflow-hidden rounded-xl	 bg-slate-900 `}>
      <ImageBackground
        resizeMode="cover"
        className={`z-50  flex min-h-[150px] shadow-xl drop-shadow-xl ${imgClassName}`}
        source={{
          uri: imgUri,
        }}>
        <View
          className={` ${className} absolute bottom-0 left-0 h-[60px] w-full justify-center bg-gray-950 p-2 px-3 opacity-70`}>
          <Text className=" z-40 font-bold text-white opacity-100">{text}</Text>
          {altText && <Text className="z-40 mt-1 text-xs text-white opacity-100">{altText}</Text>}
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default HomeCard;
