import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'; // Import an icon library
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForumModal = ({courseId, courseTitle, visible, onClose}) => {
  const [thread, setThread] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:5000/courses/threads/${courseId}`,
        );
        setThread(response.data);
        console.log("thread response",response.data);
      } catch (error) {
        console.error('Error fetching thread:', error);
      }
    };

    if (courseId) fetchThread();
  }, [courseId]);

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        `http://10.0.2.2:5000/courses/threads/${courseId}/comments`,
        {
          content: commentText,
        },
        {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${await AsyncStorage.getItem('token')}`,
            },
          },
      );
      setThread(response.data);
      setCommentText('');
      console.log(response.data);
    }
     catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Forum - {courseTitle}</Text>
        </View>

        {/* Forum Content */}
        <FlatList
          data={thread?.comments}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <View style={styles.commentContainer}>
              <Text style={styles.commentUser}>{item.userId.name}</Text>
              <Text>{item.content}</Text>
            </View>
          )}
        />

        {/* Comment Input Section */}
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={commentText}
          onChangeText={setCommentText}
        />
        <Button title="Post Comment" onPress={handleAddComment} />

        <TouchableOpacity onPress={onClose} style={{marginTop: 20}}>
          <Text style={{color: 'blue', textAlign: 'center'}}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  commentContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  commentUser: {
    fontWeight: 'bold',
  },
  commentInput: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
  },
});

export default ForumModal;
