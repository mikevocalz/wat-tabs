import { useRouter } from 'expo-router';
import { MotiScrollView } from 'moti';
import React, { useRef, useState } from 'react';
import { Dimensions, Pressable, ScrollView, View, ImageBackground } from 'react-native';

import HomeCard from '../../components/HomeCard';
import { TabBarIcon } from '../../components/TabBarIcon';

const data = [
  {
    id: 1,
    title: 'Button 1',
    img: 'https://static01.nyt.com/images/2012/06/07/movies/prometheus-designs-slide-SMBL/prometheus-designs-slide-SMBL-superJumbo.jpg',
    css: 'w-full h-[38%] aspect-video',
    altText: '',
  },
  {
    id: 2,
    title: 'Discover New Worlds',
    img: 'https://i.pinimg.com/originals/63/1b/df/631bdf111e9ee0231a3a8cdcaac3c9b3.jpg',
    css: '',
    altText: 'Weylands New Colonized Planets',
  },
  {
    id: 3,
    title: 'Button 3',
    img: 'https://www.avpcentral.com/images/romulus-androids/alien-romulus-android.jpg',
    css: '',
    altText: '',
  },
  {
    id: 4,
    title: 'Button 4',
    img: 'https://i.pinimg.com/1200x/08/ae/ed/08aeed07c73b2f13c3a14f36ee865b0c.jpg',
    css: '',
    altText: '',
  },
];

export default function Home() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  const handleScroll = (direction: 'left' | 'right', fastScroll = false) => {
    if (scrollViewRef.current) {
      const maxScroll = contentWidth - screenWidth;
      let scrollX = scrollPosition;

      const scrollStep = fastScroll ? screenWidth / 3 : screenWidth / 6; // Adjusted for slower scroll speed

      if (direction === 'right') {
        scrollX = Math.min(scrollX + scrollStep, maxScroll);
      } else {
        scrollX = Math.max(scrollX - scrollStep, 0);
      }

      scrollViewRef.current?.scrollTo({ x: scrollX, animated: true });
      setScrollPosition(scrollX);
    }
  };

  const scrollLeft = () => handleScroll('left');
  const scrollRight = () => handleScroll('right');

  const scrollLeftFast = () => handleScroll('left', true);
  const scrollRightFast = () => handleScroll('right', true);

  return (
    <ImageBackground
      resizeMode="repeat"
      source={{
        uri: 'https://web.archive.org/web/20120912011558im_/https://www.weylandindustries.com/img/background-grid.png',
      }}
      className="w-full flex-1 items-center bg-[#26566d]">
      <View className="grow-1 h-[92%] w-full">
        <MotiScrollView
          showsHorizontalScrollIndicator={false}
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 2000 }}
          ref={scrollViewRef}
          onContentSizeChange={(contentWidth) => setContentWidth(contentWidth)}
          onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
          contentContainerClassName="pr-[400px] mt-[10px] md:pr-[900px] flex-row"
          scrollEventThrottle={30}
          horizontal
          className="flex">
          <View className="w-screen flex-row gap-x-1">
            <View className="ml-10 h-full w-[120%] flex-wrap">
              <View className="h-2/3 w-full">
                <HomeCard
                  text={data[0].title}
                  imgUri={data[0].img}
                  viewStyle="w-[102%] mb-1"
                  imgClassName="w-[180%] h-[100%] aspect-[12/7]"
                  onPress={() => router.push('/two')}
                />
              </View>
              <View className="mt-1 h-1/3 w-full flex-1 flex-row gap-x-2">
                <HomeCard
                  text={data[1].title}
                  imgUri={data[1].img}
                  viewStyle="w-[40%]"
                  imgClassName="w-full h-full"
                />
                <HomeCard
                  text={data[2].title}
                  imgUri={data[2].img}
                  altText={data[1]?.altText}
                  viewStyle="ml-2 md:ml-[24px] w-[60%]"
                  imgClassName="w-full h-full"
                />
              </View>
            </View>
          </View>

          <View className="ml-[11.5%] h-[98.8%] h-full w-screen flex-row md:ml-[9%]">
            <HomeCard
              text={data[3].title}
              altText=""
              imgUri={data[3].img}
              viewStyle="h-full flex w-full mx-2"
              imgClassName="w-full h-full"
            />
          </View>

          <View className="ml-[11px] h-[98.8%] h-full w-screen flex-col justify-between">
            <HomeCard
              text={data[3].title}
              altText=""
              imgUri="https://cdnb.artstation.com/p/assets/images/images/006/057/073/large/steve-burg-int-hypersleep-rm-01-24-2016-007-resize.jpg?1495717209"
              viewStyle="h-[49.3%] flex w-[150%] mx-2"
              imgClassName="w-full h-[1/2] flex-1"
            />
            <HomeCard
              text={data[3].title}
              altText=""
              imgUri="https://i.pinimg.com/736x/ab/25/e7/ab25e70d60ba083d1be9dc646a4e2e3b.jpg"
              viewStyle="h-[49.3%] flex w-[150%] mx-[7px]"
              imgClassName="w-full h-[1/2] flex-1"
            />
          </View>
        </MotiScrollView>
      </View>

      <View className="absolute bottom-2 right-4 flex h-[40px] w-[80px] flex-row items-center justify-between gap-1 md:h-[60px] md:w-[100px]">
        <Pressable
          onPress={scrollLeft}
          onLongPress={scrollLeftFast}
          className="h-full w-[40px] items-center justify-center rounded-lg bg-gray-900 pb-0 md:w-[50px]">
          <TabBarIcon name="chevron-left" color="white" />
        </Pressable>
        <Pressable
          onPress={scrollRight}
          onLongPress={scrollRightFast}
          className="h-full w-[40px] items-center justify-center rounded-lg bg-gray-900 pb-0 md:w-[50px]">
          <TabBarIcon name="chevron-right" color="white" />
        </Pressable>
      </View>
    </ImageBackground>
  );
}
