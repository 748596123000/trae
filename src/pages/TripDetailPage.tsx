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
  TripDetail: { tripId: string };
  POIDetail: { poiId: string };
  AIAssistant: undefined;
};

type TripDetailPageRouteProp = RouteProp<RootStackParamList, 'TripDetail'>;
type TripDetailPageNavigationProp = StackNavigationProp<RootStackParamList, 'TripDetail'>;

interface Activity {
  id: string;
  name: string;
  description: string;
  duration: number;
  cost: number;
  category: string;
  startTime: string;
}

// Mock data for trip details
const mockTripDetail = {
  id: '1',
  name: '成都3日游',
  destination: '成都',
  startDate: '2024-05-01',
  endDate: '2024-05-03',
  totalBudget: 1500,
  spent: 1200,
  currency: 'CNY',
  travelType: '休闲',
  interests: ['美食', '文化', '自然'],
  image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chengdu%20city%20panorama&image_size=landscape_16_9',
  itinerary: [
    {
      day: 1,
      date: '2024-05-01',
      activities: [
        {
          id: '1',
          name: '熊猫基地',
          description: '观赏国宝大熊猫，了解它们的生活习性',
          duration: 3,
          cost: 58,
          category: '景点',
          startTime: '09:00',
        },
        {
          id: '2',
          name: '宽窄巷子',
          description: '体验成都传统街巷文化，品尝当地小吃',
          duration: 2,
          cost: 0,
          category: '文化',
          startTime: '12:30',
        },
        {
          id: '3',
          name: '锦里古街',
          description: '夜游锦里，感受成都夜生活',
          duration: 2,
          cost: 0,
          category: '夜生活',
          startTime: '19:00',
        },
      ],
      budget: 500,
      spent: 400,
    },
    {
      day: 2,
      date: '2024-05-02',
      activities: [
        {
          id: '4',
          name: '青城山',
          description: '道教名山，风景秀丽',
          duration: 6,
          cost: 80,
          category: '自然',
          startTime: '08:00',
        },
        {
          id: '5',
          name: '都江堰',
          description: '世界文化遗产，古代水利工程',
          duration: 3,
          cost: 90,
          category: '文化',
          startTime: '14:00',
        },
      ],
      budget: 500,
      spent: 500,
    },
    {
      day: 3,
      date: '2024-05-03',
      activities: [
        {
          id: '6',
          name: '武侯祠',
          description: '纪念诸葛亮的祠堂',
          duration: 2,
          cost: 60,
          category: '文化',
          startTime: '09:00',
        },
        {
          id: '7',
          name: '春熙路',
          description: '成都商业中心，购物天堂',
          duration: 3,
          cost: 0,
          category: '购物',
          startTime: '12:00',
        },
      ],
      budget: 500,
      spent: 300,
    },
  ],
};

