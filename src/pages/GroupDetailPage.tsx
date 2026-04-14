import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Types
type RootStackParamList = {
  MainTabs: undefined;
  GroupDetail: { groupId: string };
};

type GroupDetailPageRouteProp = RouteProp<RootStackParamList, 'GroupDetail'>;
type GroupDetailPageNavigationProp = StackNavigationProp<RootStackParamList, 'GroupDetail'>;

// Mock data for group details
const mockGroupDetail = {
  id: '1',
  type: 'accommodation',
  name: '成都春熙路拼房',
  description: '寻找2位旅友一起拼住春熙路附近的民宿，房间宽敞整洁，交通便利，靠近地铁站和商圈。',
  budget: 100,
  date: '2024-05-01',
  endDate: '2024-05-03',
  location: '春熙路附近',
  maxParticipants: 4,
  currentParticipants: 2,
  creator: {
    id: '1',
    name: '小明',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=User%20avatar%20portrait%20of%20a%20young%20man&image_size=square',
  },
  participants: [
    {
      id: '1',
      name: '小明',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=User%20avatar%20portrait%20of%20a%20young%20man&image_size=square',
    },
    {
      id: '2',
      name: '小红',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=User%20avatar%20portrait%20of%20a%20young%20woman&image_size=square',
    },
  ],
};

const GroupDetailPage: React.FC = () => {
  const route = useRoute<GroupDetailPageRouteProp>();
  const navigation = useNavigation<GroupDetailPageNavigationProp>();
  const [group] = useState(mockGroupDetail);
  const [joined, setJoined] = useState(false);

  const handleJoinGroup = () => {
    if (joined) {
      Alert.alert('提示', '你已经加入了这个拼团');
      return;
    }
    if (group.currentParticipants >= group.maxParticipants) {
      Alert.alert('提示', '拼团已满');
      return;
    }
    Alert.alert('加入拼团', '确定要加入这个拼团吗？', [
      { text: '取消', style: 'cancel' },
      {
        text: '确定',
        onPress: () => {
          setJoined(true);
          Alert.alert('成功', '你已成功加入拼团');
        },
      },
    ]);
  };

  const handleContactCreator = () => {
    Alert.alert('联系创建者', '此功能正在开发中');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Group Header */}
      <View style={styles.groupHeader}>
        <View style={[styles.groupType, { backgroundColor: getTypeColor(group.type) }]}>
          <Text style={styles.groupTypeText}>
            {group.type === 'accommodation' ? '拼房' : group.type === 'transport' ? '拼车' : '拼团'}
          </Text>
        </View>
        <Text style={styles.groupName}>{group.name}</Text>
        <Text style={styles.groupDate}>
          {group.date} 至 {group.endDate}
        </Text>
        <View style={styles.groupMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="cash" size={16} color="#10B981" />
            <Text style={styles.metaText}>¥{group.budget}/人</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="people" size={16} color="#3B82F6" />
            <Text style={styles.metaText}>
              {group.currentParticipants}/{group.maxParticipants}人
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="location" size={16} color="#F59E0B" />
            <Text style={styles.metaText}>{group.location}</Text>
          </View>
        </View>
      </View>

      {/* Group Description */}
      <View style={styles.descriptionSection}>
        <Text style={styles.sectionTitle}>拼团说明</Text>
        <Text style={styles.description}>{group.description}</Text>
      </View>

      {/* Creator Info */}
      <View style={styles.creatorSection}>
        <Text style={styles.sectionTitle}>创建者</Text>
        <View style={styles.creatorInfo}>
          <Image source={{ uri: group.creator.avatar }} style={styles.creatorAvatar} />
          <View style={styles.creatorDetails}>
            <Text style={styles.creatorName}>{group.creator.name}</Text>
            <TouchableOpacity style={styles.contactButton} onPress={handleContactCreator}>
              <Ionicons name="chatbubble" size={16} color="#3B82F6" />
              <Text style={styles.contactButtonText}>联系TA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Participants */}
      <View style={styles.participantsSection}>
        <Text style={styles.sectionTitle}>参与人员</Text>
        <View style={styles.participantsList}>
          {group.participants.map((participant) => (
            <View key={participant.id} style={styles.participantItem}>
              <Image source={{ uri: participant.avatar }} style={styles.participantAvatar} />
              <Text style={styles.participantName}>{participant.name}</Text>
            </View>
          ))}
          {group.currentParticipants < group.maxParticipants && (
            <View style={styles.participantItem}>
              <View style={styles.emptyParticipant}>
                <Ionicons name="add" size={24} color="#999" />
              </View>
              <Text style={styles.emptyParticipantText}>等待加入</Text>
            </View>
          )}
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={[
          styles.joinButton,
          joined && styles.joinedButton,
          group.currentParticipants >= group.maxParticipants && styles.fullButton,
        ]}
        onPress={handleJoinGroup}
        disabled={joined || group.currentParticipants >= group.maxParticipants}
      >
        <Text style={styles.joinButtonText}>
          {joined ? '已加入' : group.currentParticipants >= group.maxParticipants ? '已满' : '加入拼团'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'accommodation':
      return '#E0F2FE';
    case 'transport':
      return '#ECFCCB';
    case 'activity':
      return '#FEF3C7';
    default:
      return '#F3F4F6';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  groupHeader: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 12,
  },
  groupType: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  groupTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3B82F6',
  },
  groupName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  groupDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  groupMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#333',
  },
  descriptionSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  creatorSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 12,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  creatorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  creatorDetails: {
    flex: 1,
  },
  creatorName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contactButtonText: {
    fontSize: 14,
    color: '#3B82F6',
  },
  participantsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 12,
  },
  participantsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  participantItem: {
    alignItems: 'center',
    width: 80,
  },
  participantAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  participantName: {
    fontSize: 14,
    textAlign: 'center',
  },
  emptyParticipant: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptyParticipantText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  joinButton: {
    backgroundColor: '#10B981',
    margin: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinedButton: {
    backgroundColor: '#9CA3AF',
  },
  fullButton: {
    backgroundColor: '#9CA3AF',
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GroupDetailPage;