import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Types
type RootStackParamList = {
  MainTabs: undefined;
  GroupDetail: { groupId: string };
};

type CommunityPageNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

// Mock data for travel diaries
const mockDiaries = [
  {
    id: '1',
    title: '成都3日游 - 美食之旅',
    author: '小明',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=User%20avatar%20portrait%20of%20a%20young%20man&image_size=square',
    date: '2024-04-20',
    totalExpense: 1200,
    likes: 45,
    comments: 12,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chengdu%20food%20tour%20with%20hotpot%20and%20local%20snacks&image_size=landscape_16_9',
  },
  {
    id: '2',
    title: '大理洱海骑行 - 风花雪月',
    author: '小红',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=User%20avatar%20portrait%20of%20a%20young%20woman&image_size=square',
    date: '2024-04-18',
    totalExpense: 1800,
    likes: 67,
    comments: 23,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Cycling%20around%20Erhai%20Lake%20in%20Dali%20with%20mountains%20in%20background&image_size=landscape_16_9',
  },
  {
    id: '3',
    title: '厦门鼓浪屿 - 小清新之旅',
    author: '小李',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=User%20avatar%20portrait%20of%20a%20young%20person&image_size=square',
    date: '2024-04-15',
    totalExpense: 900,
    likes: 32,
    comments: 8,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Gulangyu%20Island%20in%20Xiamen%20with%20colorful%20buildings%20and%20coastline&image_size=landscape_16_9',
  },
];

// Mock data for groups
const mockGroups = [
  {
    id: '1',
    type: 'accommodation',
    name: '成都春熙路拼房',
    date: '2024-05-01',
    budget: 100,
    participants: 2,
    maxParticipants: 4,
    location: '春熙路附近',
  },
  {
    id: '2',
    type: 'transport',
    name: '大理洱海拼车',
    date: '2024-05-02',
    budget: 50,
    participants: 1,
    maxParticipants: 3,
    location: '大理古城',
  },
  {
    id: '3',
    type: 'activity',
    name: '厦门鼓浪屿一日游',
    date: '2024-05-03',
    budget: 80,
    participants: 3,
    maxParticipants: 6,
    location: '厦门轮渡码头',
  },
];