const TripDetailPage: React.FC = () => {
  const route = useRoute<TripDetailPageRouteProp>();
  const navigation = useNavigation<TripDetailPageNavigationProp>();
  const [trip] = useState(mockTripDetail);

  const handleAddExpense = () => {
    Alert.alert('添加支出', '此功能正在开发中');
  };

  const handleShareTrip = () => {
    Alert.alert('分享行程', '此功能正在开发中');
  };

  const renderActivity = (activity: Activity) => (
    <TouchableOpacity
      style={styles.activityCard}
      onPress={() => navigation.navigate('POIDetail', { poiId: activity.id })}
    >
      <View style={styles.activityTime}>
        <Text style={styles.activityTimeText}>{activity.startTime}</Text>
      </View>
      <View style={styles.activityInfo}>
        <Text style={styles.activityName}>{activity.name}</Text>
        <Text style={styles.activityDescription} numberOfLines={2}>
          {activity.description}
        </Text>
        <View style={styles.activityMeta}>
          <Text style={styles.activityDuration}>{activity.duration}小时</Text>
          <Text style={styles.activityCost}>¥{activity.cost}</Text>
          <View style={[styles.activityCategory, { backgroundColor: getCategoryColor(activity.category) }]}>
            <Text style={styles.activityCategoryText}>{activity.category}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '景点':
        return '#E0F2FE';
      case '文化':
        return '#ECFCCB';
      case '自然':
        return '#DBEAFE';
      case '美食':
        return '#FEF3C7';
      case '购物':
        return '#FCE7F3';
      case '夜生活':
        return '#EDE9FE';
      default:
        return '#F3F4F6';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Trip Header */}
      <Image source={{ uri: trip.image }} style={styles.tripImage} />
      <View style={styles.tripHeader}>
        <Text style={styles.tripName}>{trip.name}</Text>
        <Text style={styles.tripDestination}>{trip.destination}</Text>
        <Text style={styles.tripDate}>
          {trip.startDate} 至 {trip.endDate}
        </Text>
        <View style={styles.tripMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="cash" size={16} color="#10B981" />
            <Text style={styles.metaText}>预算: ¥{trip.totalBudget}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="wallet" size={16} color="#3B82F6" />
            <Text style={styles.metaText}>已花: ¥{trip.spent}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time" size={16} color="#F59E0B" />
            <Text style={styles.metaText}>3天</Text>
          </View>
        </View>
        <View style={styles.tripTags}>
          {trip.interests.map((interest, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, styles.addExpenseButton]} onPress={handleAddExpense}>
          <Ionicons name="add-circle" size={24} color="#10B981" />
          <Text style={styles.addExpenseText}>添加支出</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.shareButton]} onPress={handleShareTrip}>
          <Ionicons name="share-social" size={24} color="#3B82F6" />
          <Text style={styles.shareText}>分享行程</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.aiButton]}
          onPress={() => navigation.navigate('AIAssistant')}
        >
          <Ionicons name="chatbubbles" size={24} color="#F59E0B" />
          <Text style={styles.aiText}>AI助手</Text>
        </TouchableOpacity>
      </View>

      {/* Itinerary */}
      <View style={styles.itinerarySection}>
        <Text style={styles.sectionTitle}>行程安排</Text>
        {trip.itinerary.map((day) => (
          <View key={day.day} style={styles.dayContainer}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayNumber}>第{day.day}天</Text>
              <Text style={styles.dayDate}>{day.date}</Text>
              <View style={styles.dayBudget}>
                <Text style={styles.dayBudgetText}>预算: ¥{day.budget}</Text>
                <Text style={styles.daySpentText}>已花: ¥{day.spent}</Text>
              </View>
            </View>
            <View style={styles.dayActivities}>
              {day.activities.map((activity) => renderActivity(activity))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tripImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  tripHeader: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 12,
  },
  tripName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tripDestination: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  tripDate: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  tripMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
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
  tripTags: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    color: '#3B82F6',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  addExpenseButton: {
    borderWidth: 1,
    borderColor: '#10B981',
  },
  addExpenseText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  shareButton: {
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  shareText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  aiButton: {
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  aiText: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '500',
  },
  itinerarySection: {
    backgroundColor: 'white',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dayContainer: {
    marginBottom: 24,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dayDate: {
    fontSize: 14,
    color: '#666',
  },
  dayBudget: {
    flex: 1,
    alignItems: 'flex-end',
  },
  dayBudgetText: {
    fontSize: 14,
    color: '#10B981',
  },
  daySpentText: {
    fontSize: 12,
    color: '#666',
  },
  dayActivities: {
    paddingLeft: 12,
  },
  activityCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    gap: 12,
  },
  activityTime: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    minWidth: 60,
    alignItems: 'center',
  },
  activityTimeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityDuration: {
    fontSize: 12,
    color: '#666',
  },
  activityCost: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  activityCategory: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activityCategoryText: {
    fontSize: 12,
    color: '#333',
  },
});

export default TripDetailPage;