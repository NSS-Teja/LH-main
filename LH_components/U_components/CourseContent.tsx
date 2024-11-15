//coursecontent student
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Video from 'react-native-video';

const CourseContentScreen = ({route}) => {
  const {videoUrl} = route.params;

  return (
    <View style={styles.container}>
      {videoUrl ? (
        <View>
          <Video
            source={{uri: videoUrl}}
            style={styles.video}
            controls
            paused={true}
            resizeMode="contain"
            onError={e => console.error('Video Error:', e)}
          />
          <Button
            title="Mark as done"
            onPress={() => {
              /*to handle mark as done  */
            }}
          />
        </View>
      ) : (
        <Text style={styles.placeholder}>Video content is unavailable</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: 200,
  },
  placeholder: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});

export default CourseContentScreen;