const CommunityPage: React.FC = () => {
  const navigation = useNavigation<CommunityPageNavigationProp>();
  const [activeTab, setActiveTab] = useState('diaries'); // diaries, groups, reviews

  const renderDiary = ({ item }: { item: typeof mockDiaries[0] }) => (
    <TouchableOpacity style={styles.diaryCard}>
      <Image source={{ uri: item.image }} style={styles.diaryImage} />
      <View style={styles.diaryContent}>
        <Text style={styles.diaryTitle}>{item.title}</Text>
        <View style={styles.diaryAuthor}>
          <Image source={{ uri: item.avatar }} style={styles.authorAvatar} />
          <Text style={styles.authorName}>{item.author}</Text>
          <Text style={styles.diaryDate}>{item.date}</Text>
        </View>
        <View style={styles.diaryMeta}>
          <View style={styles.expenseContainer}>
            <Ionicons name="cash" size={16} color="#10B981" />
            <Text style={styles.expenseText}>总花费: ¥{item.totalExpense}</Text>
          </View>
          <View style={styles.diaryStats}>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={16} color="#EF4444" />
              <Text style={styles.statText}>{item.likes}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="chatbubble" size={16} color="#3B82F6" />
              <Text style={styles.statText}>{item.comments}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderGroup = ({ item }: { item: typeof mockGroups[0] }) => (
    <TouchableOpacity
      style={styles.groupCard}
      onPress={() => navigation.navigate('GroupDetail', { groupId: item.id })}
    >
      <View style={styles.groupType}>
        <Text style={styles.groupTypeText}>
          {item.type === 'accommodation' ? '拼房' : item.type === 'transport' ? '拼车' : '拼团'}
        </Text>
      </View>
      <View style={styles.groupContent}>
        <Text style={styles.groupName}>{item.name}</Text>
        <View style={styles.groupMeta}>
          <View style={styles.groupInfo}>
            <Ionicons name="calendar" size={14} color="#666" />
            <Text style={styles.groupInfoText}>{item.date}</Text>
          </View>
          <View style={styles.groupInfo}>
            <Ionicons name="location" size={14} color="#666" />
            <Text style={styles.groupInfoText}>{item.location}</Text>
          </View>
        </View>
        <View style={styles.groupBottom}>
          <Text style={styles.groupBudget}>¥{item.budget}/人</Text>
          <View style={styles.groupParticipants}>
            <Text style={styles.participantsText}>
              {item.participants}/{item.maxParticipants}人
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'diaries' && styles.activeTab]}
          onPress={() => setActiveTab('diaries')}
        >
          <Text style={[styles.tabText, activeTab === 'diaries' && styles.activeTabText]}>
            旅行日记
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'groups' && styles.activeTab]}
          onPress={() => setActiveTab('groups')}
        >
          <Text style={[styles.tabText, activeTab === 'groups' && styles.activeTabText]}>
            拼团匹配
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
          onPress={() => setActiveTab('reviews')}
        >
          <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
            用户评论
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab === 'diaries' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>旅行日记</Text>
            <Text style={styles.sectionSubtitle}>分享真实的旅行体验和花费</Text>
            {mockDiaries.map((diary) => (
              <View key={diary.id}>{renderDiary({ item: diary })}</View>
            ))}
          </View>
        )}

        {activeTab === 'groups' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>拼团匹配</Text>
            <Text style={styles.sectionSubtitle}>找到志同道合的旅伴，分摊费用</Text>
            {mockGroups.map((group) => (
              <View key={group.id}>{renderGroup({ item: group })}</View>
            ))}
          </View>
        )}

        {activeTab === 'reviews' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>用户评论</Text>
            <Text style={styles.sectionSubtitle}>真实的用户评价和建议</Text>
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image
                  source={{ uri: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=User%20avatar%20portrait&image_size=square' }}
                  style={styles.reviewAvatar}
                />
                <View style={styles.reviewAuthor}>
                  <Text style={styles.reviewAuthorName}>小张</Text>
                  <Text style={styles.reviewDate}>2024-04-19</Text>
                </View>
                <View style={styles.reviewRating}>
                  <Ionicons name="star" size={16} color="#F59E0B" />
                  <Text style={styles.reviewRatingText}>4.8</Text>
                </View>
              </View>
              <Text style={styles.reviewContent}>
                成都熊猫基地真的很值得一去！看到了很多可爱的大熊猫，门票也很合理。建议早上9点左右去，人比较少，熊猫也比较活跃。
              </Text>
              <Image
                source={{ uri: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Giant%20panda%20in%20Chengdu%20Research%20Base&image_size=landscape_16_9' }}
                style={styles.reviewImage}
              />
            </View>
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image
                  source={{ uri: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=User%20avatar%20portrait%20of%20a%20woman&image_size=square' }}
                  style={styles.reviewAvatar}
                />
                <View style={styles.reviewAuthor}>
                  <Text style={styles.reviewAuthorName}>小李</Text>
                  <Text style={styles.reviewDate}>2024-04-18</Text>
                </View>
                <View style={styles.reviewRating}>
                  <Ionicons name="star" size={16} color="#F59E0B" />
                  <Text style={styles.reviewRatingText}>4.5</Text>
                </View>
              </View>
              <Text style={styles.reviewContent}>
                大理洱海骑行真的太舒服了！租一辆自行车，沿着湖边骑行，风景美得让人窒息。建议带点水和零食，沿途有很多休息的地方。
              </Text>
              <Image
                source={{ uri: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Cycling%20path%20around%20Erhai%20Lake&image_size=landscape_16_9' }}
                style={styles.reviewImage}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#3B82F6',
    fontWeight: '500',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  diaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  diaryImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  diaryContent: {
    padding: 16,
  },
  diaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  diaryAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  authorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '500',
  },
  diaryDate: {
    fontSize: 14,
    color: '#666',
  },
  diaryMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expenseText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  diaryStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: '#666',
  },
  groupCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  groupType: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  groupTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3B82F6',
  },
  groupContent: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  groupMeta: {
    flexDirection: 'column',
    gap: 4,
    marginBottom: 12,
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  groupInfoText: {
    fontSize: 14,
    color: '#666',
  },
  groupBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupBudget: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
  groupParticipants: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  participantsText: {
    fontSize: 14,
    color: '#333',
  },
  reviewCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewAuthor: {
    flex: 1,
  },
  reviewAuthorName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reviewRatingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  reviewContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});

export default CommunityPage;